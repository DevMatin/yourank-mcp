import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class MerchantGoogleProductSpecTaskPostTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_google_product_spec_task_post';
  }

  getDescription(): string {
    return 'Post a task to get Google Shopping product specifications';
  }

  getParams(): z.ZodRawShape {
    return {
      product_id: z.string().describe("Product ID to get specifications for"),
      location_code: z.number().describe("Location code for Google Shopping"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData = [{
        product_id: params.product_id,
        location_code: params.location_code,
        language_code: params.language_code,
      }];

      const response = await this.dataForSEOClient.makeRequest(
        '/v3/merchant/google/product_spec/task_post',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
