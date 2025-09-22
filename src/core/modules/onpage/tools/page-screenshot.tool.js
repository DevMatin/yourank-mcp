import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class PageScreenshotTool extends BaseTool {
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'on_page_page_screenshot';
    }
    getDescription() {
        return "Capture a full high-quality screenshot of any webpage. Review the target page as the DataForSEO crawler and Googlebot see it.";
    }
    getParams() {
        return {
            url: z.string().describe("URL to capture screenshot"),
            enable_javascript: z.boolean().optional().describe("Enable JavaScript rendering"),
            custom_js: z.string().optional().describe("Custom JavaScript code to execute"),
            custom_user_agent: z.string().optional().describe("Custom User-Agent header"),
            accept_language: z.string().optional().describe("Language header for accessing the website"),
            viewport_width: z.number().optional().describe("Viewport width for screenshot"),
            viewport_height: z.number().optional().describe("Viewport height for screenshot"),
        };
    }
    async handle(params) {
        try {
            const response = await this.dataForSEOClient.makeRequest('/v3/on_page/page_screenshot', 'POST', [{
                    url: params.url,
                    enable_javascript: params.enable_javascript,
                    custom_js: params.custom_js,
                    custom_user_agent: params.custom_user_agent,
                    accept_language: params.accept_language,
                    viewport_width: params.viewport_width,
                    viewport_height: params.viewport_height,
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
