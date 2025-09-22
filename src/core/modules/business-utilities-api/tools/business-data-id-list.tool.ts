import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class BusinessDataIdListTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_id_list';
  }

  getDescription(): string {
    return `This endpoint is designed to provide you with the list of IDs and metadata of the completed Business Data tasks during the specified period. You will get all task IDs that were made including successful, uncompleted, and tasks that responded as errors.`;
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned tasks"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array of returned tasks"),
      date_from: z.string().optional().describe("start date for filtering tasks (format: YYYY-MM-DD)"),
      date_to: z.string().optional().describe("end date for filtering tasks (format: YYYY-MM-DD)")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {};
      
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;
      if (params.date_from) requestData.date_from = params.date_from;
      if (params.date_to) requestData.date_to = params.date_to;

      const response = await this.client.makeRequest('/v3/business_data/id_list', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
