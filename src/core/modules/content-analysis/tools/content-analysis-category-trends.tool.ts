import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class ContentAnalysisCategoryTrendsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'content_analysis_category_trends';
  }

  getDescription(): string {
    return 'This endpoint will provide you with data on all citations in the target category for the indicated date range.';
  }

  getParams(): z.ZodRawShape {
    return {
      category: z.number().describe('target category ID'),
      location_code: z.number().optional().describe('location code'),
      language_code: z.string().optional().describe('language code'),
      search_partners: z.boolean().optional().describe('search partners'),
      include_serp_info: z.boolean().optional().describe('include SERP info'),
      include_subdomains: z.boolean().optional().describe('include subdomains'),
      date_from: z.string().optional().describe('date from which to get results (format: YYYY-MM-DD)'),
      date_to: z.string().optional().describe('date to which to get results (format: YYYY-MM-DD)'),
      limit: z.number().min(1).max(1000).default(10).describe('maximum number of results to return'),
      offset: z.number().min(0).default(0).describe('offset in the results array'),
      filters: this.getFilterExpression().optional().describe('array of results filtering parameters'),
      order_by: z.array(z.string()).optional().describe('results sorting rules'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/content_analysis/category_trends/live', 'POST', [{
        category: params.category,
        location_code: params.location_code,
        language_code: params.language_code,
        search_partners: params.search_partners,
        include_serp_info: params.include_serp_info,
        include_subdomains: params.include_subdomains,
        date_from: params.date_from,
        date_to: params.date_to,
        limit: params.limit,
        offset: params.offset,
        filters: this.formatFilters(params.filters),
        order_by: this.formatOrderBy(params.order_by),
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
