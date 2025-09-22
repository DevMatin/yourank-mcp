import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class BusinessListingsCategoriesAggregationTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_business_listings_categories_aggregation';
  }

  getDescription() {
    return `Business Listings Categories Aggregation endpoint provides results containing information about groups of related categories along with the number of entities in each category.`;
  }

  getParams() {
    return {
      location_code: z.number().optional().describe("location code"),
      language_code: z.string().optional().describe("language code"),
      categories: z.array(z.string()).optional().describe("business categories"),
      limit: z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned categories"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array"),
      filters: this.getFilterExpression().optional().describe("array of results filtering parameters")
    };
  }

  async handle(params) {
    try {
      const requestData = {};
      
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.categories) requestData.categories = params.categories;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;
      if (params.filters) requestData.filters = this.formatFilters(params.filters);

      const response = await this.client.makeRequest('/v3/business_data/business_listings/categories_aggregation/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
