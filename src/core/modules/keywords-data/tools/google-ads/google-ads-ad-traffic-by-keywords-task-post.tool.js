import { BaseTool } from '../../../../../../base.tool.js';

export class GoogleAdsAdTrafficByKeywordsTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_ad_traffic_by_keywords_task_post';
  }

  getDescription() {
    return 'Post a task to get ad traffic data by keywords from Google Ads. This endpoint provides estimated ad traffic data for specified keywords.';
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
        date_from: {
          type: 'string',
          description: 'Start date for data collection (YYYY-MM-DD)',
          default: '2024-01-01'
        },
        date_to: {
          type: 'string',
          description: 'End date for data collection (YYYY-MM-DD)',
          default: '2024-12-31'
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
      date_from: params.date_from || '2024-01-01',
      date_to: params.date_to || '2024-12-31'
    }];

    return await this.client.post('/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_post', requestData);
  }
}
