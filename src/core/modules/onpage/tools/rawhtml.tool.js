import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class RawHtmlTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_raw_html';
    }
    getDescription() {
        return "Returns the HTML of a page you indicate in the request";
    }
    getParams() {
        return {
            url: z.string().describe("url"),
            enable_javascript: z.boolean().optional().describe("enable_javascript"),
            custom_js: z.string().optional().describe("custom_js"),
            custom_user_agent: z.string().optional().describe("custom_user_agent"),
            accept_language: z.string().optional().describe("accept_language")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            requestData.url = params.url;
            if (params.enable_javascript !== undefined)
                requestData.enable_javascript = params.enable_javascript;
            if (params.custom_js !== undefined)
                requestData.custom_js = params.custom_js;
            if (params.custom_user_agent !== undefined)
                requestData.custom_user_agent = params.custom_user_agent;
            if (params.accept_language !== undefined)
                requestData.accept_language = params.accept_language;
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/raw_html', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
