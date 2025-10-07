import { z } from 'zod';
import { BaseTool } from '../../../base.tool';
import { DataForSEOClient } from '../../../../client/dataforseo.client';

export class MerchantGoogleSellersAdUrlTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'merchant_google_sellers_ad_url';
  }

  getDescription(): string {
    return 'Get the full URL of a Google Shopping advertisement';
  }

  getParams(): z.ZodRawShape {
    return {
      shop_ad_aclk: z.string().describe("Unique ad click referral parameter"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(
        '/v3/merchant/google/sellers/ad_url/{shop_ad_aclk}',
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
