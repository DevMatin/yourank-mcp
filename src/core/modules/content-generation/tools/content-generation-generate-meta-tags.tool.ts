import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class ContentGenerationGenerateMetaTagsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'content_generation_generate_meta_tags';
  }

  getDescription(): string {
    return 'Generate title and description meta tags for a text using the live API endpoint';
  }

  getParams(): z.ZodRawShape {
    return {
      text: z.string().describe("Text to generate meta tags for"),
      language_code: z.string().default('en').describe("Language code for meta tags generation"),
      meta_tags_type: z.enum(['title', 'description', 'both']).default('both').describe("Type of meta tags to generate"),
      tone: z.enum(['professional', 'casual', 'friendly', 'formal']).optional().describe("Tone of the meta tags"),
      max_length: z.number().min(10).max(300).optional().describe("Maximum length for meta tags"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/generate_meta_tags/live',
        'POST',
        [{
          text: params.text,
          language_code: params.language_code,
          meta_tags_type: params.meta_tags_type,
          tone: params.tone,
          max_length: params.max_length,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
