import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { queueService, CreateJobParams } from '../../../services/queue.service.js';

export class QueueJobCreateTool extends BaseTool {
  constructor(client: DataForSEOClient) {
    super(client);
  }
  getName(): string {
    return 'queue_job_create';
  }

  getDescription(): string {
    return 'Create a new job in the DataForSEO queue system';
  }

  getParams(): z.ZodRawShape {
    return {
      job_type: z.string().describe("Type of job (serp, keywords, backlinks, etc.)"),
      tool_name: z.string().describe("Specific DataForSEO tool name"),
      request_data: z.any().describe("Request data for the DataForSEO API"),
      priority: z.number().optional().describe("Job priority (1-10, default: 5)"),
      domain: z.string().optional().describe("Domain for grouping jobs"),
      max_retries: z.number().optional().describe("Maximum retry attempts (default: 3)"),
      user_id: z.string().optional().describe("User ID for tracking"),
      session_id: z.string().optional().describe("Session ID for batch operations")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const jobParams: CreateJobParams = {
        job_type: params.job_type,
        tool_name: params.tool_name,
        request_data: params.request_data,
        priority: params.priority,
        domain: params.domain,
        max_retries: params.max_retries,
        user_id: params.user_id,
        session_id: params.session_id
      };

      const job = await queueService.createJob(jobParams);

      if (!job) {
        return this.formatErrorResponse(new Error('Failed to create job in queue'));
      }

      return this.formatResponse({
        success: true,
        job_id: job.id,
        status: job.status,
        created_at: job.created_at,
        message: 'Job successfully created and queued for processing'
      });
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
