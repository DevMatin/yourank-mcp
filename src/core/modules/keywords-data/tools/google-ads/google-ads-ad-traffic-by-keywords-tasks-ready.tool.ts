import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class GoogleAdsAdTrafficByKeywordsTasksReadyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_ad_traffic_by_keywords_tasks_ready';
  }

  getDescription(): string {
    return 'Get list of completed Google Ads ad traffic by keywords tasks that are ready for collection.';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/google_ads/ad_traffic_by_keywords/tasks_ready');
  }
}
