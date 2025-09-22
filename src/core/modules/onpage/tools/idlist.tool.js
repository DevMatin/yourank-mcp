import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class IdListTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_id_list';
    }
    getDescription() {
        return "List of IDs and metadata of completed OnPage tasks";
    }
    getParams() {
        return {
            limit: z.number().optional().describe("limit"),
            offset: z.number().optional().describe("offset"),
            date_from: z.string().optional().describe("date_from"),
            date_to: z.string().optional().describe("date_to")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            if (params.limit !== undefined)
                requestData.limit = params.limit;
            if (params.offset !== undefined)
                requestData.offset = params.offset;
            if (params.date_from !== undefined)
                requestData.date_from = params.date_from;
            if (params.date_to !== undefined)
                requestData.date_to = params.date_to;
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/id_list', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
