import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { z } from 'zod';

interface GoogleTrendsExploreTaskGetParams {
  id: string;
}

export class GoogleTrendsExploreTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_trends_explore_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Google Trends explore task.';
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe('Task ID to retrieve results for')
    };
  }

  async handle(params: GoogleTrendsExploreTaskGetParams): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/google_trends/explore/task_get/${params.id}', 'GET');
  }
}
