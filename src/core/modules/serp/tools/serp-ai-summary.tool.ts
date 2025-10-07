import { z } from 'zod';
import { BaseTool } from '../../base.tool';
import { DataForSEOClient } from '../../../client/dataforseo.client';

export class SerpAiSummaryTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_ai_summary';
  }

  getDescription(): string {
    return 'Get AI summary of content found on any SERP based on user specified prompt';
  }

  getParams(): z.ZodRawShape {
    return {
      task_id: z.string().describe("Task ID from previous SERP request"),
      prompt: z.string().describe("User specified prompt for AI summary"),
      include_answer_box: z.boolean().optional().describe("Include answer box content"),
      include_people_also_ask: z.boolean().optional().describe("Include people also ask content"),
      include_related_searches: z.boolean().optional().describe("Include related searches"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        task_id: params.task_id,
        prompt: params.prompt
      };
      
      if (params.include_answer_box !== undefined) {
        requestData.include_answer_box = params.include_answer_box;
      }
      if (params.include_people_also_ask !== undefined) {
        requestData.include_people_also_ask = params.include_people_also_ask;
      }
      if (params.include_related_searches !== undefined) {
        requestData.include_related_searches = params.include_related_searches;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/ai_summary', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
