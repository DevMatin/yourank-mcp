import { BaseModule } from '../base.module.js';
import * as KeywordsDataTools from './tools/index.js';

export class KeywordsDataApiModule extends BaseModule {
  getTools() {
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
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTool(this.dataForSEOClient),

      // Google Ads Task-based Tools
      new KeywordsDataTools.GoogleAdsSearchVolumeTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsSearchVolumeTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsSearchVolumeTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForSiteTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsKeywordsForKeywordsTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleAdsAdTrafficByKeywordsTaskGetTool(this.dataForSEOClient),

      // Google Trends Tools
      new KeywordsDataTools.GoogleTrendsCategoriesTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsExploreTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsLocationsTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsLanguagesTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsExploreTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsExploreTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.GoogleTrendsExploreTaskGetTool(this.dataForSEOClient),

      // DataForSEO Trends Tools
      new KeywordsDataTools.DataForSeoTrendsDemographyTool(this.dataForSEOClient),
      new KeywordsDataTools.DataForSeoTrendsExploreTool(this.dataForSEOClient),
      new KeywordsDataTools.DataForSeoTrendsSubregionInterestsTool(this.dataForSEOClient),
      new KeywordsDataTools.DataForSeoTrendsLocationsTool(this.dataForSEOClient),
      new KeywordsDataTools.DataForSeoTrendsMergedDataTool(this.dataForSEOClient),

      // Bing Tools
      new KeywordsDataTools.BingLocationsTool(this.dataForSEOClient),
      new KeywordsDataTools.BingLanguagesTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForSiteTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForSiteTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForSiteTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForSiteTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForKeywordsTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForKeywordsTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForKeywordsTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordsForKeywordsTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordPerformanceLocationsAndLanguagesTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordPerformanceTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordPerformanceTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordPerformanceTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.BingKeywordPerformanceTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeHistoryLocationsAndLanguagesTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeHistoryTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeHistoryTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeHistoryTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.BingSearchVolumeHistoryTaskGetTool(this.dataForSEOClient),
      new KeywordsDataTools.BingAudienceEstimationJobFunctionsTool(this.dataForSEOClient),
      new KeywordsDataTools.BingAudienceEstimationIndustriesTool(this.dataForSEOClient),
      new KeywordsDataTools.BingAudienceEstimationTool(this.dataForSEOClient),
      new KeywordsDataTools.BingAudienceEstimationTaskPostTool(this.dataForSEOClient),
      new KeywordsDataTools.BingAudienceEstimationTasksReadyTool(this.dataForSEOClient),
      new KeywordsDataTools.BingAudienceEstimationTaskGetTool(this.dataForSEOClient),

      // Clickstream Data Tools
      new KeywordsDataTools.ClickstreamDataLocationsAndLanguagesTool(this.dataForSEOClient),
      new KeywordsDataTools.ClickstreamDataDataforseoSearchVolumeLiveTool(this.dataForSEOClient),
      new KeywordsDataTools.ClickstreamDataGlobalSearchVolumeLiveTool(this.dataForSEOClient),
      new KeywordsDataTools.ClickstreamDataBulkSearchVolumeLiveTool(this.dataForSEOClient),
    ];

    return tools.reduce((acc, tool) => ({
      ...acc,
      [tool.getName()]: {
        description: tool.getDescription(),
        params: tool.getParams(),
        handler: (params) => tool.handle(params),
      },
    }), {});
  }
}
