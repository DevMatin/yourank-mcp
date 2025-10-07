import { BaseModule, ToolDefinition } from '../base.module';
import { BaseTool } from '../base.tool';
import { DataForSEOClient } from '../../client/dataforseo.client';
import { z } from 'zod';

// Import all business data tools directly
import { BusinessDataErrorsTool } from './tools/general/business-data-errors.tool.js';
import { BusinessDataIdListTool } from './tools/general/business-data-id-list.tool.js';
import { BusinessDataTasksReadyTool } from './tools/general/business-data-tasks-ready.tool.js';
import { GoogleExtendedReviewsTaskGetTool } from './tools/google/google-extended-reviews-task-get.tool.js';
import { GoogleHotelInfoLiveAdvancedTool } from './tools/google/google-hotel-info-live-advanced.tool.js';
import { GoogleHotelSearchesLiveTool } from './tools/google/google-hotel-searches-live.tool.js';
import { GoogleLanguagesTool } from './tools/google/google-languages.tool.js';
import { GoogleLocationsCountryTool } from './tools/google/google-locations-country.tool.js';
import { GoogleLocationsTool } from './tools/google/google-locations.tool.js';
import { GoogleMyBusinessInfoLiveTool } from './tools/google/google-my-business-info-live.tool.js';
import { GoogleReviewsLiveTool } from './tools/google/google-reviews-live.tool.js';
import { GoogleExtendedReviewsTaskPostTool } from './tools/google/google-extended-reviews-task-post.tool.js';
import { GoogleExtendedReviewsTasksReadyTool } from './tools/google/google-extended-reviews-tasks-ready.tool.js';
import { GoogleHotelInfoLiveHtmlTool } from './tools/google/google-hotel-info-live-html.tool.js';
import { GoogleHotelInfoTaskGetHtmlTool } from './tools/google/google-hotel-info-task-get-html.tool.js';
import { GoogleHotelInfoTaskGetTool } from './tools/google/google-hotel-info-task-get.tool.js';
import { GoogleHotelInfoTaskPostTool } from './tools/google/google-hotel-info-task-post.tool.js';
import { GoogleHotelInfoTasksReadyTool } from './tools/google/google-hotel-info-tasks-ready.tool.js';
import { GoogleHotelSearchesTaskGetTool } from './tools/google/google-hotel-searches-task-get.tool.js';
import { GoogleHotelSearchesTaskPostTool } from './tools/google/google-hotel-searches-task-post.tool.js';
import { GoogleHotelSearchesTasksReadyTool } from './tools/google/google-hotel-searches-tasks-ready.tool.js';
import { GoogleMyBusinessInfoTaskGetTool } from './tools/google/google-my-business-info-task-get.tool.js';
import { GoogleMyBusinessInfoTaskPostTool } from './tools/google/google-my-business-info-task-post.tool.js';
import { GoogleMyBusinessInfoTasksReadyTool } from './tools/google/google-my-business-info-tasks-ready.tool.js';
import { GoogleMyBusinessUpdatesTaskGetTool } from './tools/google/google-my-business-updates-task-get.tool.js';
import { GoogleMyBusinessUpdatesTaskPostTool } from './tools/google/google-my-business-updates-task-post.tool.js';
import { GoogleMyBusinessUpdatesTasksReadyTool } from './tools/google/google-my-business-updates-tasks-ready.tool.js';
import { GoogleQuestionsAndAnswersLiveTool } from './tools/google/google-questions-and-answers-live.tool.js';
import { GoogleQuestionsAndAnswersTaskGetTool } from './tools/google/google-questions-and-answers-task-get.tool.js';
import { GoogleQuestionsAndAnswersTaskPostTool } from './tools/google/google-questions-and-answers-task-post.tool.js';
import { GoogleQuestionsAndAnswersTasksReadyTool } from './tools/google/google-questions-and-answers-tasks-ready.tool.js';
import { GoogleReviewsTaskGetTool } from './tools/google/google-reviews-task-get.tool.js';
import { GoogleReviewsTaskPostTool } from './tools/google/google-reviews-task-post.tool.js';
import { GoogleReviewsTasksReadyTool } from './tools/google/google-reviews-tasks-ready.tool.js';
import { TripadvisorLanguagesTool } from './tools/tripadvisor/tripadvisor-languages.tool.js';
import { TripadvisorLocationsCountryTool } from './tools/tripadvisor/tripadvisor-locations-country.tool.js';
import { TripadvisorLocationsTool } from './tools/tripadvisor/tripadvisor-locations.tool.js';
import { TripadvisorReviewsLiveTool } from './tools/tripadvisor/tripadvisor-reviews-live.tool.js';
import { TripadvisorReviewsTaskGetTool } from './tools/tripadvisor/tripadvisor-reviews-task-get.tool.js';
import { TripadvisorSearchLiveTool } from './tools/tripadvisor/tripadvisor-search-live.tool.js';
import { TripadvisorReviewsTaskPostTool } from './tools/tripadvisor/tripadvisor-reviews-task-post.tool.js';
import { TripadvisorReviewsTasksReadyTool } from './tools/tripadvisor/tripadvisor-reviews-tasks-ready.tool.js';
import { TripadvisorSearchTaskGetTool } from './tools/tripadvisor/tripadvisor-search-task-get.tool.js';
import { TripadvisorSearchTaskPostTool } from './tools/tripadvisor/tripadvisor-search-task-post.tool.js';
import { TripadvisorSearchTasksReadyTool } from './tools/tripadvisor/tripadvisor-search-tasks-ready.tool.js';
import { TrustpilotReviewsLiveTool } from './tools/trustpilot/trustpilot-reviews-live.tool.js';
import { TrustpilotReviewsTaskGetTool } from './tools/trustpilot/trustpilot-reviews-task-get.tool.js';
import { TrustpilotSearchLiveTool } from './tools/trustpilot/trustpilot-search-live.tool.js';
import { TrustpilotReviewsTaskPostTool } from './tools/trustpilot/trustpilot-reviews-task-post.tool.js';
import { TrustpilotReviewsTasksReadyTool } from './tools/trustpilot/trustpilot-reviews-tasks-ready.tool.js';
import { TrustpilotSearchTaskGetTool } from './tools/trustpilot/trustpilot-search-task-get.tool.js';
import { TrustpilotSearchTaskPostTool } from './tools/trustpilot/trustpilot-search-task-post.tool.js';
import { TrustpilotSearchTasksReadyTool } from './tools/trustpilot/trustpilot-search-tasks-ready.tool.js';
import { BusinessDataBusinessListingsSearchTool } from './tools/listings/business-listings-search.tool.js';
import { BusinessListingsCategoriesAggregationTool } from './tools/listings/business-listings-categories-aggregation.tool.js';
import { BusinessListingsCategoriesTool } from './tools/listings/business-listings-categories.tool.js';
import { BusinessListingsFiltersTool } from './tools/listings/business-listings-filters.tool.js';
import { BusinessListingsLocationsTool } from './tools/listings/business-listings-locations.tool.js';
import { SocialMediaFacebookLiveTool } from './tools/social-media/social-media-facebook-live.tool.js';
import { SocialMediaPinterestLiveTool } from './tools/social-media/social-media-pinterest-live.tool.js';
import { SocialMediaRedditLiveTool } from './tools/social-media/social-media-reddit-live.tool.js';

export class BusinessDataApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      // General Tools
      new BusinessDataErrorsTool(this.dataForSEOClient),
      new BusinessDataIdListTool(this.dataForSEOClient),
      new BusinessDataTasksReadyTool(this.dataForSEOClient),
      
      // Google Tools
      new GoogleExtendedReviewsTaskGetTool(this.dataForSEOClient),
      new GoogleHotelInfoLiveAdvancedTool(this.dataForSEOClient),
      new GoogleHotelSearchesLiveTool(this.dataForSEOClient),
      new GoogleLanguagesTool(this.dataForSEOClient),
      new GoogleLocationsCountryTool(this.dataForSEOClient),
      new GoogleLocationsTool(this.dataForSEOClient),
      new GoogleMyBusinessInfoLiveTool(this.dataForSEOClient),
      new GoogleReviewsLiveTool(this.dataForSEOClient),
      new GoogleExtendedReviewsTaskPostTool(this.dataForSEOClient),
      new GoogleExtendedReviewsTasksReadyTool(this.dataForSEOClient),
      new GoogleHotelInfoLiveHtmlTool(this.dataForSEOClient),
      new GoogleHotelInfoTaskGetHtmlTool(this.dataForSEOClient),
      new GoogleHotelInfoTaskGetTool(this.dataForSEOClient),
      new GoogleHotelInfoTaskPostTool(this.dataForSEOClient),
      new GoogleHotelInfoTasksReadyTool(this.dataForSEOClient),
      new GoogleHotelSearchesTaskGetTool(this.dataForSEOClient),
      new GoogleHotelSearchesTaskPostTool(this.dataForSEOClient),
      new GoogleHotelSearchesTasksReadyTool(this.dataForSEOClient),
      new GoogleMyBusinessInfoTaskGetTool(this.dataForSEOClient),
      new GoogleMyBusinessInfoTaskPostTool(this.dataForSEOClient),
      new GoogleMyBusinessInfoTasksReadyTool(this.dataForSEOClient),
      new GoogleMyBusinessUpdatesTaskGetTool(this.dataForSEOClient),
      new GoogleMyBusinessUpdatesTaskPostTool(this.dataForSEOClient),
      new GoogleMyBusinessUpdatesTasksReadyTool(this.dataForSEOClient),
      new GoogleQuestionsAndAnswersLiveTool(this.dataForSEOClient),
      new GoogleQuestionsAndAnswersTaskGetTool(this.dataForSEOClient),
      new GoogleQuestionsAndAnswersTaskPostTool(this.dataForSEOClient),
      new GoogleQuestionsAndAnswersTasksReadyTool(this.dataForSEOClient),
      new GoogleReviewsTaskGetTool(this.dataForSEOClient),
      new GoogleReviewsTaskPostTool(this.dataForSEOClient),
      new GoogleReviewsTasksReadyTool(this.dataForSEOClient),
      
      // Tripadvisor Tools
      new TripadvisorLanguagesTool(this.dataForSEOClient),
      new TripadvisorLocationsCountryTool(this.dataForSEOClient),
      new TripadvisorLocationsTool(this.dataForSEOClient),
      new TripadvisorReviewsLiveTool(this.dataForSEOClient),
      new TripadvisorReviewsTaskGetTool(this.dataForSEOClient),
      new TripadvisorSearchLiveTool(this.dataForSEOClient),
      new TripadvisorReviewsTaskPostTool(this.dataForSEOClient),
      new TripadvisorReviewsTasksReadyTool(this.dataForSEOClient),
      new TripadvisorSearchTaskGetTool(this.dataForSEOClient),
      new TripadvisorSearchTaskPostTool(this.dataForSEOClient),
      new TripadvisorSearchTasksReadyTool(this.dataForSEOClient),
      
      // Trustpilot Tools
      new TrustpilotReviewsLiveTool(this.dataForSEOClient),
      new TrustpilotReviewsTaskGetTool(this.dataForSEOClient),
      new TrustpilotSearchLiveTool(this.dataForSEOClient),
      new TrustpilotReviewsTaskPostTool(this.dataForSEOClient),
      new TrustpilotReviewsTasksReadyTool(this.dataForSEOClient),
      new TrustpilotSearchTaskGetTool(this.dataForSEOClient),
      new TrustpilotSearchTaskPostTool(this.dataForSEOClient),
      new TrustpilotSearchTasksReadyTool(this.dataForSEOClient),
      
      // Listings Tools
      new BusinessDataBusinessListingsSearchTool(this.dataForSEOClient),
      new BusinessListingsCategoriesAggregationTool(this.dataForSEOClient),
      new BusinessListingsCategoriesTool(this.dataForSEOClient),
      new BusinessListingsFiltersTool(this.dataForSEOClient),
      new BusinessListingsLocationsTool(this.dataForSEOClient),
      
      // Social Media Tools
      new SocialMediaFacebookLiveTool(this.dataForSEOClient),
      new SocialMediaPinterestLiveTool(this.dataForSEOClient),
      new SocialMediaRedditLiveTool(this.dataForSEOClient),
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