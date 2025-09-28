import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleHotelInfoTaskPostTool extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
  }

  getName(): string {
    return 'google_hotel_info_task_post';
  }

  getDescription(): string {
    return 'Google Hotel Info will provide you with structured data available for a specific hotel entity on the Google Hotels platform: such as service description, location details, rating, amenities, reviews, images, prices, and more.';
  }

  getParams() {
    return {
      hotel_identifier: z.string().describe('hotel identifier required field unique hotel identifier in Google Hotels database you can find the identifier in the URL of the hotel page on Google Hotels'),
      location_name: z.string().optional().describe('location name optional field location name you can specify the name of the location if you want to receive results for a particular location example: "New York,New York,United States"'),
      location_code: z.number().optional().describe('location code optional field location code you can specify the code of the location if you want to receive results for a particular location example: 2840'),
      language_name: z.string().optional().describe('language name optional field language name you can specify the name of the language if you want to receive results in a particular language example: "English"'),
      language_code: z.string().optional().describe('language code optional field language code you can specify the code of the language if you want to receive results in a particular language example: "en"'),
      priority: z.number().optional().describe('priority optional field priority of a task (might be ignored) default value: 1 possible values: 1, 2, 3, 4, 5'),
      pingback_url: z.string().optional().describe('pingback URL optional field URL for receiving a pingback notification that will be sent when a task is completed the pingback will be sent to the postback URL you specified when setting a task'),
      postback_url: z.string().optional().describe('postback URL optional field URL for receiving a postback notification that will be sent when a task is completed the postback will be sent to the postback URL you specified when setting a task'),
      postback_data: z.string().optional().describe('postback data optional field postback data in a JSON array that will be sent along with your callback the postback data will be sent to the postback URL you specified when setting a task'),
      tag: z.string().optional().describe('tag optional field user-defined task identifier this value will be returned in the result you will be able to use it to identify the task and match it with the result'),
    };
  }

  async handle(params: any) {
    const requestData = [{
      hotel_identifier: params.hotel_identifier,
      location_name: params.location_name,
      location_code: params.location_code,
      language_name: params.language_name,
      language_code: params.language_code,
      priority: params.priority,
      pingback_url: params.pingback_url,
      postback_url: params.postback_url,
      postback_data: params.postback_data,
      tag: params.tag,
    }];

    return await this.dataForSEOClient.post('/v3/business_data/google/hotel_info/task_post', requestData);
  }
}
