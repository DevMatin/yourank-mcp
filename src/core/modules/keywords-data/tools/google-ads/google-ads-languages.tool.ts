import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class GoogleAdsLanguagesTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_languages';
  }

  getDescription(): string {
    return 'Get the list of languages supported by Google Ads API';
  }

  getParams() {
    return {};
  }

  async handle(): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
