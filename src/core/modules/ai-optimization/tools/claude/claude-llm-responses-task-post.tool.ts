import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class ClaudeLlmResponsesTaskPostTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_optimization_claude_llm_responses_task_post';
  }

  getDescription(): string {
    return 'Claude LLM Responses endpoint allows you to retrieve structured responses from a specific Claude model';
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("Target parameter for the request"),
      model: z.string().optional().describe("Claude model to use"),
      prompt: z.string().optional().describe("Prompt for the AI model"),
      max_tokens: z.number().optional().describe("Maximum number of tokens"),
      temperature: z.number().optional().describe("Temperature for response generation"),
      top_p: z.number().optional().describe("Top-p parameter for response generation"),
      postback_url: z.string().optional().describe("Postback URL for async processing")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        target: params.target
      };
      
      if (params.model) requestData.model = params.model;
      if (params.prompt) requestData.prompt = params.prompt;
      if (params.max_tokens) requestData.max_tokens = params.max_tokens;
      if (params.temperature) requestData.temperature = params.temperature;
      if (params.top_p) requestData.top_p = params.top_p;
      if (params.postback_url) requestData.postback_url = params.postback_url;

      const response = await this.client.makeRequest('/v3/ai_optimization/claude/llm_responses/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
