import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class MerchantAmazonAsinTaskPostTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_amazon_asin_task_post';
  }

  getDescription(): string {
    return 'Post a task to get Amazon ASINs for a product';
  }

  getParams(): z.ZodRawShape {
    return {
      asin: z.string().describe("ASIN to get information for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData = [{
        asin: params.asin,
        location_code: params.location_code,
        language_code: params.language_code,
      }];

      const response = await this.dataForSEOClient.makeRequest(
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
