import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class SerpErrorsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'serp_errors';
  }

  getDescription() {
    return 'Get information about SERP API tasks that returned an error within the past 7 days';
  }

  getParams() {
    return {
      limit: z.number().optional().describe("Maximum number of errors to return"),
      offset: z.number().optional().describe("Number of errors to skip"),
    };
  }

  async handle(params) {
    try {
      const requestData = {};
      
      if (params.limit) {
        requestData.limit = params.limit;
      }
      if (params.offset) {
        requestData.offset = params.offset;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/errors', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
