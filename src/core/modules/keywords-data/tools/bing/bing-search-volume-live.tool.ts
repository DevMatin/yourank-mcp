import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface BingSearchVolumeLiveParams {
  location_name?: string | null;
  language_code?: string | null;
  keywords: string[];
  device?: string | null;
}

export class BingSearchVolumeLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_search_volume_live';
  }

  getDescription(): string {
    return 'Get search volume data from Bing Ads for specified keywords in real-time (Live method)';
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
      keywords: z.array(z.string()).describe("Array of keywords to analyze"),
      device: z.string().nullable().default(null).describe("device type: desktop, mobile, tablet"),
    };
  }

  async handle(params: BingSearchVolumeLiveParams): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/bing/search_volume/live', 'POST', [{
        location_name: params.location_name || 'United States',
        language_code: params.language_code || 'en',
        keywords: params.keywords,
        device: params.device || 'desktop',
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
