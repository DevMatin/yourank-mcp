import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class GoogleTrendsExploreTasksReadyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_trends_explore_tasks_ready';
  }

  getDescription(): string {
    return 'Get list of completed Google Trends explore tasks that are ready for retrieval.';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/google_trends/explore/tasks_ready');
  }
}
