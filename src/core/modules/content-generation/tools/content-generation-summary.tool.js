import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class ContentGenerationSummaryTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_generation_summary';
  }

  getDescription() {
    return 'Generate text summary using the live API endpoint';
  }

  getParams() {
    return {
      text: z.string().describe("Text to summarize"),
      language_code: z.string().default('en').describe("Language code"),
      summary_length: z.enum(['short', 'medium', 'long']).default('medium').describe("Length of summary"),
      include_key_points: z.boolean().optional().describe("Include key points in summary"),
      style: z.enum(['bullet_points', 'paragraph', 'numbered']).optional().describe("Summary style"),
    };
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/text_summary/live',
        'POST',
        [{
          text: params.text,
          language_code: params.language_code,
          summary_length: params.summary_length,
          include_key_points: params.include_key_points || false,
          style: params.style,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
