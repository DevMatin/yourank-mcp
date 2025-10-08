import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class SerpGoogleJobsLiveAdvancedTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_google_jobs_live_advanced';
  }

  getDescription(): string {
    return 'Get Google Jobs search results with advanced features';
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().describe("Job search keyword"),
      location_name: z.string().optional().describe("Location name (e.g., 'United States')"),
      location_code: z.number().optional().describe("Location code"),
      language_code: z.string().optional().describe("Language code (e.g., 'en')"),
      device: z.enum(['desktop', 'mobile']).optional().describe("Device type"),
      depth: z.number().min(1).max(700).optional().default(20).describe("Number of job results to retrieve"),
      job_type: z.string().optional().describe("Job type filter (e.g., 'software engineer', 'marketing manager')"),
      company: z.string().optional().describe("Company filter (e.g., 'Google', 'Microsoft')"),
      employment_type: z.enum(['full_time', 'part_time', 'contract', 'temporary', 'internship']).optional().describe("Employment type filter"),
      experience_level: z.enum(['entry_level', 'mid_level', 'senior_level', 'executive']).optional().describe("Experience level filter"),
      date_posted: z.enum(['any', 'today', '3days', 'week', 'month']).optional().describe("Date posted filter"),
      remote: z.boolean().optional().describe("Remote work filter")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keyword: params.keyword
      };
      
      if (params.location_name) {
        requestData.location_name = params.location_name;
      }
      if (params.location_code) {
        requestData.location_code = params.location_code;
      }
      if (params.language_code) {
        requestData.language_code = params.language_code;
      }
      if (params.device) {
        requestData.device = params.device;
      }
      if (params.depth) {
        requestData.depth = params.depth;
      }
      if (params.job_type) {
        requestData.job_type = params.job_type;
      }
      if (params.company) {
        requestData.company = params.company;
      }
      if (params.employment_type) {
        requestData.employment_type = params.employment_type;
      }
      if (params.experience_level) {
        requestData.experience_level = params.experience_level;
      }
      if (params.date_posted) {
        requestData.date_posted = params.date_posted;
      }
      if (params.remote !== undefined) {
        requestData.remote = params.remote;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/google/jobs/live/advanced', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
