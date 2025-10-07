import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class AppleStoreDataInfoLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'apple_store_data_info_live_advanced';
  }

  getDescription(): string {
    return 'Get detailed information about an Apple App Store application including ID, icon, description, reviews count, rating, images, and other data. Requires app_id parameter.';
  }

  getParams(): z.ZodRawShape {
    return {
      app_id: z.string().describe("Target application ID on Apple App Store (e.g., '414478124' for WhatsApp)"),
      location_name: z.string().optional().describe("Target location (full name, e.g., 'United States')"),
      location_code: z.number().optional().describe("Target location code"),
      language_name: z.string().optional().describe("Target language (full name, e.g., 'English')"),
      language_code: z.string().optional().describe("Target language code (e.g., 'en')"),
      priority: z.number().optional().describe("Task priority (1-3, where 3 is the highest)"),
      postback_url: z.string().optional().describe("URL for receiving task completion notification"),
      tag: z.string().optional().describe("User-defined task identifier"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        app_id: params.app_id,
      };

      if (params.location_name) requestData.location_name = params.location_name;
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_name) requestData.language_name = params.language_name;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.priority) requestData.priority = params.priority;
      if (params.postback_url) requestData.postback_url = params.postback_url;
      if (params.tag) requestData.tag = params.tag;

      const response = await this.dataForSEOClient.makeRequest('/v3/app_data/apple/app_info/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
