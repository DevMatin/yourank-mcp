import { BaseTool } from '../../../../../../base.tool.js';
// DataForSEOClient import removed

export class GoogleAdsStatusTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_status';
  }

  getDescription() {
    return 'Check if Google updated keyword data for the previous month';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_ads/status', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
