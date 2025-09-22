import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantGoogleProductSpecTaskGetHtmlTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_google_product_spec_task_get_html';
  }

  getDescription() {
    return 'Get HTML results of a completed Google Shopping product spec task';
  }

  getParams() {
    return {
      id: z.string().describe("Task identifier (UUID)"),
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        `/v3/merchant/google/product_spec/task_get/html/${params.id}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
