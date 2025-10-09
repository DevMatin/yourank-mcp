import { BaseModule, ToolDefinition } from '../base.module.js';

// Import all Content Analysis tools using barrel exports
import * as BaseTools from './tools/base/index.js';
import * as SearchTools from './tools/search/index.js';
import * as SentimentTools from './tools/sentiment/index.js';
import * as TrendsTools from './tools/trends/index.js';

export class ContentAnalysisApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Base Content Analysis Tools
      new BaseTools.ContentAnalysisIdListTool(this.dataForSEOClient),
      new BaseTools.ContentAnalysisAvailableFiltersTool(this.dataForSEOClient),
      new BaseTools.ContentAnalysisLocationsTool(this.dataForSEOClient),
      new BaseTools.ContentAnalysisLanguagesTool(this.dataForSEOClient),
      new BaseTools.ContentAnalysisCategoriesTool(this.dataForSEOClient),

      // Search Content Analysis Tools
      new SearchTools.ContentAnalysisSearchTool(this.dataForSEOClient),
      new SearchTools.ContentAnalysisSummaryTool(this.dataForSEOClient),

      // Sentiment Content Analysis Tools
      new SentimentTools.ContentAnalysisSentimentAnalysisTool(this.dataForSEOClient),
      new SentimentTools.ContentAnalysisRatingDistributionTool(this.dataForSEOClient),

      // Trends Content Analysis Tools
      new TrendsTools.ContentAnalysisPhraseTrendsTool(this.dataForSEOClient),
      new TrendsTools.ContentAnalysisCategoryTrendsTool(this.dataForSEOClient),
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