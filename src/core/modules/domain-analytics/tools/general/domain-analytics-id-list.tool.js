import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class DomainAnalyticsIdListTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'domain_analytics_id_list';
  }

  getDescription() {
    return `This endpoint is designed to provide you with the list of IDs and metadata of the completed Domain Analytics tasks during the specified period. You will get all task IDs that were made including successful, uncompleted, and tasks that responded as errors.`;
  }

  getParams() {
    return {
      limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned tasks"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array of returned tasks"),
      date_from: z.string().optional().describe("start date for filtering tasks (YYYY-MM-DD format)"),
      date_to: z.string().optional().describe("end date for filtering tasks (YYYY-MM-DD format)")
    };
  }

  async handle(params) {
    try {
      const requestData = {};
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;
      if (params.date_from) requestData.date_from = params.date_from;
      if (params.date_to) requestData.date_to = params.date_to;

      const response = await this.client.makeRequest('/v3/domain_analytics/id_list', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 