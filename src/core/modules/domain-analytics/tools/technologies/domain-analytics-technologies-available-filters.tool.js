import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class DomainAnalyticsTechnologiesAvailableFiltersTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'domain_analytics_technologies_available_filters';
  }

  getDescription() {
    return `Here you will find all the necessary information about filters that can be used with Domain Analytics Technologies API endpoints.`;
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/domain_analytics/technologies/available_filters', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 