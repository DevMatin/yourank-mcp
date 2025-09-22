import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class TripadvisorLanguagesTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_tripadvisor_languages';
  }

  getDescription() {
    return `You will receive the list of languages by calling this API.`;
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/business_data/tripadvisor/languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
