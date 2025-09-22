import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class GoogleAdsSearchVolumeTaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_search_volume_task_post';
  }

  getDescription(): string {
    return 'Create a task to get search volume data for keywords from Google Ads';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe("Array of keywords to analyze"),
      location_name: z.string().optional().describe("Location name (e.g., 'Germany', 'United States')"),
      language_code: z.string().optional().describe("Language code (e.g., 'de', 'en')"),
      postback_url: z.string().optional().describe("Postback URL for task completion notification")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keywords: params.keywords
      };
      
      if (params.location_name) {
        requestData.location_name = params.location_name;
      }
      
      if (params.language_code) {
        requestData.language_code = params.language_code;
      }
      
      if (params.postback_url) {
        requestData.postback_url = params.postback_url;
      }

      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/search_volume/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
