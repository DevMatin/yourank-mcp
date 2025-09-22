import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
export class DomainAnalyticsTechnologiesDomainTechnologiesLiveTool extends BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'domain_analytics_technologies_domain_technologies_live';
    }
    getDescription() {
        return `Using this endpoint you will get a list of technologies used in a particular domain (live version)`;
    }
    getParams() {
        return {
            target: z.string().describe(`target domain
required field
domain name of the website to analyze
Note: results will be returned for the specified domain only`),
            location_code: z.number().optional().describe(`location code for the analysis`),
            language_code: z.string().optional().describe(`language code for the analysis`),
            limit: z.number().optional().describe(`number of results to return`),
            offset: z.number().optional().describe(`offset for pagination`)
        };
    }
    async handle(params) {
        try {
            const requestData = {
                target: params.target
            };
            if (params.location_code) {
                requestData.location_code = params.location_code;
            }
            if (params.language_code) {
                requestData.language_code = params.language_code;
            }
            if (params.limit) {
                requestData.limit = params.limit;
            }
            if (params.offset) {
                requestData.offset = params.offset;
            }
            const response = await this.client.makeRequest('/v3/domain_analytics/technologies/domain_technologies/live', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
