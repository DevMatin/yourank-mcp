import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class TripadvisorSearchTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
    
  }

  getName(): string {
    return 'tripadvisor_search_tasks_ready';
  }

  getDescription(): string {
    return 'The Tasks Ready endpoint is designed to provide you with the list of completed tasks, which haven\'t been collected yet. If you don\'t use the postback_url, you can receive the list of id for all completed tasks using this endpoint.';
  }

  getParams() {
    return {};
  }

  async handle(params: any) {
    return await this.dataForSEOClient.makeRequest('/v3/business_data/tripadvisor/search/tasks_ready', 'POST', 'GET');
  }
}
