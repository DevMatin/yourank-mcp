import { BaseTool } from '../../../../../../base.tool.js';

export class BingLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_languages';
  }

  getDescription() {
    return 'Get list of languages supported by Bing Ads Keywords Data API.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/languages');
  }
}


