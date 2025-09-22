import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
export class DomainAnalyticsTechnologiesDomainsByTechnologyLiveTool extends BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'domain_analytics_technologies_domains_by_technology_live';
    }
    getDescription() {
        return `This endpoint provides domains based on the technology they use. In addition to the list of domains, you will also get their technology profiles, the country and language they belong to, and other related data.`;
    }
    getParams() {
        return {
            target: z.string().describe("target technology"),
            location_code: z.number().optional().describe("location code for filtering results"),
            language_code: z.string().optional().describe("language code for filtering results"),
            limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned results"),
            offset: z.number().min(0).default(0).optional().describe("offset in the results array"),
            filters: this.getFilterExpression().optional().describe("array of results filtering parameters"),
            order_by: z.array(z.string()).optional().describe("results sorting rules")
        };
    }
    async handle(params) {
        try {
            const requestData = {
                target: params.target
            };
            if (params.location_code)
                requestData.location_code = params.location_code;
            if (params.language_code)
                requestData.language_code = params.language_code;
            if (params.limit)
                requestData.limit = params.limit;
            if (params.offset)
                requestData.offset = params.offset;
            if (params.filters)
                requestData.filters = this.formatFilters(params.filters);
            if (params.order_by)
                requestData.order_by = this.formatOrderBy(params.order_by);
            const response = await this.client.makeRequest('/v3/domain_analytics/technologies/domains_by_technology/live', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
