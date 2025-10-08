import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingSearchVolumeHistoryTasksReadyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_search_volume_history_tasks_ready';
  }

  getDescription(): string {
    return 'Get list of completed Bing search volume history tasks that are ready for collection.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params: {}): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/bing/search_volume_history/tasks_ready');
  }
}
