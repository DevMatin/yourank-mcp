import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class ContentGenerationGrammarTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'content_generation_grammar';
  }

  getDescription(): string {
    return 'Check grammar and get grammar rules using the live API endpoint';
  }

  getParams(): z.ZodRawShape {
    return {
      text: z.string().describe("Text to check for grammar"),
      language_code: z.string().default('en').describe("Language code for grammar checking"),
      include_suggestions: z.boolean().optional().describe("Include grammar suggestions"),
      include_rules: z.boolean().optional().describe("Include grammar rules explanation"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/check_grammar/live',
        'POST',
        [{
          text: params.text,
          language_code: params.language_code,
          include_suggestions: params.include_suggestions || false,
          include_rules: params.include_rules || false,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 