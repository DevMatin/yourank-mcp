import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class DataForSeoLabsIdListTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'dataforseo_labs_id_list';
  }

  getDescription() {
    return 'Provides you with the list of IDs and metadata of the completed DataForSEO Labs tasks during the specified period';
  }

  getParams() {
    return {
      limit: z.number().optional().describe("Maximum number of returned tasks. Default value: 100, maximum value: 1000"),
      offset: z.number().optional().describe("Offset in the results array. Default value: 0"),
      date_from: z.string().optional().describe("Start date in the format: YYYY-MM-DD"),
      date_to: z.string().optional().describe("End date in the format: YYYY-MM-DD")
    };
  }

  async handle(params) {
    try {
      const requestData = {};
      
      if (params.limit) {
        requestData.limit = params.limit;
      }
      if (params.offset) {
        requestData.offset = params.offset;
      }
      if (params.date_from) {
        requestData.date_from = params.date_from;
      }
      if (params.date_to) {
        requestData.date_to = params.date_to;
      }

      const response = await this.client.makeRequest('/v3/dataforseo_labs/id_list', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
