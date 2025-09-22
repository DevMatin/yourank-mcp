
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class ClaudeLlmResponsesTaskPostTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'ai_optimization_claude_llm_responses_task_post';
  }

  getDescription() {
    return 'Claude LLM Responses endpoint allows you to retrieve structured responses from a specific Claude model';
  }

  getParams() {
    return {
      target: { type: "string", description: "Target parameter for the request" },
      model: { type: "string", description: "Claude model to use", optional: true },
      prompt: { type: "string", description: "Prompt for the AI model", optional: true },
      max_tokens: { type: "number", description: "Maximum number of tokens", optional: true },
      temperature: { type: "number", description: "Temperature for response generation", optional: true },
      top_p: { type: "number", description: "Top-p parameter for response generation", optional: true },
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
      if (params.postback_url) requestData.postback_url = params.postback_url;

      const response = await this.client.makeRequest('/v3/ai_optimization/claude/llm_responses/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
