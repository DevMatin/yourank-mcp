import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonLocationsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_amazon_locations';
  }

  getDescription() {
    return 'Get the list of supported Amazon locations';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        '/v3/merchant/amazon/locations',
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
