import { BaseTool } from '../../../../../../base.tool.js';

export class BingKeywordsForKeywordsTaskGetTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_keywords_for_keywords_task_get';
  }

  getDescription() {
    return 'Get results of a completed Bing keywords for keywords task by task ID.';
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
    return await this.client.get(`/v3/keywords_data/bing/keywords_for_keywords/task_get/${params.id}`);
  }
}
