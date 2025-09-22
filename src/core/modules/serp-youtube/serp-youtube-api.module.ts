import { BaseModule, ToolDefinition } from '../base.module.js';

// YouTube Tools
import { SerpYoutubeLocationsListTool } from '../serp/tools/serp-youtube-locations-list.tool.js';
import { SerpYoutubeOrganicLiveAdvancedTool } from '../serp/tools/serp-youtube-organic-live-advanced.tool.js';
import { SerpYoutubeVideoInfoLiveAdvancedTool } from '../serp/tools/serp-youtube-video-info-live-advanced.tool.js';
import { SerpYoutubeVideoCommentsLiveAdvancedTool } from '../serp/tools/serp-youtube-video-comments-live-advanced-tool.js';
import { SerpYoutubeVideoSubtitlesLiveAdvancedTool } from '../serp/tools/serp-youtube-video-subtitles-live-advanced-tool.js';

export class SerpYoutubeApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // YouTube Utilities
      new SerpYoutubeLocationsListTool(this.dataForSEOClient),
      
      // YouTube Organic Tools
      new SerpYoutubeOrganicLiveAdvancedTool(this.dataForSEOClient),
      
      // YouTube Video Info Tools
      new SerpYoutubeVideoInfoLiveAdvancedTool(this.dataForSEOClient),
      
      // YouTube Video Comments Tools
      new SerpYoutubeVideoCommentsLiveAdvancedTool(this.dataForSEOClient),
      
      // YouTube Video Subtitles Tools
      new SerpYoutubeVideoSubtitlesLiveAdvancedTool(this.dataForSEOClient),
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
