import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class KeywordsDataIdListTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keywords_data_id_list';
  }

  getDescription(): string {
    return 'Get the list of IDs and metadata of completed Keywords Data tasks during the specified period';
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().nullable().default(null).describe('Maximum number of returned tasks. Default value: 100. Maximum value: 1000'),
      offset: z.number().nullable().default(null).describe('Offset in the results array. Default value: 0'),
      date_from: z.string().nullable().default(null).describe('Start date in the format: YYYY-MM-DD'),
      date_to: z.string().nullable().default(null).describe('End date in the format: YYYY-MM-DD'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      // Send empty array as required by the API
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/id_list', 'POST', []);
      
      // Handle the response properly
      if (response && (response as any).tasks && (response as any).tasks.length > 0) {
        return this.validateAndFormatResponse(response);
      } else {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "No tasks found", tasks: [] }, null, 2),
            },
          ],
        };
      }
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
