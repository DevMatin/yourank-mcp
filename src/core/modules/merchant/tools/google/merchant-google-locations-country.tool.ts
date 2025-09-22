import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class MerchantGoogleLocationsCountryTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_google_locations_country';
  }

  getDescription(): string {
    return 'Get the list of supported Google Shopping locations filtered by country';
  }

  getParams(): z.ZodRawShape {
    return {
      country: z.string().describe("Country ISO code (e.g., 'us', 'de', 'uk')"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        `/v3/merchant/google/locations/${params.country}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
