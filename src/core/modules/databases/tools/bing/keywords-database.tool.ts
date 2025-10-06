import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class DatabasesBingKeywordsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'databases_bing_keywords';
  }

  getDescription(): string {
    return 'Access Bing Keywords Database encompassing millions of search terms enriched with related data from Bing Ads including search volume history, current search volume, and more';
  }

  getParams(): z.ZodRawShape {
    return {
      location_name: z.string().optional().describe('Location name for database search (e.g., "Germany", "United States")'),
      location_code: z.number().optional().describe('Location code for database search (alternative to location_name)'),
      language_code: z.string().optional().describe('Language code for database search (e.g., "en", "de")'),
      keyword: z.string().optional().describe('Keyword to search in the database'),
      keyword_part: z.string().optional().describe('Partial keyword to search for'),
      search_volume_min: z.number().optional().describe('Minimum search volume filter'),
      search_volume_max: z.number().optional().describe('Maximum search volume filter'),
      cpc_min: z.number().optional().describe('Minimum CPC filter'),
      cpc_max: z.number().optional().describe('Maximum CPC filter'),
      filters: z.array(z.any()).optional().describe('Array of filter conditions for database search'),
      order_by: z.array(z.string()).optional().describe('Array of fields to order results by'),
      limit: z.number().min(1).max(1000).optional().default(100).describe('Number of results to return (1-1000)'),
      offset: z.number().min(0).optional().default(0).describe('Offset for pagination'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      console.log('🔍 Databases Bing Keywords Request:', JSON.stringify(params, null, 2));
      
      const requestData: any = {};
      
      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.keyword) requestData.keyword = params.keyword;
      if (params.keyword_part) requestData.keyword_part = params.keyword_part;
      if (params.search_volume_min) requestData.search_volume_min = params.search_volume_min;
      if (params.search_volume_max) requestData.search_volume_max = params.search_volume_max;
      if (params.cpc_min) requestData.cpc_min = params.cpc_min;
      if (params.cpc_max) requestData.cpc_max = params.cpc_max;
      if (params.filters) requestData.filters = params.filters;
      if (params.order_by) requestData.order_by = params.order_by;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/databases/bing/keywords', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
