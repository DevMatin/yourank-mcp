import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { supabaseManager } from '../../../config/supabase.config.js';

export class QueueStatsToolTool extends BaseTool {
  getName(): string {
    return 'queue_stats';
  }

  getDescription(): string {
    return 'Get comprehensive statistics about the job queue';
  }

  getParams(): z.ZodRawShape {
    return {
      include_performance: z.boolean().optional().describe("Include performance statistics (default: false)")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const client = supabaseManager.getClient();
      
      // Get basic job statistics
      const { data: jobStats, error: jobStatsError } = await client
        .from('jobs_overview')
        .select('*');

      if (jobStatsError) {
        throw new Error(`Failed to fetch job statistics: ${jobStatsError.message}`);
      }

      // Get pending jobs count
      const { count: pendingCount, error: pendingError } = await client
        .from('api_jobs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (pendingError) {
        throw new Error(`Failed to fetch pending jobs count: ${pendingError.message}`);
      }

      // Get cache statistics
      const { data: cacheStats, error: cacheStatsError } = await client
        .from('cache_stats')
        .select('*');

      if (cacheStatsError) {
        throw new Error(`Failed to fetch cache statistics: ${cacheStatsError.message}`);
      }

      const response: any = {
        queue_overview: {
          total_pending_jobs: pendingCount || 0,
          job_statistics: jobStats || [],
          last_updated: new Date().toISOString()
        },
        cache_overview: {
          total_cached_requests: cacheStats?.reduce((sum: number, stat: any) => sum + (stat.cached_requests || 0), 0) || 0,
          active_cache_entries: cacheStats?.reduce((sum: number, stat: any) => sum + (stat.active_cache_entries || 0), 0) || 0,
          cache_by_endpoint: cacheStats || []
        }
      };

      // Include performance stats if requested
      if (params.include_performance) {
        const { data: performanceStats, error: performanceError } = await client
          .from('job_performance_stats')
          .select('*');

        if (performanceError) {
          console.warn('Failed to fetch performance statistics:', performanceError.message);
        } else {
          response.performance_overview = {
            tool_performance: performanceStats || [],
            total_tools: performanceStats?.length || 0
          };
        }
      }

      return this.formatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
