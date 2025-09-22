import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class ChatGptLlmResponsesTaskGetTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'ai_optimization_chatgpt_llm_responses_task_get';
  }

  getDescription() {
    return 'Get ChatGPT LLM Responses task results by task ID';
  }

  getParams() {
    return {
      id: { type: "string", description: "Task identifier in UUID format" }
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(`/v3/ai_optimization/chat_gpt/llm_responses/task_get/${params.id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
