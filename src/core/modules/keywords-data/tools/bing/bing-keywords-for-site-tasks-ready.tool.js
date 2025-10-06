import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordsForSiteTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keywords_for_site_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Bing keywords for site tasks that are ready for collection.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/keywords_for_site/tasks_ready');
  }
}
