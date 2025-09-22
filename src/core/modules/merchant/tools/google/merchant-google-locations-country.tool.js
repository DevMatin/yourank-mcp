import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantGoogleLocationsCountryTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_google_locations_country';
  }

  getDescription() {
    return 'Get the list of supported Google Shopping locations filtered by country';
  }

  getParams() {
    return {
      country: z.string().describe("Country ISO code (e.g., 'us', 'de', 'uk')"),
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        `/v3/merchant/google/locations/${params.country}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
