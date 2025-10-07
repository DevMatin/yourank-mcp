import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class SerpGoogleAiModeLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_ai_mode_live_advanced';
  }

  getDescription(): string {
    return 'Get Google AI Mode SERP results with advanced features';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Search keyword"),
      location_name: z.string().optional().describe("Location name (e.g., 'United States')"),
      location_code: z.number().optional().describe("Location code"),
      language_code: z.string().optional().describe("Language code (e.g., 'en')"),
      device: z.enum(['desktop', 'mobile']).optional().describe("Device type"),
      depth: z.number().min(1).max(700).optional().default(20).describe("Number of AI mode results to retrieve")
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

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/google/ai_mode/live/advanced', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
