import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class BusinessListingsLocationsTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_business_listings_locations';
  }

  getDescription() {
    return `You will receive the list of locations by this API call. You can also download the full list of supported locations in the CSV format.`;
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/business_data/business_listings/locations', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
