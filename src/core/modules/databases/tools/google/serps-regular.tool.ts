import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class DatabasesGoogleSerpsRegularTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'databases_google_serps_regular';
  }

  getDescription(): string {
    return 'Access Google Regular SERP Database containing standard organic and paid search results and featured snippets along with accurate keyword metrics for relevant search terms';
  }

  getParams(): z.ZodRawShape {
    return {
      location_name: z.string().optional().describe('Location name for database search (e.g., "Germany", "United States")'),
      location_code: z.number().optional().describe('Location code for database search (alternative to location_name)'),
      language_code: z.string().optional().describe('Language code for database search (e.g., "en", "de")'),
      keyword: z.string().optional().describe('Keyword to search in the database'),
      domain: z.string().optional().describe('Domain to search for in the database'),
      filters: z.array(z.any()).optional().describe('Array of filter conditions for database search'),
      order_by: z.array(z.string()).optional().describe('Array of fields to order results by'),
      limit: z.number().min(1).max(1000).optional().default(100).describe('Number of results to return (1-1000)'),
      offset: z.number().min(0).optional().default(0).describe('Offset for pagination'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      console.log('🔍 Databases Google SERPs Regular Request:', JSON.stringify(params, null, 2));
      
      const requestData: any = {};
      
      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.keyword) requestData.keyword = params.keyword;
      if (params.domain) requestData.domain = params.domain;
      if (params.filters) requestData.filters = params.filters;
      if (params.order_by) requestData.order_by = params.order_by;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/databases/google/serps_regular', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
