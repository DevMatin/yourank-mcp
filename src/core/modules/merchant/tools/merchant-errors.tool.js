import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class MerchantErrorsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_errors';
  }

  getDescription() {
    return 'Get information about Merchant API tasks that returned an error within the past 7 days';
  }

  getParams() {
    return {
      limit: z.number().min(1).max(1000).default(100).describe("Maximum number of errors to return"),
      offset: z.number().min(0).default(0).describe("Number of errors to skip"),
    };
  }

  async handle(params) {
    try {
      const requestData = [{
        limit: params.limit,
        offset: params.offset,
      }];

      const response = await this.client.makeRequest(
        '/v3/merchant/errors',
        'POST',
        requestData
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
