import { BaseTool } from '../../../../../../base.tool.js';

export class BingSearchVolumeHistoryLocationsAndLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_search_volume_history_locations_and_languages';
  }

  getDescription() {
    return 'Get list of locations and languages supported by Bing Search Volume History API.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/search_volume_history/locations_and_languages');
  }
}
