import { BaseTool } from '../../../../../../base.tool.js';
// DataForSEOClient import removed

export class KeywordsDataErrorsTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
  }

  getName() {
    return 'keywords_data_errors';
  }

  getDescription() {
    return 'Get information about Keywords Data API tasks that returned an error within the past 7 days';
  }

  getParams() {
    return {
      limit: {
        type: 'number',
        nullable: true,
        default: null,
        description: 'Maximum number of returned tasks. Default value: 100. Maximum value: 1000'
      },
      offset: {
        type: 'number',
        nullable: true,
        default: null,
        description: 'Offset in the results array. Default value: 0'
      }
    };
  }

  async handle(params) {
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
