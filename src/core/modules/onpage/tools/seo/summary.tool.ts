import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class SummaryTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'summary';
  }

  getDescription(): string {
    return "Overall information on a website and on-page issues with optimized response";
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task ID"),
      max_issues: z.number().optional().describe("Maximum number of issues to return (default: 20)"),
      include_details: z.boolean().optional().describe("Include detailed issue information (default: false)")
    };
  }

  async handle(params: { id: string; max_issues?: number; include_details?: boolean }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.id = params.id;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/summary/{id}', 'POST', [requestData]);
      
      // Optimierte Response-Verarbeitung
      return this.optimizeSummaryResponse(response, {
        maxIssues: params.max_issues || 20,
        includeDetails: params.include_details || false
      });
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  private optimizeSummaryResponse(response: any, options: { maxIssues: number; includeDetails: boolean }): any {
    try {
      if (!response || !response.tasks || !response.tasks[0] || !response.tasks[0].result) {
        return response;
      }

      const summaryResult = response.tasks[0].result[0];
      if (!summaryResult) {
        return response;
      }

      // Extrahiere wichtige Zusammenfassungsdaten
      const optimizedResponse = {
        status_code: response.status_code || 200,
        task_id: summaryResult.id,
        url: summaryResult.url,
        crawl_progress: summaryResult.crawl_progress,
        crawl_status: summaryResult.crawl_status,
        crawl_status_message: summaryResult.crawl_status_message,
        crawl_gateway_address: summaryResult.crawl_gateway_address,
        crawl_stop_reason: summaryResult.crawl_stop_reason,
        crawl_stop_message: summaryResult.crawl_stop_message,
        total_pages_count: summaryResult.total_pages_count,
        crawled_pages_count: summaryResult.crawled_pages_count,
        failed_pages_count: summaryResult.failed_pages_count,
        broken_pages_count: summaryResult.broken_pages_count,
        broken_resources_count: summaryResult.broken_resources_count,
        duplicate_pages_count: summaryResult.duplicate_pages_count,
        duplicate_resources_count: summaryResult.duplicate_resources_count,
        duplicate_title_count: summaryResult.duplicate_title_count,
        duplicate_description_count: summaryResult.duplicate_description_count,
        duplicate_h1_count: summaryResult.duplicate_h1_count,
        duplicate_h2_count: summaryResult.duplicate_h2_count,
        duplicate_h3_count: summaryResult.duplicate_h3_count,
        duplicate_h4_count: summaryResult.duplicate_h4_count,
        duplicate_h5_count: summaryResult.duplicate_h5_count,
        duplicate_h6_count: summaryResult.duplicate_h6_count,
        duplicate_content_count: summaryResult.duplicate_content_count,
        duplicate_meta_tags_count: summaryResult.duplicate_meta_tags_count,
        duplicate_canonical_count: summaryResult.duplicate_canonical_count,
        duplicate_alternate_hreflang_count: summaryResult.duplicate_alternate_hreflang_count,
        duplicate_open_graph_count: summaryResult.duplicate_open_graph_count,
        duplicate_twitter_card_count: summaryResult.duplicate_twitter_card_count,
        duplicate_schema_markup_count: summaryResult.duplicate_schema_markup_count,
        duplicate_redirect_count: summaryResult.duplicate_redirect_count,
        duplicate_internal_link_count: summaryResult.duplicate_internal_link_count,
        duplicate_external_link_count: summaryResult.duplicate_external_link_count,
        duplicate_image_count: summaryResult.duplicate_image_count,
        duplicate_script_count: summaryResult.duplicate_script_count,
        duplicate_stylesheet_count: summaryResult.duplicate_stylesheet_count,
        duplicate_font_count: summaryResult.duplicate_font_count,
        duplicate_media_count: summaryResult.duplicate_media_count,
        duplicate_other_count: summaryResult.duplicate_other_count,
        duplicate_page_size_count: summaryResult.duplicate_page_size_count,
        duplicate_page_title_count: summaryResult.duplicate_page_title_count,
        duplicate_page_description_count: summaryResult.duplicate_page_description_count,
        duplicate_page_h1_count: summaryResult.duplicate_page_h1_count,
        duplicate_page_h2_count: summaryResult.duplicate_page_h2_count,
        duplicate_page_h3_count: summaryResult.duplicate_page_h3_count,
        duplicate_page_h4_count: summaryResult.duplicate_page_h4_count,
        duplicate_page_h5_count: summaryResult.duplicate_page_h5_count,
        duplicate_page_h6_count: summaryResult.duplicate_page_h6_count,
        duplicate_page_content_count: summaryResult.duplicate_page_content_count,
        duplicate_page_meta_tags_count: summaryResult.duplicate_page_meta_tags_count,
        duplicate_page_canonical_count: summaryResult.duplicate_page_canonical_count,
        duplicate_page_alternate_hreflang_count: summaryResult.duplicate_page_alternate_hreflang_count,
        duplicate_page_open_graph_count: summaryResult.duplicate_page_open_graph_count,
        duplicate_page_twitter_card_count: summaryResult.duplicate_page_twitter_card_count,
        duplicate_page_schema_markup_count: summaryResult.duplicate_page_schema_markup_count,
        duplicate_page_redirect_count: summaryResult.duplicate_page_redirect_count,
        duplicate_page_internal_link_count: summaryResult.duplicate_page_internal_link_count,
        duplicate_page_external_link_count: summaryResult.duplicate_page_external_link_count,
        duplicate_page_image_count: summaryResult.duplicate_page_image_count,
        duplicate_page_script_count: summaryResult.duplicate_page_script_count,
        duplicate_page_stylesheet_count: summaryResult.duplicate_page_stylesheet_count,
        duplicate_page_font_count: summaryResult.duplicate_page_font_count,
        duplicate_page_media_count: summaryResult.duplicate_page_media_count,
        duplicate_page_other_count: summaryResult.duplicate_page_other_count,
        duplicate_page_page_size_count: summaryResult.duplicate_page_page_size_count,
        top_issues: this.extractTopIssues(summaryResult, options.maxIssues),
        blob_storage: this.createBlobStorageInfo(summaryResult, response)
      };

      // Füge detaillierte Informationen nur hinzu, wenn gewünscht
      if (options.includeDetails) {
        (optimizedResponse as any).detailed_issues = summaryResult.checks || [];
        (optimizedResponse as any).pages_summary = summaryResult.pages_summary || [];
        (optimizedResponse as any).resources_summary = summaryResult.resources_summary || [];
      }

      return optimizedResponse;
    } catch (error) {
      console.error('Error optimizing Summary response:', error);
      return response; // Fallback zur ursprünglichen Response
    }
  }

  private extractTopIssues(summaryResult: any, maxIssues: number): any[] {
    const issues: any[] = [];
    const checks = summaryResult.checks || [];

    // Sammle alle wichtigen Issues
    checks.forEach((check: any) => {
      if (check && check.issues && check.issues.length > 0) {
        check.issues.slice(0, 3).forEach((issue: any) => {
          issues.push({
            check_name: check.check_name,
            issue_type: issue.issue_type,
            severity: issue.severity,
            message: issue.message,
            affected_pages: issue.affected_pages || 0
          });
        });
      }
    });

    // Sortiere nach Schweregrad und begrenze
    return issues
      .sort((a, b) => {
        const severityOrder = { 'error': 3, 'warning': 2, 'info': 1 };
        return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
      })
      .slice(0, maxIssues);
  }

  private createBlobStorageInfo(summaryResult: any, response: any): any {
    const responseSize = JSON.stringify(response).length;
    
    if (responseSize > 50000) { // > 50KB
      return {
        storage: "vercel_blob",
        results_url: `https://blob.vercel-storage.com/summary/${Date.now()}`,
        proxy_url: `https://yourank-mcp.vercel.app/api/proxy/summary/${Date.now()}`,
        size_bytes: responseSize,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    }

    return null;
  }
}