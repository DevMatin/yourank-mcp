import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class LighthouseVersionsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'on_page_lighthouse_versions';
  }

  getDescription(): string {
    return "Lighthouse versions";
  }

  getParams(): z.ZodRawShape {
    return {
      
    };
  }

  async handle(params: {  }): Promise<any> {
    try {
      const requestData: any = {};
      

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/versions', 'GET', [], true);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}