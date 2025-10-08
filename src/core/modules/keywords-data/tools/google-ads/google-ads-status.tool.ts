import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class GoogleAdsStatusTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_status';
  }

  getDescription(): string {
    return 'Check if Google updated keyword data for the previous month';
  }

  getParams() {
    return {};
  }

  async handle(): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/status', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
