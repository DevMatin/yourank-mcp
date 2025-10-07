import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class ChatGptLlmResponsesModelsTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'ai_optimization_chatgpt_llm_responses_models';
  }

  getDescription() {
    return 'Get the list of available Chat GPT AI models';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/ai_optimization/chat_gpt/llm_responses/models', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
