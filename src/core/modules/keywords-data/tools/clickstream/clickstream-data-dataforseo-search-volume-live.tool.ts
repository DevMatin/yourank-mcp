import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface DataForSEOSearchVolumeParams {
  keywords: string[];
  location_name?: string;
  language_code?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
}

interface DataForSEOSearchVolumeRequest {
  keywords: string[];
  location_name: string;
  language_code: string;
  device: string;
}

export class ClickstreamDataDataForSEOSearchVolumeLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_clickstream_data_dataforseo_search_volume_live';
  }

  getDescription(): string {
    return 'Get DataForSEO clickstream-based search volume data in real-time.';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe('Array of keywords to analyze (max 1000)'),
      location_name: z.string().default('United States').describe('Location name (e.g., "United States")'),
      language_code: z.string().default('en').describe('Language code (e.g., "en")'),
      device: z.enum(['desktop', 'mobile', 'tablet']).default('desktop').describe('Device type')
    };
  }

  async handle(params: DataForSEOSearchVolumeParams): Promise<any> {
    try {
      const requestData: DataForSEOSearchVolumeRequest[] = [{
        keywords: params.keywords,
        location_name: params.location_name || 'United States',
        language_code: params.language_code || 'en',
        device: params.device || 'desktop'
      }];

      const response = await this.client.makeRequest('/v3/keywords_data/clickstream_data/dataforseo_search_volume/live', 'POST', requestData);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
