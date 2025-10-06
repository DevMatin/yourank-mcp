import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordPerformanceTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keyword_performance_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Bing keyword performance tasks that are ready for collection.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/keyword_performance/tasks_ready');
  }
}
