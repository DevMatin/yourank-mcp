import { BaseTool } from '../../../../../../base.tool.js';

export class BingSearchVolumeHistoryTaskGetTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_search_volume_history_task_get';
  }

  getDescription() {
    return 'Get results of a completed Bing search volume history task by task ID.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Task ID (UUID format)',
          example: '00000000-0000-0000-0000-000000000000'
        }
      },
      required: ['id']
    };
  }

  async handle(params) {
    return await this.client.get(`/v3/keywords_data/bing/search_volume_history/task_get/${params.id}`);
  }
}
