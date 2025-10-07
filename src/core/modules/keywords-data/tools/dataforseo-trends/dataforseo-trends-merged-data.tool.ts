import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface MergedDataParams {
  keywords: string[];
  location_name?: string;
  language_code?: string;
  date_from?: string;
  date_to?: string;
}

export class DataForSeoTrendsMergedDataTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_dataforseo_trends_merged_data';
  }

  getDescription(): string {
    return 'Get merged keyword popularity data from DataForSEO Trends including location-specific and demographic breakdown data.';
  }

  getParams() {
    return {
      keywords: z.array(z.string()).describe('Array of keywords to analyze (max 5)'),
      location_name: z.string().default('United States').describe('Location name (e.g., "United States")'),
      language_code: z.string().default('en').describe('Language code (e.g., "en")'),
      date_from: z.string().default('2024-01-01').describe('Start date for data collection (YYYY-MM-DD)'),
      date_to: z.string().default('2024-12-31').describe('End date for data collection (YYYY-MM-DD)')
    };
  }

  async handle(params: MergedDataParams): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/dataforseo_trends/merged_data/live', 'POST', [{
        keywords: params.keywords,
        location_name: params.location_name || 'United States',
        language_code: params.language_code || 'en',
        date_from: params.date_from || '2024-01-01',
        date_to: params.date_to || '2024-12-31'
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
