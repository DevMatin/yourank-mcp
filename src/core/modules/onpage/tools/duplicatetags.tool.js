import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class DuplicateTagsTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_duplicate_tags';
    }
    getDescription() {
        return "Pages with duplicate title or description tags";
    }
    getParams() {
        return {
            id: z.string().describe("id"),
            limit: z.number().optional().describe("limit"),
            offset: z.number().optional().describe("offset"),
            filters: z.array(z.any()).optional().describe("filters"),
            order_by: z.array(z.any()).optional().describe("order_by")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            requestData.id = params.id;
            if (params.limit !== undefined)
                requestData.limit = params.limit;
            if (params.offset !== undefined)
                requestData.offset = params.offset;
            if (params.filters !== undefined)
                requestData.filters = params.filters;
            if (params.order_by !== undefined)
                requestData.order_by = params.order_by;
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/duplicate_tags', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
