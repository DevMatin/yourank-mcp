import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface ClickstreamBulkSearchVolumeParams {
  keywords: string[];
  location_name?: string;
  language_code?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
  date_from?: string;
  date_to?: string;
}

interface ClickstreamBulkSearchVolumeRequest {
  keywords: string[];
  location_name: string;
  language_code: string;
  device: string;
  date_from?: string;
  date_to?: string;
}

export class ClickstreamDataBulkSearchVolumeLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_clickstream_data_bulk_search_volume_live';
  }

  getDescription(): string {
    return 'Get bulk clickstream-based search volume data with historical values in real-time.';
  }

  getParams() {
    return {
      keywords: z.array(z.string()).describe('Array of keywords to analyze (max 1000)'),
      location_name: z.string().default('United States').describe('Location name (e.g., "United States")'),
      language_code: z.string().default('en').describe('Language code (e.g., "en")'),
      device: z.enum(['desktop', 'mobile', 'tablet']).default('desktop').describe('Device type'),
      date_from: z.string().optional().describe('Start date for historical data (YYYY-MM-DD format)'),
      date_to: z.string().optional().describe('End date for historical data (YYYY-MM-DD format)')
    };
  }

  async handle(params: ClickstreamBulkSearchVolumeParams): Promise<any> {
    try {
      const requestData: ClickstreamBulkSearchVolumeRequest[] = [{
        keywords: params.keywords,
        location_name: params.location_name || 'United States',
        language_code: params.language_code || 'en',
        device: params.device || 'desktop',
        date_from: params.date_from,
        date_to: params.date_to
      }];

      const response = await this.client.makeRequest('/v3/keywords_data/clickstream_data/bulk_search_volume/live', 'POST', requestData);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
