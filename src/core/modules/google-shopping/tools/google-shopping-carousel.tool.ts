import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleShoppingCarouselTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'google_shopping_carousel';
  }

  getDescription(): string {
    return 'Get Google Shopping sponsored carousel results';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Product keyword to search"),
      location_code: z.number().optional().describe("Location code for search"),
      language_code: z.string().default('en').describe("Language code"),
      device: z.enum(['desktop', 'mobile']).default('desktop').describe("Device type"),
      depth: z.number().min(10).max(100).default(20).describe("Number of results to retrieve"),
      include_carousel_data: z.boolean().optional().describe("Include carousel specific data"),
      include_sponsored_content: z.boolean().optional().describe("Include sponsored content analysis"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/serp/google_shopping/live/carousel',
        'POST',
        [{
          keyword: params.keyword,
          location_code: params.location_code,
          language_code: params.language_code,
          device: params.device,
          depth: params.depth,
          include_carousel_data: params.include_carousel_data || false,
          include_sponsored_content: params.include_sponsored_content || false,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 