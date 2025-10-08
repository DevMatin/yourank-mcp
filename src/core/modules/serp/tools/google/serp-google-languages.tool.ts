import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpGoogleLanguagesTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_languages';
  }

  getDescription(): string {
    return 'Get list of available languages for Google SERP';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/serp/google/languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
