import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class TrustpilotSearchLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_trustpilot_search_live';
  }

  getDescription() {
    return `This endpoint provides a list of business profiles listed on the Trustpilot platform. The returned results are relevant to the specified keyword.`;
  }

  getParams() {
    return {
      keyword: z.string().describe("search keyword for businesses"),
      limit: z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned results"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        keyword: params.keyword
      };
      
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/business_data/trustpilot/search/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
