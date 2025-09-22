import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class SerpBingOrganicLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_bing_organic_live_advanced';
  }

  getDescription(): string {
    return 'Get Bing organic search results for a keyword in specified location';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe('Search keyword'),
      location_name: z.string().describe('Full name of the location (hierarchical, comma-separated)'),
      language_code: z.string().describe('Search engine language code (e.g., "en", "de")'),
      device: z.enum(['desktop', 'mobile']).optional().default('desktop').describe('Device type'),
      os: z.enum(['windows', 'macos', 'android', 'ios']).optional().default('windows').describe('Device operating system'),
      depth: z.number().min(1).max(700).optional().default(20).describe('Parsing depth (1-700) - number of results in SERP')
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData = [{
        keyword: params.keyword,
        location_name: params.location_name,
        language_code: params.language_code,
        device: params.device || 'desktop',
        os: params.os || 'windows',
        depth: params.depth || 20
      }];

      const response = await this.dataForSEOClient.makeRequest(
        '/v3/serp/bing/organic/live/advanced',
        'POST',
        requestData
      );

      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 