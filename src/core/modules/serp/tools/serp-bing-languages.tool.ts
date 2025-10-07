import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class SerpBingLanguagesTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_bing_languages';
  }

  getDescription(): string {
    return 'Get list of available languages for Bing SERP';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/serp/bing/languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
