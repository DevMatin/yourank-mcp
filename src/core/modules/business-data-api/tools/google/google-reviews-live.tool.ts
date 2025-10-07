import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client';
import { BaseTool } from '../../../base.tool';

export class GoogleReviewsLiveTool extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'business_data_google_reviews_live';
  }

  getDescription(): string {
    return `This endpoint provides results from the "Reviews" element of Google SERPs. The results are specific to the selected location and language parameters.`;
  }

  getParams(): z.ZodRawShape {
    return {
      target: z.string().describe("target business name or domain"),
      location_code: z.number().optional().describe("location code"),
      language_code: z.string().optional().describe("language code"),
      limit: z.number().min(1).max(1000).default(10).optional().describe("the maximum number of returned reviews"),
      offset: z.number().min(0).default(0).optional().describe("offset in the results array")
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        target: params.target
      };
      
      if (params.location_code) requestData.location_code = params.location_code;
      if (params.language_code) requestData.language_code = params.language_code;
      if (params.limit) requestData.limit = params.limit;
      if (params.offset) requestData.offset = params.offset;

      const response = await this.client.makeRequest('/v3/business_data/google/reviews/live', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
