import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class DataForSeoLabsLocationsAndLanguagesTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'dataforseo_labs_locations_and_languages';
  }

  getDescription() {
    return 'Get the full list of locations and languages supported in DataForSEO Labs API. Available sources currently include Google, Bing, and Amazon search engines';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/dataforseo_labs/locations_and_languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
