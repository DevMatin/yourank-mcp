import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ContentAnalysisTools from './tools/index.js';

export class ContentAnalysisApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Erstelle Instanzen aller verfügbaren Content Analysis Tools
    const tools = [
      new ContentAnalysisTools.ContentAnalysisSearchTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisSummaryTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisPhraseTrendsTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisIdListTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisAvailableFiltersTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisLocationsTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisLanguagesTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisCategoriesTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisSentimentAnalysisTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisRatingDistributionTool(this.dataForSEOClient),
      new ContentAnalysisTools.ContentAnalysisCategoryTrendsTool(this.dataForSEOClient),
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