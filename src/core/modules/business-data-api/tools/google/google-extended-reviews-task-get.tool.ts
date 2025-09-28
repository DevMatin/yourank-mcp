import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleExtendedReviewsTaskGetTool extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
  }

  getName(): string {
    return 'google_extended_reviews_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Google Extended Reviews task by task ID.';
  }

  getParams() {
    return {
      id: z.string().describe('task identifier unique task identifier in our system in the UUID format you will be able to use it within 30 days to request the results of the task at any time'),
    };
  }

  async handle(params: any) {
    return await this.dataForSEOClient.get(`/v3/business_data/google/extended_reviews/task_get/${params.id}`);
  }
}
