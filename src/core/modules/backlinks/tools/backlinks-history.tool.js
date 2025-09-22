import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class BacklinksHistoryTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'backlinks_history';
  }

  getDescription() {
    return "This endpoint will provide you with historical backlinks data back to the beginning of 2019. You can receive the number of backlinks a given domain had in a specific time period, the number of new & lost backlinks, referring domains, and more.";
  }

  getParams() {
    return {
      target: z.string().describe(`domain, subdomain or webpage to get historical backlinks data for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`),
      date_from: z.string().optional().describe("start date for historical data (format: YYYY-MM-DD)"),
      date_to: z.string().optional().describe("end date for historical data (format: YYYY-MM-DD)"),
      include_subdomains: z.boolean().optional().describe(`indicates if indirect links to the target will be included in the results
if set to true, the results will include data on indirect links pointing to a page that either redirects to the target, or points to a canonical page
if set to false, indirect links will be ignored`).default(true),
      exclude_internal_backlinks: z.boolean().optional().describe(`indicates if internal backlinks from subdomains to the target will be excluded from the results
if set to true, the results will not include data on internal backlinks from subdomains of the same domain as target
if set to false, internal links will be included in the results`).default(true)
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };
      
      if (params.date_from) requestData.date_from = params.date_from;
      if (params.date_to) requestData.date_to = params.date_to;
      if (params.include_subdomains !== undefined) requestData.include_subdomains = params.include_subdomains;
      if (params.exclude_internal_backlinks !== undefined) requestData.exclude_internal_backlinks = params.exclude_internal_backlinks;

      const response = await this.client.makeRequest('/v3/backlinks/history/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
