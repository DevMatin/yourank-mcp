import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class ContentGenerationTextSummaryLanguagesTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_generation_text_summary_languages';
  }

  getDescription() {
    return 'Get the list of supported languages for text summary';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/text_summary/languages',
        'GET',
        null
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
