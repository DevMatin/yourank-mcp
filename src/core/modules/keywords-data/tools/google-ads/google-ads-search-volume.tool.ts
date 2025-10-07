import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsSearchVolumeParams {
  location_name?: string | null;
  language_code?: string | null;
  keywords: string[];
}

interface GoogleAdsSearchVolumeRequest {
  location_name: string;
  language_code: string;
  keywords: string[];
}

export class GoogleAdsSearchVolumeTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_search_volume';
  }

  getDescription(): string {
    return 'Get search volume data for keywords from Google Ads';
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
      keywords: z.array(z.string()).describe("Array of keywords to get search volume for (max 3 für optimale Performance)"),
    };
  }

  async handle(params: GoogleAdsSearchVolumeParams): Promise<any> {
    try {
      // Limitiere Keywords auf 3 für kleinere Responses
      const limitedKeywords = Array.isArray(params.keywords) 
        ? params.keywords.slice(0, 3) 
        : [params.keywords];

      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/search_volume/live', 'POST', [{
        location_name: params.location_name || 'United States',
        language_code: params.language_code || 'en',
        keywords: limitedKeywords,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
