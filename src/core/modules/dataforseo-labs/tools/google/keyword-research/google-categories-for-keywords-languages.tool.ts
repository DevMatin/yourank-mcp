import { z } from 'zod';
import { DataForSEOClient } from '../../../../../client/dataforseo.client';
import { BaseTool } from '../../../../base.tool';

export class GoogleCategoriesForKeywordsLanguagesTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'google_categories_for_keywords_languages';
  }

  getDescription(): string {
    return 'Get the full list of languages supported for the Google Categories for Keywords endpoint of DataForSEO Labs API';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/dataforseo_labs/google/categories_for_keywords/languages', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
