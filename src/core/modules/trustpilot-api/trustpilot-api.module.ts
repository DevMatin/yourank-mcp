import { BaseModule, ToolDefinition } from '../base.module.js';
import { PromptDefinition } from '../prompt-definition.js';
import * as ApiTools from './tools/index.js';

export class TrustpilotApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Trustpilot Tools
      new ApiTools.TrustpilotSearchLiveTool(this.dataForSEOClient),
      new ApiTools.TrustpilotReviewsLiveTool(this.dataForSEOClient),
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
