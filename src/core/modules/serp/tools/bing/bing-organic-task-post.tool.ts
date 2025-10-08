import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class BingOrganicTaskPostTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'bing_organic_task_post';
  }

  getDescription(): string {
    return 'Post Bing organic SERP task';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Search keyword"),
      location_name: z.string().optional().describe("Location name (e.g., 'United States')"),
      location_code: z.number().optional().describe("Location code"),
      language_code: z.string().optional().describe("Language code (e.g., 'en')"),
      device: z.enum(['desktop', 'mobile']).optional().describe("Device type"),
      os: z.enum(['windows', 'macos', 'android', 'ios']).optional().describe("Device operating system"),
      depth: z.number().min(1).max(700).optional().default(20).describe("Number of results to retrieve"),
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
      if (params.os) {
        requestData.os = params.os;
      }
      if (params.depth) {
        requestData.depth = params.depth;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/bing/organic/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
