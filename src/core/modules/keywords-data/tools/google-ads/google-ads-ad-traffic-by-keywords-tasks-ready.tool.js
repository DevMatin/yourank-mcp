import { BaseTool } from '../../../../../../base.tool.js';

export class GoogleAdsAdTrafficByKeywordsTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_ads_ad_traffic_by_keywords_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Google Ads ad traffic by keywords tasks that are ready for collection.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/google_ads/ad_traffic_by_keywords/tasks_ready');
  }
}