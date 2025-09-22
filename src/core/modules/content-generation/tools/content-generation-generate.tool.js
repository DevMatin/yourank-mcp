import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class ContentGenerationGenerateTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_generation_generate';
  }

  getDescription() {
    return 'Generate content based on keywords and topics using the live API endpoint';
  }

  getParams() {
    return {
      keyword: z.string().describe("Main keyword for content generation"),
      language_code: z.string().default('en').describe("Language code for content generation"),
      content_type: z.enum(['article', 'blog_post', 'product_description', 'meta_description']).describe("Type of content to generate"),
      tone: z.enum(['professional', 'casual', 'friendly', 'formal']).optional().describe("Tone of the content"),
      length: z.number().min(50).max(2000).default(500).describe("Target word count"),
      include_meta_tags: z.boolean().optional().describe("Include meta tags generation"),
      include_sub_topics: z.boolean().optional().describe("Include sub topics generation"),
    };
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/generate/live',
        'POST',
        [{
          keyword: params.keyword,
          language_code: params.language_code,
          content_type: params.content_type,
          tone: params.tone,
          length: params.length,
          include_meta_tags: params.include_meta_tags || false,
          include_sub_topics: params.include_sub_topics || false,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
