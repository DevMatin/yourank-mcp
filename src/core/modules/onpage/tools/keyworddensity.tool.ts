import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class KeywordDensityTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keyworddensity';
  }

  getDescription(): string {
    return "Keyword density and keyword frequency data for terms";
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("id"),
      limit: z.number().optional().describe("limit"),
      offset: z.number().optional().describe("offset"),
      filters: z.array(z.any()).optional().describe("filters"),
      order_by: z.array(z.any()).optional().describe("order_by")
    };
  }

  async handle(params: { id: string; limit?: number; offset?: number; filters?: any[]; order_by?: any[] }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.id = params.id;
      if (params.limit !== undefined) requestData.limit = params.limit;
      if (params.offset !== undefined) requestData.offset = params.offset;
      if (params.filters !== undefined) requestData.filters = params.filters;
      if (params.order_by !== undefined) requestData.order_by = params.order_by;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/keyword_density', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}