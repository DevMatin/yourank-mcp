import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantGoogleProductsTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_google_products_tasks_ready';
  }

  getDescription() {
    return 'Get the list of completed Google Shopping products tasks that are ready for collection';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        '/v3/merchant/google/products/tasks_ready',
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
