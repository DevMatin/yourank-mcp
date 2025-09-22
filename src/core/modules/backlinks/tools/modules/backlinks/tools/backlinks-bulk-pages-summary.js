"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksBulkPagesSummaryTool = void 0;
const zod_1 = require("zod");
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksBulkPagesSummaryTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_bulk_pages_summary';
    }
    getDescription() {
        return "This endpoint will provide you with a comprehensive overview of backlinks and related data for a bulk of up to 1000 pages, domains, or subdomains. If you indicate a single page as a target, you will get comprehensive summary data on all backlinks for that page.";
    }
    getParams() {
        return {
            targets: zod_1.z.array(zod_1.z.string()).describe(`domains, subdomains or webpages to get summary data for
required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)
you can specify up to 1000 pages, domains, or subdomains in each request.
note that the URLs you set in a single request cannot belong to more than 100 different domains.`),
            include_subdomains: zod_1.z.boolean().optional().describe(`indicates if indirect links to the target will be included in the results
if set to true, the results will include data on indirect links pointing to a page that either redirects to the target, or points to a canonical page
if set to false, indirect links will be ignored`).default(true)
        };
    }
    async handle(params) {
        try {
            const response = await this.client.makeRequest('/v3/backlinks/bulk_pages_summary/live', 'POST', [{
                    targets: params.targets,
                    include_subdomains: params.include_subdomains,
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksBulkPagesSummaryTool = BacklinksBulkPagesSummaryTool;
