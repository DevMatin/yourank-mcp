import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class SerpGoogleOrganicTaskPostTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_organic_task_post';
  }

  getDescription(): string {
    return 'Submit Google organic search task for processing';
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
      max_crawl_pages: z.number().min(1).max(7).optional().default(1).describe("Number of search result pages to crawl"),
      people_also_ask_click_depth: z.number().min(1).max(4).optional().describe("Click depth for people also ask"),
      priority: z.number().min(1).max(2).optional().default(1).describe("Task priority (1=normal, 2=high)")
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
      if (params.max_crawl_pages) {
        requestData.max_crawl_pages = params.max_crawl_pages;
      }
      if (params.people_also_ask_click_depth) {
        requestData.people_also_ask_click_depth = params.people_also_ask_click_depth;
      }
      if (params.priority) {
        requestData.priority = params.priority;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/google/organic/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
