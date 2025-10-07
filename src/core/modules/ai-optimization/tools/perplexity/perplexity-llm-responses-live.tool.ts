import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class PerplexityLlmResponsesLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_optimization_perplexity_llm_responses_live';
  }

  getDescription(): string {
    return 'Live Perplexity LLM Responses endpoint allows you to retrieve structured responses from a specific Perplexity AI model';
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("Target parameter for the request"),
      model: z.string().optional().describe("Perplexity model to use"),
      prompt: z.string().optional().describe("Prompt for the AI model"),
      max_tokens: z.number().optional().describe("Maximum number of tokens"),
      temperature: z.number().optional().describe("Temperature for response generation"),
      top_p: z.number().optional().describe("Top-p parameter for response generation")
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

      const response = await this.client.makeRequest('/v3/ai_optimization/perplexity/llm_responses/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
