import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class DomainAnalyticsTechnologiesTechnologiesSummaryLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'domain_analytics_technologies_technologies_summary_live';
  }

  getDescription() {
    return `The Technologies Summary endpoint will provide you with the number of domains across different countries and languages that use the specified technology names, technology groups, or technology categories.`;
  }

  getParams() {
    return {
      target: z.string().describe("target technology, category, or group"),
      location_code: z.number().optional().describe("location code for filtering results"),
      language_code: z.string().optional().describe("language code for filtering results"),
      limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned results"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/domain_analytics/technologies/technologies_summary/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 