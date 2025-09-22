import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class ContentAnalysisIdListTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'content_analysis_id_list';
  }

  getDescription() {
    return 'This endpoint is designed to provide you with the list of IDs and metadata of the completed Content Analysis tasks during the specified period. You will get all task IDs that were made including successful, uncompleted, and tasks that responded as errors.';
  }

  getParams() {
    return {
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 1000,
        default: 100,
        description: 'maximum number of results to return'
      },
      offset: {
        type: 'number',
        minimum: 0,
        default: 0,
        description: 'offset in the results array of returned keywords'
      },
      date_from: {
        type: 'string',
        optional: true,
        description: 'date from which to get results (format: YYYY-MM-DD)'
      },
      date_to: {
        type: 'string',
        optional: true,
        description: 'date to which to get results (format: YYYY-MM-DD)'
      }
    };
  }

  async handle(params) {
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
