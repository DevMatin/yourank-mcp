import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class GoogleHotelInfoLiveAdvancedTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_google_hotel_info_live_advanced';
  }

  getDescription(): string {
    return `Google Hotel Info will provide you with structured data available for a specific hotel entity on the Google Hotels platform: such as service description, location details, rating, amenities, reviews, images, prices, and more.`;
  }

  getParams(): z.ZodRawShape {
    return {
      hotel_identifier: z.string().describe("hotel identifier (name, address, or URL)"),
      location_code: z.number().optional().describe("location code"),
      language_code: z.string().optional().describe("language code")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        hotel_identifier: params.hotel_identifier
      };
      
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;

      const response = await this.client.makeRequest('/v3/business_data/google/hotel_info/live/advanced', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
