import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class GoogleQuestionsAndAnswersTaskGetTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
    
  }

  getName(): string {
    return 'google_questions_and_answers_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed Google Questions & Answers task by task ID.';
  }

  getParams() {
    return {
      id: z.string().describe('task identifier unique task identifier in our system in the UUID format you will be able to use it within 30 days to request the results of the task at any time'),
    };
  }

  async handle(params: any) {
    return await this.client.makeRequest(`/v3/business_data/google/questions_and_answers/task_get/${params.id}`, 'POST', 'GET');
  }
}
