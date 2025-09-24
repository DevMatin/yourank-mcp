import { BaseTool } from '../../../../../../base.tool.js';

export class BingLocationsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_locations';
  }

  getDescription() {
    return 'Get list of locations supported by Bing Ads Keywords Data API.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/locations');
  }
}
