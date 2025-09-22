import { BaseModule, ToolDefinition } from '../base.module.js';

// Google Organic Tools
import { SerpOrganicLiveAdvancedTool } from '../serp/tools/serp-organic-live-advanced.tool.js';
import { SerpOrganicLocationsListTool } from '../serp/tools/serp-organic-locations-list.tool.js';

// Google AI Mode Tools
import { SerpGoogleAiModeLanguagesTool } from '../serp/tools/serp-google-ai-mode-languages.tool.js';
import { SerpGoogleAiModeLiveAdvancedTool } from '../serp/tools/serp-google-ai-mode-live-advanced.tool.js';

// Google Maps Tools
import { SerpGoogleMapsLiveAdvancedTool } from '../serp/tools/serp-google-maps-live-advanced.tool.js';

// Google Local Finder Tools  
import { SerpGoogleLocalFinderLiveAdvancedTool } from '../serp/tools/serp-google-local-finder-live-advanced.tool.js';

// Google News Tools
import { SerpGoogleNewsLiveAdvancedTool } from '../serp/tools/serp-google-news-live-advanced.tool.js';

// Google Events Tools
import { SerpGoogleEventsLiveAdvancedTool } from '../serp/tools/serp-google-events-live-advanced.tool.js';

// Google Images Tools
import { SerpGoogleImagesLiveAdvancedTool } from '../serp/tools/serp-google-images-live-advanced.tool.js';

// Google Search by Image Tools
import { SerpGoogleSearchByImageLiveAdvancedTool } from '../serp/tools/serp-google-search-by-image-live-advanced.tool.js';

// Google Jobs Tools
import { SerpGoogleJobsLiveAdvancedTool } from '../serp/tools/serp-google-jobs-live-advanced.tool.js';

// Google Autocomplete Tools
import { SerpGoogleAutocompleteLiveAdvancedTool } from '../serp/tools/serp-google-autocomplete-live-advanced.tool.js';

// Google Dataset Search Tools
import { SerpGoogleDatasetSearchLiveAdvancedTool } from '../serp/tools/serp-google-dataset-search-live-advanced.tool.js';

// Google Dataset Info Tools
import { SerpGoogleDatasetInfoLiveAdvancedTool } from '../serp/tools/serp-google-dataset-info-live-advanced.tool.js';

// Google Ads Tools
import { SerpGoogleAdsAdvertisersLiveAdvancedTool } from '../serp/tools/serp-google-ads-advertisers-live-advanced.tool.js';
import { SerpGoogleAdsSearchLiveAdvancedTool } from '../serp/tools/serp-google-ads-search-live-advanced.tool.js';

export class SerpGoogleApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
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
