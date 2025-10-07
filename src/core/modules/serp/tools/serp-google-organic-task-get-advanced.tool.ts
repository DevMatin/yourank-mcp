import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class SerpGoogleOrganicTaskGetAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_organic_task_get_advanced';
  }

  getDescription(): string {
    return 'Get Google organic search task results with advanced features';
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task ID to retrieve results for")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(`/v3/serp/google/organic/task_get/advanced/${params.id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
