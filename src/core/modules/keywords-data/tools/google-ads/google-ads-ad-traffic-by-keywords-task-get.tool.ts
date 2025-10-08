import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsAdTrafficByKeywordsTaskGetParams {
  id: string;
}

export class GoogleAdsAdTrafficByKeywordsTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_ad_traffic_by_keywords_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Google Ads ad traffic by keywords task by task ID.';
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe('Task ID (UUID format)')
    };
  }

  async handle(params: GoogleAdsAdTrafficByKeywordsTaskGetParams): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_get/${params.id}', 'GET');
  }
}
