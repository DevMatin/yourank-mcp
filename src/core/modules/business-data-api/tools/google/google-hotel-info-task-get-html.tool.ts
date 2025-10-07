import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class GoogleHotelInfoTaskGetHtmlTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'google_hotel_info_task_get_html';
  }

  getDescription(): string {
    return 'Get HTML results of a completed Google Hotel Info task by task ID.';
  }

  getParams() {
    return {
      id: z.string().describe('task identifier unique task identifier in our system in the UUID format you will be able to use it within 7 days to request the results of the task at any time'),
    };
  }

  async handle(params: any) {
    return await this.client.makeRequest('/v3/business_data/google/hotel_info/task_get/html/${params.id}', 'GET');
  }
}
