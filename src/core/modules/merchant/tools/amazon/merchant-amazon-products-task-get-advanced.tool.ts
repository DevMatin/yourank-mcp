import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class MerchantAmazonProductsTaskGetAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_amazon_products_task_get_advanced';
  }

  getDescription(): string {
    return 'Get advanced results of a completed Amazon products task';
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task identifier (UUID)"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        `/v3/merchant/amazon/products/task_get/advanced/${params.id}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
