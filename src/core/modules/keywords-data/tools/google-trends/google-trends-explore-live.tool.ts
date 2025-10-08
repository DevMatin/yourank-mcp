import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleTrendsExploreLiveParams {
  keywords: string[];
  location_name?: string | null;
  language_code?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  category_code?: number | null;
  search_type?: string | null;
  items_count?: number | null;
  include_serp_info?: boolean | null;
  format?: string | null;
}

export class GoogleTrendsExploreLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_trends_explore_live';
  }

  getDescription(): string {
    return 'Get Google Trends data for keywords in real-time (Live method)';
  }

  getParams() {
    return {
      keywords: z.array(z.string()).describe("Array of keywords to get trends data for"),
      location_name: z.string().nullable().default(null).describe(`full name of the location
optional field
in format "Country"
example:
United Kingdom`),
      language_code: z.string().nullable().default(null).describe(`Language two-letter ISO code (e.g., 'en').
optional field`),
      date_from: z.string().nullable().default(null).describe("starting date of the time range. Format: YYYY-MM-DD"),
      date_to: z.string().nullable().default(null).describe("ending date of the time range. Format: YYYY-MM-DD"),
      category_code: z.number().nullable().default(null).describe("category code for filtering results"),
      search_type: z.string().nullable().default(null).describe("search type: web, image, news, youtube, froogle"),
      items_count: z.number().nullable().default(null).describe("maximum number of returned items. Default value: 100"),
      include_serp_info: z.boolean().nullable().default(null).describe("include SERP info. Default value: false"),
      format: z.string().nullable().default(null).describe("format of the response: json, csv"),
    };
  }

  async handle(params: GoogleTrendsExploreLiveParams): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/google_trends/explore/live', 'POST', [{
        keywords: params.keywords,
        location_name: params.location_name || 'United States',
        language_code: params.language_code || 'en',
        date_from: params.date_from,
        date_to: params.date_to,
        category_code: params.category_code,
        search_type: params.search_type,
        items_count: params.items_count,
        include_serp_info: params.include_serp_info,
        format: params.format,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
