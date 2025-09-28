import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ListingsTools from './tools/index.js';

export class BusinessDataListingsApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // General Tools
      new ListingsTools.BusinessDataIdListTool(this.dataForSEOClient),
      new ListingsTools.BusinessDataErrorsTool(this.dataForSEOClient),
      new ListingsTools.BusinessDataTasksReadyTool(this.dataForSEOClient),
      
      // Business Listings Tools
      new ListingsTools.BusinessDataBusinessListingsSearchTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsFiltersTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsLocationsTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsCategoriesTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsCategoriesAggregationTool(this.dataForSEOClient),
      
      // Social Media Tools
      new ListingsTools.SocialMediaPinterestLiveTool(this.dataForSEOClient),
      new ListingsTools.SocialMediaFacebookLiveTool(this.dataForSEOClient),
      new ListingsTools.SocialMediaRedditLiveTool(this.dataForSEOClient),
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
