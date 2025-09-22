import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class GoogleAdsKeywordsForKeywordsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_keywords';
  }

  getDescription(): string {
    return 'Get relevant keywords for the specified terms from Google Ads';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe('Array of keywords (up to 20)'),
      location_name: z.string().nullable().default(null).describe('Full name of the location (e.g., "United Kingdom")'),
      language_code: z.string().nullable().default(null).describe('Language two-letter ISO code (e.g., "en")'),
      search_partners: z.boolean().nullable().default(null).describe('Include search partners'),
      include_serp_info: z.boolean().nullable().default(null).describe('Include SERP information'),
    };
  }

  async handle(params: any): Promise<any> {
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
