import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsKeywordsForKeywordsTasksReadyParams {
  limit?: number;
  offset?: number;
}

interface GoogleAdsKeywordsForKeywordsTasksReadyQueryParams {
  limit?: number;
  offset?: number;
}

export class GoogleAdsKeywordsForKeywordsTasksReadyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_keywords_tasks_ready';
  }

  getDescription(): string {
    return 'Get list of completed keywords for keywords tasks that are ready for collection';
  }

  getParams() {
    return {
      limit: z.number().optional().describe("Maximum number of tasks to return"),
      offset: z.number().optional().describe("Offset in the results array")
    };
  }

  async handle(params: GoogleAdsKeywordsForKeywordsTasksReadyParams): Promise<any> {
    try {
      const queryParams: GoogleAdsKeywordsForKeywordsTasksReadyQueryParams = {};
      
      if (params.limit) {
        queryParams.limit = params.limit;
      }
      
      if (params.offset) {
        queryParams.offset = params.offset;
      }

      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/keywords_for_keywords/tasks_ready', 'GET', undefined, true);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
