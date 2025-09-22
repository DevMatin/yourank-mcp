import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class IdListTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'idlist';
  }

  getDescription(): string {
    return "List of IDs and metadata of completed OnPage tasks";
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().optional().describe("limit"),
      offset: z.number().optional().describe("offset"),
      date_from: z.string().optional().describe("date_from"),
      date_to: z.string().optional().describe("date_to")
    };
  }

  async handle(params: { limit?: number; offset?: number; date_from?: string; date_to?: string }): Promise<any> {
    try {
      const requestData: any = {};
      if (params.limit !== undefined) requestData.limit = params.limit;
      if (params.offset !== undefined) requestData.offset = params.offset;
      if (params.date_from !== undefined) requestData.date_from = params.date_from;
      if (params.date_to !== undefined) requestData.date_to = params.date_to;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/id_list', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}