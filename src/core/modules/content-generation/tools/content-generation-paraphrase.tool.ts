import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class ContentGenerationParaphraseTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'content_generation_paraphrase';
  }

  getDescription(): string {
    return 'Paraphrase existing content using the live API endpoint';
  }

  getParams(): z.ZodRawShape {
    return {
      text: z.string().describe("Text to paraphrase"),
      language_code: z.string().default('en').describe("Language code"),
      style: z.enum(['casual', 'formal', 'professional', 'creative']).optional().describe("Writing style for paraphrasing"),
      preserve_keywords: z.boolean().optional().describe("Preserve important keywords"),
      word_count_target: z.number().optional().describe("Target word count for paraphrased text"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/paraphrase/live',
        'POST',
        [{
          text: params.text,
          language_code: params.language_code,
          style: params.style,
          preserve_keywords: params.preserve_keywords || false,
          word_count_target: params.word_count_target,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 