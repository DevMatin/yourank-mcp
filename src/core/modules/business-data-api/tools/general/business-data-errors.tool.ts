import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class BusinessDataErrorsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_errors';
  }

  getDescription(): string {
    return `By calling this endpoint you will receive information about the Business Data API tasks that returned an error within the past 7 days.`;
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

      const response = await this.dataForSEOClient.makeRequest('/v3/business_data/errors', 'POST', 'POST');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
