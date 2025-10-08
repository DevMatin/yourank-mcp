import { BaseModule, ToolDefinition } from '../base.module.js';

// Import all Keywords Data tools using barrel exports
import * as GeneralTools from './tools/general/index.js';
import * as GoogleAdsTools from './tools/google-ads/index.js';
import * as BingTools from './tools/bing/index.js';
import * as GoogleTrendsTools from './tools/google-trends/index.js';
import * as ClickstreamTools from './tools/clickstream/index.js';
import * as DataForSeoTrendsTools from './tools/dataforseo-trends/index.js';


export class KeywordsDataApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // General Keywords Data Tools
      new GeneralTools.KeywordsDataIdListTool(this.dataForSEOClient),
      new GeneralTools.KeywordsDataErrorsTool(this.dataForSEOClient),

      // Google Ads Tools
      new GoogleAdsTools.GoogleAdsSearchVolumeTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsSearchVolumeLiveTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsStatusTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsLocationsTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsLanguagesTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForSiteTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForSiteLiveTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForKeywordsTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForKeywordsLiveTool(this.dataForSEOClient),

      // Google Ads Task-based Tools
      new GoogleAdsTools.GoogleAdsAdTrafficByKeywordsTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsSearchVolumeTaskPostTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsSearchVolumeTasksReadyTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsSearchVolumeTaskGetTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForSiteTaskPostTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForSiteTasksReadyTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForSiteTaskGetTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForKeywordsTaskPostTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForKeywordsTasksReadyTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsKeywordsForKeywordsTaskGetTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsAdTrafficByKeywordsTaskPostTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsAdTrafficByKeywordsTasksReadyTool(this.dataForSEOClient),
      new GoogleAdsTools.GoogleAdsAdTrafficByKeywordsTaskGetTool(this.dataForSEOClient),

      // Google Trends Tools
      new GoogleTrendsTools.GoogleTrendsCategoriesTool(this.dataForSEOClient),
      new GoogleTrendsTools.GoogleTrendsExploreTool(this.dataForSEOClient),
      new GoogleTrendsTools.GoogleTrendsExploreLiveTool(this.dataForSEOClient),
      new GoogleTrendsTools.GoogleTrendsLocationsTool(this.dataForSEOClient),
      new GoogleTrendsTools.GoogleTrendsLanguagesTool(this.dataForSEOClient),
      new GoogleTrendsTools.GoogleTrendsExploreTaskPostTool(this.dataForSEOClient),
      new GoogleTrendsTools.GoogleTrendsExploreTasksReadyTool(this.dataForSEOClient),
      new GoogleTrendsTools.GoogleTrendsExploreTaskGetTool(this.dataForSEOClient),

      // DataForSEO Trends Tools
      new DataForSeoTrendsTools.DataForSeoTrendsDemographyTool(this.dataForSEOClient),
      new DataForSeoTrendsTools.DataForSeoTrendsExploreTool(this.dataForSEOClient),
      new DataForSeoTrendsTools.DataForSeoTrendsSubregionInterestsTool(this.dataForSEOClient),
      new DataForSeoTrendsTools.DataForSeoTrendsLocationsTool(this.dataForSEOClient),
      new DataForSeoTrendsTools.DataForSeoTrendsMergedDataTool(this.dataForSEOClient),

      // Bing Tools
      new BingTools.BingLocationsTool(this.dataForSEOClient),
      new BingTools.BingLanguagesTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeLiveTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeTaskPostTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeTasksReadyTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeTaskGetTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForSiteTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForSiteLiveTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForSiteTaskPostTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForSiteTasksReadyTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForSiteTaskGetTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForKeywordsTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForKeywordsLiveTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForKeywordsTaskPostTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForKeywordsTasksReadyTool(this.dataForSEOClient),
      new BingTools.BingKeywordsForKeywordsTaskGetTool(this.dataForSEOClient),
      new BingTools.BingKeywordPerformanceLocationsAndLanguagesTool(this.dataForSEOClient),
      new BingTools.BingKeywordPerformanceTool(this.dataForSEOClient),
      new BingTools.BingKeywordPerformanceTaskPostTool(this.dataForSEOClient),
      new BingTools.BingKeywordPerformanceTasksReadyTool(this.dataForSEOClient),
      new BingTools.BingKeywordPerformanceTaskGetTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeHistoryLocationsAndLanguagesTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeHistoryTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeHistoryTaskPostTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeHistoryTasksReadyTool(this.dataForSEOClient),
      new BingTools.BingSearchVolumeHistoryTaskGetTool(this.dataForSEOClient),
      
      // Bing Audience Estimation Tools
      new BingTools.BingAudienceEstimationJobFunctionsTool(this.dataForSEOClient),
      new BingTools.BingAudienceEstimationIndustriesTool(this.dataForSEOClient),
      new BingTools.BingAudienceEstimationTool(this.dataForSEOClient),
      new BingTools.BingAudienceEstimationTaskPostTool(this.dataForSEOClient),
      new BingTools.BingAudienceEstimationTasksReadyTool(this.dataForSEOClient),
      new BingTools.BingAudienceEstimationTaskGetTool(this.dataForSEOClient),
      new BingTools.BingAudienceEstimationLiveTool(this.dataForSEOClient),
      
      // Clickstream Data Tools
      new ClickstreamTools.ClickstreamDataLocationsAndLanguagesTool(this.dataForSEOClient),
      new ClickstreamTools.ClickstreamDataDataForSEOSearchVolumeLiveTool(this.dataForSEOClient),
      new ClickstreamTools.ClickstreamDataGlobalSearchVolumeLiveTool(this.dataForSEOClient),
      new ClickstreamTools.ClickstreamDataBulkSearchVolumeLiveTool(this.dataForSEOClient),
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