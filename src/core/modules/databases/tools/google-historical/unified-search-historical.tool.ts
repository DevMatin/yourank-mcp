import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class DatabasesGoogleHistoricalUnifiedSearchTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'databases_google_historical_unified_search';
  }

  getDescription(): string {
    return 'Access Google Historical Unified Search Database combining Historical Google SERP and Historical Google Keyword Databases with millions of monthly SERP snapshots and billions of keywords with historical data from 2021-08-01';
  }

  getParams(): z.ZodRawShape {
    return {
      location_name: z.string().optional().describe('Location name for database search (e.g., "Germany", "United States")'),
      location_code: z.number().optional().describe('Location code for database search (alternative to location_name)'),
      language_code: z.string().optional().describe('Language code for database search (e.g., "en", "de")'),
      keyword: z.string().optional().describe('Keyword to search in the database'),
      domain: z.string().optional().describe('Domain to search for in the database'),
      date_from: z.string().optional().describe('Start date for historical data (YYYY-MM-DD format, minimum: 2021-08-01)'),
      date_to: z.string().optional().describe('End date for historical data (YYYY-MM-DD format)'),
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
      console.log('🔍 Databases Google Historical Unified Search Request:', JSON.stringify(params, null, 2));
      
      const requestData: any = {};
      
      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.keyword) requestData.keyword = params.keyword;
      if (params.domain) requestData.domain = params.domain;
      if (params.date_from) requestData.date_from = params.date_from;
      if (params.date_to) requestData.date_to = params.date_to;
      if (params.search_volume_min) requestData.search_volume_min = params.search_volume_min;
      if (params.search_volume_max) requestData.search_volume_max = params.search_volume_max;
      if (params.cpc_min) requestData.cpc_min = params.cpc_min;
      if (params.cpc_max) requestData.cpc_max = params.cpc_max;
      if (params.filters) requestData.filters = params.filters;
      if (params.order_by) requestData.order_by = params.order_by;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/databases/google_historical/unified_search', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
