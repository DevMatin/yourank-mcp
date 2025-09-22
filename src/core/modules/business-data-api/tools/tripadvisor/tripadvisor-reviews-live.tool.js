import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class TripadvisorReviewsLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_tripadvisor_reviews_live';
  }

  getDescription() {
    return `This endpoint provides results from the "Reviews" element on the Tripadvisor platform. The results are specific to the URL path or keyword you indicate, and the selected location.`;
  }

  getParams() {
    return {
      target: z.string().describe("target URL path or keyword"),
      location_code: z.number().optional().describe("location code"),
      language_code: z.string().optional().describe("language code"),
      limit: z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned reviews"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };
      
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/business_data/tripadvisor/reviews/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
