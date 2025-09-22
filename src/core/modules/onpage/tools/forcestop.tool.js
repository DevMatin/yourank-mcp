import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class ForceStopTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_force_stop';
    }
    getDescription() {
        return "Force stop the crawl process of websites";
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
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/force_stop', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
