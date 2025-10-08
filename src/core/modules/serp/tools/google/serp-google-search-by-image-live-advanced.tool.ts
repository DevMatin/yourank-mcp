import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpGoogleSearchByImageLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_search_by_image_live_advanced';
  }

  getDescription(): string {
    return 'Get Google Search by Image results with advanced features';
  }

  getParams(): z.ZodRawShape {
    return {
      image_url: z.string().describe("URL of the image to search for"),
      location_name: z.string().optional().describe("Location name (e.g., 'United States')"),
      location_code: z.number().optional().describe("Location code"),
      language_code: z.string().optional().describe("Language code (e.g., 'en')"),
      device: z.enum(['desktop', 'mobile']).optional().describe("Device type"),
      depth: z.number().min(1).max(700).optional().default(20).describe("Number of search results to retrieve")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        image_url: params.image_url
      };
      
      if (params.location_name) {
        requestData.location_name = params.location_name;
      }
      if (params.location_code) {
        requestData.location_code = params.location_code;
      }
      if (params.language_code) {
        requestData.language_code = params.language_code;
      }
      if (params.device) {
        requestData.device = params.device;
      }
      if (params.depth) {
        requestData.depth = params.depth;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/google/search_by_image/live/advanced', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
