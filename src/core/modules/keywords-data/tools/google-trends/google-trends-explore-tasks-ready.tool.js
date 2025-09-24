import { BaseTool } from '../../../../../../base.tool.js';

export class GoogleTrendsExploreTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_trends_explore_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Google Trends explore tasks that are ready for retrieval.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/google_trends/explore/tasks_ready');
  }
}