import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
export class DomainAnalyticsErrorsTool extends BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'domain_analytics_errors';
    }
    getDescription() {
        return `By calling this endpoint you will receive information about the Domain Analytics API tasks that returned an error within the past 7 days.`;
    }
    getParams() {
        return {
            limit: z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned errors"),
            offset: z.number().min(0).default(0).optional().describe("offset in the results array of returned errors")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            if (params.limit)
                requestData.limit = params.limit;
            if (params.offset)
                requestData.offset = params.offset;
            const response = await this.client.makeRequest('/v3/domain_analytics/errors', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
