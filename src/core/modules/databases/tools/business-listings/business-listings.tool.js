import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class DatabasesBusinessListingsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'databases_business_listings';
  }

  getDescription() {
    return 'Access Business Listings Database encompassing millions of point-of-interest (POI) records with public details of business entities including service description, address, contact phone, domain, rating, work hours and popular hours';
  }

  getParams() {
    return {
      location_name: z.string().optional().describe('Location name for database search (e.g., "Germany", "United States")'),
      location_code: z.number().optional().describe('Location code for database search (alternative to location_name)'),
      language_code: z.string().optional().describe('Language code for database search (e.g., "en", "de")'),
      business_name: z.string().optional().describe('Business name to search for'),
      category: z.string().optional().describe('Business category filter'),
      rating_min: z.number().min(1).max(5).optional().describe('Minimum rating filter (1-5)'),
      rating_max: z.number().min(1).max(5).optional().describe('Maximum rating filter (1-5)'),
      reviews_min: z.number().optional().describe('Minimum number of reviews filter'),
      price_level_min: z.number().min(1).max(4).optional().describe('Minimum price level filter (1-4)'),
      price_level_max: z.number().min(1).max(4).optional().describe('Maximum price level filter (1-4)'),
      has_phone: z.boolean().optional().describe('Filter for businesses with phone numbers'),
      has_website: z.boolean().optional().describe('Filter for businesses with websites'),
      filters: z.array(z.any()).optional().describe('Array of filter conditions for database search'),
      order_by: z.array(z.string()).optional().describe('Array of fields to order results by'),
      limit: z.number().min(1).max(1000).optional().default(100).describe('Number of results to return (1-1000)'),
      offset: z.number().min(0).optional().default(0).describe('Offset for pagination'),
    };
  }

  async handle(params) {
    try {
      console.log('🔍 Databases Business Listings Request:', JSON.stringify(params, null, 2));
      
      const requestData = {};
      
      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.business_name) requestData.business_name = params.business_name;
      if (params.category) requestData.category = params.category;
      if (params.rating_min) requestData.rating_min = params.rating_min;
      if (params.rating_max) requestData.rating_max = params.rating_max;
      if (params.reviews_min) requestData.reviews_min = params.reviews_min;
      if (params.price_level_min) requestData.price_level_min = params.price_level_min;
      if (params.price_level_max) requestData.price_level_max = params.price_level_max;
      if (params.has_phone) requestData.has_phone = params.has_phone;
      if (params.has_website) requestData.has_website = params.has_website;
      if (params.filters) requestData.filters = params.filters;
      if (params.order_by) requestData.order_by = params.order_by;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/databases/business_listings/search', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
