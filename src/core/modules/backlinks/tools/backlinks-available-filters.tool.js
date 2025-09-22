import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';

export class BacklinksAvailableFiltersTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'backlinks_available_filters';
  }

  getDescription() {
    return "Backlinks API features plenty of parameters that support custom filtration. By applying filters to your POST requests, you will be able to effortlessly extract data that matches your requirements. Note that we do not charge any fees for using data filtering or sorting rules.";
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/backlinks/available_filters', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
