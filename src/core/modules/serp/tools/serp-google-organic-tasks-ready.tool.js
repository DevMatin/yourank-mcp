import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class SerpGoogleOrganicTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'serp_google_organic_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Google organic search tasks';
  }

  getParams() {
    return {
      limit: z.number().min(1).max(1000).optional().default(100).describe("Maximum number of tasks to return"),
      offset: z.number().min(0).optional().default(0).describe("Offset in the results array")
    };
  }

  async handle(params) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      if (params.offset) {
        queryParams.append('offset', params.offset.toString());
      }

      const endpoint = `/v3/serp/google/organic/tasks_ready${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await this.dataForSEOClient.makeRequest(endpoint, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
