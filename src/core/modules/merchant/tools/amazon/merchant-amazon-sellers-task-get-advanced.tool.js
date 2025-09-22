import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonSellersTaskGetAdvancedTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_amazon_sellers_task_get_advanced';
  }

  getDescription() {
    return 'Get advanced results of a completed Amazon sellers task';
  }

  getParams() {
    return {
      id: z.string().describe("Task identifier (UUID)"),
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        `/v3/merchant/amazon/sellers/task_get/advanced/${params.id}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
