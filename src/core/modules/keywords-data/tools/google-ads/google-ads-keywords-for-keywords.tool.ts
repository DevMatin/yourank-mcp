import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsKeywordsForKeywordsParams {
  keywords: string[];
  location_name?: string | null;
  language_code?: string | null;
  search_partners?: boolean | null;
  include_serp_info?: boolean | null;
  limit_results?: number | null;
}

interface GoogleAdsKeywordsForKeywordsRequest {
  keywords: string[];
  location_name?: string;
  language_code?: string;
  search_partners?: boolean;
  include_serp_info?: boolean;
}

export class GoogleAdsKeywordsForKeywordsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_keywords';
  }

  getDescription(): string {
    return 'Get relevant keywords for the specified terms from Google Ads';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe('Array of keywords (max 1 für optimale Performance)'),
      location_name: z.string().nullable().default('United States').describe('Full name of the location (e.g., "United Kingdom")'),
      language_code: z.string().nullable().default('en').describe('Language two-letter ISO code (e.g., "en")'),
      search_partners: z.boolean().nullable().default(false).describe('Include search partners'),
      include_serp_info: z.boolean().nullable().default(false).describe('Include SERP information (deaktiviert für bessere Performance)'),
      limit_results: z.number().nullable().default(10).describe('Anzahl der zurückgegebenen Ergebnisse (max 50)')
    };
  }

  async handle(params: GoogleAdsKeywordsForKeywordsParams): Promise<any> {
    try {
      // Limitiere Keywords auf 1 für kleinere Responses
      const limitedKeywords = Array.isArray(params.keywords) 
        ? params.keywords.slice(0, 1) 
        : [params.keywords];

      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/keywords_for_keywords/live', 'POST', [{
        keywords: limitedKeywords,
        location_name: params.location_name,
        language_code: params.language_code,
        search_partners: params.search_partners,
        include_serp_info: false, // Deaktiviere SERP Info für kleinere Response
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
