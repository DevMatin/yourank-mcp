import { BaseModule } from '../base.module.js';
import * as ApiTools from './tools/index.js';

export class BusinessDataApiModule extends BaseModule {
  getTools() {
    const tools = [
      // General Tools
      new ApiTools.BusinessDataIdListTool(this.dataForSEOClient),
      new ApiTools.BusinessDataErrorsTool(this.dataForSEOClient),
      
      // Listings Tools
      new ApiTools.BusinessDataBusinessListingsSearchTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsFiltersTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsLocationsTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsCategoriesTool(this.dataForSEOClient),
      new ApiTools.BusinessListingsCategoriesAggregationTool(this.dataForSEOClient),
      
      // Google Tools
      new ApiTools.GoogleLocationsTool(this.dataForSEOClient),
      new ApiTools.GoogleLocationsCountryTool(this.dataForSEOClient),
      new ApiTools.GoogleLanguagesTool(this.dataForSEOClient),
      new ApiTools.GoogleMyBusinessInfoLiveTool(this.dataForSEOClient),
      new ApiTools.GoogleHotelSearchesLiveTool(this.dataForSEOClient),
      new ApiTools.GoogleHotelInfoLiveAdvancedTool(this.dataForSEOClient),
      new ApiTools.GoogleReviewsLiveTool(this.dataForSEOClient),
      
      // Trustpilot Tools
      new ApiTools.TrustpilotSearchLiveTool(this.dataForSEOClient),
      new ApiTools.TrustpilotReviewsLiveTool(this.dataForSEOClient),
      
      // Tripadvisor Tools
      new ApiTools.TripadvisorLocationsTool(this.dataForSEOClient),
      new ApiTools.TripadvisorLocationsCountryTool(this.dataForSEOClient),
      new ApiTools.TripadvisorLanguagesTool(this.dataForSEOClient),
      new ApiTools.TripadvisorSearchLiveTool(this.dataForSEOClient),
      new ApiTools.TripadvisorReviewsLiveTool(this.dataForSEOClient),
      
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
        handler: (params) => tool.handle(params),
      },
    }), {});
  }
}
