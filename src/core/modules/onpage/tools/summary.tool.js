import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class SummaryTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_summary';
    }
    getDescription() {
        return "Overall information on a website and on-page issues";
    }
    getParams() {
        return {
            id: z.string().describe("id")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            requestData.id = params.id;
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/summary/{id}', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
