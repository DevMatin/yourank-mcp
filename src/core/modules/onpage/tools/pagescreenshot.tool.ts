import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client';
import { BaseTool } from '../../base.tool';

export class PageScreenshotTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'pagescreenshot';
  }

  getDescription(): string {
    return "Capture a full high-quality screenshot of any webpage";
  }

  getParams(): z.ZodRawShape {
    return {
      url: z.string().describe("url"),
      enable_javascript: z.boolean().optional().describe("enable_javascript"),
      custom_js: z.string().optional().describe("custom_js"),
      custom_user_agent: z.string().optional().describe("custom_user_agent"),
      accept_language: z.string().optional().describe("accept_language"),
      viewport_width: z.number().optional().describe("viewport_width"),
      viewport_height: z.number().optional().describe("viewport_height")
    };
  }

  async handle(params: { url: string; enable_javascript?: boolean; custom_js?: string; custom_user_agent?: string; accept_language?: string; viewport_width?: number; viewport_height?: number }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.url = params.url;
      if (params.enable_javascript !== undefined) requestData.enable_javascript = params.enable_javascript;
      if (params.custom_js !== undefined) requestData.custom_js = params.custom_js;
      if (params.custom_user_agent !== undefined) requestData.custom_user_agent = params.custom_user_agent;
      if (params.accept_language !== undefined) requestData.accept_language = params.accept_language;
      if (params.viewport_width !== undefined) requestData.viewport_width = params.viewport_width;
      if (params.viewport_height !== undefined) requestData.viewport_height = params.viewport_height;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/page_screenshot', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}