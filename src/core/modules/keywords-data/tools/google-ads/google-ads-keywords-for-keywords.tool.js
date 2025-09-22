import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class GoogleAdsKeywordsForKeywordsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_keywords_for_keywords';
  }

  getDescription() {
    return 'Get relevant keywords for the specified terms from Google Ads';
  }

  getParams() {
    return {
      keywords: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of keywords (up to 20)'
      },
      location_name: {
        type: 'string',
        nullable,
        default,
        description: 'Full name of the location (e.g., "United Kingdom")'
      },
      language_code: {
        type: 'string',
        nullable,
        default,
        description: 'Language two-letter ISO code (e.g., "en")'
      },
      search_partners: {
        type: 'boolean',
        nullable,
        default,
        description: 'Include search partners'
      },
      include_serp_info: {
        type: 'boolean',
        nullable,
        default,
        description: 'Include SERP information'
      }
    };
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_ads/keywords_for_keywords/live', 'POST', [{
        keywords: params.keywords,
        location_name: params.location_name,
        language_code: params.language_code,
        search_partners: params.search_partners,
        include_serp_info: params.include_serp_info,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
