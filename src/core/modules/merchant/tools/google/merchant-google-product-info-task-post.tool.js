import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantGoogleProductInfoTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_google_product_info_task_post';
  }

  getDescription() {
    return 'Post a task to get Google Shopping product information';
  }

  getParams() {
    return {
      product_id: z.string().describe("Product ID to get information for"),
      location_code: z.number().describe("Location code for Google Shopping"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      device: z.string().optional().describe("Device type (desktop, mobile)"),
    };
  }

  async handle(params) {
    try {
      const requestData = [{
        product_id: params.product_id,
        location_code: params.location_code,
        language_code: params.language_code,
        device: params.device || 'desktop',
      }];

      const response = await this.client.makeRequest(
        '/v3/merchant/google/product_info/task_post',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
