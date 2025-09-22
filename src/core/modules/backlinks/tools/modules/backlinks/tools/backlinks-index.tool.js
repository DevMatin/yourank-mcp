"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksIndexTool = void 0;
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksIndexTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_index';
    }
    getDescription() {
        return "This endpoint will provide you with the total number of backlinks, domains, and pages our database contains for the moment when you make a request. You will also get stats for the last 12 months.";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const response = await this.client.makeRequest('/v3/backlinks/index', 'GET');
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksIndexTool = BacklinksIndexTool;
