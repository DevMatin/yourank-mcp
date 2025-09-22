import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class GoogleAdsAdTrafficByKeywordsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_ad_traffic_by_keywords';
  }

  getDescription(): string {
    return 'Get ad traffic data for keywords from Google Ads';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe("Array of keywords to analyze"),
      location_name: z.string().optional().describe("Location name (e.g., 'Germany', 'United States')"),
      language_code: z.string().optional().describe("Language code (e.g., 'de', 'en')"),
      location_code: z.number().optional().describe("Location code (e.g., 2840 for United States)")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      // Create a clean request data object with only valid parameters
      const requestData: any = {
        keywords: params.keywords
      };
      
      // Only add optional parameters if they are provided and not empty
      if (params.location_name && params.location_name.trim() !== '') {
        requestData.location_name = params.location_name;
      }
      
      if (params.language_code && params.language_code.trim() !== '') {
        requestData.language_code = params.language_code;
      }
      
      if (params.location_code && params.location_code > 0) {
        requestData.location_code = params.location_code;
      }

      // Remove any invalid parameters that might have been added
      delete requestData.bid;
      delete requestData.limit;
      delete requestData.offset;
      delete requestData.language_name;

      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/ad_traffic_by_keywords/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
