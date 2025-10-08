import { BaseModule, ToolDefinition } from '../base.module.js';
import { z } from 'zod';

// Import all SERP tools using barrel exports
import * as GeneralTools from './tools/general/index.js';
import * as GoogleTools from './tools/google/index.js';
import * as BingTools from './tools/bing/index.js';

export class SerpApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // General SERP Tools
      new GeneralTools.SerpIdListTool(this.dataForSEOClient),
      new GeneralTools.SerpErrorsTool(this.dataForSEOClient),
      new GeneralTools.SerpScreenshotTool(this.dataForSEOClient),
      new GeneralTools.SerpAiSummaryTool(this.dataForSEOClient),
      new GeneralTools.SerpTasksReadyTool(this.dataForSEOClient),

      // Google Organic Tools
      new GoogleTools.SerpOrganicLiveAdvancedTool(this.dataForSEOClient),
      new GoogleTools.SerpOrganicLocationsListTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleOrganicTaskPostTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleOrganicTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleOrganicTaskGetAdvancedTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleOrganicTaskGetRegularTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleOrganicTaskGetHtmlTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleOrganicLiveHtmlTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleOrganicLiveRegularTool(this.dataForSEOClient),
      new GoogleTools.GoogleOrganicTasksFixedTool(this.dataForSEOClient),

      // Google AI Mode Tools
      new GoogleTools.SerpGoogleAiModeLanguagesTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleAiModeLiveAdvancedTool(this.dataForSEOClient),
      new GoogleTools.GoogleAiModeTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleAiModeTasksReadyTool(this.dataForSEOClient),

      // Google Languages Tool
      new GoogleTools.SerpGoogleLanguagesTool(this.dataForSEOClient),

      // Google Locations Tools
      new GoogleTools.SerpGoogleLocationsTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleLocationsCountryTool(this.dataForSEOClient),

      // Google Maps Tools
      new GoogleTools.SerpGoogleMapsLiveAdvancedTool(this.dataForSEOClient),

      // Google Local Finder Tools
      new GoogleTools.SerpGoogleLocalFinderLiveAdvancedTool(this.dataForSEOClient),

      // Google News Tools
      new GoogleTools.SerpGoogleNewsLiveAdvancedTool(this.dataForSEOClient),

      // Google Events Tools
      new GoogleTools.SerpGoogleEventsLiveAdvancedTool(this.dataForSEOClient),

      // Google Images Tools
      new GoogleTools.SerpGoogleImagesLiveAdvancedTool(this.dataForSEOClient),

      // Google Search by Image Tools
      new GoogleTools.SerpGoogleSearchByImageLiveAdvancedTool(this.dataForSEOClient),

      // Google Jobs Tools
      new GoogleTools.SerpGoogleJobsLiveAdvancedTool(this.dataForSEOClient),

      // Google Autocomplete Tools
      new GoogleTools.SerpGoogleAutocompleteLiveAdvancedTool(this.dataForSEOClient),

      // Google Dataset Search Tools
      new GoogleTools.SerpGoogleDatasetSearchLiveAdvancedTool(this.dataForSEOClient),

      // Google Dataset Info Tools
      new GoogleTools.SerpGoogleDatasetInfoLiveAdvancedTool(this.dataForSEOClient),

      // Google Ads Tools
      new GoogleTools.SerpGoogleAdsAdvertisersLiveAdvancedTool(this.dataForSEOClient),
      new GoogleTools.SerpGoogleAdsSearchLiveAdvancedTool(this.dataForSEOClient),

      // Bing Organic Tools
      new BingTools.SerpBingOrganicLiveAdvancedTool(this.dataForSEOClient),
      new BingTools.BingOrganicTaskPostTool(this.dataForSEOClient),
      new BingTools.BingOrganicTasksReadyTool(this.dataForSEOClient),

      // Bing Local Pack Tools
      new BingTools.SerpBingLocalPackLiveAdvancedTool(this.dataForSEOClient),

      // Bing Locations Tools
      new BingTools.SerpBingLocationsTool(this.dataForSEOClient),
      new BingTools.SerpBingLocationsCountryTool(this.dataForSEOClient),

      // Bing Languages Tool
      new BingTools.SerpBingLanguagesTool(this.dataForSEOClient),
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