import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ApiTools from './tools/index.js';

export class GoogleMapsApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      new ApiTools.BusinessDataBusinessListingsSearchTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsFiltersTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsLocationsTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsCategoriesTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsCategoriesAggregationTool(this.dataForSEOClient),
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
