import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class ContentGenerationGrammarTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_generation_grammar';
  }

  getDescription() {
    return 'Check grammar and get grammar rules using the live API endpoint';
  }

  getParams() {
    return {
      text: z.string().describe("Text to check for grammar"),
      language_code: z.string().default('en').describe("Language code for grammar checking"),
      include_suggestions: z.boolean().optional().describe("Include grammar suggestions"),
      include_rules: z.boolean().optional().describe("Include grammar rules explanation"),
    };
  }

  async handle(params) {
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
