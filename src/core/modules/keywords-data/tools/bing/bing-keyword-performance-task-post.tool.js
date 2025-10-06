import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordPerformanceTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keyword_performance_task_post';
  }

  getDescription() {
    return 'Submit a task to get keyword performance statistics from Bing Ads.';
  }

  getParams() {
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

  async handle(params) {
    const requestData = [{
      keywords: params.keywords,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      device: params.device || 'desktop',
      match_type: params.match_type || 'exact',
      postback_url: params.postback_url
    }];

    return await this.client.post('/v3/keywords_data/bing/keyword_performance/task_post', requestData);
  }
}
