import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class SocialMediaRedditLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_social_media_reddit_live';
  }

  getDescription() {
    return `Social Media Reddit API provides information for each share of the target webpage on Reddit. For each specified Reddit URL, you will get subreddit and author names, permalink, title, and the number of subreddit members.`;
  }

  getParams() {
    return {
      target: z.string().describe("target URL to analyze Reddit shares for")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };

      const response = await this.client.makeRequest('/v3/business_data/social_media/reddit/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
