import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class AiKeywordDataKeywordsSearchVolumeLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_optimization_ai_keyword_data_keywords_search_volume_live';
  }

  getDescription(): string {
    return 'Get search volume data for your target keywords, reflecting their estimated usage in AI tools';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe("Array of keywords to analyze"),
      location_code: z.number().optional().describe("Location code for the analysis"),
      language_code: z.string().optional().describe("Language code for the analysis"),
      search_partners: z.boolean().optional().describe("Include search partners"),
      include_serp_info: z.boolean().optional().describe("Include SERP information"),
      include_subdomains: z.boolean().optional().describe("Include subdomains")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keywords: params.keywords
      };
      
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.search_partners !== undefined) requestData.search_partners = params.search_partners;
      if (params.include_serp_info !== undefined) requestData.include_serp_info = params.include_serp_info;
      if (params.include_subdomains !== undefined) requestData.include_subdomains = params.include_subdomains;

      const response = await this.client.makeRequest('/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
