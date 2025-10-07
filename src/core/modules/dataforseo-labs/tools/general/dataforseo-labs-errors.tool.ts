import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class DataForSeoLabsErrorsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'dataforseo_labs_errors';
  }

  getDescription(): string {
    return 'Receive information about the DataForSEO Labs API tasks that returned an error within the past 7 days';
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().optional().describe("Maximum number of returned tasks. Default value: 100, maximum value: 1000"),
      offset: z.number().optional().describe("Offset in the results array. Default value: 0")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {};
      
      if (params.limit) {
        requestData.limit = params.limit;
      }
      if (params.offset) {
        requestData.offset = params.offset;
      }

      const response = await this.client.makeRequest('/v3/dataforseo_labs/errors', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
