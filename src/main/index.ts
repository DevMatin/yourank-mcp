#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { DataForSEOClient, DataForSEOConfig } from '../core/client/dataforseo.client.js';
import { EnabledModulesSchema, isModuleEnabled, defaultEnabledModules } from '../core/config/modules.config.js';
import { BaseModule, ToolDefinition } from '../core/modules/base.module.js';
import { z } from 'zod';
import { ModuleLoaderService } from "../core/utils/module-loader.js";
import { initializeFieldConfiguration } from '../core/config/field-configuration.js';
import { name, version } from '../core/utils/version.js';

// Initialize field configuration if provided
initializeFieldConfiguration();
console.error('Starting DataForSEO MCP Server...');
console.error(`Server name: ${name}, version: ${version}`);
// Create server instance
const server = new McpServer({
    name,
    version,
});

// Initialize DataForSEO client
const dataForSEOConfig: DataForSEOConfig = {
  username: process.env.DATAFORSEO_USERNAME || "",
  password: process.env.DATAFORSEO_PASSWORD || "",
};

const dataForSEOClient = new DataForSEOClient(dataForSEOConfig);
console.error('DataForSEO client initialized');

// Parse enabled modules from environment
const enabledModules = EnabledModulesSchema.parse(process.env.ENABLED_MODULES);

// Initialize modules
const modules: BaseModule[] = ModuleLoaderService.loadModules(dataForSEOClient, enabledModules);
console.error('Modules initialized');

// Explicitly add Content Analysis Module if not already loaded
let contentAnalysisModuleLoaded = false;
for (const module of modules) {
  if (module.constructor.name === 'ContentAnalysisApiModule') {
    contentAnalysisModuleLoaded = true;
    break;
  }
}

if (!contentAnalysisModuleLoaded && isModuleEnabled('CONTENT_ANALYSIS', enabledModules)) {
  console.error('Explicitly loading Content Analysis Module...');
  try {
    const { ContentAnalysisApiModule } = await import('../core/modules/content-analysis/content-analysis-api.module.ts');
    const contentAnalysisModule = new ContentAnalysisApiModule(dataForSEOClient);
    modules.push(contentAnalysisModule);
    console.error('Content Analysis Module loaded explicitly');
  } catch (error) {
    console.error('Failed to load Content Analysis Module:', error);
  }
}

// Register tools from modules
function registerModuleTools() {
  modules.forEach(module => {
    console.error(`Registering tools from module: ${module.constructor.name}`);
    const tools = module.getTools();
    console.error(`Found ${Object.keys(tools).length} tools in ${module.constructor.name}`);
    
    Object.entries(tools).forEach(([name, tool]) => {
      const typedTool = tool as ToolDefinition;
      const schema = z.object(typedTool.params);
      server.tool(
        name,
        typedTool.description,
        schema.shape,
        async (params: any) => {
          try {
            const result = await typedTool.handler(params);
            return result;
          } catch (error) {
            console.error(`Tool ${name} error:`, error);
            return {
              content: [
                {
                  type: "text",
                  text: `Error in tool ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
                },
              ],
            };
          }
        }
      );
      console.error(`Registered tool: ${name}`);
    });
  });
}

// Register all tools
registerModuleTools();
console.error('Tools registered');

// Start the server
async function main() {
  const transport = new StdioServerTransport(); 
  console.error('Starting server');
  await server.connect(transport);
  console.error("DataForSEO MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
