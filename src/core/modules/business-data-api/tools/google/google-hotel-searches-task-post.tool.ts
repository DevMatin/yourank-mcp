import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class GoogleHotelSearchesTaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'google_hotel_searches_task_post';
  }

  getDescription(): string {
    return 'Hotel Searches API provides results containing information about different hotels listed on Google. The provided results are specific to the keyword, selected location and language settings.';
  }

  getParams() {
    return {
      keyword: z.string().describe('keyword required field the keyword you specify should indicate the name of the local establishment you would like to receive data for example: "hotel new york"'),
      location_name: z.string().optional().describe('location name optional field location name you can specify the name of the location if you want to receive results for a particular location example: "New York,New York,United States"'),
      location_code: z.number().optional().describe('location code optional field location code you can specify the code of the location if you want to receive results for a particular location example: 2840'),
      language_name: z.string().optional().describe('language name optional field language name you can specify the name of the language if you want to receive results in a particular language example: "English"'),
      language_code: z.string().optional().describe('language code optional field language code you can specify the code of the language if you want to receive results in a particular language example: "en"'),
      depth: z.number().optional().describe('depth optional field number of results in SERP default value: 10 maximum value: 100'),
      priority: z.number().optional().describe('priority optional field priority of a task (might be ignored) default value: 1 possible values: 1, 2, 3, 4, 5'),
      pingback_url: z.string().optional().describe('pingback URL optional field URL for receiving a pingback notification that will be sent when a task is completed the pingback will be sent to the postback URL you specified when setting a task'),
      postback_url: z.string().optional().describe('postback URL optional field URL for receiving a postback notification that will be sent when a task is completed the postback will be sent to the postback URL you specified when setting a task'),
      postback_data: z.string().optional().describe('postback data optional field postback data in a JSON array that will be sent along with your callback the postback data will be sent to the postback URL you specified when setting a task'),
      tag: z.string().optional().describe('tag optional field user-defined task identifier this value will be returned in the result you will be able to use it to identify the task and match it with the result'),
    };
  }

  async handle(params: any) {
    const requestData = [{
      keyword: params.keyword,
      location_name: params.location_name,
      location_code: params.location_code,
      language_name: params.language_name,
      language_code: params.language_code,
      depth: params.depth,
      priority: params.priority,
      pingback_url: params.pingback_url,
      postback_url: params.postback_url,
      postback_data: params.postback_data,
      tag: params.tag,
    }];

    return await this.client.makeRequest('/v3/business_data/google/hotel_searches/task_post', 'POST', requestData);
  }
}
