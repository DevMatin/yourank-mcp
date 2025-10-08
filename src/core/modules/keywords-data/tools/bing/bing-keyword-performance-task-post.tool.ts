import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingKeywordPerformanceTaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_keyword_performance_task_post';
  }

  getDescription(): string {
    return 'Submit a task to get keyword performance statistics from Bing Ads.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of keywords to analyze',
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
        match_type: {
          type: 'string',
          enum: ['exact', 'phrase', 'broad'],
          description: 'Match type for keywords',
          default: 'exact'
        },
        postback_url: {
          type: 'string',
          description: 'URL to receive results when task is completed (optional)'
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
    match_type?: 'exact' | 'phrase' | 'broad';
    postback_url?: string;
  }): Promise<any> {
    const requestData = [{
      keywords: params.keywords,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      device: params.device || 'desktop',
      match_type: params.match_type || 'exact',
      postback_url: params.postback_url
    }];

    return await this.client.makeRequest('/v3/keywords_data/bing/keyword_performance/task_post', 'POST', requestData);
  }
}
