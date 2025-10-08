import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpGoogleLocationsCountryTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_locations_country';
  }

  getDescription(): string {
    return 'Get list of Google SERP locations filtered by country';
  }

  getParams(): z.ZodRawShape {
    return {
      country: z.string().describe("Country ISO code (e.g., 'us', 'de', 'fr')"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(`/v3/serp/google/locations/${params.country}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
