import { BaseTool } from '../../../base.tool.js';
export class LighthouseLanguagesTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_lighthouse_languages';
    }
    getDescription() {
        return "List of supported languages for Lighthouse";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const requestData = {};
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/languages', 'GET', [], true);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
