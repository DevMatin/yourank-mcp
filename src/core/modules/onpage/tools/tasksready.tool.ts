import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class TasksReadyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'tasksready';
  }

  getDescription(): string {
    return "List of completed tasks";
  }

  getParams(): z.ZodRawShape {
    return {
      
    };
  }

  async handle(params: {  }): Promise<any> {
    try {
      const requestData: any = {};
      

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/tasks_ready', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}