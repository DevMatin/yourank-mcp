import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class MerchantAmazonReviewsTaskPostTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_amazon_reviews_task_post';
  }

  getDescription(): string {
    return 'Post a task to get Amazon product reviews';
  }

  getParams(): z.ZodRawShape {
    return {
      asin: z.string().describe("ASIN to get reviews for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      depth: z.number().min(1).max(100).default(20).describe("Number of reviews to retrieve"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData = [{
        asin: params.asin,
        location_code: params.location_code,
        language_code: params.language_code,
        depth: params.depth,
      }];

      const response = await this.dataForSEOClient.makeRequest(
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
