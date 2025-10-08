import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingKeywordsForSiteTasksReadyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_keywords_for_site_tasks_ready';
  }

  getDescription(): string {
    return 'Get list of completed Bing keywords for site tasks that are ready for collection.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params: {}): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/bing/keywords_for_site/tasks_ready');
  }
}
