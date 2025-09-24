import { BaseTool } from '../../../../../../base.tool.js';
// DataForSEOClient import removed

export class GoogleAdsLocationsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_locations';
  }

  getDescription() {
    return 'Get the list of locations supported by Google Ads API';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_ads/locations', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
