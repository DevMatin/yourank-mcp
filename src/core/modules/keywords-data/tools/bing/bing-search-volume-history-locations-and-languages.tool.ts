import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingSearchVolumeHistoryLocationsAndLanguagesTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_search_volume_history_locations_and_languages';
  }

  getDescription(): string {
    return 'Get list of locations and languages supported by Bing Search Volume History API.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params: {}): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/bing/search_volume_history/locations_and_languages');
  }
}
