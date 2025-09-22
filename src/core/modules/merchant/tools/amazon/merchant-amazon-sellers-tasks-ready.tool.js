import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonSellersTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_amazon_sellers_tasks_ready';
  }

  getDescription() {
    return 'Get the list of completed Amazon sellers tasks that are ready for collection';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        '/v3/merchant/amazon/sellers/tasks_ready',
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
