import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class DatabasesWhoisDomainsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'databases_whois_domains';
  }

  getDescription(): string {
    return 'Access Whois Domains Database providing full access to structured Whois and search visibility data for millions of domains including timeline, updates, statuses, and search visibility metrics';
  }

  getParams(): z.ZodRawShape {
    return {
      domain: z.string().optional().describe('Domain to search for in the database'),
      domain_part: z.string().optional().describe('Partial domain to search for'),
      tld: z.string().optional().describe('Top-level domain filter (e.g., "com", "org", "de")'),
      registrar: z.string().optional().describe('Domain registrar filter'),
      creation_date_from: z.string().optional().describe('Domain creation date from (YYYY-MM-DD format)'),
      creation_date_to: z.string().optional().describe('Domain creation date to (YYYY-MM-DD format)'),
      expiration_date_from: z.string().optional().describe('Domain expiration date from (YYYY-MM-DD format)'),
      expiration_date_to: z.string().optional().describe('Domain expiration date to (YYYY-MM-DD format)'),
      status: z.string().optional().describe('Domain status filter (e.g., "active", "expired", "pending")'),
      visibility_score_min: z.number().min(0).max(100).optional().describe('Minimum visibility score filter (0-100)'),
      visibility_score_max: z.number().min(0).max(100).optional().describe('Maximum visibility score filter (0-100)'),
      filters: z.array(z.any()).optional().describe('Array of filter conditions for database search'),
      order_by: z.array(z.string()).optional().describe('Array of fields to order results by'),
      limit: z.number().min(1).max(1000).optional().default(100).describe('Number of results to return (1-1000)'),
      offset: z.number().min(0).optional().default(0).describe('Offset for pagination'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      console.log('🔍 Databases Whois Domains Request:', JSON.stringify(params, null, 2));
      
      const requestData: any = {};
      
      if (params.domain) requestData.domain = params.domain;
      if (params.domain_part) requestData.domain_part = params.domain_part;
      if (params.tld) requestData.tld = params.tld;
      if (params.registrar) requestData.registrar = params.registrar;
      if (params.creation_date_from) requestData.creation_date_from = params.creation_date_from;
      if (params.creation_date_to) requestData.creation_date_to = params.creation_date_to;
      if (params.expiration_date_from) requestData.expiration_date_from = params.expiration_date_from;
      if (params.expiration_date_to) requestData.expiration_date_to = params.expiration_date_to;
      if (params.status) requestData.status = params.status;
      if (params.visibility_score_min) requestData.visibility_score_min = params.visibility_score_min;
      if (params.visibility_score_max) requestData.visibility_score_max = params.visibility_score_max;
      if (params.filters) requestData.filters = params.filters;
      if (params.order_by) requestData.order_by = params.order_by;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/databases/whois/overview', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
