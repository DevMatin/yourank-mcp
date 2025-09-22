"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksSummaryTool = void 0;
const zod_1 = require("zod");
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksSummaryTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_summary';
    }
    getDescription() {
        return "This endpoint will provide you with an overview of backlinks data available for a given domain, subdomain, or webpage";
    }
    getParams() {
        return {
            target: zod_1.z.string().describe(`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`),
            include_subdomains: zod_1.z.boolean().optional().describe(`indicates if indirect links to the target will be included in the results
if set to true, the results will include data on indirect links pointing to a page that either redirects to the target, or points to a canonical page
if set to false, indirect links will be ignored`).default(true),
            exclude_internal_backlinks: zod_1.z.boolean().optional().describe(`indicates if internal backlinks from subdomains to the target will be excluded from the results
if set to true, the results will not include data on internal backlinks from subdomains of the same domain as target
if set to false, internal links will be included in the results`).default(true)
        };
    }
    async handle(params) {
        try {
            const response = await this.client.makeRequest('/v3/backlinks/summary/live', 'POST', [{
                    target: params.target,
                    include_subdomains: params.include_subdomains,
                    exclude_internal_backlinks: params.exclude_internal_backlinks
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksSummaryTool = BacklinksSummaryTool;
