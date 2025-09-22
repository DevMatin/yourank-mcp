import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonAsinTaskGetAdvancedTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_amazon_asin_task_get_advanced';
  }

  getDescription() {
    return 'Get advanced results of a completed Amazon ASIN task';
  }

  getParams() {
    return {
      id: z.string().describe("Task identifier (UUID)"),
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        `/v3/merchant/amazon/asin/task_get/advanced/${params.id}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
