import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class SocialMediaRedditLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_social_media_reddit_live';
  }

  getDescription(): string {
    return `Social Media Reddit API provides information for each share of the target webpage on Reddit. For each specified Reddit URL, you will get subreddit and author names, permalink, title, and the number of subreddit members.`;
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("target URL to analyze Reddit shares for")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        target: params.target
      };

      const response = await this.dataForSEOClient.makeRequest('/v3/business_data/social_media/reddit/live', 'POST', 'POST');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
