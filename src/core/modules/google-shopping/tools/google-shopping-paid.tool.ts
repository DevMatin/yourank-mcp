import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleShoppingPaidTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'google_shopping_paid';
  }

  getDescription(): string {
    return 'Get Google Shopping paid advertisement results';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Product keyword to search"),
      location_code: z.number().optional().describe("Location code for search"),
      language_code: z.string().default('en').describe("Language code"),
      device: z.enum(['desktop', 'mobile']).default('desktop').describe("Device type"),
      depth: z.number().min(10).max(100).default(20).describe("Number of results to retrieve"),
      include_ad_data: z.boolean().optional().describe("Include advertisement data"),
      include_competitor_analysis: z.boolean().optional().describe("Include competitor analysis"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/serp/google_shopping/live/paid',
        'POST',
        [{
          keyword: params.keyword,
          location_code: params.location_code,
          language_code: params.language_code,
          device: params.device,
          depth: params.depth,
          include_ad_data: params.include_ad_data || false,
          include_competitor_analysis: params.include_competitor_analysis || false,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 