import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class ContentGenerationGenerateSubTopicsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_generation_generate_sub_topics';
  }

  getDescription() {
    return 'Generate 10 subtopics based on the topic and other parameters using the live API endpoint';
  }

  getParams() {
    return {
      topic: z.string().describe("Main topic for sub topics generation"),
      language_code: z.string().default('en').describe("Language code for sub topics generation"),
      content_type: z.enum(['article', 'blog_post', 'product_description', 'meta_description']).describe("Type of content"),
      tone: z.enum(['professional', 'casual', 'friendly', 'formal']).optional().describe("Tone of the sub topics"),
      max_sub_topics: z.number().min(1).max(20).default(10).describe("Maximum number of sub topics to generate"),
    };
  }

  async handle(params) {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/content_generation/generate_sub_topics/live',
        'POST',
        [{
          topic: params.topic,
          language_code: params.language_code,
          content_type: params.content_type,
          tone: params.tone,
          max_sub_topics: params.max_sub_topics,
        }]
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
