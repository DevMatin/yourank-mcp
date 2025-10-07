import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class SocialMediaFacebookLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_social_media_facebook_live';
  }

  getDescription(): string {
    return `Social Media Facebook API will provide you with the number of likes a certain page received through the Facebook Like button embed.`;
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("target URL to analyze Facebook likes for")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        target: params.target
      };

      const response = await this.client.makeRequest('/v3/business_data/social_media/facebook/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
