"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksErrorsTool = void 0;
const zod_1 = require("zod");
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksErrorsTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_errors';
    }
    getDescription() {
        return "By calling this endpoint you will receive information about the Backlinks API tasks that returned an error within the past 7 days.";
    }
    getParams() {
        return {
            limit: zod_1.z.number().min(1).max(1000).default(100).optional().describe("the maximum number of returned errors"),
            offset: zod_1.z.number().min(0).default(0).optional().describe("offset in the results array of returned errors")
        };
    }
    async handle(params) {
        try {
            const requestData = {};
            if (params.limit !== undefined)
                requestData.limit = params.limit;
            if (params.offset !== undefined)
                requestData.offset = params.offset;
            const response = await this.client.makeRequest('/v3/backlinks/errors', 'POST', [requestData]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksErrorsTool = BacklinksErrorsTool;
