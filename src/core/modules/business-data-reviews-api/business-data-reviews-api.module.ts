import { BaseModule, ToolDefinition } from '../base.module.js';
import * as ReviewsTools from './tools/index.js';

export class BusinessDataReviewsApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Trustpilot Tools
      new ReviewsTools.TrustpilotSearchLiveTool(this.dataForSEOClient),
      new ReviewsTools.TrustpilotSearchTaskPostTool(this.dataForSEOClient),
      new ReviewsTools.TrustpilotSearchTasksReadyTool(this.dataForSEOClient),
      new ReviewsTools.TrustpilotSearchTaskGetTool(this.dataForSEOClient),
      new ReviewsTools.TrustpilotReviewsLiveTool(this.dataForSEOClient),
      new ReviewsTools.TrustpilotReviewsTaskPostTool(this.dataForSEOClient),
      new ReviewsTools.TrustpilotReviewsTasksReadyTool(this.dataForSEOClient),
      new ReviewsTools.TrustpilotReviewsTaskGetTool(this.dataForSEOClient),
      
      // Tripadvisor Tools
      new ReviewsTools.TripadvisorLocationsTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorLocationsCountryTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorLanguagesTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorSearchLiveTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorSearchTaskPostTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorSearchTasksReadyTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorSearchTaskGetTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorReviewsLiveTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorReviewsTaskPostTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorReviewsTasksReadyTool(this.dataForSEOClient),
      new ReviewsTools.TripadvisorReviewsTaskGetTool(this.dataForSEOClient),
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
