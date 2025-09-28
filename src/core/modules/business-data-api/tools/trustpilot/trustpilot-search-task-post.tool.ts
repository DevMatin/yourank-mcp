import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class TrustpilotSearchTaskPostTool extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
  }

  getName(): string {
    return 'trustpilot_search_task_post';
  }

  getDescription(): string {
    return 'This endpoint provides a list of business profiles listed on the Trustpilot platform. The returned results are relevant to the specified keyword.';
  }

  getParams() {
    return {
      keyword: z.string().describe('keyword required field the keyword you specify should indicate the name of the local establishment you would like to receive data for example: "pizza new york"'),
      depth: z.number().optional().describe('depth optional field number of results in SERP default value: 10 maximum value: 100'),
      priority: z.number().optional().describe('priority optional field priority of a task (might be ignored) default value: 1 possible values: 1, 2, 3, 4, 5'),
      pingback_url: z.string().optional().describe('pingback URL optional field URL for receiving a pingback notification that will be sent when a task is completed the pingback will be sent to the postback URL you specified when setting a task'),
      postback_url: z.string().optional().describe('postback URL optional field URL for receiving a postback notification that will be sent when a task is completed the postback will be sent to the postback URL you specified when setting a task'),
      postback_data: z.string().optional().describe('postback data optional field postback data in a JSON array that will be sent along with your callback the postback data will be sent to the postback URL you specified when setting a task'),
      tag: z.string().optional().describe('tag optional field user-defined task identifier this value will be returned in the result you will be able to use it to identify the task and match it with the result'),
    };
  }

  async handle(params: any) {
    const requestData = [{
      keyword: params.keyword,
      depth: params.depth,
      priority: params.priority,
      pingback_url: params.pingback_url,
      postback_url: params.postback_url,
      postback_data: params.postback_data,
      tag: params.tag,
    }];

    return await this.dataForSEOClient.post('/v3/business_data/trustpilot/search/task_post', requestData);
  }
}
