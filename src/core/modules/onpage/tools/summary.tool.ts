import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class SummaryTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'summary';
  }

  getDescription(): string {
    return "Overall information on a website and on-page issues";
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("id")
    };
  }

  async handle(params: { id: string }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.id = params.id;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/summary/{id}', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}