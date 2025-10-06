import { BaseTool } from '../../../../../../base.tool.js';

export class BingSearchVolumeHistoryTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_search_volume_history_task_post';
  }

  getDescription() {
    return 'Submit a task to get historical search volume data from Bing Ads.';
  }

  getParams() {
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
      date_from: params.date_from,
      date_to: params.date_to,
      granularity: params.granularity || 'monthly',
      postback_url: params.postback_url
    }];

    return await this.client.post('/v3/keywords_data/bing/search_volume_history/task_post', requestData);
  }
}
