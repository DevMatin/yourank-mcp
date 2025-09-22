import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class ErrorsTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_errors';
    }
    getDescription() {
        return "OnPage API tasks that returned an error";
    }
    getParams() {
        return {
            limit: z.number().optional().describe("limit"),
            offset: z.number().optional().describe("offset")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            if (params.limit !== undefined)
                requestData.limit = params.limit;
            if (params.offset !== undefined)
                requestData.offset = params.offset;
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/errors', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
