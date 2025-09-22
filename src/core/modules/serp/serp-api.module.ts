import { BaseModule, ToolDefinition } from '../base.module.js';
import { z } from 'zod';

// Google Organic Tools
import { SerpOrganicLiveAdvancedTool } from './tools/serp-organic-live-advanced.tool.js';
import { SerpOrganicLocationsListTool } from './tools/serp-organic-locations-list.tool.js';

// Google AI Mode Tools
import { SerpGoogleAiModeLanguagesTool } from './tools/serp-google-ai-mode-languages.tool.js';
import { SerpGoogleAiModeLiveAdvancedTool } from './tools/serp-google-ai-mode-live-advanced.tool.js';

// Google Maps Tools
import { SerpGoogleMapsLiveAdvancedTool } from './tools/serp-google-maps-live-advanced.tool.js';

// Google Local Finder Tools
import { SerpGoogleLocalFinderLiveAdvancedTool } from './tools/serp-google-local-finder-live-advanced.tool.js';

// Google News Tools
import { SerpGoogleNewsLiveAdvancedTool } from './tools/serp-google-news-live-advanced.tool.js';

// Google Events Tools
import { SerpGoogleEventsLiveAdvancedTool } from './tools/serp-google-events-live-advanced.tool.js';

// Google Images Tools
import { SerpGoogleImagesLiveAdvancedTool } from './tools/serp-google-images-live-advanced.tool.js';

// Google Search by Image Tools
import { SerpGoogleSearchByImageLiveAdvancedTool } from './tools/serp-google-search-by-image-live-advanced.tool.js';

// Google Jobs Tools
import { SerpGoogleJobsLiveAdvancedTool } from './tools/serp-google-jobs-live-advanced.tool.js';

// Google Autocomplete Tools
import { SerpGoogleAutocompleteLiveAdvancedTool } from './tools/serp-google-autocomplete-live-advanced.tool.js';

// Google Dataset Search Tools
import { SerpGoogleDatasetSearchLiveAdvancedTool } from './tools/serp-google-dataset-search-live-advanced.tool.js';

// Google Dataset Info Tools
import { SerpGoogleDatasetInfoLiveAdvancedTool } from './tools/serp-google-dataset-info-live-advanced.tool.js';

// Google Ads Tools
import { SerpGoogleAdsAdvertisersLiveAdvancedTool } from './tools/serp-google-ads-advertisers-live-advanced.tool.js';
import { SerpGoogleAdsSearchLiveAdvancedTool } from './tools/serp-google-ads-search-live-advanced.tool.js';

// Bing Tools
import { SerpBingOrganicLiveAdvancedTool } from './tools/serp-bing-organic-live-advanced.tool.js';
import { SerpBingLocalPackLiveAdvancedTool } from './tools/serp-bing-local-pack-live-advanced.tool.js';

// YouTube Tools
import { SerpYoutubeLocationsListTool } from './tools/serp-youtube-locations-list.tool.js';
import { SerpYoutubeOrganicLiveAdvancedTool } from './tools/serp-youtube-organic-live-advanced.tool.js';
import { SerpYoutubeVideoInfoLiveAdvancedTool } from './tools/serp-youtube-video-info-live-advanced.tool.js';
import { SerpYoutubeVideoCommentsLiveAdvancedTool } from './tools/serp-youtube-video-comments-live-advanced-tool.js';
import { SerpYoutubeVideoSubtitlesLiveAdvancedTool } from './tools/serp-youtube-video-subtitles-live-advanced-tool.js';

// Yahoo Tools
import { SerpYahooOrganicLiveAdvancedTool } from './tools/serp-yahoo-organic-live-advanced.tool.js';

// General SERP Tools
import { SerpIdListTool } from './tools/serp-id-list.tool.js';
import { SerpErrorsTool } from './tools/serp-errors.tool.js';
import { SerpScreenshotTool } from './tools/serp-screenshot.tool.js';
import { SerpAiSummaryTool } from './tools/serp-ai-summary.tool.js';

export class SerpApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // General SERP Tools
      new SerpIdListTool(this.dataForSEOClient),
      new SerpErrorsTool(this.dataForSEOClient),
      new SerpScreenshotTool(this.dataForSEOClient),
      new SerpAiSummaryTool(this.dataForSEOClient),

      // Google Organic Tools
      new SerpOrganicLiveAdvancedTool(this.dataForSEOClient),
      new SerpOrganicLocationsListTool(this.dataForSEOClient),

      // Google AI Mode Tools
      new SerpGoogleAiModeLanguagesTool(this.dataForSEOClient),
      new SerpGoogleAiModeLiveAdvancedTool(this.dataForSEOClient),

      // Google Maps Tools
      new SerpGoogleMapsLiveAdvancedTool(this.dataForSEOClient),

      // Google Local Finder Tools
      new SerpGoogleLocalFinderLiveAdvancedTool(this.dataForSEOClient),

      // Google News Tools
      new SerpGoogleNewsLiveAdvancedTool(this.dataForSEOClient),

      // Google Events Tools
      new SerpGoogleEventsLiveAdvancedTool(this.dataForSEOClient),

      // Google Images Tools
      new SerpGoogleImagesLiveAdvancedTool(this.dataForSEOClient),

      // Google Search by Image Tools
      new SerpGoogleSearchByImageLiveAdvancedTool(this.dataForSEOClient),

      // Google Jobs Tools
      new SerpGoogleJobsLiveAdvancedTool(this.dataForSEOClient),

      // Google Autocomplete Tools
      new SerpGoogleAutocompleteLiveAdvancedTool(this.dataForSEOClient),

      // Google Dataset Search Tools
      new SerpGoogleDatasetSearchLiveAdvancedTool(this.dataForSEOClient),

      // Google Dataset Info Tools
      new SerpGoogleDatasetInfoLiveAdvancedTool(this.dataForSEOClient),

      // Google Ads Tools
      new SerpGoogleAdsAdvertisersLiveAdvancedTool(this.dataForSEOClient),
      new SerpGoogleAdsSearchLiveAdvancedTool(this.dataForSEOClient),

      // Bing Tools
      new SerpBingOrganicLiveAdvancedTool(this.dataForSEOClient),
      new SerpBingLocalPackLiveAdvancedTool(this.dataForSEOClient),

      // YouTube Tools
      new SerpYoutubeLocationsListTool(this.dataForSEOClient),
      new SerpYoutubeOrganicLiveAdvancedTool(this.dataForSEOClient),
      new SerpYoutubeVideoInfoLiveAdvancedTool(this.dataForSEOClient),
      new SerpYoutubeVideoCommentsLiveAdvancedTool(this.dataForSEOClient),
      new SerpYoutubeVideoSubtitlesLiveAdvancedTool(this.dataForSEOClient),

      // Yahoo Tools
      new SerpYahooOrganicLiveAdvancedTool(this.dataForSEOClient),
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