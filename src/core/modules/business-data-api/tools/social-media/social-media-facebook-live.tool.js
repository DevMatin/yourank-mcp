import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class SocialMediaFacebookLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_social_media_facebook_live';
  }

  getDescription() {
    return `Social Media Facebook API will provide you with the number of likes a certain page received through the Facebook Like button embed.`;
  }

  getParams() {
    return {
      target: z.string().describe("target URL to analyze Facebook likes for")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };

      const response = await this.client.makeRequest('/v3/business_data/social_media/facebook/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
