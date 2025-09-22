"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksBulkReferringDomainsTool = void 0;
const zod_1 = require("zod");
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksBulkReferringDomainsTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_bulk_referring_domains';
    }
    getDescription() {
        return `This endpoint will provide you with the number of referring domains pointing to domains, subdomains, and pages specified in the targets array. The returned numbers are based on all live referring domains, that is, total number of domains pointing to the target with any type of backlinks (e.g., nofollow, noreferrer, ugc, sponsored etc) that were found during the latest check.
Note that if you indicate a domain as a target, you will get result for the root domain (domain with all of its subdomains), e.g. dataforseo.com and app.dataforseo.com`;
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
            const response = await this.client.makeRequest('/v3/backlinks/bulk_referring_domains/live', 'POST', [{
                    targets: params.targets
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksBulkReferringDomainsTool = BacklinksBulkReferringDomainsTool;
