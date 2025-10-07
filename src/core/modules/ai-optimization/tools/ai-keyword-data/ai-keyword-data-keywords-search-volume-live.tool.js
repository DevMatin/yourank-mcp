
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class AiKeywordDataKeywordsSearchVolumeLiveTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'ai_optimization_ai_keyword_data_keywords_search_volume_live';
  }

  getDescription() {
    return 'Get search volume data for your target keywords, reflecting their estimated usage in AI tools';
  }

  getParams() {
    return {
      keywords: { type: "string", description: "Array of keywords to analyze" },
      location_code: { type: "number", description: "Location code for the analysis", optional: true },
      language_code: { type: "string", description: "Language code for the analysis", optional: true }
    };
  }

  async handle(params) {
    try {
      const requestData = {
        keywords: params.keywords
      };
      
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;

      const response = await this.client.makeRequest('/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
