import { BaseTool } from '../../../../../../base.tool.js';
// DataForSEOClient import removed

export class GoogleAdsKeywordsForSiteTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_keywords_for_site';
  }

  getDescription() {
    return 'Get keywords relevant to the specified domain along with their bids, search volumes, and competition levels';
  }

  getParams() {
    return {
      target: {
        type: 'string',
        description: 'Target domain or URL'
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
      },
      include_subdomains: {
        type: 'boolean',
        nullable,
        default,
        description: 'Include subdomains'
      }
    };
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_ads/keywords_for_site/live', 'POST', [{
        target: params.target,
        location_name: params.location_name,
        language_code: params.language_code,
        search_partners: params.search_partners,
        include_serp_info: params.include_serp_info,
        include_subdomains: params.include_subdomains,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
