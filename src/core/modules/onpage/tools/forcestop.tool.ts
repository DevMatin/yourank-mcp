import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class ForceStopTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'forcestop';
  }

  getDescription(): string {
    return "Force stop the crawl process of websites";
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

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/force_stop', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}