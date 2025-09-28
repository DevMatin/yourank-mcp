import { BaseModule, ToolDefinition } from '../base.module.js';
import { BusinessDataGoogleApiModule } from '../business-data-google-api/business-data-google-api.module.js';
import { BusinessDataReviewsApiModule } from '../business-data-reviews-api/business-data-reviews-api.module.js';
import { BusinessDataListingsApiModule } from '../business-data-listings-api/business-data-listings-api.module.js';

export class BusinessDataApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    // Kombiniere alle gruppierten Business Data Module
    const googleModule = new BusinessDataGoogleApiModule(this.dataForSEOClient);
    const reviewsModule = new BusinessDataReviewsApiModule(this.dataForSEOClient);
    const listingsModule = new BusinessDataListingsApiModule(this.dataForSEOClient);
    
    const googleTools = googleModule.getTools();
    const reviewsTools = reviewsModule.getTools();
    const listingsTools = listingsModule.getTools();
    
    return {
      ...googleTools,
      ...reviewsTools,
      ...listingsTools,
    };
  }
} 