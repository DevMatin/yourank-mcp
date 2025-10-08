import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpBingLocationsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_bing_locations';
  }

  getDescription(): string {
    return 'Get list of available locations for Bing SERP';
  }

  getParams(): z.ZodRawShape {
    return {
      country: z.string().optional().describe("Country code to filter locations (e.g., 'US', 'DE')")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.country) {
        queryParams.append('country', params.country);
      }

      const endpoint = `/v3/serp/bing/locations${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await this.dataForSEOClient.makeRequest(endpoint, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
