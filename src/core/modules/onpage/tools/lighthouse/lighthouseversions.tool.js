import { BaseTool } from '../../../base.tool.js';
export class LighthouseVersionsTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_lighthouse_versions';
    }
    getDescription() {
        return "Lighthouse versions";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const requestData = {};
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/versions', 'GET', [], true);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
