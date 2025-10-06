import { BaseTool } from '../../../../../../base.tool.js';

export class BingAudienceEstimationTasksReadyTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_audience_estimation_tasks_ready';
  }

  getDescription() {
    return 'Get list of completed Bing audience estimation tasks that are ready for collection.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params) {
    return await this.client.get('/v3/keywords_data/bing/audience_estimation/tasks_ready');
  }
}
