import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordsForSiteTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keywords_for_site_task_post';
  }

  getDescription() {
    return 'Submit a task to get keywords relevant to a specified website from Bing Ads.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {
        target: {
          type: 'string',
          description: 'Target website URL or domain',
          example: 'example.com'
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
        limit: {
          type: 'integer',
          description: 'Maximum number of keywords to return (max 3000)',
          default: 1000,
          minimum: 1,
          maximum: 3000
        },
        postback_url: {
          type: 'string',
          description: 'URL to receive results when task is completed (optional)'
        }
      },
      required: ['target']
    };
  }

  async handle(params) {
    const requestData = [{
      target: params.target,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      device: params.device || 'desktop',
      limit: params.limit || 1000,
      postback_url: params.postback_url
    }];

    return await this.client.post('/v3/keywords_data/bing/keywords_for_site/task_post', requestData);
  }
}
