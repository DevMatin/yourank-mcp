import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ApiTools from './tools/index.js';

export class SocialMediaApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Social Media Tools
      new ApiTools.SocialMediaPinterestLiveTool(this.dataForSEOClient),
      new ApiTools.SocialMediaFacebookLiveTool(this.dataForSEOClient),
      new ApiTools.SocialMediaRedditLiveTool(this.dataForSEOClient),
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
