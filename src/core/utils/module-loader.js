import { SerpApiModule } from '../modules/serp/serp-api.module.ts';
import { KeywordsDataApiModule } from '../modules/keywords-data/keywords-data-api.module.js';
import { OnPageApiModule } from '../modules/onpage/onpage-api.module.js';
import { DataForSEOLabsApi } from '../modules/dataforseo-labs/dataforseo-labs-api.module.js';
import { BacklinksApiModule } from '../modules/backlinks/backlinks-api.module.js';
import { BusinessDataApiModule } from '../modules/business-data-api/business-data-api.module.js';
import { DomainAnalyticsApiModule } from '../modules/domain-analytics/domain-analytics-api.module.js';
import { isModuleEnabled } from '../config/modules.config.js';
import { ContentAnalysisApiModule } from '../modules/content-analysis/content-analysis-api.module.js';
import { ContentGenerationApiModule } from '../modules/content-generation/content-generation-api.module.js';
import { MerchantApiModule } from '../modules/merchant/merchant-api.module.js';
import { GoogleShoppingApiModule } from '../modules/google-shopping/google-shopping-api.module.js';
import { AiOptimizationApiModule } from '../modules/ai-optimization/ai-optimization-api.module.js';

export class ModuleLoaderService {
    static loadModules(dataForSEOClient, enabledModules) {
        const modules = [];
        
        // Always load SERP API Module
        try {
            modules.push(new SerpApiModule(dataForSEOClient));
            console.log('✅ SERP API Module loaded successfully');
        } catch (error) {
            console.log('❌ SERP API Module error:', error.message);
        }
        
        // OnPage Module (immer verfügbar)
        if (isModuleEnabled('ONPAGE', enabledModules)) {
            modules.push(new OnPageApiModule(dataForSEOClient));
        }
        
        // Content Analysis Module (neu implementiert)
        if (isModuleEnabled('CONTENT_ANALYSIS', enabledModules)) {
            try {
                const contentAnalysisModule = new ContentAnalysisApiModule(dataForSEOClient);
                modules.push(contentAnalysisModule);
                console.log('✅ Content Analysis Module loaded successfully');
            } catch (error) {
                console.log('❌ Content Analysis Module error:', error.message);
            }
        }
        
        // Andere Module (nur wenn verfügbar)
        if (isModuleEnabled('KEYWORDS_DATA', enabledModules)) {
            try {
                modules.push(new KeywordsDataApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ Keywords Data Module not available');
            }
        }
        if (isModuleEnabled('DATAFORSEO_LABS', enabledModules)) {
            try {
                modules.push(new DataForSEOLabsApi(dataForSEOClient));
            } catch (error) {
                console.log('❌ DataForSEO Labs Module not available');
            }
        }
        if (isModuleEnabled('BACKLINKS', enabledModules)) {
            try {
                modules.push(new BacklinksApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ Backlinks Module not available');
            }
        }
        if (isModuleEnabled('BUSINESS_DATA', enabledModules)) {
            try {
                modules.push(new BusinessDataApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ Business Data Module not available');
            }
        }
        if (isModuleEnabled('DOMAIN_ANALYTICS', enabledModules)) {
            try {
                modules.push(new DomainAnalyticsApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ Domain Analytics Module not available');
            }
        }
        if (isModuleEnabled('CONTENT_GENERATION', enabledModules)) {
            try {
                modules.push(new ContentGenerationApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ Content Generation Module not available');
            }
        }
        if (isModuleEnabled('MERCHANT', enabledModules)) {
            try {
                modules.push(new MerchantApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ Merchant Module not available');
            }
        }
        if (isModuleEnabled('GOOGLE_SHOPPING', enabledModules)) {
            try {
                modules.push(new GoogleShoppingApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ Google Shopping Module not available');
            }
        }
        if (isModuleEnabled('AI_OPTIMIZATION', enabledModules)) {
            try {
                modules.push(new AiOptimizationApiModule(dataForSEOClient));
            } catch (error) {
                console.log('❌ AI Optimization Module not available');
            }
        }
        
        return modules;
    }
}
