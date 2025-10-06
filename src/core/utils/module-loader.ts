import { DataForSEOClient } from '../client/dataforseo.client.js';
import { SerpApiModule } from '../modules/serp/serp-api.module.ts';
import { KeywordsDataApiModule } from '../modules/keywords-data/keywords-data-api.module.js';
import { OnPageApiModule } from '../modules/onpage/onpage-api.module.js';
import { DataForSEOLabsApi } from '../modules/dataforseo-labs/dataforseo-labs-api.module.js';
import { BacklinksApiModule } from '../modules/backlinks/backlinks-api.module.js';
import { GoogleBusinessApiModule } from '../modules/google-business-api/google-business-api.module.js';
import { TrustpilotApiModule } from '../modules/trustpilot-api/trustpilot-api.module.js';
import { TripadvisorApiModule } from '../modules/tripadvisor-api/tripadvisor-api.module.js';
import { GoogleMapsApiModule } from '../modules/google-maps-api/google-maps-api.module.js';
import { SocialMediaApiModule } from '../modules/social-media-api/social-media-api.module.js';
import { BusinessUtilitiesApiModule } from '../modules/business-utilities-api/business-utilities-api.module.js';
import { DomainAnalyticsApiModule } from '../modules/domain-analytics/domain-analytics-api.module.js';
import { BaseModule } from '../modules/base.module.js';
import { EnabledModules, isModuleEnabled } from '../config/modules.config.js';
import { ContentAnalysisApiModule } from '../modules/content-analysis/content-analysis-api.module.ts';
import { ContentGenerationApiModule } from '../modules/content-generation/content-generation-api.module.ts';
import { MerchantApiModule } from '../modules/merchant/merchant-api.module.js';
import { GoogleShoppingApiModule } from '../modules/google-shopping/google-shopping-api.module.js';
import { AiOptimizationApiModule } from '../modules/ai-optimization/ai-optimization-api.module.js';
import { AppDataModule } from '../modules/app-data/app-data.module.js';
import { DatabasesApiModule } from '../modules/databases/databases-api.module.js';

export class ModuleLoaderService {
  static loadModules(dataForSEOClient: DataForSEOClient, enabledModules: EnabledModules): BaseModule[] {
    const modules: BaseModule[] = [];

    // Always load SERP API Module
    try {
      modules.push(new SerpApiModule(dataForSEOClient));
      console.error('SERP API Module loaded successfully');
    } catch (error) {
      console.error('Failed to load SERP API Module:', error);
    }

    if (isModuleEnabled('KEYWORDS_DATA', enabledModules)) {
      modules.push(new KeywordsDataApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('ONPAGE', enabledModules)) {
      modules.push(new OnPageApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('DATAFORSEO_LABS', enabledModules)) {
      modules.push(new DataForSEOLabsApi(dataForSEOClient));
    }
    if (isModuleEnabled('BACKLINKS', enabledModules)) {
      modules.push(new BacklinksApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('GOOGLE_BUSINESS', enabledModules)) {
      modules.push(new GoogleBusinessApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('TRUSTPILOT', enabledModules)) {
      modules.push(new TrustpilotApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('TRIPADVISOR', enabledModules)) {
      modules.push(new TripadvisorApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('GOOGLE_MAPS', enabledModules)) {
      modules.push(new GoogleMapsApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('SOCIAL_MEDIA', enabledModules)) {
      modules.push(new SocialMediaApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('BUSINESS_UTILITIES', enabledModules)) {
      modules.push(new BusinessUtilitiesApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('DOMAIN_ANALYTICS', enabledModules)) {
      modules.push(new DomainAnalyticsApiModule(dataForSEOClient));
    }
    // Always load Content Analysis Module
    try {
      modules.push(new ContentAnalysisApiModule(dataForSEOClient));
      console.error('Content Analysis Module loaded successfully');
    } catch (error) {
      console.error('Failed to load Content Analysis Module:', error);
    }
    if(isModuleEnabled('CONTENT_GENERATION', enabledModules)) {
      modules.push(new ContentGenerationApiModule(dataForSEOClient));
    }
    if(isModuleEnabled('MERCHANT', enabledModules)) {
      modules.push(new MerchantApiModule(dataForSEOClient));
    }
    if(isModuleEnabled('GOOGLE_SHOPPING', enabledModules)) {
      modules.push(new GoogleShoppingApiModule(dataForSEOClient));
    }
    if(isModuleEnabled('AI_OPTIMIZATION', enabledModules)) {
      modules.push(new AiOptimizationApiModule(dataForSEOClient));
    }
    if(isModuleEnabled('APP_DATA', enabledModules)) {
      modules.push(new AppDataModule(dataForSEOClient));
    }
    if(isModuleEnabled('DATABASES', enabledModules)) {
      modules.push(new DatabasesApiModule(dataForSEOClient));
    }

    return modules;
  }
}