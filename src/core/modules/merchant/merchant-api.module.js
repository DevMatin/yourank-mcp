import { BaseModule } from '../base.module.js';
import * as MerchantTools from './tools/index.js';

export class MerchantApiModule extends BaseModule {
  getTools() {
    // Erstelle Instanzen aller verfügbaren Merchant Tools
    const tools = [
      // Allgemeine Merchant Tools (Batch 1)
      new MerchantTools.MerchantIdListTool(this.dataForSEOClient),
      new MerchantTools.MerchantErrorsTool(this.dataForSEOClient),
      new MerchantTools.MerchantTasksReadyTool(this.dataForSEOClient),
      
      // Google Shopping Tools (Batch 2)
      new MerchantTools.MerchantGoogleLanguagesTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleLocationsTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleLocationsCountryTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductsTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductsTasksReadyTool(this.dataForSEOClient),
      
      // Google Shopping Tools (Batch 3)
      new MerchantTools.MerchantGoogleProductsTaskGetAdvancedTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductsTaskGetHtmlTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleSellersTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleSellersTasksReadyTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleSellersTaskGetAdvancedTool(this.dataForSEOClient),
      
      // Google Shopping Tools (Batch 4)
      new MerchantTools.MerchantGoogleSellersTaskGetHtmlTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleSellersAdUrlTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductSpecTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductSpecTasksReadyTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductSpecTaskGetAdvancedTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductSpecTaskGetHtmlTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductInfoTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductInfoTasksReadyTool(this.dataForSEOClient),
      new MerchantTools.MerchantGoogleProductInfoTaskGetAdvancedTool(this.dataForSEOClient),
      
      // Amazon Tools (Batch 5)
      new MerchantTools.MerchantAmazonLanguagesTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonLocationsTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonLocationsCountryTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonProductsTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonProductsTasksReadyTool(this.dataForSEOClient),
      
      // Amazon Tools (Batch 6)
      new MerchantTools.MerchantAmazonProductsTaskGetAdvancedTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonProductsTaskGetHtmlTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonAsinTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonAsinTasksReadyTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonAsinTaskGetAdvancedTool(this.dataForSEOClient),
      
      // Amazon Tools (Batch 7)
      new MerchantTools.MerchantAmazonSellersTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonSellersTasksReadyTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonSellersTaskGetAdvancedTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonSellersTaskGetHtmlTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonAsinTaskGetHtmlTool(this.dataForSEOClient),
      
      // Amazon Tools (Batch 8 - FINAL!)
      new MerchantTools.MerchantAmazonReviewsTaskPostTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonReviewsTasksReadyTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonReviewsTaskGetAdvancedTool(this.dataForSEOClient),
      new MerchantTools.MerchantAmazonReviewsTaskGetHtmlTool(this.dataForSEOClient),
      
      // 🎉 ALLE 41 MERCHANT TOOLS KOMPLETT! 🎉
    ];

    return tools.reduce((acc, tool) => ({
      ...acc,
      [tool.getName()]: {
        description: tool.getDescription(),
        params: tool.getParams(),
        handler: (params) => tool.handle(params),
      },
    }), {});
  }
}
