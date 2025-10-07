import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class AppleStoreDataReviewsLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'apple_store_data_reviews_live_advanced';
  }

  getDescription(): string {
    return 'Get reviews published on Apple App Store for a specific app including review ratings, content, user profile info, publication dates, and more. Requires app_id parameter.';
  }

  getParams(): z.ZodRawShape {
    return {
      app_id: z.string().describe("Target application ID on Apple App Store (e.g., '414478124' for WhatsApp)"),
      location_name: z.string().optional().describe("Target location (full name, e.g., 'United States')"),
      location_code: z.number().optional().describe("Target location code"),
      language_name: z.string().optional().describe("Target language (full name, e.g., 'English')"),
      language_code: z.string().optional().describe("Target language code (e.g., 'en')"),
      priority: z.number().optional().describe("Task priority (1-3, where 3 is the highest)"),
      depth: z.number().optional().describe("Number of reviews to return (max 50000)"),
      rating: z.number().optional().describe("Filter reviews by rating (1-5 stars)"),
      sort_by: z.enum(['newest', 'most_helpful', 'most_critical']).optional().describe("Sort order for reviews"),
      postback_url: z.string().optional().describe("URL for receiving task completion notification"),
      filters: this.getFilterExpression().optional().describe("Array of filters to apply to results"),
      order_by: z.array(z.string()).optional().describe("Fields to order results by"),
      tag: z.string().optional().describe("User-defined task identifier"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        app_id: params.app_id,
      };

      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_name) requestData.language_name = params.language_name;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.priority) requestData.priority = params.priority;
      if (params.depth) requestData.depth = params.depth;
      if (params.rating) requestData.rating = params.rating;
      if (params.sort_by) requestData.sort_by = params.sort_by;
      if (params.postback_url) requestData.postback_url = params.postback_url;
      if (params.filters) requestData.filters = this.formatFilters(params.filters);
      if (params.order_by) requestData.order_by = this.formatOrderBy(params.order_by);
      if (params.tag) requestData.tag = params.tag;

      const response = await this.dataForSEOClient.makeRequest('/v3/app_data/apple/app_reviews/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
