import { BaseTool } from '../../../../../../base.tool.js';

export class BingSearchVolumeTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_search_volume_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Bing search volume tasks that are ready for retrieval.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/search_volume/tasks_ready');
  }
}

