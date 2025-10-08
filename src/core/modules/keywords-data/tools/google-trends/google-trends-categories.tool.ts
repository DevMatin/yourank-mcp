import { BaseTool } from '../../../base.tool';

export class GoogleTrendsCategoriesTool extends BaseTool {
  constructor(dataForSEOClient: any) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keywords_data_google_trends_categories';
  }

  getDescription(): string {
    return 'This endpoint will provide you list of Google Trends Categories';
  }

  getParams(): any {
    return {};
  }

  async handle(): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_trends/categories/live', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
