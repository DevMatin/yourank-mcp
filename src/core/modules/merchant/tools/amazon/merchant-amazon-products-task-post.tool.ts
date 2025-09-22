import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class MerchantAmazonProductsTaskPostTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_amazon_products_task_post';
  }

  getDescription(): string {
    return 'Post a task to search Amazon products by keyword';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Product keyword to search for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      device: z.string().optional().describe("Device type (desktop, mobile)"),
      depth: z.number().min(1).max(100).default(20).describe("Number of results to retrieve"),
      include_ratings: z.boolean().default(true).describe("Include product ratings"),
      include_reviews: z.boolean().default(false).describe("Include product reviews"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData = [{
        keyword: params.keyword,
        location_code: params.location_code,
        language_code: params.language_code,
        device: params.device || 'desktop',
        depth: params.depth,
        include_ratings: params.include_ratings,
        include_reviews: params.include_reviews,
      }];

      const response = await this.dataForSEOClient.makeRequest(
        '/v3/merchant/amazon/products/task_post',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
