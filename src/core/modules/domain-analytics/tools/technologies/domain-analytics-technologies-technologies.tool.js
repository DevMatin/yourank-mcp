import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class DomainAnalyticsTechnologiesTechnologiesTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'domain_analytics_technologies_technologies';
  }

  getDescription() {
    return `This endpoint will provide you with the full list of available technologies structured by technology groups and categories each particular technology belongs to.`;
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/domain_analytics/technologies/technologies', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
} 