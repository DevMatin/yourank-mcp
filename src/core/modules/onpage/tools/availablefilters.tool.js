import { BaseTool } from '../../base.tool.js';
export class AvailableFiltersTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_available_filters';
    }
    getDescription() {
        return "Available filters and thresholds for OnPage API";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const requestData = {};
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/available_filters', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
