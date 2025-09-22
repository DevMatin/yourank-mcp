import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class LighthouseTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'on_page_lighthouse_task_get';
  }

  getDescription(): string {
    return "Get Lighthouse task results";
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task identifier")
    };
  }

  async handle(params: { id: string }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.id = params.id;

      const response = await this.dataForSEOClient.makeRequest(`/v3/on_page/lighthouse/task_get/json/${params.id}`, 'GET', [], true);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}