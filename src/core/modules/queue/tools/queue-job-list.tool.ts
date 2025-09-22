import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { queueService, QueueJob } from '../../../services/queue.service.js';

export class QueueJobListTool extends BaseTool {
  getName(): string {
    return 'queue_job_list';
  }

  getDescription(): string {
    return 'List jobs in the queue with optional filtering';
  }

  getParams(): z.ZodRawShape {
    return {
      status: z.string().optional().describe("Filter by job status (pending, processing, completed, failed, cancelled)"),
      limit: z.number().optional().describe("Maximum number of jobs to return (default: 50)")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      let jobs: QueueJob[] = [];

      if (params.status) {
        jobs = await queueService.getJobsByStatus(params.status, params.limit || 50);
      } else {
        // Get jobs from all statuses - need to implement this in queue service
        const allStatuses: QueueJob['status'][] = ['pending', 'processing', 'completed', 'failed', 'cancelled'];
        const jobsByStatus = await Promise.all(
          allStatuses.map(status => queueService.getJobsByStatus(status, Math.floor((params.limit || 50) / allStatuses.length)))
        );
        jobs = jobsByStatus.flat().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, params.limit || 50);
      }

      const response = {
        total_jobs: jobs.length,
        jobs: jobs.map(job => ({
          job_id: job.id,
          status: job.status,
          job_type: job.job_type,
          tool_name: job.tool_name,
          priority: job.priority,
          domain: job.domain,
          retry_count: job.retry_count,
          created_at: job.created_at,
          started_at: job.started_at,
          completed_at: job.completed_at,
          dataforseo_task_id: job.dataforseo_task_id,
          error_message: job.error_message
        }))
      };

      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
