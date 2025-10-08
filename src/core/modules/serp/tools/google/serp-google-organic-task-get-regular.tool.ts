import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpGoogleOrganicTaskGetRegularTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_organic_task_get_regular';
  }

  getDescription(): string {
    return 'Get Google organic search task results with regular features';
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task ID to retrieve results for")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(`/v3/serp/google/organic/task_get/regular/${params.id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
