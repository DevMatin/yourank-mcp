import { BaseModule, ToolDefinition } from '../base.module';
import * as KeywordsDataTools from './tools/index';

// Import barrel exports for better organization
import * as GoogleAdsTools from './tools/google-ads/index';
import * as BingTools from './tools/bing/index';
import * as GoogleTrendsTools from './tools/google-trends/index';
import * as ClickstreamTools from './tools/clickstream/index';
import * as DataForSeoTrendsTools from './tools/dataforseo-trends/index';

// Interface for tool instances to ensure they have the required methods
interface ToolInstance {
  getName(): string;
  getDescription(): string;
  getParams(): any;
  handle(params: any): Promise<any>;
}

export class KeywordsDataApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Erstelle Instanzen aller verfügbaren Keywords Data Tools
    const tools: ToolInstance[] = [
      // Core Keywords Data Tools
      new KeywordsDataTools.KeywordsDataIdListTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.KeywordsDataErrorsTool(this.dataForSEOClient) as ToolInstance,

      // Google Ads Tools
      new KeywordsDataTools.GoogleAdsSearchVolumeTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsSearchVolumeLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsStatusTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsLocationsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsLanguagesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForSiteLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsLiveTool(this.dataForSEOClient) as ToolInstance,

      // Google Ads Task-based Tools
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsSearchVolumeTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsSearchVolumeTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsSearchVolumeTaskGetTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTaskGetTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTaskGetTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTaskGetTool(this.dataForSEOClient) as ToolInstance,

      // Google Trends Tools
      new KeywordsDataTools.GoogleTrendsCategoriesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleTrendsExploreTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleTrendsExploreLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleTrendsLocationsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleTrendsLanguagesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleTrendsExploreTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleTrendsExploreTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.GoogleTrendsExploreTaskGetTool(this.dataForSEOClient) as ToolInstance,

      // DataForSEO Trends Tools
      new KeywordsDataTools.DataForSeoTrendsDemographyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.DataForSeoTrendsExploreTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.DataForSeoTrendsSubregionInterestsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.DataForSeoTrendsLocationsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.DataForSeoTrendsMergedDataTool(this.dataForSEOClient) as ToolInstance,

      // Bing Tools
      new KeywordsDataTools.BingLocationsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingLanguagesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeTaskGetTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForSiteTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForSiteLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForSiteTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForSiteTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForSiteTaskGetTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForKeywordsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForKeywordsLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForKeywordsTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForKeywordsTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordsForKeywordsTaskGetTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordPerformanceLocationsAndLanguagesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordPerformanceTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordPerformanceTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordPerformanceTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingKeywordPerformanceTaskGetTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeHistoryLocationsAndLanguagesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeHistoryTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeHistoryTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeHistoryTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingSearchVolumeHistoryTaskGetTool(this.dataForSEOClient) as ToolInstance,
      
      // Bing Audience Estimation Tools
      new KeywordsDataTools.BingAudienceEstimationJobFunctionsTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingAudienceEstimationIndustriesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingAudienceEstimationTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingAudienceEstimationTaskPostTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingAudienceEstimationTasksReadyTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.BingAudienceEstimationTaskGetTool(this.dataForSEOClient) as ToolInstance,
      
      // Clickstream Data Tools
      new KeywordsDataTools.ClickstreamDataLocationsAndLanguagesTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.ClickstreamDataDataForSEOSearchVolumeLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.ClickstreamDataGlobalSearchVolumeLiveTool(this.dataForSEOClient) as ToolInstance,
      new KeywordsDataTools.ClickstreamDataBulkSearchVolumeLiveTool(this.dataForSEOClient) as ToolInstance,
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