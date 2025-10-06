import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordPerformanceTaskGetTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keyword_performance_task_get';
  }

  getDescription() {
    return 'Get results of a completed Bing keyword performance task by task ID.';
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
    return await this.client.get(`/v3/keywords_data/bing/keyword_performance/task_get/${params.id}`);
  }
}
