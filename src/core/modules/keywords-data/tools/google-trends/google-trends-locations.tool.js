import { BaseTool } from '../../../../../../base.tool.js';
// DataForSEOClient import removed

export class GoogleTrendsLocationsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'keywords_data_google_trends_locations';
  }

  getDescription() {
    return 'Get the list of locations supported by Google Trends API';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_trends/locations', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
