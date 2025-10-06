import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class SerpGoogleOrganicTaskGetAdvancedTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'serp_google_organic_task_get_advanced';
  }

  getDescription() {
    return 'Get Google organic search task results with advanced features';
  }

  getParams() {
    return {
      id: z.string().describe("Task ID to retrieve results for")
    };
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest(`/v3/serp/google/organic/task_get/advanced/${params.id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
