import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class ClaudeLlmResponsesTasksReadyTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_optimization_claude_llm_responses_tasks_ready';
  }

  getDescription(): string {
    return 'Get a list of completed Claude LLM Responses tasks that haven\'t been collected yet';
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.client.makeRequest('/v3/ai_optimization/claude/llm_responses/tasks_ready', 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
