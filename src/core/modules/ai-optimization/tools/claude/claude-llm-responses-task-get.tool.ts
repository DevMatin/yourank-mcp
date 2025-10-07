import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class ClaudeLlmResponsesTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_optimization_claude_llm_responses_task_get';
  }

  getDescription(): string {
    return 'Get Claude LLM Responses task results by task ID';
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe("Task identifier in UUID format")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.client.makeRequest(`/v3/ai_optimization/claude/llm_responses/task_get/${params.id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
