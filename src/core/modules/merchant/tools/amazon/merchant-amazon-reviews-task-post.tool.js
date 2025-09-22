import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonReviewsTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_amazon_reviews_task_post';
  }

  getDescription() {
    return 'Post a task to get Amazon product reviews';
  }

  getParams() {
    return {
      asin: z.string().describe("ASIN to get reviews for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      device: z.string().optional().describe("Device type (desktop, mobile)"),
      depth: z.number().min(1).max(100).default(20).describe("Number of reviews to retrieve"),
    };
  }

  async handle(params) {
    try {
      const requestData = [{
        asin: params.asin,
        location_code: params.location_code,
        language_code: params.language_code,
        device: params.device || 'desktop',
        depth: params.depth,
      }];

      const response = await this.client.makeRequest(
        '/v3/merchant/amazon/reviews/task_post',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
