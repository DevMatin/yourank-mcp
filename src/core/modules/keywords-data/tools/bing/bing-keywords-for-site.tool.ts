import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingKeywordsForSiteTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_keywords_for_site';
  }

  getDescription(): string {
    return 'Get keywords relevant to a specified website from Bing Ads in real-time.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {
        target: {
          type: 'string',
          description: 'Target website URL or domain',
          example: 'example.com'
        },
        location_name: {
          type: 'string',
          description: 'Location name (e.g., "United States")',
          default: 'United States'
        },
        language_code: {
          type: 'string',
          description: 'Language code (e.g., "en")',
          default: 'en'
        },
        device: {
          type: 'string',
          enum: ['desktop', 'mobile', 'tablet'],
          description: 'Device type',
          default: 'desktop'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of keywords to return (max 3000)',
          default: 1000,
          minimum: 1,
          maximum: 3000
        }
      },
      required: ['target']
    };
  }

  async handle(params: {
    target: string;
    location_name?: string;
    language_code?: string;
    device?: 'desktop' | 'mobile' | 'tablet';
    limit?: number;
  }): Promise<any> {
    const requestData = [{
      target: params.target,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      device: params.device || 'desktop',
      limit: params.limit || 1000
    }];

    return await this.client.makeRequest('/v3/keywords_data/bing/keywords_for_site/live', 'POST', requestData);
  }
}
