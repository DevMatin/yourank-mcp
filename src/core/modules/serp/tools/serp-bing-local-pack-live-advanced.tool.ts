import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class SerpBingLocalPackLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_bing_local_pack_live_advanced';
  }

  getDescription(): string {
    return 'Get Bing Local Pack search results with advanced features';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Search keyword"),
      location_name: z.string().optional().describe("Location name (e.g., 'United States')"),
      location_code: z.number().optional().describe("Location code"),
      language_code: z.string().optional().describe("Language code (e.g., 'en')"),
      device: z.enum(['desktop', 'mobile']).optional().describe("Device type"),
      depth: z.number().optional().describe("Number of results to retrieve (10-700)"),
      include_answer_box: z.boolean().optional().describe("Include answer box content"),
      include_people_also_ask: z.boolean().optional().describe("Include people also ask content"),
      include_related_searches: z.boolean().optional().describe("Include related searches"),
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
      if (params.depth) {
        requestData.depth = params.depth;
      }
      if (params.include_answer_box !== undefined) {
        requestData.include_answer_box = params.include_answer_box;
      }
      if (params.include_people_also_ask !== undefined) {
        requestData.include_people_also_ask = params.include_people_also_ask;
      }
      if (params.include_related_searches !== undefined) {
        requestData.include_related_searches = params.include_related_searches;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/bing/local_pack/live/advanced', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
