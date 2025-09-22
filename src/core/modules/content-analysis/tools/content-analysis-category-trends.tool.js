import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class ContentAnalysisCategoryTrendsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_analysis_category_trends';
  }

  getDescription() {
    return 'This endpoint will provide you with data on all citations in the target category for the indicated date range.';
  }

  getParams() {
    return {
      category: {
        type: 'number',
        description: 'target category ID'
      },
      location_code: {
        type: 'number',
        optional: true,
        description: 'location code'
      },
      language_code: {
        type: 'string',
        optional: true,
        description: 'language code'
      },
      search_partners: {
        type: 'boolean',
        optional: true,
        description: 'search partners'
      },
      include_serp_info: {
        type: 'boolean',
        optional: true,
        description: 'include SERP info'
      },
      include_subdomains: {
        type: 'boolean',
        optional: true,
        description: 'include subdomains'
      },
      date_from: {
        type: 'string',
        optional: true,
        description: 'date from which to get results (format: YYYY-MM-DD)'
      },
      date_to: {
        type: 'string',
        optional: true,
        description: 'date to which to get results (format: YYYY-MM-DD)'
      },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 1000,
        default: 10,
        description: 'maximum number of results to return'
      },
      offset: {
        type: 'number',
        minimum: 0,
        default: 0,
        description: 'offset in the results array'
      },
      filters: {
        type: 'array',
        optional: true,
        description: 'array of results filtering parameters'
      },
      order_by: {
        type: 'array',
        optional: true,
        description: 'results sorting rules'
      }
    };
  }

  async handle(params) {
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
