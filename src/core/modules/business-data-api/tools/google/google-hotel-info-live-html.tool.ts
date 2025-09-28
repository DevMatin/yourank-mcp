import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleHotelInfoLiveHtmlTool extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
  }

  getName(): string {
    return 'google_hotel_info_live_html';
  }

  getDescription(): string {
    return 'Google Hotel Info will provide you with unstructured HTML data available for a specific hotel entity on the Google Hotels platform: such as service description, location details, rating, amenities, reviews, images, prices, and more.';
  }

  getParams() {
    return {
      hotel_identifier: z.string().describe('hotel identifier required field unique hotel identifier in Google Hotels database you can find the identifier in the URL of the hotel page on Google Hotels'),
      location_name: z.string().optional().describe('location name optional field location name you can specify the name of the location if you want to receive results for a particular location example: "New York,New York,United States"'),
      location_code: z.number().optional().describe('location code optional field location code you can specify the code of the location if you want to receive results for a particular location example: 2840'),
      language_name: z.string().optional().describe('language name optional field language name you can specify the name of the language if you want to receive results in a particular language example: "English"'),
      language_code: z.string().optional().describe('language code optional field language code you can specify the code of the language if you want to receive results in a particular language example: "en"'),
    };
  }

  async handle(params: any) {
    const requestData = [{
      hotel_identifier: params.hotel_identifier,
      location_name: params.location_name,
      location_code: params.location_code,
      language_name: params.language_name,
      language_code: params.language_code,
    }];

    return await this.dataForSEOClient.post('/v3/business_data/google/hotel_info/live/html', requestData);
  }
}
