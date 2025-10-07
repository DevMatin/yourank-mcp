import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class DomainAnalyticsErrorsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'domain_analytics_errors';
  }

  getDescription(): string {
    return `By calling this endpoint you will receive information about the Domain Analytics API tasks that returned an error within the past 7 days.`;
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned errors"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array of returned errors")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {};
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/domain_analytics/errors', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 