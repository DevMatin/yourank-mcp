import { BaseModule, ToolDefinition } from '../base.module.js';
import { z } from 'zod';

// Google Organic Tools
import { SerpOrganicLiveAdvancedTool } from './tools/serp-organic-live-advanced.tool.ts';
import { SerpOrganicLocationsListTool } from './tools/serp-organic-locations-list.tool.ts';
import { SerpGoogleOrganicTaskPostTool } from './tools/serp-google-organic-task-post.tool.ts';
import { SerpGoogleOrganicTasksReadyTool } from './tools/serp-google-organic-tasks-ready.tool.ts';
import { SerpGoogleOrganicTaskGetAdvancedTool } from './tools/serp-google-organic-task-get-advanced.tool.ts';
import { SerpGoogleOrganicTaskGetRegularTool } from './tools/serp-google-organic-task-get-regular.tool.ts';
import { SerpGoogleOrganicTaskGetHtmlTool } from './tools/serp-google-organic-task-get-html.tool.ts';
import { SerpGoogleOrganicLiveHtmlTool } from './tools/serp-google-organic-live-html.tool.ts';
import { SerpGoogleOrganicLiveRegularTool } from './tools/serp-google-organic-live-regular.tool.ts';

// Google AI Mode Tools
import { SerpGoogleAiModeLanguagesTool } from './tools/serp-google-ai-mode-languages.tool.ts';
import { SerpGoogleAiModeLiveAdvancedTool } from './tools/serp-google-ai-mode-live-advanced.tool.ts';

// Google Languages Tool
import { SerpGoogleLanguagesTool } from './tools/serp-google-languages.tool.ts';

// Google Maps Tools
import { SerpGoogleMapsLiveAdvancedTool } from './tools/serp-google-maps-live-advanced.tool.ts';

// Google Local Finder Tools
import { SerpGoogleLocalFinderLiveAdvancedTool } from './tools/serp-google-local-finder-live-advanced.tool.ts';

// Google News Tools
import { SerpGoogleNewsLiveAdvancedTool } from './tools/serp-google-news-live-advanced.tool.ts';

// Google Events Tools
import { SerpGoogleEventsLiveAdvancedTool } from './tools/serp-google-events-live-advanced.tool.ts';

// Google Images Tools
import { SerpGoogleImagesLiveAdvancedTool } from './tools/serp-google-images-live-advanced.tool.ts';

// Google Search by Image Tools
import { SerpGoogleSearchByImageLiveAdvancedTool } from './tools/serp-google-search-by-image-live-advanced.tool.ts';

// Google Jobs Tools
import { SerpGoogleJobsLiveAdvancedTool } from './tools/serp-google-jobs-live-advanced.tool.ts';

// Google Autocomplete Tools
import { SerpGoogleAutocompleteLiveAdvancedTool } from './tools/serp-google-autocomplete-live-advanced.tool.ts';

// Google Dataset Search Tools
import { SerpGoogleDatasetSearchLiveAdvancedTool } from './tools/serp-google-dataset-search-live-advanced.tool.ts';

// Google Dataset Info Tools
import { SerpGoogleDatasetInfoLiveAdvancedTool } from './tools/serp-google-dataset-info-live-advanced.tool.ts';

// Google Ads Tools
import { SerpGoogleAdsAdvertisersLiveAdvancedTool } from './tools/serp-google-ads-advertisers-live-advanced.tool.ts';
import { SerpGoogleAdsSearchLiveAdvancedTool } from './tools/serp-google-ads-search-live-advanced.tool.ts';

// Bing Tools
import { SerpBingOrganicLiveAdvancedTool } from './tools/serp-bing-organic-live-advanced.tool.ts';
import { SerpBingLocalPackLiveAdvancedTool } from './tools/serp-bing-local-pack-live-advanced.tool.ts';
import { SerpBingLocationsTool } from './tools/serp-bing-locations.tool.ts';
import { SerpBingLanguagesTool } from './tools/serp-bing-languages.tool.ts';

// YouTube Tools
import { SerpYoutubeLocationsListTool } from './tools/serp-youtube-locations-list.tool.ts';
import { SerpYoutubeOrganicLiveAdvancedTool } from './tools/serp-youtube-organic-live-advanced.tool.ts';
import { SerpYoutubeVideoInfoLiveAdvancedTool } from './tools/serp-youtube-video-info-live-advanced.tool.ts';
import { SerpYoutubeVideoCommentsLiveAdvancedTool } from './tools/serp-youtube-video-comments-live-advanced-tool.ts';
import { SerpYoutubeVideoSubtitlesLiveAdvancedTool } from './tools/serp-youtube-video-subtitles-live-advanced-tool.ts';

// Yahoo Tools
import { SerpYahooOrganicLiveAdvancedTool } from './tools/serp-yahoo-organic-live-advanced.tool.ts';

// General SERP Tools
import { SerpIdListTool } from './tools/serp-id-list.tool.ts';
import { SerpErrorsTool } from './tools/serp-errors.tool.ts';
import { SerpScreenshotTool } from './tools/serp-screenshot.tool.ts';
import { SerpAiSummaryTool } from './tools/serp-ai-summary.tool.ts';

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
      new SerpGoogleOrganicTaskPostTool(this.dataForSEOClient),
      new SerpGoogleOrganicTasksReadyTool(this.dataForSEOClient),
      new SerpGoogleOrganicTaskGetAdvancedTool(this.dataForSEOClient),
      new SerpGoogleOrganicTaskGetRegularTool(this.dataForSEOClient),
      new SerpGoogleOrganicTaskGetHtmlTool(this.dataForSEOClient),
      new SerpGoogleOrganicLiveHtmlTool(this.dataForSEOClient),
      new SerpGoogleOrganicLiveRegularTool(this.dataForSEOClient),

      // Google AI Mode Tools
      new SerpGoogleAiModeLanguagesTool(this.dataForSEOClient),
      new SerpGoogleAiModeLiveAdvancedTool(this.dataForSEOClient),

      // Google Languages Tool
      new SerpGoogleLanguagesTool(this.dataForSEOClient),

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
      new SerpBingLocationsTool(this.dataForSEOClient),
      new SerpBingLanguagesTool(this.dataForSEOClient),

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