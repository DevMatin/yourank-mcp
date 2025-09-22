import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';
import { queueService } from '../../../../services/queue.service.js';

export class GoogleAdsSearchVolumeQueueTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_search_volume_queue';
  }

  getDescription(): string {
    return 'Queue a task to get search volume data for keywords from Google Ads (asynchronous with Supabase queue)';
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe("Array of keywords to analyze"),
      location_name: z.string().optional().describe("Location name (e.g., 'Germany', 'United States')"),
      language_code: z.string().optional().describe("Language code (e.g., 'de', 'en')"),
      priority: z.number().optional().describe("Job priority (1-10, default: 5)"),
      domain: z.string().optional().describe("Domain for grouping jobs"),
      user_id: z.string().optional().describe("User ID for tracking"),
      session_id: z.string().optional().describe("Session ID for batch operations"),
      execute_immediately: z.boolean().optional().describe("Execute immediately instead of queuing (default: false)")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        keywords: params.keywords,
        location_name: params.location_name,
        language_code: params.language_code
      };

      // If execute_immediately is true, run the task directly
      if (params.execute_immediately) {
        return await this.executeTaskDirectly(requestData);
      }

      // Otherwise, queue the job
      const job = await queueService.createJob({
        job_type: 'keywords',
        tool_name: 'google_ads_search_volume',
        request_data: requestData,
        priority: params.priority,
        domain: params.domain,
        user_id: params.user_id,
        session_id: params.session_id
      });

      if (!job) {
        return this.formatErrorResponse(new Error('Failed to create job in queue'));
      }

      return this.formatResponse({
        success: true,
        job_id: job.id,
        status: 'queued',
        message: 'Keywords search volume task has been queued for processing',
        estimated_processing_time: '2-5 minutes',
        check_status_with: `Use queue_job_status tool with job_id: ${job.id}`,
        keywords_count: params.keywords.length
      });

    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  /**
   * Execute the task directly without queuing
   */
  private async executeTaskDirectly(requestData: any): Promise<any> {
    try {
      // Generate callback URL for this specific task
      const callbackUrl = process.env.DATAFORSEO_CALLBACK_BASE_URL + '/callback/keywords/google-ads/search-volume';
      
      const taskData = {
        ...requestData,
        ...(callbackUrl && { postback_url: callbackUrl })
      };

      const response = await this.client.makeRequest(
        '/v3/keywords_data/google_ads/search_volume/task_post', 
        'POST', 
        [taskData]
      );

      const validatedResponse = this.validateAndFormatResponse(response);

      // If we have a task_id from DataForSEO, we could optionally still track it
      if (validatedResponse.success && validatedResponse.data?.tasks?.[0]?.id) {
        const dataforSeoTaskId = validatedResponse.data.tasks[0].id;
        
        // Create a tracking job for this immediate execution
        await queueService.createJob({
          job_type: 'keywords',
          tool_name: 'google_ads_search_volume_immediate',
          request_data: requestData,
          priority: 10
        });
      }

      return validatedResponse;
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
