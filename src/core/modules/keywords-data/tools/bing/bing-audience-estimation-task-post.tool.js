import { BaseTool } from '../../../../../../base.tool.js';

export class BingAudienceEstimationTaskPostTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'keywords_data_bing_audience_estimation_task_post';
  }

  getDescription() {
    return 'Submit a task to get estimated audience size for Bing ad campaigns.';
  }

  getParams() {
    return {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of keywords for audience estimation',
          maxItems: 1000
        },
        location_name: {
          type: 'string',
          description: 'Location name (e.g., "United States")',
          default: 'United States'
        },
        language_code: {
          type: 'string',
          description: 'Language code (e.g., "en")',
          default: 'en'
        },
        device: {
          type: 'string',
          enum: ['desktop', 'mobile', 'tablet'],
          description: 'Device type',
          default: 'desktop'
        },
        job_functions: {
          type: 'array',
          items: { type: 'integer' },
          description: 'Array of job function IDs for targeting'
        },
        industries: {
          type: 'array',
          items: { type: 'integer' },
          description: 'Array of industry IDs for targeting'
        },
        age_ranges: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of age ranges (e.g., ["18-24", "25-34"])'
        },
        gender: {
          type: 'string',
          enum: ['male', 'female', 'all'],
          description: 'Gender targeting',
          default: 'all'
        },
        postback_url: {
          type: 'string',
          description: 'URL to receive results when task is completed (optional)'
        }
      },
      required: ['keywords']
    };
  }

  async handle(params) {
    const requestData = [{
      keywords: params.keywords,
      location_name: params.location_name || 'United States',
      language_code: params.language_code || 'en',
      device: params.device || 'desktop',
      job_functions: params.job_functions,
      industries: params.industries,
      age_ranges: params.age_ranges,
      gender: params.gender || 'all',
      postback_url: params.postback_url
    }];

    return await this.client.post('/v3/keywords_data/bing/audience_estimation/task_post', requestData);
  }
}
