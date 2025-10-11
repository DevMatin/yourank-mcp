import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DataForSEOClient, DataForSEOConfig } from "../core/client/dataforseo.client.js";
import { EnabledModulesSchema } from "../core/config/modules.config.js";
import { ModuleLoaderService } from "../core/utils/module-loader.js";
import { BaseModule, ToolDefinition } from "../core/modules/base.module.js";
import { z } from 'zod';
import { name, version } from '../core/utils/version.js';

export function initMcpServer(username: string | undefined, password: string | undefined): McpServer {
  const server = new McpServer({
    name,
    version,
  }, { capabilities: { logging: {} } });

  const dataForSEOConfig: DataForSEOConfig = {
    username: username || "",
    password: password || "",
  };
  
  const dataForSEOClient = new DataForSEOClient(dataForSEOConfig);
  console.error('DataForSEO client initialized');
  
  const enabledModules = EnabledModulesSchema.parse(process.env.ENABLED_MODULES);
  const modules: BaseModule[] = ModuleLoaderService.loadModules(dataForSEOClient, enabledModules);
  
  const enabledPrompts = process.env.ENABLED_PROMPTS?.split(',').map(name => name.trim()) || [];

  // Store tools for tools/call method
  const allTools: Record<string, ToolDefinition> = {};

  modules.forEach(module => {
    const tools = module.getTools();
    Object.entries(tools).forEach(([name, tool]) => {
      const typedTool = tool as ToolDefinition;
      const schema = z.object(typedTool.params);
      
      // Store tool for tools/call method
      allTools[name] = typedTool;
      
      // Register with old method for compatibility
      server.tool(name, typedTool.description, schema.shape, typedTool.handler);
    });

    const prompts = module.getPrompts();
    const allowedPrompts = enabledPrompts.length === 0
        ? prompts
        : Object.fromEntries(Object.entries(prompts).filter(([promptName]) => enabledPrompts.includes(promptName)));

    Object.entries(allowedPrompts).forEach(([name, prompt]) => {
      server.registerPrompt(name, {
        description: prompt.description,
        argsSchema: prompt.params,
      }, prompt.handler);
    });
  });

  // Add tools/list method handler
  server.setRequestHandler('tools/list', async () => {
    const toolsList = Object.entries(allTools).map(([name, tool]) => ({
      name,
      description: tool.description,
      inputSchema: {
        type: 'object',
        properties: Object.fromEntries(
          Object.entries(tool.params).map(([key, schema]) => [
            key,
            {
              type: schema._def.typeName === 'ZodString' ? 'string' : 
                    schema._def.typeName === 'ZodNumber' ? 'number' :
                    schema._def.typeName === 'ZodBoolean' ? 'boolean' :
                    schema._def.typeName === 'ZodArray' ? 'array' :
                    schema._def.typeName === 'ZodNullable' ? 
                      (schema._def.innerType._def.typeName === 'ZodString' ? 'string' : 'string') :
                    'string',
              description: schema.description || '',
              ...(schema._def.defaultValue && { default: schema._def.defaultValue() }),
              ...(schema._def.typeName === 'ZodArray' && { items: { type: 'string' } }),
              ...(schema._def.typeName === 'ZodEnum' && { enum: schema._def.values }),
            }
          ])
        ),
        required: Object.keys(tool.params).filter(key => {
          const schema = tool.params[key];
          return !schema.isOptional() && !schema._def.defaultValue;
        })
      }
    }));

    return { tools: toolsList };
  });

  // Add tools/call method handler
  server.setRequestHandler('tools/call', async (request) => {
    const { name, arguments: args } = request.params as { name: string; arguments: any };
    
    if (!allTools[name]) {
      throw new Error(`Tool '${name}' not found`);
    }

    try {
      const result = await allTools[name].handler(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      throw new Error(`Tool execution failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  return server;
}
