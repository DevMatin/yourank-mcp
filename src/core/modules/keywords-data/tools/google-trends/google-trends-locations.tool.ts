import { BaseTool } from '../../../base.tool';

export class GoogleTrendsLocationsTool extends BaseTool {
  constructor(dataForSEOClient: any) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keywords_data_google_trends_locations';
  }

  getDescription(): string {
    return 'Get the list of locations supported by Google Trends API';
  }

  getParams(): any {
    return {};
  }

  async handle(): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_trends/locations', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
