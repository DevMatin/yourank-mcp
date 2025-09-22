import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class WaterfallTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'waterfall';
  }

  getDescription(): string {
    return "Page speed insights and loading time details";
  }

  getParams(): z.ZodRawShape {
    return {
      url: z.string().describe("url"),
      enable_javascript: z.boolean().optional().describe("enable_javascript"),
      custom_js: z.string().optional().describe("custom_js"),
      custom_user_agent: z.string().optional().describe("custom_user_agent"),
      accept_language: z.string().optional().describe("accept_language")
    };
  }

  async handle(params: { url: string; enable_javascript?: boolean; custom_js?: string; custom_user_agent?: string; accept_language?: string }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.url = params.url;
      if (params.enable_javascript !== undefined) requestData.enable_javascript = params.enable_javascript;
      if (params.custom_js !== undefined) requestData.custom_js = params.custom_js;
      if (params.custom_user_agent !== undefined) requestData.custom_user_agent = params.custom_user_agent;
      if (params.accept_language !== undefined) requestData.accept_language = params.accept_language;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/waterfall', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}