#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DataForSEOClient, DataForSEOConfig } from '../core/client/dataforseo.client.js';
import { SerpApiModule } from '../core/modules/serp/serp-api.module.ts';
import { KeywordsDataApiModule } from '../core/modules/keywords-data/keywords-data-api.module.js';
import { OnPageApiModule } from '../core/modules/onpage/onpage-api.module.js';
import { DataForSEOLabsApi } from '../core/modules/dataforseo-labs/dataforseo-labs-api.module.js';
import { EnabledModulesSchema, isModuleEnabled, defaultEnabledModules } from '../core/config/modules.config.js';
import { BaseModule, ToolDefinition } from '../core/modules/base.module.js';
import { z } from 'zod';
import { BacklinksApiModule } from "../core/modules/backlinks/backlinks-api.module.js";
import { BusinessDataApiModule } from "../core/modules/business-data-api/business-data-api.module.js";
import { DomainAnalyticsApiModule } from "../core/modules/domain-analytics/domain-analytics-api.module.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { Request as ExpressRequest, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";
import { GetPromptResult, isInitializeRequest, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js"
import { name, version } from '../core/utils/version.js';
import { ModuleLoaderService } from "../core/utils/module-loader.js";
import { initializeFieldConfiguration } from '../core/config/field-configuration.js';
import { MerchantApiModule } from '../core/modules/merchant/merchant-api.module.js';

// Initialize field configuration if provided
initializeFieldConfiguration();

// Extended request interface to include auth properties
interface Request extends ExpressRequest {
  username?: string;
  password?: string;
}

console.error('Starting DataForSEO MCP Server...');
console.error(`Server name: ${name}, version: ${version}`);

async function getServer(username: string | undefined, password: string | undefined) : Promise<McpServer>
{
  const server = new McpServer({
    name,
    version,
  },{ capabilities: { logging: {}} });
  // Initialize DataForSEO client
  const dataForSEOConfig: DataForSEOConfig = {
    username: username || "",
    password: password || "",
  };
  
  const dataForSEOClient = new DataForSEOClient(dataForSEOConfig);
  console.error('DataForSEO client initialized');
  
  // Parse enabled modules from environment with explicit Content Generation activation
  let enabledModules = EnabledModulesSchema.parse(process.env.ENABLED_MODULES);
  
  // Ensure CONTENT_GENERATION is enabled
  if (!enabledModules.includes('CONTENT_GENERATION')) {
    enabledModules = [...enabledModules, 'CONTENT_GENERATION'];
    console.error('CONTENT_GENERATION module explicitly enabled');
  }
  
  // Ensure SERP is enabled
  if (!enabledModules.includes('SERP')) {
    enabledModules = [...enabledModules, 'SERP'];
    console.error('SERP module explicitly enabled');
  }
  
  // Initialize modules
  const modules: BaseModule[] = ModuleLoaderService.loadModules(dataForSEOClient, enabledModules);
  
  // Always add SERP API Module if not already loaded
  let serpModuleLoaded = false;
  for (const module of modules) {
    if (module.constructor.name === 'SerpApiModule') {
      serpModuleLoaded = true;
      break;
    }
  }

  if (!serpModuleLoaded) {
    console.error('Explicitly loading SERP API Module...');
    try {
      const serpModule = new SerpApiModule(dataForSEOClient);
      modules.push(serpModule);
      console.error('SERP API Module loaded explicitly');
    } catch (error) {
      console.error('Failed to load SERP API Module:', error);
    }
  }
  
  // Always add Content Analysis API Module
  try {
    const { ContentAnalysisApiModule } = await import('../core/modules/content-analysis/content-analysis-api.module.ts');
    const contentAnalysisModule = new ContentAnalysisApiModule(dataForSEOClient);
    modules.push(contentAnalysisModule);
    console.error('Content Analysis Module loaded successfully');
    
    // Debug: Log all modules
    console.error('All loaded modules:');
    modules.forEach((module, index) => {
      console.error(`  ${index + 1}. ${module.constructor.name}`);
    });
    
    // Debug: Log all tools
    console.error('All registered tools:');
    let totalTools = 0;
    modules.forEach((module, index) => {
      const tools = module.getTools();
      const toolNames = Object.keys(tools);
      totalTools += toolNames.length;
      console.error(`  Module ${index + 1}: ${module.constructor.name} - ${toolNames.length} tools`);
      toolNames.forEach(toolName => {
        console.error(`    - ${toolName}`);
      });
    });
    console.error(`Total tools: ${totalTools}`);
  } catch (error) {
    console.error('Failed to load Content Analysis Module:', error);
  }
  
  console.error('Modules initialized');
  function registerModuleTools() {
    console.error('Registering tools');
    console.error(modules.length);
    modules.forEach(module => {
      const tools = module.getTools();
      Object.entries(tools).forEach(([name, tool]) => {
        const typedTool = tool as ToolDefinition;
        const schema = z.object(typedTool.params);
        server.tool(
          name,
          typedTool.description,
          schema.shape,
          typedTool.handler
        );
      });
    });
  }
  registerModuleTools();
  console.error('Tools registered');
  return server;
}

function getSessionId() {
  return randomUUID().toString();
}

async function main() {
  const app = express();
  app.use(express.json());

  // Basic Auth Middleware
  const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    console.error(authHeader)
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      next();
      return;
    }

    // Extract credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (!username || !password) {
      console.error('Invalid credentials');
      res.status(401).json({
        jsonrpc: "2.0",
        error: {
          code: -32001, 
          message: "Invalid credentials"
        },
        id: null
      });
      return;
    }

    // Add credentials to request
    req.username = username;
    req.password = password;
    next();
  };

  const handleMcpRequest = async (req: Request, res: Response) => {
    // In stateless mode, create a new instance of transport and server for each request
    // to ensure complete isolation. A single instance would cause request ID collisions
    // when multiple clients connect concurrently.
    
    try {
      console.error(Date.now().toLocaleString())
      
      // Check if we have valid credentials
      if (!req.username && !req.password) {
        // If no request auth, check environment variables
        const envUsername = process.env.DATAFORSEO_USERNAME;
        const envPassword = process.env.DATAFORSEO_PASSWORD;
        if (!envUsername || !envPassword) {
          console.error('No DataForSEO credentials provided');
          res.status(401).json({
            jsonrpc: "2.0",
            error: {
              code: -32001,
              message: "Authentication required. Provide DataForSEO credentials."
            },
            id: null
          });
          return;
        }
        // Use environment variables
        req.username = envUsername;
        req.password = envPassword;
      }
      
      const server = await getServer(req.username, req.password);
      console.error(Date.now().toLocaleString())

      const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
      });

      await server.connect(transport);
      console.error('handle request');
      await transport.handleRequest(req , res, req.body);
      console.error('end handle request');
      req.on('close', () => {
        console.error('Request closed');
        transport.close();
        server.close();
      });

    } catch (error) {
      console.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  };

  const handleNotAllowed = (method: string) => async (req: Request, res: Response) => {
    console.error(`Received ${method} request`);
    res.status(405).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed."
      },
      id: null
    });
  };

  // Apply basic auth and shared handler to both endpoints
  app.post('/http', basicAuth, handleMcpRequest);
  app.post('/mcp', basicAuth, handleMcpRequest);

  app.get('/http', handleNotAllowed('GET HTTP'));
  app.get('/mcp', handleNotAllowed('GET MCP'));

  app.delete('/http', handleNotAllowed('DELETE HTTP'));
  app.delete('/mcp', handleNotAllowed('DELETE MCP'));

  // Debug endpoints to inspect loaded modules and tools in production
  app.get('/debug/tools', async (_req: Request, res: Response) => {
    try {
      const envUsername = process.env.DATAFORSEO_USERNAME || '';
      const envPassword = process.env.DATAFORSEO_PASSWORD || '';
      const dataForSEOClient = new DataForSEOClient({ username: envUsername, password: envPassword });

      let enabledModules = EnabledModulesSchema.parse(process.env.ENABLED_MODULES);
      const modules: BaseModule[] = ModuleLoaderService.loadModules(dataForSEOClient, enabledModules);

      const toolNames: string[] = [];
      modules.forEach((module) => {
        const tools = module.getTools();
        toolNames.push(...Object.keys(tools));
      });

      res.json({ tools: toolNames });
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  // Direct SERP API endpoints for testing
  app.post('/v3/serp/id_list', basicAuth, async (req: Request, res: Response) => {
    try {
      const envUsername = process.env.DATAFORSEO_USERNAME || '';
      const envPassword = process.env.DATAFORSEO_PASSWORD || '';
      const dataForSEOClient = new DataForSEOClient({ username: envUsername, password: envPassword });
      
      const serpModule = new SerpApiModule(dataForSEOClient);
      const tools = serpModule.getTools();
      const idListTool = tools['serp_id_list'];
      
      if (!idListTool) {
        res.status(500).json({ error: 'SERP ID List tool not found' });
        return;
      }
      
      const result = await idListTool.handler(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  app.post('/v3/serp/screenshot', basicAuth, async (req: Request, res: Response) => {
    try {
      const envUsername = process.env.DATAFORSEO_USERNAME || '';
      const envPassword = process.env.DATAFORSEO_PASSWORD || '';
      const dataForSEOClient = new DataForSEOClient({ username: envUsername, password: envPassword });
      
      const serpModule = new SerpApiModule(dataForSEOClient);
      const tools = serpModule.getTools();
      const screenshotTool = tools['serp_screenshot'];
      
      if (!screenshotTool) {
        res.status(500).json({ error: 'SERP Screenshot tool not found' });
        return;
      }
      
      const result = await screenshotTool.handler(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  app.post('/v3/serp/ai_summary', basicAuth, async (req: Request, res: Response) => {
    try {
      const envUsername = process.env.DATAFORSEO_USERNAME || '';
      const envPassword = process.env.DATAFORSEO_PASSWORD || '';
      const dataForSEOClient = new DataForSEOClient({ username: envUsername, password: envPassword });
      
      const serpModule = new SerpApiModule(dataForSEOClient);
      const tools = serpModule.getTools();
      const aiSummaryTool = tools['serp_ai_summary'];
      
      if (!aiSummaryTool) {
        res.status(500).json({ error: 'SERP AI Summary tool not found' });
        return;
      }
      
      const result = await aiSummaryTool.handler(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  app.post('/v3/serp/tasks_ready', basicAuth, async (req: Request, res: Response) => {
    try {
      const envUsername = process.env.DATAFORSEO_USERNAME || '';
      const envPassword = process.env.DATAFORSEO_PASSWORD || '';
      const dataForSEOClient = new DataForSEOClient({ username: envUsername, password: envPassword });
      
      const serpModule = new SerpApiModule(dataForSEOClient);
      const tools = serpModule.getTools();
      const tasksReadyTool = tools['serp_tasks_ready'];
      
      if (!tasksReadyTool) {
        res.status(500).json({ error: 'SERP Tasks Ready tool not found' });
        return;
      }
      
      const result = await tasksReadyTool.handler(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  app.post('/v3/serp/errors', basicAuth, async (req: Request, res: Response) => {
    try {
      const envUsername = process.env.DATAFORSEO_USERNAME || '';
      const envPassword = process.env.DATAFORSEO_PASSWORD || '';
      const dataForSEOClient = new DataForSEOClient({ username: envUsername, password: envPassword });
      
      const serpModule = new SerpApiModule(dataForSEOClient);
      const tools = serpModule.getTools();
      const errorsTool = tools['serp_errors'];
      
      if (!errorsTool) {
        res.status(500).json({ error: 'SERP Errors tool not found' });
        return;
      }
      
      const result = await errorsTool.handler(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  // Start the server
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(PORT, () => {
    console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
