import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ApiTools from './tools/index.js';

export class BusinessUtilitiesApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // General Tools
      new ApiTools.BusinessDataIdListTool(this.dataForSEOClient),
      new ApiTools.BusinessDataErrorsTool(this.dataForSEOClient),
      
      // Google Tools
      new ApiTools.GoogleHotelSearchesLiveTool(this.dataForSEOClient),
      new ApiTools.GoogleHotelInfoLiveAdvancedTool(this.dataForSEOClient),
      new ApiTools.GoogleReviewsLiveTool(this.dataForSEOClient),
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
