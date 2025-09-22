import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class TrustpilotSearchLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_trustpilot_search_live';
  }

  getDescription(): string {
    return `This endpoint provides a list of business profiles listed on the Trustpilot platform. The returned results are relevant to the specified keyword.`;
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("search keyword for businesses"),
      limit: z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned results"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
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
