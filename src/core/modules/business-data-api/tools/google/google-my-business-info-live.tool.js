import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class GoogleMyBusinessInfoLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_google_my_business_info_live';
  }

  getDescription() {
    return `Business Data API provides results containing information about specific business entity from Google. The provided results are specific to the selected location and language settings.`;
  }

  getParams() {
    return {
      target: z.string().describe("target domain or business name"),
      location_code: z.number().optional().describe("location code"),
      language_code: z.string().optional().describe("language code"),
      limit: z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned results"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };
      
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/business_data/google/my_business_info/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
