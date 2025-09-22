import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class GoogleAdsKeywordsForSiteTaskGetTool extends BaseTool {
  constructor(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_site_task_get';
  }

  getDescription(): string {
    return 'Get results of a completed keywords for site task by task ID';
  }

  getParams(): z.ZodRawShape {
    return {
      task_id: z.string().describe("Task ID to retrieve results for")
    };
  }

  async handle(params)= await this.client.makeRequest(`/v3/keywords_data/google_ads/keywords_for_site/task_get/${params.task_id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
