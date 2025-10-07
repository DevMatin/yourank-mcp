import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class ClickstreamDataLocationsAndLanguagesTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_clickstream_data_locations_and_languages';
  }

  getDescription(): string {
    return 'Get available locations and languages for clickstream data analysis.';
  }

  getParams() {
    return {};
  }

  async handle(): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/clickstream_data/locations_and_languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
