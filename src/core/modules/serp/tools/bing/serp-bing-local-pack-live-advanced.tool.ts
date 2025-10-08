import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpBingLocalPackLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_bing_local_pack_live_advanced';
  }

  getDescription(): string {
    return 'Get Bing Local Pack search results with advanced features';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Search keyword for local businesses"),
      location_name: z.string().optional().describe("Location name (e.g., 'United States')"),
      location_code: z.number().optional().describe("Location code"),
      language_code: z.string().optional().describe("Language code (e.g., 'en')"),
      device: z.enum(['desktop', 'mobile']).optional().describe("Device type"),
      depth: z.number().min(1).max(700).optional().default(20).describe("Number of local pack results to retrieve"),
      radius: z.number().min(1).max(500).optional().describe("Search radius in kilometers"),
      category: z.string().optional().describe("Business category filter (e.g., 'restaurants', 'hotels')"),
      price_level: z.number().min(1).max(4).optional().describe("Price level filter (1-4)"),
      rating_min: z.number().min(1).max(5).optional().describe("Minimum rating filter (1-5)")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keyword: params.keyword
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
      if (params.radius) {
        requestData.radius = params.radius;
      }
      if (params.category) {
        requestData.category = params.category;
      }
      if (params.price_level) {
        requestData.price_level = params.price_level;
      }
      if (params.rating_min) {
        requestData.rating_min = params.rating_min;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/bing/local_pack/live/advanced', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
