import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleTrendsExploreTaskPostParams {
  keywords: string[];
  location_name?: string;
  language_code?: string;
  category_code?: number;
  date_from?: string;
  date_to?: string;
}

interface GoogleTrendsExploreTaskPostRequest {
  keywords: string[];
  location_name: string;
  language_code: string;
  category_code: number;
  date_from: string;
  date_to: string;
}

export class GoogleTrendsExploreTaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_trends_explore_task_post';
  }

  getDescription(): string {
    return 'Post a task to get keyword popularity data from Google Trends Explore feature.';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).max(5).describe('Array of keywords to analyze'),
      location_name: z.string().default('United States').describe('Location name (e.g., "United States")'),
      language_code: z.string().default('en').describe('Language code (e.g., "en")'),
      category_code: z.number().default(0).describe('Google Trends category code'),
      date_from: z.string().default('2024-01-01').describe('Start date for data collection (YYYY-MM-DD)'),
      date_to: z.string().default('2024-12-31').describe('End date for data collection (YYYY-MM-DD)')
    };
  }

  async handle(params: GoogleTrendsExploreTaskPostParams): Promise<any> {
    const requestData: GoogleTrendsExploreTaskPostRequest[] = [{
      keywords: params.keywords,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      category_code: params.category_code || 0,
      date_from: params.date_from || '2024-01-01',
      date_to: params.date_to || '2024-12-31'
    }];

    return await this.client.makeRequest('/v3/keywords_data/google_trends/explore/task_post', 'POST', requestData);
  }
}
