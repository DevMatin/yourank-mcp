import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class DatabasesBacklinkSummaryTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'databases_backlink_summary';
  }

  getDescription(): string {
    return 'Access Backlink Summary Database providing backlink data and other related metrics for millions of domains including inbound links, referring domains, referring pages, new & lost backlinks, and backlink spam score';
  }

  getParams(): z.ZodRawShape {
    return {
      domain: z.string().optional().describe('Domain to search for in the database'),
      domain_part: z.string().optional().describe('Partial domain to search for'),
      backlinks_min: z.number().optional().describe('Minimum number of backlinks filter'),
      backlinks_max: z.number().optional().describe('Maximum number of backlinks filter'),
      referring_domains_min: z.number().optional().describe('Minimum number of referring domains filter'),
      referring_domains_max: z.number().optional().describe('Maximum number of referring domains filter'),
      referring_pages_min: z.number().optional().describe('Minimum number of referring pages filter'),
      referring_pages_max: z.number().optional().describe('Maximum number of referring pages filter'),
      spam_score_min: z.number().min(0).max(100).optional().describe('Minimum spam score filter (0-100)'),
      spam_score_max: z.number().min(0).max(100).optional().describe('Maximum spam score filter (0-100)'),
      filters: z.array(z.any()).optional().describe('Array of filter conditions for database search'),
      order_by: z.array(z.string()).optional().describe('Array of fields to order results by'),
      limit: z.number().min(1).max(1000).optional().default(100).describe('Number of results to return (1-1000)'),
      offset: z.number().min(0).optional().default(0).describe('Offset for pagination'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      console.log('🔍 Databases Backlink Summary Request:', JSON.stringify(params, null, 2));
      
      const requestData: any = {};
      
      if (params.domain) requestData.domain = params.domain;
      if (params.domain_part) requestData.domain_part = params.domain_part;
      if (params.backlinks_min) requestData.backlinks_min = params.backlinks_min;
      if (params.backlinks_max) requestData.backlinks_max = params.backlinks_max;
      if (params.referring_domains_min) requestData.referring_domains_min = params.referring_domains_min;
      if (params.referring_domains_max) requestData.referring_domains_max = params.referring_domains_max;
      if (params.referring_pages_min) requestData.referring_pages_min = params.referring_pages_min;
      if (params.referring_pages_max) requestData.referring_pages_max = params.referring_pages_max;
      if (params.spam_score_min) requestData.spam_score_min = params.spam_score_min;
      if (params.spam_score_max) requestData.spam_score_max = params.spam_score_max;
      if (params.filters) requestData.filters = params.filters;
      if (params.order_by) requestData.order_by = params.order_by;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/databases/backlinks/summary', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
