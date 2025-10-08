import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingAudienceEstimationTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_audience_estimation';
  }

  getDescription(): string {
    return 'Get estimated audience size for Bing ad campaigns based on targeting criteria in real-time.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of keywords for audience estimation',
          maxItems: 1000
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
        job_functions: {
          type: 'array',
          items: { type: 'integer' },
          description: 'Array of job function IDs for targeting'
        },
        industries: {
          type: 'array',
          items: { type: 'integer' },
          description: 'Array of industry IDs for targeting'
        },
        age_ranges: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of age ranges (e.g., ["18-24", "25-34"])'
        },
        gender: {
          type: 'string',
          enum: ['male', 'female', 'all'],
          description: 'Gender targeting',
          default: 'all'
        }
      },
      required: ['keywords']
    };
  }

  async handle(params: {
    keywords: string[];
    location_name?: string;
    language_code?: string;
    device?: 'desktop' | 'mobile' | 'tablet';
    job_functions?: number[];
    industries?: number[];
    age_ranges?: string[];
    gender?: 'male' | 'female' | 'all';
  }): Promise<any> {
    const requestData = [{
      keywords: params.keywords,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      device: params.device || 'desktop',
      job_functions: params.job_functions,
      industries: params.industries,
      age_ranges: params.age_ranges,
      gender: params.gender || 'all'
    }];

    return await this.client.makeRequest('/v3/keywords_data/bing/audience_estimation/live', 'POST', requestData);
  }
}
