import { BaseTool } from '../../../../../../base.tool.js';

export class ClickstreamDataLocationsAndLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_clickstream_data_locations_and_languages';
  }

  getDescription() {
    return 'Get list of locations and languages supported by DataForSEO Clickstream Data API.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/clickstream_data/locations_and_languages');
  }
}
