import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordsForKeywordsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keywords_for_keywords';
  }

  getDescription() {
    return 'Get relevant keyword suggestions from Bing Ads for specified keywords in real-time.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of keywords to get suggestions for (max 200)',
          maxItems: 200
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
          description: 'Maximum number of keyword suggestions to return (max 3000)',
          default: 1000,
          minimum: 1,
          maximum: 3000
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
      limit: params.limit || 1000
    }];

    return await this.client.post('/v3/keywords_data/bing/keywords_for_keywords/live', requestData);
  }
}
