#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { DataForSEOClient, DataForSEOConfig } from '../core/client/dataforseo.client.js';
import { SerpBingApiModule } from '../core/modules/serp-bing/serp-bing-api.module.js';

const server = new Server(
  {
    name: 'dataforseo-serp-bing-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize DataForSEO client
const dataForSEOClient = new DataForSEOClient({
  username: process.env.DATAFORSEO_LOGIN || '',
  password: process.env.DATAFORSEO_PASSWORD || '',
  baseUrl: 'https://api.dataforseo.com'
});

// Initialize Bing SERP module
const serpBingModule = new SerpBingApiModule(dataForSEOClient);
const tools = serpBingModule.getTools();

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.entries(tools).map(([name, tool]) => ({
      name,
      description: tool.description,
      inputSchema: {
        type: 'object',
        properties: Object.fromEntries(
          Object.entries(tool.params).map(([key, zodSchema]: [string, any]) => [
            key,
            {
              type: zodSchema._def?.typeName === 'ZodString' ? 'string' : 
                    zodSchema._def?.typeName === 'ZodNumber' ? 'number' :
                    zodSchema._def?.typeName === 'ZodBoolean' ? 'boolean' : 'string',
              description: zodSchema.description || '',
              default: zodSchema._def?.defaultValue?.()
            }
          ])
        ),
        required: Object.entries(tool.params)
          .filter(([_, zodSchema]: [string, any]) => !zodSchema.isOptional())
          .map(([key]) => key)
      }
    }))
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (!tools[name]) {
    throw new Error(`Tool ${name} not found`);
  }

  try {
    const result = await tools[name].handler(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    throw new Error(`Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('DataForSEO Bing SERP MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
