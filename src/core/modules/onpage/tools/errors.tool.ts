import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class ErrorsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'errors';
  }

  getDescription(): string {
    return "OnPage API tasks that returned an error";
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().optional().describe("limit"),
      offset: z.number().optional().describe("offset")
    };
  }

  async handle(params: { limit?: number; offset?: number }): Promise<any> {
    try {
      const requestData: any = {};
      if (params.limit !== undefined) requestData.limit = params.limit;
      if (params.offset !== undefined) requestData.offset = params.offset;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/errors', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}