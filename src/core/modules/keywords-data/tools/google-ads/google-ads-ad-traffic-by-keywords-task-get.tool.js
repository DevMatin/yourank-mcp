import { BaseTool } from '../../../../../../base.tool.js';

export class GoogleAdsAdTrafficByKeywordsTaskGetTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_ad_traffic_by_keywords_task_get';
  }

  getDescription() {
    return 'Get results of a completed Google Ads ad traffic by keywords task by task ID.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Task ID (UUID format)',
          example: '00000000-0000-0000-0000-000000000000'
        }
      },
      required: ['id']
    };
  }

  async handle(params) {
    return await this.client.get(`/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_get/${params.id}`);
  }
}