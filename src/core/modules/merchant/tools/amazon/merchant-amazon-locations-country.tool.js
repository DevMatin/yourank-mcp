import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonLocationsCountryTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_amazon_locations_country';
  }

  getDescription() {
    return 'Get the list of supported Amazon locations filtered by country';
  }

  getParams() {
    return {
      country: z.string().describe("Country ISO code (e.g., 'us', 'de', 'uk')"),
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        `/v3/merchant/amazon/locations/${params.country}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
