import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class TrustpilotSearchTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'trustpilot_search_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Trustpilot Search task by task ID.';
  }

  getParams() {
    return {
      id: z.string().describe('task identifier unique task identifier in our system in the UUID format you will be able to use it within 30 days to request the results of the task at any time'),
    };
  }

  async handle(params: any) {
    return await this.client.makeRequest('/v3/business_data/trustpilot/search/task_get/${params.id}', 'GET');
  }
}
