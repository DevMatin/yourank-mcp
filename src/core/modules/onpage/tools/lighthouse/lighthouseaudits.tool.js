import { BaseTool } from '../../../base.tool.js';
export class LighthouseAuditsTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_lighthouse_audits';
    }
    getDescription() {
        return "Available Lighthouse audits";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const requestData = {};
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/audits', 'GET', [], true);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
