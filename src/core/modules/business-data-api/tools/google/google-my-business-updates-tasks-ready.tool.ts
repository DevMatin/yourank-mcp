import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleMyBusinessUpdatesTasksReadyTool extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
  }

  getName(): string {
    return 'google_my_business_updates_tasks_ready';
  }

  getDescription(): string {
    return 'The Tasks Ready endpoint is designed to provide you with the list of completed tasks, which haven\'t been collected yet. If you don\'t use the postback_url, you can receive the list of id for all completed tasks using this endpoint.';
  }

  getParams() {
    return {};
  }

  async handle(params: any) {
    return await this.dataForSEOClient.get('/v3/business_data/google/my_business_updates/tasks_ready');
  }
}
