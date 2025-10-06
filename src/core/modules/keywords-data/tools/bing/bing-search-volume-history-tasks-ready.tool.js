import { BaseTool } from '../../../../../../base.tool.js';

export class BingSearchVolumeHistoryTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_search_volume_history_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Bing search volume history tasks that are ready for collection.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/search_volume_history/tasks_ready');
  }
}
