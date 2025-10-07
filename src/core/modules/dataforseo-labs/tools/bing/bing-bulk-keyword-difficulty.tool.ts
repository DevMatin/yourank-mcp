import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class BingBulkKeywordDifficultyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'bing_bulk_keyword_difficulty';
  }

  getDescription(): string {
    return 'Provides you with the Keyword Difficulty metric for a maximum of 1,000 keywords in one API request';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe("Keywords. Required field. Maximum 1000 keywords"),
      location_name: z.string().optional().describe("Full name of the location"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Full name of the language"),
      language_code: z.string().optional().describe("Language code")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keywords: params.keywords
      };
      
      if (params.location_name) {
        requestData.location_name = params.location_name;
      }
      if (params.location_code) {
        requestData.location_code = params.location_code;
      }
      if (params.language_name) {
        requestData.language_name = params.language_name;
      }
      if (params.language_code) {
        requestData.language_code = params.language_code;
      }

      const response = await this.client.makeRequest('/v3/dataforseo_labs/bing/bulk_keyword_difficulty/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
