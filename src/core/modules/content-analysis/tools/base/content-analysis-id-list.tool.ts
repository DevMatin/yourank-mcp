import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class ContentAnalysisIdListTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'content_analysis_id_list';
  }

  getDescription(): string {
    return 'This endpoint is designed to provide you with the list of IDs and metadata of the completed Content Analysis tasks during the specified period. You will get all task IDs that were made including successful, uncompleted, and tasks that responded as errors.';
  }

  getParams(): z.ZodRawShape {
    return {
      limit: z.number().min(1).max(1000).default(100).describe('maximum number of results to return'),
      offset: z.number().min(0).default(0).describe('offset in the results array of returned keywords'),
      date_from: z.string().optional().describe('date from which to get results (format: YYYY-MM-DD)'),
      date_to: z.string().optional().describe('date to which to get results (format: YYYY-MM-DD)'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/content_analysis/id_list', 'POST', [{
        limit: params.limit,
        offset: params.offset,
        date_from: params.date_from,
        date_to: params.date_to,
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
