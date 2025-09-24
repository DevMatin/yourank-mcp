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
    return 'Get results of a completed Google Ads ad traffic by keywords task.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Task ID to retrieve results for'
        }
      },
      required: ['id']
    };
  }

  async handle(params) {
    return await this.client.get(`/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_get/${params.id}`);
  }
}
