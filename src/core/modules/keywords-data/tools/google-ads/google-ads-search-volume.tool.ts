import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class GoogleAdsSearchVolumeTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keywords_data_google_ads_search_volume';
  }

  getDescription(): string {
    return 'Get search volume data for keywords from Google Ads';
  }

  getParams(): z.ZodRawShape {
    return {
      location_name: z.string().nullable().default(null).describe(`full name of the location
optional field
in format "Country"
example:
United Kingdom`),
      language_code: z.string().nullable().default(null).describe(`Language two-letter ISO code (e.g., 'en').
optional field`),
      keywords: z.array(z.string()).min(1).describe("Array of keywords to get search volume for. Must contain at least one keyword."),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      // Validate required parameters
      if (!params.keywords || !Array.isArray(params.keywords) || params.keywords.length === 0) {
        throw new Error('keywords field is required and must be a non-empty array of strings');
      }

      // Log the parameters being sent to DataForSEO for debugging
      console.error('GoogleAdsSearchVolumeTool - Parameters:', JSON.stringify(params, null, 2));
      
      const requestPayload = [{
        location_name: params.location_name,
        language_code: params.language_code,
        keywords: params.keywords,
      }];
      
      console.error('GoogleAdsSearchVolumeTool - DataForSEO payload:', JSON.stringify(requestPayload, null, 2));
      
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/google_ads/search_volume/live', 'POST', requestPayload);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      console.error('GoogleAdsSearchVolumeTool - Error:', error);
      return this.formatErrorResponse(error);
    }
  }
} 