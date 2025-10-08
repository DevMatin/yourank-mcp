import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsKeywordsForSiteParams {
  target: string;
  location_name?: string | null;
  language_code?: string | null;
  search_partners?: boolean | null;
  include_serp_info?: boolean | null;
  include_subdomains?: boolean | null;
}

interface GoogleAdsKeywordsForSiteRequest {
  target: string;
  location_name?: string;
  language_code?: string;
  search_partners?: boolean;
  include_serp_info?: boolean;
  include_subdomains?: boolean;
}

export class GoogleAdsKeywordsForSiteTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_site';
  }

  getDescription(): string {
    return 'Get keywords relevant to the specified domain along with their bids, search volumes, and competition levels';
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe('Target domain or URL'),
      location_name: z.string().nullable().default(null).describe('Full name of the location (e.g., "United Kingdom")'),
      language_code: z.string().nullable().default(null).describe('Language two-letter ISO code (e.g., "en")'),
      search_partners: z.boolean().nullable().default(null).describe('Include search partners'),
      include_serp_info: z.boolean().nullable().default(null).describe('Include SERP information'),
      include_subdomains: z.boolean().nullable().default(null).describe('Include subdomains')
    };
  }

  async handle(params: GoogleAdsKeywordsForSiteParams): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/keywords_for_site/live', 'POST', [{
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
