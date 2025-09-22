import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class GoogleAdsSearchVolumeTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_search_volume_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed search volume task by task ID';
  }

  getParams(): z.ZodRawShape {
    return {
      task_id: z.string().describe("Task ID to retrieve results for")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.client.makeRequest(`/v3/keywords_data/google_ads/search_volume/task_get/${params.task_id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
