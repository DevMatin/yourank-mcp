import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
export class LighthouseTaskPostTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_lighthouse_task_post';
    }
    getDescription() {
        return "Create Lighthouse analysis tasks";
    }
    getParams() {
        return {
            target: z.string().describe("Target URL"),
            language_code: z.string().optional().describe("Language code"),
            category: z.array(z.any()).optional().describe("Categories"),
            version: z.string().optional().describe("Version")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            requestData.target = params.target;
            if (params.language_code !== undefined)
                requestData.language_code = params.language_code;
            if (params.category !== undefined)
                requestData.category = params.category;
            if (params.version !== undefined)
                requestData.version = params.version;
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/task_post', 'POST', [requestData], true);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
