import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class DataForSeoTrendsLocationsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_dataforseo_trends_locations';
  }

  getDescription(): string {
    return 'Get the list of locations supported by DataForSEO Trends API';
  }

  getParams() {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/dataforseo_trends/locations', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
