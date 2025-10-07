import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingSearchVolumeTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_search_volume_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Bing search volume task.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Task ID to retrieve results for'
        }
      },
      required: ['id']
    };
  }

  async handle(params: { id: string }): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/bing/search_volume/task_get/${params.id}', 'GET');
  }
}
