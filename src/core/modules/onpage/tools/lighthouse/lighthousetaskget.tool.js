import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
export class LighthouseTaskGetTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_lighthouse_task_get';
    }
    getDescription() {
        return "Get Lighthouse task results";
    }
    getParams() {
        return {
            id: z.string().describe("Task identifier")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            requestData.id = params.id;
            const response = await this.dataForSEOClient.makeRequest(`/v3/on_page/lighthouse/task_get/json/${params.id}`, 'GET', [], true);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
