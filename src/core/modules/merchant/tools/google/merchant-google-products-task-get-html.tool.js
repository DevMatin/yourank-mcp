import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantGoogleProductsTaskGetHtmlTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_google_products_task_get_html';
  }

  getDescription() {
    return 'Get HTML results of a completed Google Shopping products task';
  }

  getParams() {
    return {
      id: z.string().describe("Task identifier (UUID)"),
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        `/v3/merchant/google/products/task_get/html/${params.id}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
