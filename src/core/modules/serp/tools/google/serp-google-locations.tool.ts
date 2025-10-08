import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpGoogleLocationsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_locations';
  }

  getDescription(): string {
    return 'Get list of Google SERP locations';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/serp/google/locations', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
