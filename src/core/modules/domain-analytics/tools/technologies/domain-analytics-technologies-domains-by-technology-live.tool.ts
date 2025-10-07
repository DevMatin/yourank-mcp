import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class DomainAnalyticsTechnologiesDomainsByTechnologyLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'domain_analytics_technologies_domains_by_technology_live';
  }

  getDescription(): string {
    return `This endpoint provides domains based on the technology they use. In addition to the list of domains, you will also get their technology profiles, the country and language they belong to, and other related data.`;
  }

  getParams(): z.ZodRawShape {
    return {
      // Prefer explicit technologies array as per DataForSEO API; keep 'target' as backwards-compatible alias
      technologies: z.array(z.string()).min(1).optional().describe("array of technology names to filter domains by"),
      target: z.string().optional().describe("backwards-compatible alias for a single technology; mapped to technologies: [target]"),
      location_code: z.number().optional().describe("location code for filtering results"),
      language_code: z.string().optional().describe("language code for filtering results"),
      limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned results"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array"),
      filters: this.getFilterExpression().optional().describe("array of results filtering parameters"),
      order_by: z.array(z.string()).optional().describe("results sorting rules")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {};

      // Map input to required DataForSEO field
      if (Array.isArray(params.technologies) && params.technologies.length > 0) {
        requestData.technologies = params.technologies;
      } else if (typeof params.target === 'string' && params.target.trim().length > 0) {
        requestData.technologies = [params.target];
      }

      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;
      if (params.filters) requestData.filters = this.formatFilters(params.filters);
      if (params.order_by) requestData.order_by = this.formatOrderBy(params.order_by);

      const response = await this.client.makeRequest('/v3/domain_analytics/technologies/domains_by_technology/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 