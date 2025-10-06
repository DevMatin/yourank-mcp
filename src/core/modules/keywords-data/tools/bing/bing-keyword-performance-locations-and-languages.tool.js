import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordPerformanceLocationsAndLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keyword_performance_locations_and_languages';
  }

  getDescription() {
    return 'Get list of locations and languages supported by Bing Keyword Performance API.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/keyword_performance/locations_and_languages');
  }
}
