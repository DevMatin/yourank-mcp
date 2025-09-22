import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class MerchantIdListTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_id_list';
  }

  getDescription() {
    return 'Get the list of IDs and metadata of completed Merchant tasks during the specified period';
  }

  getParams() {
    return {
      date_from: z.string().optional().describe("Start date in YYYY-MM-DD format"),
      date_to: z.string().optional().describe("End date in YYYY-MM-DD format"),
      limit: z.number().min(1).max(1000).default(100).describe("Maximum number of tasks to return"),
      offset: z.number().min(0).default(0).describe("Number of tasks to skip"),
    };
  }

  async handle(params) {
    try {
      const requestData = [{
        date_from: params.date_from,
        date_to: params.date_to,
        limit: params.limit,
        offset: params.offset,
      }];

      const response = await this.client.makeRequest(
        '/v3/merchant/id_list',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
