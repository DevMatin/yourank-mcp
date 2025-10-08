import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingSearchVolumeHistoryTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_search_volume_history';
  }

  getDescription(): string {
    return 'Get historical search volume data from Bing Ads in real-time.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of keywords to analyze (max 1000)',
          maxItems: 1000
        },
        location_name: {
          type: 'string',
          description: 'Location name (e.g., "United States")',
          default: 'United States'
        },
        language_code: {
          type: 'string',
          description: 'Language code (e.g., "en")',
          default: 'en'
        },
        device: {
          type: 'string',
          enum: ['desktop', 'mobile', 'tablet'],
          description: 'Device type',
          default: 'desktop'
        },
        date_from: {
          type: 'string',
          description: 'Start date for historical data (YYYY-MM-DD format)',
          example: '2023-01-01'
        },
        date_to: {
          type: 'string',
          description: 'End date for historical data (YYYY-MM-DD format)',
          example: '2023-12-31'
        },
        granularity: {
          type: 'string',
          enum: ['daily', 'weekly', 'monthly'],
          description: 'Data granularity',
          default: 'monthly'
        }
      },
      required: ['keywords']
    };
  }

  async handle(params: {
    keywords: string[];
    location_name?: string;
    language_code?: string;
    device?: 'desktop' | 'mobile' | 'tablet';
    date_from?: string;
    date_to?: string;
    granularity?: 'daily' | 'weekly' | 'monthly';
  }): Promise<any> {
    const requestData = [{
      keywords: params.keywords,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      device: params.device || 'desktop',
      date_from: params.date_from,
      date_to: params.date_to,
      granularity: params.granularity || 'monthly'
    }];

    return await this.client.makeRequest('/v3/keywords_data/bing/search_volume_history/live', 'POST', requestData);
  }
}
