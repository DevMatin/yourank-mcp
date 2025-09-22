import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class ContentGenerationGrammarLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_generation_grammar_languages';
  }

  getDescription() {
    return 'Get the list of supported languages for grammar checking';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/check_grammar/languages',
        'GET',
        null
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
