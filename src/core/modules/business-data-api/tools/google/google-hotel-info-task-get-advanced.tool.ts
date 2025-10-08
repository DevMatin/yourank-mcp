import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class GoogleHotelInfoTaskGetAdvancedTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'google_hotel_info_task_get_advanced';
  }

  getDescription(): string {
    return 'Get results of a completed Google Hotel Info task by task ID (Advanced format without HTML).';
  }

  getParams() {
    return {
      id: z.string().describe('task identifier unique task identifier in our system in the UUID format you will be able to use it within 30 days to request the results of the task at any time'),
    };
  }

  async handle(params: any) {
    return await this.client.makeRequest(`/v3/business_data/google/hotel_info/task_get/advanced/${params.id}`, 'POST', 'GET');
  }
}
