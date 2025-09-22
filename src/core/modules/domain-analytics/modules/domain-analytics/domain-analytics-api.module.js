import { BaseModule } from '../base.module.js';
import * as DomainAnalyticsTools from './tools/index.js';
export class DomainAnalyticsApiModule extends BaseModule {
    getTools() {
        // Erstelle Instanzen aller verfügbaren Domain Analytics Tools
        const tools = [
            // General Tools
            new DomainAnalyticsTools.DomainAnalyticsIdListTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsErrorsTool(this.dataForSEOClient),
            // Technologies Tools
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesAvailableFiltersTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesLocationsTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesLanguagesTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesTechnologiesTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesAggregationTechnologiesLiveTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesTechnologiesSummaryLiveTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesTechnologyStatsLiveTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesDomainsByTechnologyLiveTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesDomainsByHtmlTermsLiveTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsTechnologiesDomainTechnologiesLiveTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainTechnologiesTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainTechnologiesFiltersTool(this.dataForSEOClient),
            // WHOIS Tools
            new DomainAnalyticsTools.WhoisOverviewTool(this.dataForSEOClient),
            new DomainAnalyticsTools.WhoisFiltersTool(this.dataForSEOClient),
            new DomainAnalyticsTools.DomainAnalyticsWhoisAvailableFiltersTool(this.dataForSEOClient),
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
