import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingKeywordsForSiteTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_keywords_for_site_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Bing keywords for site task by task ID.';
  }

  getParams(): any {
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

  async handle(params: { id: string }): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/bing/keywords_for_site/task_get/${params.id}', 'GET');
  }
}
