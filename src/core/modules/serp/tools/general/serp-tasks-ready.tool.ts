import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_tasks_ready';
  }

  getDescription(): string {
    return 'Get list of completed SERP API tasks that haven\'t been collected yet';
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().optional().describe("Maximum number of tasks to return"),
      offset: z.number().optional().describe("Number of tasks to skip"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {};
      
      if (params.limit) {
        requestData.limit = params.limit;
      }
      if (params.offset) {
        requestData.offset = params.offset;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/tasks_ready', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
