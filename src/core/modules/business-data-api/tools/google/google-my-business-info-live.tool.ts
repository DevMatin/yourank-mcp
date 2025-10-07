import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class GoogleMyBusinessInfoLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_google_my_business_info_live';
  }

  getDescription(): string {
    return `Business Data API provides results containing information about specific business entity from Google. The provided results are specific to the selected location and language settings.`;
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("keyword - the keyword you specify should indicate the name of the local establishment"),
      location_name: z.string().optional().describe("full name of search engine location"),
      location_code: z.number().optional().describe("search engine location code"),
      location_coordinate: z.string().optional().describe("GPS coordinates of a location"),
      language_name: z.string().optional().describe("full name of search engine language"),
      language_code: z.string().optional().describe("search engine language code"),
      tag: z.string().optional().describe("user-defined task identifier")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keyword: params.keyword
      };
      
      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.location_coordinate) requestData.location_coordinate = params.location_coordinate;
      if (params.language_name) requestData.language_name = params.language_name;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.tag) requestData.tag = params.tag;

      const response = await this.client.makeRequest('/v3/business_data/google/my_business_info/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
