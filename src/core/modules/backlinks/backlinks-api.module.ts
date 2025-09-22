import { DataForSEOClient } from '../../client/dataforseo.client.js';
import { BaseModule, ToolDefinition } from '../base.module.js';
import * as BacklinksTools from './tools/index.js';

export class BacklinksApiModule extends BaseModule {
  constructor(client: DataForSEOClient) {
    super(client);
  }

  getTools(): Record<string, ToolDefinition> {
    // Erstelle Instanzen aller verfügbaren Backlinks Tools
    const tools = [
      new BacklinksTools.BacklinksTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksAnchorTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksSummaryTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksHistoryTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksDomainPagesTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksDomainPagesSummaryTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksReferringDomainsTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksReferringNetworksTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksCompetitorsTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksDomainIntersectionTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksPageIntersectionTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksTimeseriesSummaryTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksTimeseriesNewLostSummaryTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksBulkBacklinksTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksBulkRanksTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksBulkSpamScoreTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksBulkReferringDomainsTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksBulkNewLostBacklinksTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksBulkNewLostReferringDomainsTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksBulkPagesSummaryTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksFiltersTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksIdListTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksErrorsTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksAvailableFiltersTool(this.dataForSEOClient),
      new BacklinksTools.BacklinksIndexTool(this.dataForSEOClient),
    ];

    return tools.reduce((acc, tool) => ({
      ...acc,
      [tool.getName()]: {
        description: tool.getDescription(),
        params: tool.getParams(),
        handler: (params: any) => tool.handle(params),
      },
    }), {});
  }
} 