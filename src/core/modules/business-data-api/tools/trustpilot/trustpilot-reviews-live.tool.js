import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class TrustpilotReviewsLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_trustpilot_reviews_live';
  }

  getDescription() {
    return `This endpoint provides reviews published on the Trustpilot platform for the local establishment specified in the domain field.`;
  }

  getParams() {
    return {
      domain: z.string().describe("target domain or business name"),
      limit: z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned reviews"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        domain: params.domain
      };
      
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/business_data/trustpilot/reviews/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
