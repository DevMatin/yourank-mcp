import { BaseModule, ToolDefinition } from '../base.module.js';
// Direkte Imports der Tool-Kategorien
import * as GoogleTools from './tools/google/index.js';
import * as ListingsTools from './tools/listings/index.js';
import * as SocialMediaTools from './tools/social-media/index.js';
import * as TrustpilotTools from './tools/trustpilot/index.js';
import * as TripadvisorTools from './tools/tripadvisor/index.js';
import * as GeneralTools from './tools/general/index.js';

export class BusinessDataApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Alle Tools direkt initialisieren
    const tools = [
      // Google Tools
      ...this.createGoogleTools(),
      // General Tools
      ...this.createGeneralTools(),
      // Listings Tools
      ...this.createListingsTools(),
      // Social Media Tools
      ...this.createSocialMediaTools(),
      // Reviews Tools (Trustpilot + Tripadvisor)
      ...this.createReviewsTools(),
    ];
    
    return this.toolsToRecord(tools);
  }
  
  private createGoogleTools() {
    return [
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
      new GoogleTools.GoogleHotelInfoTaskGetAdvancedTool(this.dataForSEOClient),
      new GoogleTools.GoogleHotelInfoLiveAdvancedOnlyTool(this.dataForSEOClient),
      
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
  }
  
  private createGeneralTools() {
    return [
      new GeneralTools.BusinessDataIdListTool(this.dataForSEOClient),
      new GeneralTools.BusinessDataErrorsTool(this.dataForSEOClient),
      new GeneralTools.BusinessDataTasksReadyTool(this.dataForSEOClient),
      new GeneralTools.BusinessDataApiOverviewTool(this.dataForSEOClient),
    ];
  }
  
  private createListingsTools() {
    return [
      new ListingsTools.BusinessDataBusinessListingsSearchTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsFiltersTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsLocationsTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsCategoriesTool(this.dataForSEOClient),
      new ListingsTools.BusinessListingsCategoriesAggregationTool(this.dataForSEOClient),
    ];
  }
  
  private createSocialMediaTools() {
    return [
      new SocialMediaTools.SocialMediaPinterestLiveTool(this.dataForSEOClient),
      new SocialMediaTools.SocialMediaFacebookLiveTool(this.dataForSEOClient),
      new SocialMediaTools.SocialMediaRedditLiveTool(this.dataForSEOClient),
    ];
  }
  
  private createReviewsTools() {
    return [
      // Trustpilot Tools
      new TrustpilotTools.TrustpilotSearchLiveTool(this.dataForSEOClient),
      new TrustpilotTools.TrustpilotSearchTaskPostTool(this.dataForSEOClient),
      new TrustpilotTools.TrustpilotSearchTasksReadyTool(this.dataForSEOClient),
      new TrustpilotTools.TrustpilotSearchTaskGetTool(this.dataForSEOClient),
      new TrustpilotTools.TrustpilotReviewsLiveTool(this.dataForSEOClient),
      new TrustpilotTools.TrustpilotReviewsTaskPostTool(this.dataForSEOClient),
      new TrustpilotTools.TrustpilotReviewsTasksReadyTool(this.dataForSEOClient),
      new TrustpilotTools.TrustpilotReviewsTaskGetTool(this.dataForSEOClient),
      
      // Tripadvisor Tools
      new TripadvisorTools.TripadvisorLocationsTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorLocationsCountryTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorLanguagesTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorSearchLiveTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorSearchTaskPostTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorSearchTasksReadyTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorSearchTaskGetTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorReviewsLiveTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorReviewsTaskPostTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorReviewsTasksReadyTool(this.dataForSEOClient),
      new TripadvisorTools.TripadvisorReviewsTaskGetTool(this.dataForSEOClient),
    ];
  }
  
  private toolsToRecord(tools: any[]): Record<string, ToolDefinition> {
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