import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class ContentAnalysisSentimentAnalysisTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'content_analysis_sentiment_analysis';
  }

  getDescription(): string {
    return 'This endpoint will provide you with sentiment analysis data for the citations available for the target keyword.';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe('target keyword'),
      location_code: z.number().optional().describe('location code'),
      language_code: z.string().optional().describe('language code'),
      search_partners: z.boolean().optional().describe('search partners'),
      include_serp_info: z.boolean().optional().describe('include SERP info'),
      include_subdomains: z.boolean().optional().describe('include subdomains'),
      limit: z.number().min(1).max(1000).default(10).describe('maximum number of results to return'),
      offset: z.number().min(0).default(0).describe('offset in the results array'),
      filters: this.getFilterExpression().optional().describe('array of results filtering parameters'),
      order_by: z.array(z.string()).optional().describe('results sorting rules'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/content_analysis/sentiment_analysis/live', 'POST', [{
        keyword: params.keyword,
        location_code: params.location_code,
        language_code: params.language_code,
        search_partners: params.search_partners,
        include_serp_info: params.include_serp_info,
        include_subdomains: params.include_subdomains,
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
