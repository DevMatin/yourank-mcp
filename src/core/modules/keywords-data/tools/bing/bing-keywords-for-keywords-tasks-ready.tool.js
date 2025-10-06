import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordsForKeywordsTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keywords_for_keywords_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Bing keywords for keywords tasks that are ready for collection.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/keywords_for_keywords/tasks_ready');
  }
}
