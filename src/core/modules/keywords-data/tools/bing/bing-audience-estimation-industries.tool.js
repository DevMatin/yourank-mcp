import { BaseTool } from '../../../../../../base.tool.js';

export class BingAudienceEstimationIndustriesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_audience_estimation_industries';
  }

  getDescription() {
    return 'Get list of industries supported by Bing Ads Audience Estimation endpoint.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/audience_estimation/industries');
  }
}
