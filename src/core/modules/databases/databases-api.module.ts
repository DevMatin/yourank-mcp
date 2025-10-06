import { BaseModule, ToolDefinition } from '../base.module.js';
import { z } from 'zod';

// Google Databases Tools
import { DatabasesGoogleSerpsAdvancedTool } from './tools/google/serps-advanced.tool.js';
import { DatabasesGoogleSerpsRegularTool } from './tools/google/serps-regular.tool.js';
import { DatabasesGoogleKeywordsTool } from './tools/google/keywords-database.tool.js';
import { DatabasesGoogleUnifiedSearchTool } from './tools/google/unified-search.tool.js';

// Google Historical Databases Tools
import { DatabasesGoogleHistoricalSerpsTool } from './tools/google-historical/serps-historical.tool.js';
import { DatabasesGoogleHistoricalKeywordsTool } from './tools/google-historical/keywords-historical.tool.js';
import { DatabasesGoogleHistoricalUnifiedSearchTool } from './tools/google-historical/unified-search-historical.tool.js';

// Bing Databases Tools
import { DatabasesBingSerpsTool } from './tools/bing/serps-database.tool.js';
import { DatabasesBingKeywordsTool } from './tools/bing/keywords-database.tool.js';
import { DatabasesBingUnifiedSearchTool } from './tools/bing/unified-search.tool.js';

// Amazon Databases Tools
import { DatabasesAmazonProductsTool } from './tools/amazon/products-database.tool.js';

// Google Play Databases Tools
import { DatabasesGooglePlaySerpsTool } from './tools/google-play/serps-database.tool.js';
import { DatabasesGooglePlayListingsTool } from './tools/google-play/listings-database.tool.js';

// App Store Databases Tools
import { DatabasesAppStoreSerpsTool } from './tools/app-store/serps-database.tool.js';
import { DatabasesAppStoreListingsTool } from './tools/app-store/listings-database.tool.js';

// Backlinks Databases Tools
import { DatabasesBacklinkSummaryTool } from './tools/backlinks/backlink-summary.tool.js';

// Business Listings Databases Tools
import { DatabasesBusinessListingsTool } from './tools/business-listings/business-listings.tool.js';

// Whois Databases Tools
import { DatabasesWhoisDomainsTool } from './tools/whois/whois-domains.tool.js';

export class DatabasesApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Google Databases Tools
      new DatabasesGoogleSerpsAdvancedTool(this.dataForSEOClient),
      new DatabasesGoogleSerpsRegularTool(this.dataForSEOClient),
      new DatabasesGoogleKeywordsTool(this.dataForSEOClient),
      new DatabasesGoogleUnifiedSearchTool(this.dataForSEOClient),

      // Google Historical Databases Tools
      new DatabasesGoogleHistoricalSerpsTool(this.dataForSEOClient),
      new DatabasesGoogleHistoricalKeywordsTool(this.dataForSEOClient),
      new DatabasesGoogleHistoricalUnifiedSearchTool(this.dataForSEOClient),

      // Bing Databases Tools
      new DatabasesBingSerpsTool(this.dataForSEOClient),
      new DatabasesBingKeywordsTool(this.dataForSEOClient),
      new DatabasesBingUnifiedSearchTool(this.dataForSEOClient),

      // Amazon Databases Tools
      new DatabasesAmazonProductsTool(this.dataForSEOClient),

      // Google Play Databases Tools
      new DatabasesGooglePlaySerpsTool(this.dataForSEOClient),
      new DatabasesGooglePlayListingsTool(this.dataForSEOClient),

      // App Store Databases Tools
      new DatabasesAppStoreSerpsTool(this.dataForSEOClient),
      new DatabasesAppStoreListingsTool(this.dataForSEOClient),

      // Backlinks Databases Tools
      new DatabasesBacklinkSummaryTool(this.dataForSEOClient),

      // Business Listings Databases Tools
      new DatabasesBusinessListingsTool(this.dataForSEOClient),

      // Whois Databases Tools
      new DatabasesWhoisDomainsTool(this.dataForSEOClient),
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
