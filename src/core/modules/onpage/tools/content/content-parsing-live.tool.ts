import { z } from 'zod';
import { BaseTool, DataForSEOFullResponse } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { DataForSEOResponse } from '../../../base.tool.js';
import { defaultGlobalToolConfig } from '../../../../config/global.tool.js';

export class ContentParsingLiveTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'on_page_content_parsing_live';
  }

  getDescription(): string {
    return 'This endpoint allows parsing the content on any page you specify and will return the structured content of the target page, including link URLs, anchors, headings, and textual content. This is the live version that processes pages in real-time.';
  }

  getParams(): z.ZodRawShape {
    return {
      url: z.string().describe("URL of the page to parse"),
      enable_javascript: z.boolean().optional().describe("Enable JavaScript rendering"),
      custom_js: z.string().optional().describe("Custom JavaScript code to execute"),
      custom_user_agent: z.string().optional().describe("Custom User-Agent header"),
      accept_language: z.string().optional().describe("Accept-Language header value"),
      markdown_view: z.boolean().optional().describe("Return content in markdown format"),
    };
  }

  async handle(params: { 
    url: string; 
    enable_javascript?: boolean; 
    custom_js?: string; 
    custom_user_agent?: string; 
    accept_language?: string;
    markdown_view?: boolean;
  }): Promise<any> {
    try {
      const requestData: any = {
        url: params.url
      };

      if (params.enable_javascript !== undefined) {
        requestData.enable_javascript = params.enable_javascript;
      }
      if (params.custom_js) {
        requestData.custom_js = params.custom_js;
      }
      if (params.custom_user_agent) {
        requestData.custom_user_agent = params.custom_user_agent;
      }
      if (params.accept_language) {
        requestData.accept_language = params.accept_language;
      }
      if (params.markdown_view !== undefined) {
        requestData.markdown_view = params.markdown_view;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/content_parsing/live', 'POST', [requestData]);
      
      if (defaultGlobalToolConfig.fullResponse || this.supportOnlyFullResponse()) {
        let data = response as DataForSEOFullResponse;
        this.validateResponseFull(data);
        let result = data.tasks[0].result;
        return this.formatResponse(result);
      } else {
        let data = response as DataForSEOResponse;
        this.validateResponse(data);
        let result = data.items[0];
        return this.formatResponse(result);
      }
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
