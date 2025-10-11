import { BaseModule, ToolDefinition } from '../base.module.js';
import { PromptDefinition } from '../prompt-definition.js';
import * as ApiTools from './tools/index.js';

export class GoogleBusinessApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      new ApiTools.GoogleLocationsTool(this.dataForSEOClient),
      new ApiTools.GoogleLocationsCountryTool(this.dataForSEOClient),
      new ApiTools.GoogleLanguagesTool(this.dataForSEOClient),
      new ApiTools.GoogleMyBusinessInfoLiveTool(this.dataForSEOClient),
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

  getPrompts(): Record<string, PromptDefinition> {
    return {};
  }
}
