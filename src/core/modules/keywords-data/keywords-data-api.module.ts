import { BaseModule, ToolDefinition } from '../base.module.js';
import * as KeywordsDataTools from './tools/index.js';

export class KeywordsDataApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Erstelle Instanzen aller verfügbaren Keywords Data Tools
    const tools = [
      // Core Keywords Data Tools
      new KeywordsDataTools.KeywordsDataIdListTool(this.dataForSEOClient),
      new KeywordsDataTools.KeywordsDataErrorsTool(this.dataForSEOClient),

      // Google Ads Tools
      new KeywordsDataTools.GoogleAdsSearchVolumeTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsStatusTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsLocationsTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsLanguagesTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTool(this.dataForSEOClient),

      // Google Ads Task-based Tools
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsSearchVolumeTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsSearchVolumeTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsSearchVolumeTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTaskGetTool(this.dataForSEOClient),

      // Google Trends Tools
      new KeywordsDataTools.GoogleTrendsCategoriesTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsExploreTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsLocationsTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsLanguagesTool(this.dataForSEOClient),

      // DataForSEO Trends Tools
      new KeywordsDataTools.DataForSeoTrendsDemographyTool(this.dataForSEOClient),
      new KeywordsDataTools.DataForSeoTrendsExploreTool(this.dataForSEOClient),
      new KeywordsDataTools.DataForSeoTrendsSubregionInterestsTool(this.dataForSEOClient),
      new KeywordsDataTools.DataForSeoTrendsLocationsTool(this.dataForSEOClient),

      // Bing Tools
      new KeywordsDataTools.BingLocationsTool(this.dataForSEOClient),
      new KeywordsDataTools.BingLanguagesTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeTool(this.dataForSEOClient),
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