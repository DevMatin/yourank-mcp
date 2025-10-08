import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class RawHtmlTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'on_page_raw_html';
  }

  getDescription(): string {
    return "Returns the HTML of a page you indicate in the request.";
  }

  getParams(): z.ZodRawShape {
    return {
      url: z.string().describe("URL to get raw HTML"),
      enable_javascript: z.boolean().optional().describe("Enable JavaScript rendering"),
      custom_js: z.string().optional().describe("Custom JavaScript code to execute"),
      custom_user_agent: z.string().optional().describe("Custom User-Agent header"),
      accept_language: z.string().optional().describe("Language header for accessing the website"),
    };
  }

  async handle(params: { 
    url: string; 
    enable_javascript?: boolean; 
    custom_js?: string; 
    custom_user_agent?: string; 
    accept_language?: string;
  }): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/raw_html', 'POST', [{
        url: params.url,
        enable_javascript: params.enable_javascript,
        custom_js: params.custom_js,
        custom_user_agent: params.custom_user_agent,
        accept_language: params.accept_language,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 