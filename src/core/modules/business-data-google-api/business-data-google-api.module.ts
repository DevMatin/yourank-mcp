import { BaseModule, ToolDefinition } from '../base.module.js';
import * as GoogleTools from './tools/index.js';

export class BusinessDataGoogleApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // Google Locations & Languages
      new GoogleTools.GoogleLocationsTool(this.dataForSEOClient),
      new GoogleTools.GoogleLocationsCountryTool(this.dataForSEOClient),
      new GoogleTools.GoogleLanguagesTool(this.dataForSEOClient),
      
      // Google My Business
      new GoogleTools.GoogleMyBusinessInfoLiveTool(this.dataForSEOClient),
      new GoogleTools.GoogleMyBusinessInfoTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleMyBusinessInfoTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.GoogleMyBusinessInfoTaskGetTool(this.dataForSEOClient),
      new GoogleTools.GoogleMyBusinessUpdatesTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleMyBusinessUpdatesTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.GoogleMyBusinessUpdatesTaskGetTool(this.dataForSEOClient),
      
      // Google Hotels
      new GoogleTools.GoogleHotelSearchesLiveTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelSearchesTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelSearchesTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelSearchesTaskGetTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelInfoLiveAdvancedTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelInfoLiveHtmlTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelInfoTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelInfoTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelInfoTaskGetTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelInfoTaskGetHtmlTool(this.dataForSEOClient),
      
      // Google Reviews
      new GoogleTools.GoogleReviewsLiveTool(this.dataForSEOClient),
      new GoogleTools.GoogleReviewsTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleReviewsTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.GoogleReviewsTaskGetTool(this.dataForSEOClient),
      
      // Google Extended Reviews
      new GoogleTools.GoogleExtendedReviewsTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleExtendedReviewsTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.GoogleExtendedReviewsTaskGetTool(this.dataForSEOClient),
      
      // Google Questions & Answers
      new GoogleTools.GoogleQuestionsAndAnswersLiveTool(this.dataForSEOClient),
      new GoogleTools.GoogleQuestionsAndAnswersTaskPostTool(this.dataForSEOClient),
      new GoogleTools.GoogleQuestionsAndAnswersTasksReadyTool(this.dataForSEOClient),
      new GoogleTools.GoogleQuestionsAndAnswersTaskGetTool(this.dataForSEOClient),
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
