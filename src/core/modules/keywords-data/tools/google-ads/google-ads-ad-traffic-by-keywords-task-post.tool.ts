import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsAdTrafficByKeywordsTaskPostParams {
  keywords: string[];
  location_name?: string;
  language_code?: string;
  location_code?: number;
  postback_url?: string;
}

interface GoogleAdsAdTrafficByKeywordsTaskPostRequest {
  keywords: string[];
  location_name?: string;
  language_code?: string;
  location_code?: number;
  postback_url?: string;
}

export class GoogleAdsAdTrafficByKeywordsTaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_ad_traffic_by_keywords_task_post';
  }

  getDescription(): string {
    return 'Create a task to get ad traffic data for keywords from Google Ads';
  }

  getParams() {
    return {
      keywords: z.array(z.string()).describe("Array of keywords to analyze"),
      location_name: z.string().optional().describe("Location name (e.g., 'Germany', 'United States')"),
      language_code: z.string().optional().describe("Language code (e.g., 'de', 'en')"),
      location_code: z.number().optional().describe("Location code (e.g., 2840 for United States)"),
      postback_url: z.string().optional().describe("Postback URL for task completion notification")
    };
  }

  async handle(params: GoogleAdsAdTrafficByKeywordsTaskPostParams): Promise<any> {
    try {
      const requestData: GoogleAdsAdTrafficByKeywordsTaskPostRequest = {
        keywords: params.keywords
      };
      
      if (params.location_name) {
        requestData.location_name = params.location_name;
      }
      
      if (params.language_code) {
        requestData.language_code = params.language_code;
      }
      
      if (params.location_code) {
        requestData.location_code = params.location_code;
      }
      
      if (params.postback_url) {
        requestData.postback_url = params.postback_url;
      }

      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
