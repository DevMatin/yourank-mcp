import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class BusinessListingsCategoriesTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_business_listings_categories';
  }

  getDescription() {
    return `This endpoint will provide you with the list of top categories by business count.`;
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/business_data/business_listings/categories', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
