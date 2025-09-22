"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksBulkSpamScoreTool = void 0;
const zod_1 = require("zod");
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksBulkSpamScoreTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_bulk_spam_score';
    }
    getDescription() {
        return `This endpoint will provide you with spam scores of the domains, subdomains, and pages you specified in the targets array. Spam Score is DataForSEO’s proprietary metric that indicates how “spammy” your target is on a scale from 0 to 100`;
    }
    getParams() {
        return {
            targets: zod_1.z.array(zod_1.z.string()).describe(`domains, subdomains or webpages to get rank for
required field
you can set up to 1000 domains, subdomains or webpages
the domain or subdomain should be specified without https:// and www.
the page should be specified with absolute URL (including http:// or https://)
example:
"targets": [
"forbes.com",
"cnn.com",
"bbc.com",
"yelp.com",
"https://www.apple.com/iphone/",
"https://ahrefs.com/blog/",
"ibm.com",
"https://variety.com/",
"https://stackoverflow.com/",
"www.trustpilot.com"
]`)
        };
    }
    async handle(params) {
        try {
            const response = await this.client.makeRequest('/v3/backlinks/bulk_spam_score/live', 'POST', [{
                    targets: params.targets
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksBulkSpamScoreTool = BacklinksBulkSpamScoreTool;
