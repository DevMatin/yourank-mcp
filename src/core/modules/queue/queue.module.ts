import { BaseModule } from '../base.module.js';
import { ToolDefinition } from '../base.tool.js';

// Import queue-specific tools
import { QueueJobCreateTool } from './tools/queue-job-create.tool.js';
import { QueueJobStatusTool } from './tools/queue-job-status.tool.js';
import { QueueJobListTool } from './tools/queue-job-list.tool.js';
import { QueueStatsToolTool } from './tools/queue-stats.tool.js';

export class QueueModule extends BaseModule {
  getModuleName(): string {
    return 'queue';
  }

  getTools(): ToolDefinition[] {
    return [
      new QueueJobCreateTool(),
      new QueueJobStatusTool(),
      new QueueJobListTool(),
      new QueueStatsToolTool()
    ];
  }
}
