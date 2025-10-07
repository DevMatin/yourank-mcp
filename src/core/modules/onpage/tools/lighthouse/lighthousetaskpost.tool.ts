import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class LighthouseTaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'on_page_lighthouse_task_post';
  }

  getDescription(): string {
    return "Create Lighthouse analysis tasks";
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("Target URL"),
      language_code: z.string().optional().describe("Language code"),
      category: z.array(z.any()).optional().describe("Categories"),
      version: z.string().optional().describe("Version")
    };
  }

  async handle(params: { target: string; language_code?: string; category?: any[]; version?: string }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.target = params.target;
      if (params.language_code !== undefined) requestData.language_code = params.language_code;
      if (params.category !== undefined) requestData.category = params.category;
      if (params.version !== undefined) requestData.version = params.version;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/task_post', 'POST', [requestData], true);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}