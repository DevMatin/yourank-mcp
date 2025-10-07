
import { DataForSEOClient } from "../../../../client/dataforseo.client";
import { BaseTool } from "../../../base.tool";

export class ClaudeLlmResponsesTasksReadyTool extends BaseTool {
  constructor(client) {
    super(client);
    this.client = client;
  }

  getName() {
    return 'ai_optimization_claude_llm_responses_tasks_ready';
  }

  getDescription() {
    return 'Get a list of completed Claude LLM Responses tasks that haven\'t been collected yet';
  }

  getParams() {
    return {};
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest('/v3/ai_optimization/claude/llm_responses/tasks_ready', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
