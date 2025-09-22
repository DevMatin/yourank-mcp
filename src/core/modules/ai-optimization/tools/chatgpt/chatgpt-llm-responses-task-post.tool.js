import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class ChatGptLlmResponsesTaskPostTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'ai_optimization_chatgpt_llm_responses_task_post';
  }

  getDescription() {
    return 'ChatGPT LLM Responses endpoint allows you to retrieve structured responses from a specific ChatGPT model';
  }

  getParams() {
    return {
      target: { type: "string", description: "Target parameter for the request" },
      model: { type: "string", description: "ChatGPT model to use", optional: true },
      prompt: { type: "string", description: "Prompt for the AI model", optional: true },
      max_tokens: { type: "number", description: "Maximum number of tokens", optional: true },
      temperature: { type: "number", description: "Temperature for response generation", optional: true },
      top_p: { type: "number", description: "Top-p parameter for response generation", optional: true },
      frequency_penalty: { type: "number", description: "Frequency penalty", optional: true },
      presence_penalty: { type: "number", description: "Presence penalty", optional: true },
      postback_url: { type: "string", description: "Postback URL for async processing", optional: true }
    };
  }

  async handle(params) {
    try {
      const requestData = {
        target: params.target
      };
      
      if (params.model) requestData.model = params.model;
      if (params.prompt) requestData.prompt = params.prompt;
      if (params.max_tokens) requestData.max_tokens = params.max_tokens;
      if (params.temperature) requestData.temperature = params.temperature;
      if (params.top_p) requestData.top_p = params.top_p;
      if (params.frequency_penalty) requestData.frequency_penalty = params.frequency_penalty;
      if (params.presence_penalty) requestData.presence_penalty = params.presence_penalty;
      if (params.postback_url) requestData.postback_url = params.postback_url;

      const response = await this.client.makeRequest('/v3/ai_optimization/chat_gpt/llm_responses/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
