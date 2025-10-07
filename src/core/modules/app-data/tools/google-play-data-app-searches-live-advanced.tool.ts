import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class GooglePlayDataAppSearchesLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'google_play_data_app_searches_live_advanced';
  }

  getDescription(): string {
    return 'Get a list of apps ranking on Google Play for a specified keyword with detailed information including ID, icon, reviews count, rating, price, and other metadata. This is an alias for google_play_search_live_advanced.';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Target keyword for app search"),
      location_name: z.string().optional().describe("Target location (full name, e.g., 'United States')"),
      location_code: z.number().optional().describe("Target location code"),
      language_name: z.string().optional().describe("Target language (full name, e.g., 'English')"), 
      language_code: z.string().optional().describe("Target language code (e.g., 'en')"),
      priority: z.number().optional().describe("Task priority (1-3, where 3 is the highest)"),
      depth: z.number().optional().describe("Results depth (number of apps to return, max 200)"),
      postback_url: z.string().optional().describe("URL for receiving task completion notification"),
      filters: this.getFilterExpression().optional().describe("Array of filters to apply to results"),
      order_by: z.array(z.string()).optional().describe("Fields to order results by"),
      tag: z.string().optional().describe("User-defined task identifier"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keyword: params.keyword,
      };

      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_name) requestData.language_name = params.language_name;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.priority) requestData.priority = params.priority;
      if (params.depth) requestData.depth = params.depth;
      if (params.postback_url) requestData.postback_url = params.postback_url;
      if (params.filters) requestData.filters = this.formatFilters(params.filters);
      if (params.order_by) requestData.order_by = this.formatOrderBy(params.order_by);
      if (params.tag) requestData.tag = params.tag;

      const response = await this.dataForSEOClient.makeRequest('/v3/app_data/google/app_searches/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
