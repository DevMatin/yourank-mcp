import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client';
import { BaseTool } from '../../base.tool';

export class TaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'taskpost';
  }

  getDescription(): string {
    return "Create OnPage analysis tasks";
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("target domain (without https:// and www.)"),
      max_crawl_pages: z.number().optional().default(10).describe("number of pages to crawl (default: 10)"),
      start_url: z.string().optional().describe("the first url to crawl (optional)"),
      enable_javascript: z.boolean().optional().describe("enable_javascript"),
      custom_js: z.string().optional().describe("custom_js"),
      custom_user_agent: z.string().optional().describe("custom_user_agent"),
      accept_language: z.string().optional().describe("accept_language"),
      enable_browser_rendering: z.boolean().optional().describe("enable_browser_rendering"),
      load_resources: z.boolean().optional().describe("load_resources"),
      custom_settings: z.object({}).optional().describe("custom_settings")
    };
  }

  async handle(params: { target: string; max_crawl_pages?: number; start_url?: string; enable_javascript?: boolean; custom_js?: string; custom_user_agent?: string; accept_language?: string; enable_browser_rendering?: boolean; load_resources?: boolean; custom_settings?: any }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.target = params.target;
      requestData.max_crawl_pages = params.max_crawl_pages ?? 10;
      if (params.start_url !== undefined) requestData.start_url = params.start_url;
      if (params.enable_javascript !== undefined) requestData.enable_javascript = params.enable_javascript;
      if (params.custom_js !== undefined) requestData.custom_js = params.custom_js;
      if (params.custom_user_agent !== undefined) requestData.custom_user_agent = params.custom_user_agent;
      if (params.accept_language !== undefined) requestData.accept_language = params.accept_language;
      if (params.enable_browser_rendering !== undefined) requestData.enable_browser_rendering = params.enable_browser_rendering;
      if (params.load_resources !== undefined) requestData.load_resources = params.load_resources;
      if (params.custom_settings !== undefined) requestData.custom_settings = params.custom_settings;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}