import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class LighthouseLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'on_page_lighthouse_live';
  }

  getDescription(): string {
    return "Live Lighthouse analysis";
  }

  getParams(): z.ZodRawShape {
    return {
      url: z.string().describe("Target URL for Lighthouse analysis (absolute URL with http:// or https://)"),
      for_mobile: z.boolean().optional().describe("Apply mobile emulation (default: false)"),
      categories: z.array(z.string()).optional().describe("Categories to analyze: seo, pwa, performance, best_practices, accessibility"),
      audits: z.array(z.string()).optional().describe("Specific audit types to perform"),
      language_name: z.string().optional().describe("Lighthouse language name (default: English)"),
      language_code: z.string().optional().describe("Lighthouse language code (default: en)"),
      tag: z.string().optional().describe("User-defined task identifier (max 255 chars)")
    };
  }

  async handle(params: { url: string; for_mobile?: boolean; categories?: string[]; audits?: string[]; language_name?: string; language_code?: string; tag?: string }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.url = params.url;
      if (params.for_mobile !== undefined) requestData.for_mobile = params.for_mobile;
      if (params.categories !== undefined) requestData.categories = params.categories;
      if (params.audits !== undefined) requestData.audits = params.audits;
      if (params.language_name !== undefined) requestData.language_name = params.language_name;
      if (params.language_code !== undefined) requestData.language_code = params.language_code;
      if (params.tag !== undefined) requestData.tag = params.tag;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/live/json', 'POST', [requestData], true);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}