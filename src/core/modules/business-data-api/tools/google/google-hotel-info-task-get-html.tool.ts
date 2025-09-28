import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleHotelInfoTaskGetHtmlTool extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
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
    return await this.dataForSEOClient.get(`/v3/business_data/google/hotel_info/task_get/html/${params.id}`);
  }
}
