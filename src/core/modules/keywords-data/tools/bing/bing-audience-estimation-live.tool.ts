import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingAudienceEstimationLiveTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keywords_data_bing_audience_estimation_live';
  }

  getDescription(): string {
    return 'Get estimated audience size for Bing ad campaigns based on targeting criteria in real-time (Live API)';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe('Array of keywords for audience estimation (max 1000 items)'),
      location_name: z.string().optional().default('United States').describe('Location name (e.g., "United States")'),
      language_code: z.string().optional().default('en').describe('Language code (e.g., "en")'),
      device: z.enum(['desktop', 'mobile', 'tablet']).optional().default('desktop').describe('Device type'),
      job_functions: z.array(z.number()).optional().describe('Array of job function IDs for targeting'),
      industries: z.array(z.number()).optional().describe('Array of industry IDs for targeting'),
      age_ranges: z.array(z.string()).optional().describe('Array of age ranges (e.g., ["18-24", "25-34"])'),
      gender: z.enum(['male', 'female', 'all']).optional().default('all').describe('Gender targeting'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
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

      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/bing/audience_estimation/live', 'POST', requestData);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
