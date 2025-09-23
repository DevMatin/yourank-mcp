import { supabaseManager, SupabaseClient } from '../config/supabase.config.js';

export interface QueueJob {
  id: string;
  job_type: string;
  tool_name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  priority: number;
  dataforseo_task_id?: string;
  postback_url?: string;
  request_data: any;
  response_data?: any;
  error_message?: string;
  retry_count: number;
  max_retries: number;
  domain?: string;
  created_at: string;
  started_at?: string;
  completed_at?: string;
  user_id?: string;
  session_id?: string;
}

export interface CreateJobParams {
  job_type: string;
  tool_name: string;
  request_data: any;
  priority?: number;
  domain?: string;
  max_retries?: number;
  user_id?: string;
  session_id?: string;
}

export class QueueService {
  private client: SupabaseClient;

  constructor() {
    this.client = supabaseManager.getClient();
  }

  /**
   * Create a new job in the queue
   */
  async createJob(params: CreateJobParams): Promise<QueueJob | null> {
    try {
      const jobData = {
        job_type: params.job_type,
        tool_name: params.tool_name,
        request_data: params.request_data,
        priority: params.priority || 5,
        domain: params.domain,
        max_retries: params.max_retries || 3,
        user_id: params.user_id,
        session_id: params.session_id,
        status: 'pending'
      };

      const { data, error } = await this.client
        .from('api_jobs')
        .insert(jobData)
        .select()
        .single();

      if (error) {
        console.error('Failed to create job:', error);
        return null;
      }

      return data as QueueJob;
    } catch (error) {
      console.error('QueueService.createJob error:', error);
      return null;
    }
  }

  /**
   * Get next pending job from queue
   */
  async getNextPendingJob(jobTypes?: string[]): Promise<QueueJob | null> {
    try {
      const { data, error } = await this.client.rpc('get_next_pending_job', {
        job_types: jobTypes || null
      });

      if (error) {
        console.error('Failed to get next pending job:', error);
        return null;
      }

      return data && data.length > 0 ? data[0] as QueueJob : null;
    } catch (error) {
      console.error('QueueService.getNextPendingJob error:', error);
      return null;
    }
  }

  /**
   * Update job status
   */
  async updateJobStatus(
    jobId: string, 
    status: QueueJob['status'], 
    responseData?: any, 
    errorMessage?: string,
    dataforSeoTaskId?: string
  ): Promise<boolean> {
    try {
      const updateData: any = {
        status,
        ...(responseData && { response_data: responseData }),
        ...(errorMessage && { error_message: errorMessage }),
        ...(dataforSeoTaskId && { dataforseo_task_id: dataforSeoTaskId })
      };

      if (status === 'processing') {
        updateData.started_at = new Date().toISOString();
      } else if (['completed', 'failed', 'cancelled'].includes(status)) {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await this.client
        .from('api_jobs')
        .update(updateData)
        .eq('id', jobId);

      if (error) {
        console.error('Failed to update job status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('QueueService.updateJobStatus error:', error);
      return false;
    }
  }

  /**
   * Get job by ID
   */
  async getJob(jobId: string): Promise<QueueJob | null> {
    try {
      const { data, error } = await this.client
        .from('api_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Failed to get job:', error);
        return null;
      }

      return data as QueueJob;
    } catch (error) {
      console.error('QueueService.getJob error:', error);
      return null;
    }
  }

  /**
   * Get jobs by DataForSEO task ID
   */
  async getJobByDataForSeoTaskId(taskId: string): Promise<QueueJob | null> {
    try {
      const { data, error } = await this.client
        .from('api_jobs')
        .select('*')
        .eq('dataforseo_task_id', taskId)
        .single();

      if (error) {
        console.error('Failed to get job by DataForSEO task ID:', error);
        return null;
      }

      return data as QueueJob;
    } catch (error) {
      console.error('QueueService.getJobByDataForSeoTaskId error:', error);
      return null;
    }
  }

  /**
   * Get pending jobs count
   */
  async getPendingJobsCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('api_jobs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (error) {
        console.error('Failed to get pending jobs count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('QueueService.getPendingJobsCount error:', error);
      return 0;
    }
  }

  /**
   * Get jobs by status
   */
  async getJobsByStatus(status: QueueJob['status'], limit: number = 50): Promise<QueueJob[]> {
    try {
      const { data, error } = await this.client
        .from('api_jobs')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Failed to get jobs by status:', error);
        return [];
      }

      return data as QueueJob[];
    } catch (error) {
      console.error('QueueService.getJobsByStatus error:', error);
      return [];
    }
  }

  /**
   * Increment retry count
   */
  async incrementRetryCount(jobId: string): Promise<boolean> {
    try {
      // First get current retry count
      const { data: currentJob, error: selectError } = await this.client
        .from('api_jobs')
        .select('retry_count')
        .eq('id', jobId)
        .single();

      if (selectError || !currentJob) {
        console.error('Failed to get current retry count:', selectError);
        return false;
      }

      // Then increment it
      const { error: updateError } = await this.client
        .from('api_jobs')
        .update({ 
          retry_count: currentJob.retry_count + 1 
        })
        .eq('id', jobId);

      if (updateError) {
        console.error('Failed to increment retry count:', updateError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('QueueService.incrementRetryCount error:', error);
      return false;
    }
  }
}

export const queueService = new QueueService();
