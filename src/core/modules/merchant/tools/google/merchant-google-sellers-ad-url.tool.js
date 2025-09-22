import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';

export class MerchantGoogleSellersAdUrlTool extends BaseTool {
  constructor(dataForSEOClient) {
    super(dataForSEOClient);
    this.client = dataForSEOClient;
  }

  getName() {
    return 'merchant_google_sellers_ad_url';
  }

  getDescription() {
    return 'Get the full URL of a Google Shopping advertisement';
  }

  getParams() {
    return {
      shop_ad_aclk: z.string().describe("Shop advertisement aclk parameter"),
    };
  }

  async handle(params) {
    try {
      const response = await this.client.makeRequest(
        `/v3/merchant/google/sellers/ad_url/${params.shop_ad_aclk}`,
        'GET'
      );
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
