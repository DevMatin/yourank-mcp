import { z } from 'zod';
// DataForSEOClient import removed
import { BaseTool } from '../../../../../../base.tool.js';

export class GoogleAdsKeywordsForSiteTaskPostTool extends BaseTool {
  constructor(client);
  }

  getName(): string {
    return 'keywords_data_google_ads_keywords_for_site_task_post';
  }

  getDescription(): string {
    return 'Create a task to get relevant keywords for a specific domain/website';
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("Target URL or domain to analyze"),
      location_name: z.string().optional().describe("Location name (e.g., 'Germany', 'United States')"),
      language_code: z.string().optional().describe("Language code (e.g., 'de', 'en')"),
      postback_url: z.string().optional().describe("Postback URL for task completion notification")
    };
  }

  async handle(params)= {
        target: params.target
      };
      
      if (params.location_name) {
        requestData.location_name = params.location_name;
      }
      
      if (params.language_code) {
        requestData.language_code = params.language_code;
      }
      
      if (params.postback_url) {
        requestData.postback_url = params.postback_url;
      }

      const response = await this.client.makeRequest('/v3/keywords_data/google_ads/keywords_for_site/task_post', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
