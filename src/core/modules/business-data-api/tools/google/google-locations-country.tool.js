import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class GoogleLocationsCountryTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_google_locations_country';
  }

  getDescription() {
    return `You will receive the list of locations by this API call. You can filter the list of locations by country when setting a task.`;
  }

  getParams() {
    return {
      country: z.string().describe("country ISO code (e.g., 'us', 'de', 'uk')")
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(`/v3/business_data/google/locations/${params.country}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
