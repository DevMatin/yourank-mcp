import { BaseTool } from '../../../base.tool.js';
export class LighthouseTasksReadyTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_lighthouse_tasks_ready';
    }
    getDescription() {
        return "List of completed Lighthouse tasks";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const requestData = {};
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/tasks_ready', 'GET', [], true);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
