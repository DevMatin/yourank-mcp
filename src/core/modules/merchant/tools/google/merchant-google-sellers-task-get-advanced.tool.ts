import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class MerchantGoogleSellersTaskGetAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_google_sellers_task_get_advanced';
  }

  getDescription(): string {
    return 'Get advanced results of a completed Google Shopping sellers task';
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task identifier (UUID)"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/merchant/google/sellers/task_get/advanced/{id}',
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
