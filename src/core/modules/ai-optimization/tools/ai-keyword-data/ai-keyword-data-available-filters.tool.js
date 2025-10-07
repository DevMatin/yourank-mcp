
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class AiKeywordDataAvailableFiltersTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'ai_optimization_ai_keyword_data_available_filters';
  }

  getDescription() {
    return 'Get all the necessary information about filters that can be used with AI Keyword Data API endpoints';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/ai_optimization/ai_keyword_data/available_filters', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
