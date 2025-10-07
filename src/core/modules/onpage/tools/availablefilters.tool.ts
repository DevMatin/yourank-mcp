import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client';
import { BaseTool } from '../../base.tool';

export class AvailableFiltersTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'availablefilters';
  }

  getDescription(): string {
    return "Available filters and thresholds for OnPage API";
  }

  getParams(): z.ZodRawShape {
    return {
      
    };
  }

  async handle(params: {  }): Promise<any> {
    try {
      const requestData: any = {};
      

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/available_filters', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}