import { BaseTool } from '../../../../../../base.tool.js';

export class BingSearchVolumeTaskGetTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_search_volume_task_get';
  }

  getDescription() {
    return 'Get results of a completed Bing search volume task.';
  }

  getParams() {
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

  async handle(params) {
    return await this.client.get(`/v3/keywords_data/bing/search_volume/task_get/${params.id}`);
  }
}
