import { DataForSEOClient } from '../client/dataforseo.client';
import { SerpApiModule } from '../modules/serp/serp-api.module.js';
import { KeywordsDataApiModule } from '../modules/keywords-data/keywords-data-api.module.js';
import { OnPageApiModule } from '../modules/onpage/onpage-api.module.js';
import { DataForSEOLabsApi } from '../modules/dataforseo-labs/dataforseo-labs-api.module.js';
import { BacklinksApiModule } from '../modules/backlinks/backlinks-api.module.js';
// Removed: TrustpilotApiModule and TripadvisorApiModule - modules don't exist
// Removed: BusinessUtilitiesApiModule - module doesn't exist
import { DomainAnalyticsApiModule } from '../modules/domain-analytics/domain-analytics-api.module.js';
import { BaseModule } from '../modules/base.module';
import { EnabledModules, isModuleEnabled } from '../config/modules.config';
import { ContentAnalysisApiModule } from '../modules/content-analysis/content-analysis-api.module.js';
import { ContentGenerationApiModule } from '../modules/content-generation/content-generation-api.module.js';
import { MerchantApiModule } from '../modules/merchant/merchant-api.module.js';
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
    // Removed: GOOGLE_BUSINESS module - functionality moved to business-data-api
    // Removed: TRUSTPILOT and TRIPADVISOR modules - they don't exist
    // Removed: GOOGLE_MAPS module - functionality moved to business-data-api
    // Removed: SOCIAL_MEDIA module - functionality moved to business-data-api
    // Removed: BUSINESS_UTILITIES module - it doesn't exist
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
    // Removed: GOOGLE_SHOPPING module - functionality moved to merchant-api
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