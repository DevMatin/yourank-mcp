import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class PagesByResourceTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_pages_by_resource';
    }
    getDescription() {
        return "Pages where a specific resource is located";
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
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/pages_by_resource', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
