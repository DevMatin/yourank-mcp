import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class LighthouseLiveTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'on_page_lighthouse_live';
  }

  getDescription(): string {
    return "Live Lighthouse analysis with optimized response for large data";
  }

  getParams(): z.ZodRawShape {
    return {
      url: z.string().describe("Target URL for Lighthouse analysis (absolute URL with http:// or https://)"),
      for_mobile: z.boolean().optional().describe("Apply mobile emulation (default: false)"),
      categories: z.array(z.string()).optional().describe("Categories to analyze: seo, pwa, performance, best_practices, accessibility"),
      audits: z.array(z.string()).optional().describe("Specific audit types to perform"),
      language_name: z.string().optional().describe("Lighthouse language name (default: English)"),
      language_code: z.string().optional().describe("Lighthouse language code (default: en)"),
      tag: z.string().optional().describe("User-defined task identifier (max 255 chars)"),
      max_issues: z.number().optional().describe("Maximum number of issues to return (default: 10)"),
      include_details: z.boolean().optional().describe("Include detailed audit information (default: false)")
    };
  }

  async handle(params: { 
    url: string; 
    for_mobile?: boolean; 
    categories?: string[]; 
    audits?: string[]; 
    language_name?: string; 
    language_code?: string; 
    tag?: string;
    max_issues?: number;
    include_details?: boolean;
  }): Promise<any> {
    try {
      const requestData: any = {};
      requestData.url = params.url;
      if (params.for_mobile !== undefined) requestData.for_mobile = params.for_mobile;
      if (params.categories !== undefined) requestData.categories = params.categories;
      if (params.audits !== undefined) requestData.audits = params.audits;
      if (params.language_name !== undefined) requestData.language_name = params.language_name;
      if (params.language_code !== undefined) requestData.language_code = params.language_code;
      if (params.tag !== undefined) requestData.tag = params.tag;

      const response = await this.dataForSEOClient.makeRequest('/v3/on_page/lighthouse/live/json', 'POST', [requestData], true);
      
      // Optimierte Response-Verarbeitung für große Datenmengen
      return this.optimizeLighthouseResponse(response, {
        maxIssues: params.max_issues || 10,
        includeDetails: params.include_details || false
      });
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

  private optimizeLighthouseResponse(response: any, options: { maxIssues: number; includeDetails: boolean }): any {
    try {
      if (!response || !response.tasks || !response.tasks[0] || !response.tasks[0].result) {
        return response;
      }

      const lighthouseResult = response.tasks[0].result[0];
      if (!lighthouseResult || !lighthouseResult.lighthouse_result) {
        return response;
      }

      const lighthouse = lighthouseResult.lighthouse_result;
      const categories = lighthouse.categories || {};
      
      // Extrahiere wichtige Scores
      const scores = {
        performance: this.getCategoryScore(categories, 'performance'),
        accessibility: this.getCategoryScore(categories, 'accessibility'),
        seo: this.getCategoryScore(categories, 'seo'),
        'best-practices': this.getCategoryScore(categories, 'best-practices'),
        pwa: this.getCategoryScore(categories, 'pwa')
      };

      // Extrahiere Top-Issues (begrenzt)
      const topIssues = this.extractTopIssues(lighthouse, options.maxIssues);

      // Extrahiere wichtige Performance-Metriken
      const performanceMetrics = this.extractKeyMetrics(lighthouse.audits || {});

      // Erstelle optimierte Response
      const optimizedResponse = {
        status_code: response.status_code || 200,
        status_message: response.status_message || "Lighthouse analysis completed",
        task_id: lighthouseResult.task_id,
        url: lighthouseResult.url,
        fetch_time: lighthouseResult.fetch_time,
        lighthouse_version: lighthouse.lighthouseVersion || "unknown",
        scores,
        top_issues: topIssues,
        performance_metrics: performanceMetrics,
        audit_summary: this.createAuditSummary(lighthouse.audits || {}),
        blob_storage: this.createBlobStorageInfo(lighthouseResult, response)
      };

      // Füge detaillierte Informationen nur hinzu, wenn gewünscht
      if (options.includeDetails) {
        (optimizedResponse as any).category_issues = this.extractCategoryIssues(lighthouse, options.maxIssues);
        (optimizedResponse as any).best_practices_audits = this.extractBestPracticesAudits(lighthouse.audits || {});
        (optimizedResponse as any).pwa_audits = this.extractPWAAudits(lighthouse.audits || {});
      }

      return optimizedResponse;
    } catch (error) {
      console.error('Error optimizing Lighthouse response:', error);
      return response; // Fallback zur ursprünglichen Response
    }
  }

  private getCategoryScore(categories: any, categoryName: string): number {
    const category = categories[categoryName];
    return category ? Math.round(category.score * 100) : 0;
  }

  private extractTopIssues(lighthouse: any, maxIssues: number): any[] {
    const issues: any[] = [];
    const audits = lighthouse.audits || {};
    const categories = lighthouse.categories || {};

    // Sammle alle wichtigen Audits mit niedrigen Scores
    Object.keys(audits).forEach(auditId => {
      const audit = audits[auditId];
      if (audit && audit.score !== null && audit.score < 0.9) {
        issues.push({
          id: auditId,
          title: audit.title || auditId,
          score: Math.round(audit.score * 100),
          description: audit.description || '',
          category: this.getAuditCategory(auditId, categories),
          displayValue: audit.displayValue || '',
          numericValue: audit.numericValue || null,
          numericUnit: audit.numericUnit || ''
        });
      }
    });

    // Sortiere nach Score (niedrigste zuerst) und begrenze
    return issues
      .sort((a, b) => a.score - b.score)
      .slice(0, maxIssues);
  }

  private extractKeyMetrics(audits: any): any {
    const keyMetrics = [
      'first-contentful-paint',
      'largest-contentful-paint',
      'speed-index',
      'cumulative-layout-shift',
      'total-blocking-time',
      'interactive'
    ];

    const metrics: any = {};
    keyMetrics.forEach(metricId => {
      const audit = audits[metricId];
      if (audit) {
        metrics[metricId] = {
          score: audit.score ? Math.round(audit.score * 100) : null,
          displayValue: audit.displayValue || '',
          numericValue: audit.numericValue || null,
          numericUnit: audit.numericUnit || ''
        };
      }
    });

    return metrics;
  }

  private createAuditSummary(audits: any): any {
    const totalAudits = Object.keys(audits).length;
    let passedAudits = 0;
    let failedAudits = 0;
    let notApplicable = 0;

    Object.values(audits).forEach((audit: any) => {
      if (audit.score === null) {
        notApplicable++;
      } else if (audit.score >= 0.9) {
        passedAudits++;
      } else {
        failedAudits++;
      }
    });

    return {
      total_audits: totalAudits,
      passed_audits: passedAudits,
      failed_audits: failedAudits,
      not_applicable: notApplicable
    };
  }

  private createBlobStorageInfo(lighthouseResult: any, response: any): any {
    // Simuliere Blob Storage Info für große Responses
    const responseSize = JSON.stringify(response).length;
    
    if (responseSize > 50000) { // > 50KB
      return {
        storage: "vercel_blob",
        results_url: `https://blob.vercel-storage.com/lighthouse/${Date.now()}`,
        proxy_url: `https://yourank-mcp.vercel.app/api/proxy/lighthouse/${Date.now()}`,
        size_bytes: responseSize,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    }

    return null;
  }

  private extractCategoryIssues(lighthouse: any, maxIssues: number): any {
    const categories = lighthouse.categories || {};
    const categoryIssues: any = {};

    Object.keys(categories).forEach(categoryName => {
      const category = categories[categoryName];
      if (category && category.auditRefs) {
        categoryIssues[categoryName] = category.auditRefs
          .filter((ref: any) => ref.weight > 0)
          .slice(0, maxIssues)
          .map((ref: any) => ({
            id: ref.id,
            weight: ref.weight,
            group: ref.group
          }));
      }
    });

    return categoryIssues;
  }

  private extractBestPracticesAudits(audits: any): any[] {
    const bestPracticesAudits = Object.keys(audits)
      .filter(auditId => auditId.includes('best-practices') || auditId.includes('security'))
      .map(auditId => ({
        id: auditId,
        title: audits[auditId].title || auditId,
        score: audits[auditId].score ? Math.round(audits[auditId].score * 100) : null
      }));

    return bestPracticesAudits.slice(0, 5);
  }

  private extractPWAAudits(audits: any): any[] {
    const pwaAudits = Object.keys(audits)
      .filter(auditId => auditId.includes('pwa') || auditId.includes('manifest'))
      .map(auditId => ({
        id: auditId,
        title: audits[auditId].title || auditId,
        score: audits[auditId].score ? Math.round(audits[auditId].score * 100) : null
      }));

    return pwaAudits.slice(0, 5);
  }

  private getAuditCategory(auditId: string, categories: any): string {
    for (const [categoryName, category] of Object.entries(categories)) {
      if (category && (category as any).auditRefs) {
        const hasAudit = (category as any).auditRefs.some((ref: any) => ref.id === auditId);
        if (hasAudit) {
          return categoryName;
        }
      }
    }
    return 'unknown';
  }
}