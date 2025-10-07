import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class DomainAnalyticsTechnologiesTechnologyStatsLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'domain_analytics_technologies_technology_stats_live';
  }

  getDescription(): string {
    return `The Technology Stats endpoint will provide you with historical data on the number of domains across different countries and languages that use the specified technology.`;
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("target technology"),
      location_code: z.number().optional().describe("location code for filtering results"),
      language_code: z.string().optional().describe("language code for filtering results"),
      date_from: z.string().optional().describe("start date for historical data (YYYY-MM-DD format)"),
      date_to: z.string().optional().describe("end date for historical data (YYYY-MM-DD format)")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        target: params.target
      };
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.date_from) requestData.date_from = params.date_from;
      if (params.date_to) requestData.date_to = params.date_to;

      const response = await this.client.makeRequest('/v3/domain_analytics/technologies/technology_stats/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 