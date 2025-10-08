import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

interface GoogleAdsKeywordsForKeywordsTaskGetParams {
  task_id: string;
}

export class GoogleAdsKeywordsForKeywordsTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_keywords_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed keywords for keywords task by task ID';
  }

  getParams() {
    return {
      task_id: z.string().describe("Task ID to retrieve results for")
    };
  }

  async handle(params: GoogleAdsKeywordsForKeywordsTaskGetParams): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/keywords_for_keywords/task_get/${params.task_id}', 'POST', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
