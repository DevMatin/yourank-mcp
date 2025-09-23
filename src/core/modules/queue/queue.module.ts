import { BaseModule, ToolDefinition } from '../base.module.js';
import { DataForSEOClient } from '../../client/dataforseo.client.js';

// Import queue-specific tools
import { QueueJobCreateTool } from './tools/queue-job-create.tool.js';
import { QueueJobStatusTool } from './tools/queue-job-status.tool.js';
import { QueueJobListTool } from './tools/queue-job-list.tool.js';
import { QueueStatsToolTool } from './tools/queue-stats.tool.js';

export class QueueModule extends BaseModule {
  getModuleName(): string {
    return 'queue';
  }

  getTools(): Record<string, ToolDefinition> {
    const tools: Record<string, ToolDefinition> = {};
    
    // Create tools with DataForSEO client
    const queueJobCreateTool = new QueueJobCreateTool(this.dataForSEOClient);
    const queueJobStatusTool = new QueueJobStatusTool(this.dataForSEOClient);
    const queueJobListTool = new QueueJobListTool(this.dataForSEOClient);
    const queueStatsToolTool = new QueueStatsToolTool(this.dataForSEOClient);

    // Map tools to the required format
    tools[queueJobCreateTool.getName()] = {
      description: queueJobCreateTool.getDescription(),
      params: queueJobCreateTool.getParams(),
      handler: queueJobCreateTool.handle.bind(queueJobCreateTool)
    };

    tools[queueJobStatusTool.getName()] = {
      description: queueJobStatusTool.getDescription(),
      params: queueJobStatusTool.getParams(),
      handler: queueJobStatusTool.handle.bind(queueJobStatusTool)
    };

    tools[queueJobListTool.getName()] = {
      description: queueJobListTool.getDescription(),
      params: queueJobListTool.getParams(),
      handler: queueJobListTool.handle.bind(queueJobListTool)
    };

    tools[queueStatsToolTool.getName()] = {
      description: queueStatsToolTool.getDescription(),
      params: queueStatsToolTool.getParams(),
      handler: queueStatsToolTool.handle.bind(queueStatsToolTool)
    };

    return tools;
  }
}
