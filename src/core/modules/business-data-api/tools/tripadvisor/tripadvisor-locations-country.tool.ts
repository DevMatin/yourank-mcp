import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class TripadvisorLocationsCountryTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_tripadvisor_locations_country';
  }

  getDescription(): string {
    return `You will receive the list of locations by this API call. You can filter the list of locations by country when setting a task. Note that supported location types in Tripadvisor Business Data API are City and Region only.`;
  }

  getParams(): z.ZodRawShape {
    return {
      country: z.string().describe("country ISO code (e.g., 'us', 'de', 'uk')")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(`/v3/business_data/tripadvisor/locations/${params.country}`, 'POST', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
