import { BaseTool } from '../../../../../../base.tool.js';

export class ClickstreamDataGlobalSearchVolumeLiveTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_clickstream_data_global_search_volume_live';
  }

  getDescription() {
    return 'Get global clickstream-based search volume data with geographical distribution in real-time.';
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
        }
      },
      required: ['keywords']
    };
  }

  async handle(params) {
    const requestData = [{
      keywords: params.keywords,
      language_code: params.language_code || 'en',
      device: params.device || 'desktop'
    }];

    return await this.client.post('/v3/keywords_data/clickstream_data/global_search_volume/live', requestData);
  }
}
