import { z } from 'zod';
import { DataForSEOClient } from '../../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../../base.tool.js';

export class GoogleAvailableHistoryTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'google_available_history';
  }

  getDescription() {
    return 'Find obtain a list of dates available for setting in the first_date and second_date fields of the Domain Metrics by Categories endpoint';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/dataforseo_labs/google/available_history', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
