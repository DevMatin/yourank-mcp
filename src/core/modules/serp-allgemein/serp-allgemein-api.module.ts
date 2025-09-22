import { BaseModule, ToolDefinition } from '../base.module.js';

// General SERP Tools
import { SerpIdListTool } from '../serp/tools/serp-id-list.tool.js';
import { SerpErrorsTool } from '../serp/tools/serp-errors.tool.js';
import { SerpScreenshotTool } from '../serp/tools/serp-screenshot.tool.js';
import { SerpAiSummaryTool } from '../serp/tools/serp-ai-summary.tool.js';

export class SerpAllgemeinApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // General SERP Tools
      new SerpIdListTool(this.dataForSEOClient),
      new SerpErrorsTool(this.dataForSEOClient),
      new SerpScreenshotTool(this.dataForSEOClient),
      new SerpAiSummaryTool(this.dataForSEOClient),
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
