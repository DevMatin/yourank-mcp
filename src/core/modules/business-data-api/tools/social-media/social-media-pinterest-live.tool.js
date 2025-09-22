import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class SocialMediaPinterestLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'business_data_social_media_pinterest_live';
  }

  getDescription() {
    return `Social Media Pinterest API will provide you with data on pins made from the specified URLs. Pins on Pinterest correspond to content saves. For each specified page URL, you will get the number of content saves to Pinterest made using the Pinterest Save Button placed on that page.`;
  }

  getParams() {
    return {
      target: z.string().describe("target URL to analyze Pinterest pins for")
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };

      const response = await this.client.makeRequest('/v3/business_data/social_media/pinterest/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
