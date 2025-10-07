import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';
import { queueService } from '../../../services/queue.service.js';

export class QueueJobStatusTool extends BaseTool {
  constructor(client: DataForSEOClient) {
    super(client);
  }
  getName(): string {
    return 'queue_job_status';
  }

  getDescription(): string {
    return 'Get the status and details of a job in the queue';
  }

  getParams(): z.ZodRawShape {
    return {
      job_id: z.string().describe("Job ID to check status for")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const job = await queueService.getJob(params.job_id);

      if (!job) {
        return this.formatErrorResponse(new Error(`Job with ID ${params.job_id} not found`));
      }

      const response = {
        job_id: job.id,
        status: job.status,
        job_type: job.job_type,
        tool_name: job.tool_name,
        priority: job.priority,
        retry_count: job.retry_count,
        max_retries: job.max_retries,
        created_at: job.created_at,
        started_at: job.started_at,
        completed_at: job.completed_at,
        dataforseo_task_id: job.dataforseo_task_id,
        domain: job.domain,
        error_message: job.error_message
      };

      // Include response data only if job is completed
      if (job.status === 'completed' && (job as any).response_data) {
        (response as any)['response_data'] = (job as any).response_data;
      }

      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
