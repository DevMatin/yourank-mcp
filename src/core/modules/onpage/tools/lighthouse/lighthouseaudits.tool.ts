import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class LighthouseAuditsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'on_page_lighthouse_audits';
  }

  getDescription(): string {
    return "Available Lighthouse audits";
  }

  getParams(): z.ZodRawShape {
    return {
      
    };
  }

  async handle(params: {  }): Promise<any> {
    try {
      const requestData: any = {};
      

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/audits', 'GET', [], true);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}