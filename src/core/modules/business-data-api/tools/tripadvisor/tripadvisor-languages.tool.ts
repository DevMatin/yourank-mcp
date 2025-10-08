import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class TripadvisorLanguagesTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_tripadvisor_languages';
  }

  getDescription(): string {
    return `You will receive the list of languages by calling this API.`;
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/business_data/tripadvisor/languages', 'POST', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
