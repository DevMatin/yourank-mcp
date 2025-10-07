import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class DataForSeoLabsStatusTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'dataforseo_labs_status';
  }

  getDescription(): string {
    return 'Find out when the DataForSEO Labs data was last updated. The API response will provide separate update dates for the Google, Bing, and Amazon endpoints';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/dataforseo_labs/status', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
