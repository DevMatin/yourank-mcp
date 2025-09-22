import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class BacklinksErrorsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'backlinks_errors';
  }

  getDescription(): string {
    return "By calling this endpoint you will receive information about the Backlinks API tasks that returned an error within the past 7 days.";
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
      
      if (params.limit !== undefined) requestData.limit = params.limit;
      if (params.offset !== undefined) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/backlinks/errors', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
