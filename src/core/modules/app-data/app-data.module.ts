import { BaseModule, ToolDefinition } from '../base.module.js';
import { z } from 'zod';

// App Data Core Tools
import { AppDataIdListTool } from './tools/app-data-id-list.tool.js';
import { AppDataErrorsTool } from './tools/app-data-errors.tool.js';
import { AppDataTasksReadyTool } from './tools/app-data-tasks-ready.tool.js';

// Google Play Search Tools
import { GooglePlaySearchLiveAdvancedTool } from './tools/google-play-search-live-advanced.tool.js';

// Google Play Data Tools
import { GooglePlayDataInfoLiveAdvancedTool } from './tools/google-play-data-info-live-advanced.tool.js';
import { GooglePlayDataReviewsLiveAdvancedTool } from './tools/google-play-data-reviews-live-advanced.tool.js';
import { GooglePlayDataAppInfoLiveAdvancedTool } from './tools/google-play-data-app-info-live-advanced.tool.js';
import { GooglePlayDataAppSearchesLiveAdvancedTool } from './tools/google-play-data-app-searches-live-advanced.tool.js';

// Apple Store Search Tools
import { AppleStoreSearchLiveAdvancedTool } from './tools/apple-store-search-live-advanced.tool.js';

// Apple Store Data Tools
import { AppleStoreDataInfoLiveAdvancedTool } from './tools/apple-store-data-info-live-advanced.tool.js';
import { AppleStoreDataReviewsLiveAdvancedTool } from './tools/apple-store-data-reviews-live-advanced.tool.js';
import { AppleStoreDataAppInfoLiveAdvancedTool } from './tools/apple-store-data-app-info-live-advanced.tool.js';
import { AppleStoreDataAppSearchesLiveAdvancedTool } from './tools/apple-store-data-app-searches-live-advanced.tool.js';

export class AppDataModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // App Data Core Tools
      new AppDataIdListTool(this.dataForSEOClient),
      new AppDataErrorsTool(this.dataForSEOClient),
      new AppDataTasksReadyTool(this.dataForSEOClient),

      // Google Play Search Tools
      new GooglePlaySearchLiveAdvancedTool(this.dataForSEOClient),

      // Google Play Data Tools
      new GooglePlayDataInfoLiveAdvancedTool(this.dataForSEOClient),
      new GooglePlayDataReviewsLiveAdvancedTool(this.dataForSEOClient),
      new GooglePlayDataAppInfoLiveAdvancedTool(this.dataForSEOClient),
      new GooglePlayDataAppSearchesLiveAdvancedTool(this.dataForSEOClient),

      // Apple Store Search Tools
      new AppleStoreSearchLiveAdvancedTool(this.dataForSEOClient),

      // Apple Store Data Tools
      new AppleStoreDataInfoLiveAdvancedTool(this.dataForSEOClient),
      new AppleStoreDataReviewsLiveAdvancedTool(this.dataForSEOClient),
      new AppleStoreDataAppInfoLiveAdvancedTool(this.dataForSEOClient),
      new AppleStoreDataAppSearchesLiveAdvancedTool(this.dataForSEOClient),
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
