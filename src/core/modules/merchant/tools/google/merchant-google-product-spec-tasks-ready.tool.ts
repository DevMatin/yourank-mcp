import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class MerchantGoogleProductSpecTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_google_product_spec_tasks_ready';
  }

  getDescription(): string {
    return 'Get the list of completed Google Shopping product spec tasks that are ready for collection';
  }

  getParams(): z.ZodRawShape {
    return {

    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/merchant/google/product_spec/tasks_ready',
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
