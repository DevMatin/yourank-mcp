import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class MerchantGoogleSellersTaskPostTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_google_sellers_task_post';
  }

  getDescription(): string {
    return 'Post a task to search Google Shopping sellers for a product';
  }

  getParams(): z.ZodRawShape {
    return {
      product_id: z.string().describe("Product ID to search sellers for"),
      location_code: z.number().describe("Location code for Google Shopping"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      device: z.string().optional().describe("Device type (desktop, mobile)"),
      depth: z.number().min(1).max(100).default(20).describe("Number of results to retrieve"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData = [{
        product_id: params.product_id,
        location_code: params.location_code,
        language_code: params.language_code,
        device: params.device,
        depth: params.depth,
      }];

      const response = await this.dataForSEOClient.makeRequest(
        '/v3/merchant/google/sellers/task_post',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
