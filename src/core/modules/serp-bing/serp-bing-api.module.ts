import { BaseModule, ToolDefinition } from '../base.module.js';

// Bing Tools
import { SerpBingOrganicLiveAdvancedTool } from '../serp/tools/serp-bing-organic-live-advanced.tool.js';
import { SerpBingLocalPackLiveAdvancedTool } from '../serp/tools/serp-bing-local-pack-live-advanced.tool.js';

export class SerpBingApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Bing Organic Tools
      new SerpBingOrganicLiveAdvancedTool(this.dataForSEOClient),
      
      // Bing Local Pack Tools
      new SerpBingLocalPackLiveAdvancedTool(this.dataForSEOClient),
    ];

    return tools.reduce((acc, tool) => ({
      ...acc,
      [tool.getName()]: {
        description: tool.getDescription(),
        params: tool.getParams(),
        handler: (params: any) => tool.handle(params),
      },
    }), {});
  }
}
