import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ContentGenerationTools from './tools/index.js';

export class ContentGenerationApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Erstelle Instanzen aller verfügbaren Content Generation Tools
    const tools = [
      new ContentGenerationTools.ContentGenerationGenerateTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationGenerateTextTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationGenerateMetaTagsTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationGenerateSubTopicsTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationParaphraseTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationGrammarTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationGrammarLanguagesTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationGrammarRulesTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationSummaryTool(this.dataForSEOClient),
      new ContentGenerationTools.ContentGenerationTextSummaryLanguagesTool(this.dataForSEOClient),
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