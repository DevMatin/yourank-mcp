import { BaseModule, ToolDefinition } from '../base.module.js';
import * as OnPageTools from './tools/index.js';

export class OnPageApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Erstelle Instanzen aller verfügbaren OnPage Tools
    const tools = [
      new OnPageTools.InstantPagesTool(this.dataForSEOClient),
      new OnPageTools.ContentParsingTool(this.dataForSEOClient),
      new OnPageTools.PageScreenshotTool(this.dataForSEOClient),
      new OnPageTools.RawHtmlTool(this.dataForSEOClient),
      new OnPageTools.MicrodataTool(this.dataForSEOClient),
      new OnPageTools.KeywordDensityTool(this.dataForSEOClient),
      new OnPageTools.WaterfallTool(this.dataForSEOClient),
      new OnPageTools.NonIndexableTool(this.dataForSEOClient),
      new OnPageTools.RedirectChainsTool(this.dataForSEOClient),
      new OnPageTools.LinksTool(this.dataForSEOClient),
      new OnPageTools.DuplicateContentTool(this.dataForSEOClient),
      new OnPageTools.DuplicateTagsTool(this.dataForSEOClient),
      new OnPageTools.ResourcesTool(this.dataForSEOClient),
      new OnPageTools.PagesByResourceTool(this.dataForSEOClient),
      new OnPageTools.PagesTool(this.dataForSEOClient),
      new OnPageTools.SummaryTool(this.dataForSEOClient),
      new OnPageTools.TaskPostTool(this.dataForSEOClient),
      new OnPageTools.TasksReadyTool(this.dataForSEOClient),
      new OnPageTools.ForceStopTool(this.dataForSEOClient),
      new OnPageTools.IdListTool(this.dataForSEOClient),
      new OnPageTools.ErrorsTool(this.dataForSEOClient),
      new OnPageTools.AvailableFiltersTool(this.dataForSEOClient),
      new OnPageTools.LighthouseLanguagesTool(this.dataForSEOClient),
      new OnPageTools.LighthouseAuditsTool(this.dataForSEOClient),
      new OnPageTools.LighthouseVersionsTool(this.dataForSEOClient),
      new OnPageTools.LighthouseTaskPostTool(this.dataForSEOClient),
      new OnPageTools.LighthouseTasksReadyTool(this.dataForSEOClient),
      new OnPageTools.LighthouseTaskGetTool(this.dataForSEOClient),
      new OnPageTools.LighthouseLiveTool(this.dataForSEOClient),
      new OnPageTools.ContentParsingLiveTool(this.dataForSEOClient),
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