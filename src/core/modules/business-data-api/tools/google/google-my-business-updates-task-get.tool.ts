import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class GoogleMyBusinessUpdatesTaskGetTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
    
  }

  getName(): string {
    return 'google_my_business_updates_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Google My Business Updates task by task ID.';
  }

  getParams() {
    return {
      id: z.string().describe('task identifier unique task identifier in our system in the UUID format you will be able to use it within 30 days to request the results of the task at any time'),
    };
  }

  async handle(params: any) {
    return await this.dataForSEOClient.makeRequest(`/v3/business_data/google/my_business_updates/task_get/${params.id}`, 'POST', 'GET');
  }
}
