import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface ClickstreamGlobalSearchVolumeParams {
  keywords: string[];
  language_code?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
}

interface ClickstreamGlobalSearchVolumeRequest {
  keywords: string[];
  language_code: string;
  device: string;
}

export class ClickstreamDataGlobalSearchVolumeLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_clickstream_data_global_search_volume_live';
  }

  getDescription(): string {
    return 'Get global clickstream-based search volume data with geographical distribution in real-time.';
  }

  getParams() {
    return {
      keywords: z.array(z.string()).describe('Array of keywords to analyze (max 1000)'),
      language_code: z.string().default('en').describe('Language code (e.g., "en")'),
      device: z.enum(['desktop', 'mobile', 'tablet']).default('desktop').describe('Device type')
    };
  }

  async handle(params: ClickstreamGlobalSearchVolumeParams): Promise<any> {
    try {
      const requestData: ClickstreamGlobalSearchVolumeRequest[] = [{
        keywords: params.keywords,
        language_code: params.language_code || 'en',
        device: params.device || 'desktop'
      }];

      const response = await this.client.makeRequest('/v3/keywords_data/clickstream_data/global_search_volume/live', 'POST', requestData);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
