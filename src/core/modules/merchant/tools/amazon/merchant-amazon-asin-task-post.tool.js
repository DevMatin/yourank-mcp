import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonAsinTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_amazon_asin_task_post';
  }

  getDescription() {
    return 'Post a task to get Amazon ASIN information';
  }

  getParams() {
    return {
      asin: z.string().describe("ASIN to get information for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      device: z.string().optional().describe("Device type (desktop, mobile)"),
    };
  }

  async handle(params) {
    try {
      const requestData = [{
        asin: params.asin,
        location_code: params.location_code,
        language_code: params.language_code,
        device: params.device || 'desktop',
      }];

      const response = await this.client.makeRequest(
        '/v3/merchant/amazon/asin/task_post',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
