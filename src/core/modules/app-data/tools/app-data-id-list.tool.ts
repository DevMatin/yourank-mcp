import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class AppDataIdListTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'app_data_id_list';
  }

  getDescription(): string {
    return 'Get the list of IDs and metadata of completed App Data tasks during the specified period. Returns all task IDs including successful, uncompleted, and error tasks.';
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().optional().describe("Maximum number of tasks to return"),
      offset: z.number().optional().describe("Number of tasks to skip"),
      date_from: z.string().optional().describe("Start date in YYYY-MM-DD format"),
      date_to: z.string().optional().describe("End date in YYYY-MM-DD format"),
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
      if (params.date_from) {
        requestData.date_from = params.date_from;
      }
      if (params.date_to) {
        requestData.date_to = params.date_to;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/app_data/id_list', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
