import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class ChatGptLlmResponsesLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_optimization_chatgpt_llm_responses_live';
  }

  getDescription(): string {
    return 'Live ChatGPT LLM Responses endpoint allows you to retrieve structured responses from a specific Chat GPT AI model';
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("Target parameter for the request"),
      model: z.string().optional().describe("ChatGPT model to use"),
      prompt: z.string().optional().describe("Prompt for the AI model"),
      max_tokens: z.number().optional().describe("Maximum number of tokens"),
      temperature: z.number().optional().describe("Temperature for response generation"),
      top_p: z.number().optional().describe("Top-p parameter for response generation"),
      frequency_penalty: z.number().optional().describe("Frequency penalty"),
      presence_penalty: z.number().optional().describe("Presence penalty")
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
      if (params.frequency_penalty) requestData.frequency_penalty = params.frequency_penalty;
      if (params.presence_penalty) requestData.presence_penalty = params.presence_penalty;

      const response = await this.client.makeRequest('/v3/ai_optimization/chat_gpt/llm_responses/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
