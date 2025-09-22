import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ApiTools from './tools/index.js';

export class TripadvisorApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Tripadvisor Tools
      new ApiTools.TripadvisorLocationsTool(this.dataForSEOClient),
      new ApiTools.TripadvisorLocationsCountryTool(this.dataForSEOClient),
      new ApiTools.TripadvisorLanguagesTool(this.dataForSEOClient),
      new ApiTools.TripadvisorSearchLiveTool(this.dataForSEOClient),
      new ApiTools.TripadvisorReviewsLiveTool(this.dataForSEOClient),
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
