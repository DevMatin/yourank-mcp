import { z } from 'zod';
import { DataForSEOClient } from '../../../../../client/dataforseo.client';
import { BaseTool } from '../../../../base.tool';

export class GoogleKeywordsForCategoriesTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'google_keywords_for_categories';
  }

  getDescription(): string {
    return 'Provides you with a list of keywords relevant to the specified product categories';
  }

  getParams(): z.ZodRawShape {
    return {
      category_codes: z.array(z.number()).describe("Category codes. Required field"),
      location_name: z.string().optional().describe("Full name of the location"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Full name of the language"),
      language_code: z.string().optional().describe("Language code"),
      limit: z.number().optional().describe("Maximum number of returned keywords. Default value: 100, maximum value: 1000"),
      offset: z.number().optional().describe("Offset in the results array. Default value: 0")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        category_codes: params.category_codes
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
      if (params.limit) {
        requestData.limit = params.limit;
      }
      if (params.offset) {
        requestData.offset = params.offset;
      }

      const response = await this.client.makeRequest('/v3/dataforseo_labs/google/keywords_for_categories/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
