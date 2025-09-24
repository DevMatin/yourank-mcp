import { BaseTool } from '../../../../../../base.tool.js';

export class DataForSeoTrendsMergedDataTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_dataforseo_trends_merged_data';
  }

  getDescription() {
    return 'Get merged keyword popularity data from DataForSEO Trends including location-specific and demographic breakdown data.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of keywords to analyze',
          maxItems: 5
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
      date_from: params.date_from || '2024-01-01',
      date_to: params.date_to || '2024-12-31'
    }];

    return await this.client.post('/v3/keywords_data/dataforseo_trends/merged_data/live', requestData);
  }
}
