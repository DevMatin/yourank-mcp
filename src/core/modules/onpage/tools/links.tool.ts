import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client';
import { BaseTool } from '../../base.tool';

export class LinksTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'on_page_links';
  }

  getDescription(): string {
    return "Provides a list of internal and external links detected on a target website. Supports anchor, image, link, canonical, meta, alternate, redirect link types.";
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task identifier"),
      limit: z.number().optional().describe("Maximum number of returned links"),
      offset: z.number().optional().describe("Offset in the results array"),
      filters: z.array(z.any()).optional().describe("Array of filters"),
      order_by: z.array(z.string()).optional().describe("Array of sorting rules"),
    };
  }

  async handle(params: { 
    id: string; 
    limit?: number; 
    offset?: number; 
    filters?: any[]; 
    order_by?: string[];
  }): Promise<any> {
    try {
      const requestData: any = {
        id: params.id,
      };

      if (params.limit !== undefined) requestData.limit = params.limit;
      if (params.offset !== undefined) requestData.offset = params.offset;
      if (params.filters) requestData.filters = this.formatFilters(params.filters);
      if (params.order_by) requestData.order_by = this.formatOrderBy(params.order_by);

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/links', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 