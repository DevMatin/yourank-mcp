import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantGoogleLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_google_languages';
  }

  getDescription() {
    return 'Get the list of supported Google Shopping languages';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        '/v3/merchant/google/languages',
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
