import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsKeywordsForSiteLiveParams {
  location_name?: string | null;
  language_code?: string | null;
  target: string;
  limit?: number | null;
  offset?: number | null;
  date_from?: string | null;
  date_to?: string | null;
  search_partners?: boolean | null;
  include_adult_keywords?: boolean | null;
  sort_by?: string | null;
  include_serp_info?: boolean | null;
  replace_with_core_keyword?: boolean | null;
}

export class GoogleAdsKeywordsForSiteLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_site_live';
  }

  getDescription(): string {
    return 'Get keywords for a specific site from Google Ads in real-time (Live method)';
  }

  getParams() {
    return {
      location_name: z.string().nullable().default(null).describe(`full name of the location
optional field
in format "Country"
example:
United Kingdom`),
      language_code: z.string().nullable().default(null).describe(`Language two-letter ISO code (e.g., 'en').
optional field`),
      target: z.string().describe("target domain or subdomain"),
      limit: z.number().nullable().default(null).describe("maximum number of returned keywords. Default value: 1000. Maximum value: 1000"),
      offset: z.number().nullable().default(null).describe("offset in the results array. Default value: 0"),
      date_from: z.string().nullable().default(null).describe("starting date of the time range. Format: YYYY-MM-DD"),
      date_to: z.string().nullable().default(null).describe("ending date of the time range. Format: YYYY-MM-DD"),
      search_partners: z.boolean().nullable().default(null).describe("include data from search partners. Default value: false"),
      include_adult_keywords: z.boolean().nullable().default(null).describe("include adult keywords. Default value: false"),
      sort_by: z.string().nullable().default(null).describe("sorting parameter. Default value: relevance"),
      include_serp_info: z.boolean().nullable().default(null).describe("include SERP info. Default value: false"),
      replace_with_core_keyword: z.boolean().nullable().default(null).describe("replace with core keyword. Default value: false"),
    };
  }

  async handle(params: GoogleAdsKeywordsForSiteLiveParams): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/keywords_for_site/live', 'POST', [{
        location_name: params.location_name || 'United States',
        language_code: params.language_code || 'en',
        target: params.target,
        limit: params.limit,
        offset: params.offset,
        date_from: params.date_from,
        date_to: params.date_to,
        search_partners: params.search_partners,
        include_adult_keywords: params.include_adult_keywords,
        sort_by: params.sort_by,
        include_serp_info: params.include_serp_info,
        replace_with_core_keyword: params.replace_with_core_keyword,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
