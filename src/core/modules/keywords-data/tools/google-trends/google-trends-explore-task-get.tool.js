import { BaseTool } from '../../../../../../base.tool.js';

export class GoogleTrendsExploreTaskGetTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_google_trends_explore_task_get';
  }

  getDescription() {
    return 'Get results of a completed Google Trends explore task.';
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
    return await this.client.get(`/v3/keywords_data/google_trends/explore/task_get/${params.id}`);
  }
}

