import { BaseModule } from '../base.module.js';
import { ContentParsingTool } from './tools/content-parsing.tool.js';
import { InstantPagesTool } from './tools/instant-pages.tool.js';
import { PageScreenshotTool } from './tools/pagescreenshot.tool.js';
import { RawHtmlTool } from './tools/rawhtml.tool.js';
import { MicrodataTool } from './tools/microdata.tool.js';
import { KeywordDensityTool } from './tools/keyworddensity.tool.js';
import { WaterfallTool } from './tools/waterfall.tool.js';
import { NonIndexableTool } from './tools/nonindexable.tool.js';
import { RedirectChainsTool } from './tools/redirectchains.tool.js';
import { LinksTool } from './tools/links.tool.js';
import { DuplicateContentTool } from './tools/duplicatecontent.tool.js';
import { DuplicateTagsTool } from './tools/duplicatetags.tool.js';
import { ResourcesTool } from './tools/resources.tool.js';
import { PagesByResourceTool } from './tools/pagesbyresource.tool.js';
import { PagesTool } from './tools/pages.tool.js';
import { SummaryTool } from './tools/summary.tool.js';
import { TaskPostTool } from './tools/taskpost.tool.js';
import { TasksReadyTool } from './tools/tasksready.tool.js';
import { ForceStopTool } from './tools/forcestop.tool.js';
import { IdListTool } from './tools/idlist.tool.js';
import { ErrorsTool } from './tools/errors.tool.js';
import { AvailableFiltersTool } from './tools/availablefilters.tool.js';
import { LighthouseLanguagesTool } from './tools/lighthouse/lighthouselanguages.tool.js';
import { LighthouseAuditsTool } from './tools/lighthouse/lighthouseaudits.tool.js';
import { LighthouseVersionsTool } from './tools/lighthouse/lighthouseversions.tool.js';
import { LighthouseTaskPostTool } from './tools/lighthouse/lighthousetaskpost.tool.js';
import { LighthouseTasksReadyTool } from './tools/lighthouse/lighthousetasksready.tool.js';
import { LighthouseTaskGetTool } from './tools/lighthouse/lighthousetaskget.tool.js';
import { LighthouseLiveTool } from './tools/lighthouse/lighthouselive.tool.js';
import { ContentParsingLiveTool } from './tools/content-parsing-live.tool.js';

export class OnPageApiModule extends BaseModule {
    getTools() {
        const tools = [
            new ContentParsingTool(this.dataForSEOClient),
            new InstantPagesTool(this.dataForSEOClient),
            new PageScreenshotTool(this.dataForSEOClient),
            new RawHtmlTool(this.dataForSEOClient),
            new MicrodataTool(this.dataForSEOClient),
            new KeywordDensityTool(this.dataForSEOClient),
            new WaterfallTool(this.dataForSEOClient),
            new NonIndexableTool(this.dataForSEOClient),
            new RedirectChainsTool(this.dataForSEOClient),
            new LinksTool(this.dataForSEOClient),
            new DuplicateContentTool(this.dataForSEOClient),
            new DuplicateTagsTool(this.dataForSEOClient),
            new ResourcesTool(this.dataForSEOClient),
            new PagesByResourceTool(this.dataForSEOClient),
            new PagesTool(this.dataForSEOClient),
            new SummaryTool(this.dataForSEOClient),
            new TaskPostTool(this.dataForSEOClient),
            new TasksReadyTool(this.dataForSEOClient),
            new ForceStopTool(this.dataForSEOClient),
            new IdListTool(this.dataForSEOClient),
            new ErrorsTool(this.dataForSEOClient),
            new AvailableFiltersTool(this.dataForSEOClient),
            new LighthouseLanguagesTool(this.dataForSEOClient),
            new LighthouseAuditsTool(this.dataForSEOClient),
            new LighthouseVersionsTool(this.dataForSEOClient),
            new LighthouseTaskPostTool(this.dataForSEOClient),
            new LighthouseTasksReadyTool(this.dataForSEOClient),
            new LighthouseTaskGetTool(this.dataForSEOClient),
            new LighthouseLiveTool(this.dataForSEOClient),
            new ContentParsingLiveTool(this.dataForSEOClient),
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
