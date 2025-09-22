"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinksCompetitorsTool = void 0;
const zod_1 = require("zod");
const base_tool_js_1 = require("../../base.tool.js");
class BacklinksCompetitorsTool extends base_tool_js_1.BaseTool {
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return 'backlinks_competitors';
    }
    getDescription() {
        return "This endpoint will provide you with a list of competitors that share some part of the backlink profile with a target website, along with a number of backlink intersections and the rank of every competing website";
    }
    getParams() {
        return {
            target: zod_1.z.string().describe(`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`),
            limit: zod_1.z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned domains"),
            offset: zod_1.z.number().min(0).optional().describe(`offset in the results array of returned networks
optional field
default value: 0
if you specify the 10 value, the first ten domains in the results array will be omitted and the data will be provided for the successive pages`),
            filters: this.getFilterExpression().optional().describe(`array of results filtering parameters
optional field
you can add several filters at once (8 filters maximum)
you should set a logical operator and, or between the conditions
the following operators are supported:
regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
you can use the % operator with like and not_like to match any string of zero or more characters
example:
["rank",">","100"]
[["target","like","%forbes%"],
"and",
[["rank",">","100"],"or",["intersections",">","5"]]]`),
            order_by: zod_1.z.array(zod_1.z.string()).optional().describe(`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["rank,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["intersections,desc","rank,asc"]`),
            main_domain: zod_1.z.boolean().optional().describe(`indicates if only main domain of the target will be included in the search
if set to true, only the main domain will be included in search`).default(true),
            exclude_large_domains: zod_1.z.boolean().optional().describe(`indicates whether large domain will appear in results
if set to true, the results from the large domain (google.com, amazon.com, etc.) will be omitted`).default(true),
            exclude_internal_backlinks: zod_1.z.boolean().optional().describe(`indicates if internal backlinks from subdomains to the target will be excluded from the results
if set to true, the results will not include data on internal backlinks from subdomains of the same domain as target
if set to false, internal links will be included in the results`).default(true)
        };
    }
    async handle(params) {
        try {
            const response = await this.client.makeRequest('/v3/backlinks/competitors/live', 'POST', [{
                    target: params.target,
                    limit: params.limit,
                    offset: params.offset,
                    filters: this.formatFilters(params.filters),
                    order_by: this.formatOrderBy(params.order_by),
                    main_domain: params.main_domain,
                    exclude_large_domains: params.exclude_large_domains,
                    exclude_internal_backlinks: params.exclude_internal_backlinks
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
exports.BacklinksCompetitorsTool = BacklinksCompetitorsTool;
