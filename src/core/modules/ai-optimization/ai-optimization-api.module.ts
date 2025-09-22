import { BaseModule, ToolDefinition } from '../base.module.js';
import * as AiOptimizationTools from './tools/index.js';

export class AiOptimizationApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Erstelle Instanzen aller verfügbaren AI Optimization Tools
    const tools = [
      // ChatGPT LLM Responses Tools
      new AiOptimizationTools.ChatGptLlmResponsesModelsTool(this.dataForSEOClient),
      new AiOptimizationTools.ChatGptLlmResponsesLiveTool(this.dataForSEOClient),
      new AiOptimizationTools.ChatGptLlmResponsesTaskPostTool(this.dataForSEOClient),
      new AiOptimizationTools.ChatGptLlmResponsesTasksReadyTool(this.dataForSEOClient),
      new AiOptimizationTools.ChatGptLlmResponsesTaskGetTool(this.dataForSEOClient),
      
      // Claude LLM Responses Tools
      new AiOptimizationTools.ClaudeLlmResponsesModelsTool(this.dataForSEOClient),
      new AiOptimizationTools.ClaudeLlmResponsesLiveTool(this.dataForSEOClient),
      new AiOptimizationTools.ClaudeLlmResponsesTaskPostTool(this.dataForSEOClient),
      new AiOptimizationTools.ClaudeLlmResponsesTasksReadyTool(this.dataForSEOClient),
      new AiOptimizationTools.ClaudeLlmResponsesTaskGetTool(this.dataForSEOClient),
      
      // Gemini LLM Responses Tools
      new AiOptimizationTools.GeminiLlmResponsesModelsTool(this.dataForSEOClient),
      new AiOptimizationTools.GeminiLlmResponsesLiveTool(this.dataForSEOClient),
      
      // Perplexity LLM Responses Tools
      new AiOptimizationTools.PerplexityLlmResponsesModelsTool(this.dataForSEOClient),
      new AiOptimizationTools.PerplexityLlmResponsesLiveTool(this.dataForSEOClient),
      
      // AI Keyword Data Tools
      new AiOptimizationTools.AiKeywordDataAvailableFiltersTool(this.dataForSEOClient),
      new AiOptimizationTools.AiKeywordDataLocationsAndLanguagesTool(this.dataForSEOClient),
      new AiOptimizationTools.AiKeywordDataKeywordsSearchVolumeLiveTool(this.dataForSEOClient),
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
