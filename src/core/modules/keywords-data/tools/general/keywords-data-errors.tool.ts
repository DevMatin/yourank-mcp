import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class KeywordsDataErrorsTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'keywords_data_errors';
  }

  getDescription(): string {
    return 'Get information about Keywords Data API tasks that returned an error within the past 7 days';
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().nullable().default(null).describe('Maximum number of returned tasks. Default value: 100. Maximum value: 1000'),
      offset: z.number().nullable().default(null).describe('Offset in the results array. Default value: 0'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/keywords_data/errors', 'POST', [{
        limit: params.limit,
        offset: params.offset,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
