import { DataForSEOClient } from '../../client/dataforseo.client';
import { BaseModule, ToolDefinition } from '../base.module';
import { GoogleDomainCompetitorsTool } from './tools/google/competitor-research/google-domain-competitors.tool.js';
import { GoogleDomainRankOverviewTool } from './tools/google/competitor-research/google-domain-rank-overview.tool.js';
import { GoogleKeywordsIdeasTool } from './tools/google/keyword-research/google-keywords-ideas.tool.js';
import { GoogleKeywordsSuggestionsTool } from './tools/google/keyword-research/google-keywords-suggestions.tool.js';
import { GoogleRankedKeywordsTool } from './tools/google/competitor-research/google-ranked-keywords.tool.js';
import { GoogleRelatedKeywordsTool } from './tools/google/keyword-research/google-related-keywords.tool.js';
import { GoogleBulkKeywordDifficultyTool } from './tools/google/keyword-research/google-bulk-keyword-difficulty.tool.js';
import { GoogleTopSearchesTool } from './tools/google/market-analysis/google-top-searches.tool.js';
import { GoogleKeywordOverviewTool } from './tools/google/keyword-research/google-keyword-overview.tool.js';
import { GoogleKeywordsForSiteTool } from './tools/google/keyword-research/google-keywords-for-site.tool.js';
import { GoogleSubdomainsTool } from './tools/google/competitor-research/google-subdomains.js';
import { GoogleSERPCompetitorsTool } from './tools/google/competitor-research/google-serp-competitors.tool.js';
import { GoogleHistoricalSERP } from './tools/google/competitor-research/google-historical-serp.js';
import { GoogleSearchIntentTool } from './tools/google/keyword-research/google-search-intent.tool.js';
import { GoogleDomainIntersectionsTool } from './tools/google/competitor-research/google-domain-intersection.tool.js';
import { GoogleHistoricalDomainRankOverviewTool } from './tools/google/competitor-research/google-historical-domain-rank-overview.tool.js';
import { GooglePageIntersectionsTool } from './tools/google/competitor-research/google-page-intersection.tool.js';
import { DataForSeoLabsFilterTool } from './tools/labs-filters.tool.js';
import { GoogleBulkTrafficEstimationTool } from './tools/google/competitor-research/google-bulk-traffic-estimation.tool.js';
import { GoogleHistoricalKeywordDataTool } from './tools/google/keyword-research/google-historical-keyword-data.tool.js';

// New General Tools
import { DataForSeoLabsIdListTool } from './tools/general/dataforseo-labs-id-list.tool.js';
import { DataForSeoLabsStatusTool } from './tools/general/dataforseo-labs-status.tool.js';
import { DataForSeoLabsErrorsTool } from './tools/general/dataforseo-labs-errors.tool.js';
import { DataForSeoLabsAvailableFiltersTool } from './tools/general/dataforseo-labs-available-filters.tool.js';
import { DataForSeoLabsLocationsAndLanguagesTool } from './tools/general/dataforseo-labs-locations-and-languages.tool.js';
import { DataForSeoLabsCategoriesTool } from './tools/general/dataforseo-labs-categories.tool.js';

// New Google Tools
import { GoogleAvailableHistoryTool } from './tools/google/general/google-available-history.tool.js';
import { GoogleCategoriesForKeywordsLanguagesTool } from './tools/google/keyword-research/google-categories-for-keywords-languages.tool.js';
import { GoogleCategoriesForDomainTool } from './tools/google/keyword-research/google-categories-for-domain.tool.js';
import { GoogleCategoriesForKeywordsTool } from './tools/google/keyword-research/google-categories-for-keywords.tool.js';
import { GoogleKeywordsForCategoriesTool } from './tools/google/keyword-research/google-keywords-for-categories.tool.js';
import { GoogleRelevantPagesTool } from './tools/google/competitor-research/google-relevant-pages.tool.js';
import { GoogleDomainWhoisOverviewTool } from './tools/google/competitor-research/google-domain-whois-overview.tool.js';
import { GoogleDomainMetricsByCategoriesTool } from './tools/google/market-analysis/google-domain-metrics-by-categories.tool.js';

// New Amazon Tools
import { AmazonBulkSearchVolumeTool } from './tools/amazon/amazon-bulk-search-volume.tool.js';
import { AmazonRelatedKeywordsTool } from './tools/amazon/amazon-related-keywords.tool.js';
import { AmazonRankedKeywordsTool } from './tools/amazon/amazon-ranked-keywords.tool.js';
import { AmazonProductRankOverviewTool } from './tools/amazon/amazon-product-rank-overview.tool.js';

// New Bing Tools
import { BingBulkKeywordDifficultyTool } from './tools/bing/bing-bulk-keyword-difficulty.tool.js';
import { BingBulkTrafficEstimationTool } from './tools/bing/bing-bulk-traffic-estimation.tool.js';
import { BingCompetitorsDomainTool } from './tools/bing/bing-competitors-domain.tool.js';

export class DataForSEOLabsApi extends BaseModule {
  constructor(client: DataForSEOClient) {
    super(client);
  }

  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Existing Tools
      new GoogleRankedKeywordsTool(this.dataForSEOClient),
      new GoogleDomainCompetitorsTool(this.dataForSEOClient),
      new GoogleDomainRankOverviewTool(this.dataForSEOClient),
      new GoogleKeywordsIdeasTool(this.dataForSEOClient),
      new GoogleRelatedKeywordsTool(this.dataForSEOClient),
      new GoogleKeywordsSuggestionsTool(this.dataForSEOClient),
      new GoogleHistoricalSERP(this.dataForSEOClient),
      new GoogleSERPCompetitorsTool(this.dataForSEOClient),
      new GoogleBulkKeywordDifficultyTool(this.dataForSEOClient),
      new GoogleSubdomainsTool(this.dataForSEOClient),
      new GoogleKeywordOverviewTool(this.dataForSEOClient),
      new GoogleTopSearchesTool(this.dataForSEOClient),
      new GoogleSearchIntentTool(this.dataForSEOClient),
      new GoogleKeywordsForSiteTool(this.dataForSEOClient),
      new GoogleDomainIntersectionsTool(this.dataForSEOClient),
      new GoogleHistoricalDomainRankOverviewTool(this.dataForSEOClient),
      new GooglePageIntersectionsTool(this.dataForSEOClient),
      new GoogleBulkTrafficEstimationTool(this.dataForSEOClient),
      new DataForSeoLabsFilterTool(this.dataForSEOClient),
      new GoogleHistoricalKeywordDataTool(this.dataForSEOClient),
      
      // New General Tools
      new DataForSeoLabsIdListTool(this.dataForSEOClient),
      new DataForSeoLabsStatusTool(this.dataForSEOClient),
      new DataForSeoLabsErrorsTool(this.dataForSEOClient),
      new DataForSeoLabsAvailableFiltersTool(this.dataForSEOClient),
      new DataForSeoLabsLocationsAndLanguagesTool(this.dataForSEOClient),
      new DataForSeoLabsCategoriesTool(this.dataForSEOClient),
      
      // New Google Tools
      new GoogleAvailableHistoryTool(this.dataForSEOClient),
      new GoogleCategoriesForKeywordsLanguagesTool(this.dataForSEOClient),
      new GoogleCategoriesForDomainTool(this.dataForSEOClient),
      new GoogleCategoriesForKeywordsTool(this.dataForSEOClient),
      new GoogleKeywordsForCategoriesTool(this.dataForSEOClient),
      new GoogleRelevantPagesTool(this.dataForSEOClient),
      new GoogleDomainWhoisOverviewTool(this.dataForSEOClient),
      new GoogleDomainMetricsByCategoriesTool(this.dataForSEOClient),
      
      // New Amazon Tools
      new AmazonBulkSearchVolumeTool(this.dataForSEOClient),
      new AmazonRelatedKeywordsTool(this.dataForSEOClient),
      new AmazonRankedKeywordsTool(this.dataForSEOClient),
      new AmazonProductRankOverviewTool(this.dataForSEOClient),
      
      // New Bing Tools
      new BingBulkKeywordDifficultyTool(this.dataForSEOClient),
      new BingBulkTrafficEstimationTool(this.dataForSEOClient),
      new BingCompetitorsDomainTool(this.dataForSEOClient),
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