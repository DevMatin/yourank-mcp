import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class DomainAnalyticsTechnologiesAggregationTechnologiesLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'domain_analytics_technologies_aggregation_technologies_live';
  }

  getDescription(): string {
    return `The Aggregation Technologies endpoint will provide you with a list of the most popular technologies websites use alongside the technologies you specify. Alternatively, you can specify technology categories or groups to obtain wider stats.`;
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("target technology, category, or group"),
      location_code: z.number().optional().describe("location code for filtering results"),
      language_code: z.string().optional().describe("language code for filtering results"),
      limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned results"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        target: params.target
      };
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/domain_analytics/technologies/aggregation_technologies/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 