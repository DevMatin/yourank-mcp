"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksAvailableFiltersTool = void 0;
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksAvailableFiltersTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_available_filters';
    }
    getDescription() {
        return "Backlinks API features plenty of parameters that support custom filtration. By applying filters to your POST requests, you will be able to effortlessly extract data that matches your requirements. Note that we do not charge any fees for using data filtering or sorting rules.";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const response = await this.client.makeRequest('/v3/backlinks/available_filters', 'GET');
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksAvailableFiltersTool = BacklinksAvailableFiltersTool;
