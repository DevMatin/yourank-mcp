import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class DatabasesAmazonProductsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'databases_amazon_products';
  }

  getDescription() {
    return 'Access Amazon Products Database containing data on keywords and product listings ranking for them, including title, description, price, rating, delivery information, and ranking position';
  }

  getParams() {
    return {
      location_name: z.string().optional().describe('Location name for database search (e.g., "Germany", "United States")'),
      location_code: z.number().optional().describe('Location code for database search (alternative to location_name)'),
      language_code: z.string().optional().describe('Language code for database search (e.g., "en", "de")'),
      keyword: z.string().optional().describe('Keyword to search in the database'),
      product_title: z.string().optional().describe('Product title to search for'),
      category: z.string().optional().describe('Product category filter'),
      price_min: z.number().optional().describe('Minimum price filter'),
      price_max: z.number().optional().describe('Maximum price filter'),
      rating_min: z.number().min(1).max(5).optional().describe('Minimum rating filter (1-5)'),
      rating_max: z.number().min(1).max(5).optional().describe('Maximum rating filter (1-5)'),
      reviews_min: z.number().optional().describe('Minimum number of reviews filter'),
      filters: z.array(z.any()).optional().describe('Array of filter conditions for database search'),
      order_by: z.array(z.string()).optional().describe('Array of fields to order results by'),
      limit: z.number().min(1).max(1000).optional().default(100).describe('Number of results to return (1-1000)'),
      offset: z.number().min(0).optional().default(0).describe('Offset for pagination'),
    };
  }

  async handle(params) {
    try {
      console.log('🔍 Databases Amazon Products Request:', JSON.stringify(params, null, 2));
      
      const requestData = {};
      
      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.keyword) requestData.keyword = params.keyword;
      if (params.product_title) requestData.product_title = params.product_title;
      if (params.category) requestData.category = params.category;
      if (params.price_min) requestData.price_min = params.price_min;
      if (params.price_max) requestData.price_max = params.price_max;
      if (params.rating_min) requestData.rating_min = params.rating_min;
      if (params.rating_max) requestData.rating_max = params.rating_max;
      if (params.reviews_min) requestData.reviews_min = params.reviews_min;
      if (params.filters) requestData.filters = params.filters;
      if (params.order_by) requestData.order_by = params.order_by;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/databases/amazon/products', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
