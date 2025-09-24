import { BaseTool } from '../../../../../../base.tool.js';
// DataForSEOClient import removed

export class GoogleAdsLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_languages';
  }

  getDescription() {
    return 'Get the list of languages supported by Google Ads API';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_ads/languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
