import { DataForSEOClient } from '../client/dataforseo.client.js';
import { SerpApiModule } from '../modules/serp/serp-api.module.js';
import { AiOptimizationApiModule } from '../modules/ai-optimization/ai-optimization-api-module.js';
import { KeywordsDataApiModule } from '../modules/keywords-data/keywords-data-api.module.js';
import { OnPageApiModule } from '../modules/onpage/onpage-api.module.js';
import { DataForSEOLabsApi } from '../modules/dataforseo-labs/dataforseo-labs-api.module.js';
import { BacklinksApiModule } from '../modules/backlinks/backlinks-api.module.js';
import { BusinessDataApiModule } from '../modules/business-data-api/business-data-api.module.js';
import { DomainAnalyticsApiModule } from '../modules/domain-analytics/domain-analytics-api.module.js';
import { BaseModule } from '../modules/base.module.js';
import { EnabledModules, isModuleEnabled } from '../config/modules.config.js';
import { ContentAnalysisApiModule } from '../modules/content-analysis/content-analysis-api.module.js';

// Eigene Module
import { ContentGenerationApiModule } from '../modules/content-generation/content-generation-api.module.js';
import { MerchantApiModule } from '../modules/merchant/merchant-api.module.js';
import { GoogleShoppingApiModule } from '../modules/google-shopping/google-shopping-api.module.js';
import { AppDataModule } from '../modules/app-data/app-data.module.js';
import { GoogleBusinessApiModule } from '../modules/google-business-api/google-business-api.module.js';
import { TrustpilotApiModule } from '../modules/trustpilot-api/trustpilot-api.module.js';
import { TripadvisorApiModule } from '../modules/tripadvisor-api/tripadvisor-api.module.js';
import { SocialMediaApiModule } from '../modules/social-media-api/social-media-api.module.js';

export class ModuleLoaderService {
  static loadModules(dataForSEOClient: DataForSEOClient, enabledModules: EnabledModules): BaseModule[] {
    const modules: BaseModule[] = [];

    // Update-Module
    if (isModuleEnabled('AI_OPTIMIZATION', enabledModules)) {
      modules.push(new AiOptimizationApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('SERP', enabledModules)) {
      modules.push(new SerpApiModule(dataForSEOClient));
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
    if (isModuleEnabled('BUSINESS_DATA', enabledModules)) {
      modules.push(new BusinessDataApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('DOMAIN_ANALYTICS', enabledModules)) {
      modules.push(new DomainAnalyticsApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('CONTENT_ANALYSIS', enabledModules)) {
      modules.push(new ContentAnalysisApiModule(dataForSEOClient));
    }

    // Eigene Module beibehalten
    if (isModuleEnabled('CONTENT_GENERATION', enabledModules)) {
      modules.push(new ContentGenerationApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('MERCHANT', enabledModules)) {
      modules.push(new MerchantApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('GOOGLE_SHOPPING', enabledModules)) {
      modules.push(new GoogleShoppingApiModule(dataForSEOClient));
    }
    if (isModuleEnabled('APP_DATA', enabledModules)) {
      modules.push(new AppDataModule(dataForSEOClient));
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
    if (isModuleEnabled('SOCIAL_MEDIA', enabledModules)) {
      modules.push(new SocialMediaApiModule(dataForSEOClient));
    }

    return modules;
  }
}