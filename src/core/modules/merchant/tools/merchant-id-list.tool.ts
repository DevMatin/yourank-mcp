import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class MerchantIdListTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_id_list';
  }

  getDescription(): string {
    return 'Get the list of IDs and metadata of completed Merchant tasks during the specified period';
  }

  getParams(): z.ZodRawShape {
    return {
      date_from: z.string().optional().describe("Start date in YYYY-MM-DD format"),
      date_to: z.string().optional().describe("End date in YYYY-MM-DD format"),
      limit: z.number().min(1).max(1000).default(100).describe("Maximum number of tasks to return"),
      offset: z.number().min(0).default(0).describe("Number of tasks to skip"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData = [{
        date_from: params.date_from,
        date_to: params.date_to,
        limit: params.limit,
        offset: params.offset,
      }];

      const response = await this.dataForSEOClient.makeRequest(
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
