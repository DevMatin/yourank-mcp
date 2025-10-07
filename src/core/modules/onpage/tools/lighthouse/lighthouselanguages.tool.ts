import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class LighthouseLanguagesTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'on_page_lighthouse_languages';
  }

  getDescription(): string {
    return "List of supported languages for Lighthouse";
  }

  getParams(): z.ZodRawShape {
    return {
      
    };
  }

  async handle(params: {  }): Promise<any> {
    try {
      const requestData: any = {};
      

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/languages', 'GET', [], true);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}