import { BaseTool } from '../../../../../../base.tool.js';
// DataForSEOClient import removed

export class DataForSeoTrendsLocationsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'keywords_data_dataforseo_trends_locations';
  }

  getDescription() {
    return 'Get the list of locations supported by DataForSEO Trends API';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/dataforseo_trends/locations', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
