import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class BingAudienceEstimationJobFunctionsTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_bing_audience_estimation_job_functions';
  }

  getDescription(): string {
    return 'Get list of job functions supported by Bing Ads Audience Estimation endpoint.';
  }

  getParams(): any {
    return {
      type: 'object',
      properties: {}
    };
  }

  async handle(params: {}): Promise<any> {
    return await this.client.makeRequest('/v3/keywords_data/bing/audience_estimation/job_functions');
  }
}
