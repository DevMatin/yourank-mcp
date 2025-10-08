#!/usr/bin/env node

// Script to generate missing Keywords Data API tools
const fs = require('fs');
const path = require('path');

// Define all missing tools with their configurations
const missingTools = [
  // Bing Audience Estimation Tools
  {
    name: 'BingAudienceEstimationTaskPostTool',
    fileName: 'bing-audience-estimation-task-post.tool.ts',
    endpoint: '/v3/keywords_data/bing/audience_estimation/task_post',
    method: 'POST',
    description: 'Post a task to get audience estimation data from Bing Ads.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      job_function_id: { type: 'number' },
      industry_id: { type: 'number' }
    },
    required: ['keywords']
  },
  {
    name: 'BingAudienceEstimationTasksReadyTool',
    fileName: 'bing-audience-estimation-tasks-ready.tool.ts',
    endpoint: '/v3/keywords_data/bing/audience_estimation/tasks_ready',
    method: 'GET',
    description: 'Get list of completed Bing audience estimation tasks that are ready for retrieval.',
    params: {},
    required: []
  },
  {
    name: 'BingAudienceEstimationTaskGetTool',
    fileName: 'bing-audience-estimation-task-get.tool.ts',
    endpoint: '/v3/keywords_data/bing/audience_estimation/task_get',
    method: 'GET',
    description: 'Get results of a completed Bing audience estimation task.',
    params: {
      id: { type: 'string', description: 'Task ID to retrieve results for' }
    },
    required: ['id']
  },
  {
    name: 'BingAudienceEstimationLiveTool',
    fileName: 'bing-audience-estimation-live.tool.ts',
    endpoint: '/v3/keywords_data/bing/audience_estimation/live',
    method: 'POST',
    description: 'Get audience estimation data from Bing Ads in real-time.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      job_function_id: { type: 'number' },
      industry_id: { type: 'number' }
    },
    required: ['keywords']
  },
  
  // Bing Keywords for Site Tools
  {
    name: 'BingKeywordsForSiteTaskPostTool',
    fileName: 'bing-keywords-for-site-task-post.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_site/task_post',
    method: 'POST',
    description: 'Post a task to get keywords for a specific site from Bing Ads.',
    params: {
      site: { type: 'string', description: 'Website URL to analyze' },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['site']
  },
  {
    name: 'BingKeywordsForSiteTasksReadyTool',
    fileName: 'bing-keywords-for-site-tasks-ready.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_site/tasks_ready',
    method: 'GET',
    description: 'Get list of completed Bing keywords for site tasks that are ready for retrieval.',
    params: {},
    required: []
  },
  {
    name: 'BingKeywordsForSiteTaskGetTool',
    fileName: 'bing-keywords-for-site-task-get.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_site/task_get',
    method: 'GET',
    description: 'Get results of a completed Bing keywords for site task.',
    params: {
      id: { type: 'string', description: 'Task ID to retrieve results for' }
    },
    required: ['id']
  },
  {
    name: 'BingKeywordsForSiteLiveTool',
    fileName: 'bing-keywords-for-site-live.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_site/live',
    method: 'POST',
    description: 'Get keywords for a specific site from Bing Ads in real-time.',
    params: {
      site: { type: 'string', description: 'Website URL to analyze' },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['site']
  },
  
  // Bing Keywords for Keywords Tools
  {
    name: 'BingKeywordsForKeywordsTaskPostTool',
    fileName: 'bing-keywords-for-keywords-task-post.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_keywords/task_post',
    method: 'POST',
    description: 'Post a task to get related keywords from Bing Ads.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 200 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['keywords']
  },
  {
    name: 'BingKeywordsForKeywordsTasksReadyTool',
    fileName: 'bing-keywords-for-keywords-tasks-ready.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_keywords/tasks_ready',
    method: 'GET',
    description: 'Get list of completed Bing keywords for keywords tasks that are ready for retrieval.',
    params: {},
    required: []
  },
  {
    name: 'BingKeywordsForKeywordsTaskGetTool',
    fileName: 'bing-keywords-for-keywords-task-get.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_keywords/task_get',
    method: 'GET',
    description: 'Get results of a completed Bing keywords for keywords task.',
    params: {
      id: { type: 'string', description: 'Task ID to retrieve results for' }
    },
    required: ['id']
  },
  {
    name: 'BingKeywordsForKeywordsLiveTool',
    fileName: 'bing-keywords-for-keywords-live.tool.ts',
    endpoint: '/v3/keywords_data/bing/keywords_for_keywords/live',
    method: 'POST',
    description: 'Get related keywords from Bing Ads in real-time.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 200 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['keywords']
  },
  
  // Bing Keyword Performance Tools
  {
    name: 'BingKeywordPerformanceLocationsAndLanguagesTool',
    fileName: 'bing-keyword-performance-locations-and-languages.tool.ts',
    endpoint: '/v3/keywords_data/bing/keyword_performance/locations_and_languages',
    method: 'GET',
    description: 'Get list of locations and languages supported by Bing Keyword Performance endpoints.',
    params: {},
    required: []
  },
  {
    name: 'BingKeywordPerformanceTaskPostTool',
    fileName: 'bing-keyword-performance-task-post.tool.ts',
    endpoint: '/v3/keywords_data/bing/keyword_performance/task_post',
    method: 'POST',
    description: 'Post a task to get keyword performance data from Bing Ads.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['keywords']
  },
  {
    name: 'BingKeywordPerformanceTasksReadyTool',
    fileName: 'bing-keyword-performance-tasks-ready.tool.ts',
    endpoint: '/v3/keywords_data/bing/keyword_performance/tasks_ready',
    method: 'GET',
    description: 'Get list of completed Bing keyword performance tasks that are ready for retrieval.',
    params: {},
    required: []
  },
  {
    name: 'BingKeywordPerformanceTaskGetTool',
    fileName: 'bing-keyword-performance-task-get.tool.ts',
    endpoint: '/v3/keywords_data/bing/keyword_performance/task_get',
    method: 'GET',
    description: 'Get results of a completed Bing keyword performance task.',
    params: {
      id: { type: 'string', description: 'Task ID to retrieve results for' }
    },
    required: ['id']
  },
  {
    name: 'BingKeywordPerformanceLiveTool',
    fileName: 'bing-keyword-performance-live.tool.ts',
    endpoint: '/v3/keywords_data/bing/keyword_performance/live',
    method: 'POST',
    description: 'Get keyword performance data from Bing Ads in real-time.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['keywords']
  },
  
  // Bing Search Volume History Tools
  {
    name: 'BingSearchVolumeHistoryLocationsAndLanguagesTool',
    fileName: 'bing-search-volume-history-locations-and-languages.tool.ts',
    endpoint: '/v3/keywords_data/bing/search_volume_history/locations_and_languages',
    method: 'GET',
    description: 'Get list of locations and languages supported by Bing Search Volume History endpoints.',
    params: {},
    required: []
  },
  {
    name: 'BingSearchVolumeHistoryTaskPostTool',
    fileName: 'bing-search-volume-history-task-post.tool.ts',
    endpoint: '/v3/keywords_data/bing/search_volume_history/task_post',
    method: 'POST',
    description: 'Post a task to get historical search volume data from Bing Ads.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' },
      date_from: { type: 'string', default: '2024-01-01' },
      date_to: { type: 'string', default: '2024-12-31' }
    },
    required: ['keywords']
  },
  {
    name: 'BingSearchVolumeHistoryTasksReadyTool',
    fileName: 'bing-search-volume-history-tasks-ready.tool.ts',
    endpoint: '/v3/keywords_data/bing/search_volume_history/tasks_ready',
    method: 'GET',
    description: 'Get list of completed Bing search volume history tasks that are ready for retrieval.',
    params: {},
    required: []
  },
  {
    name: 'BingSearchVolumeHistoryTaskGetTool',
    fileName: 'bing-search-volume-history-task-get.tool.ts',
    endpoint: '/v3/keywords_data/bing/search_volume_history/task_get',
    method: 'GET',
    description: 'Get results of a completed Bing search volume history task.',
    params: {
      id: { type: 'string', description: 'Task ID to retrieve results for' }
    },
    required: ['id']
  },
  {
    name: 'BingSearchVolumeHistoryLiveTool',
    fileName: 'bing-search-volume-history-live.tool.ts',
    endpoint: '/v3/keywords_data/bing/search_volume_history/live',
    method: 'POST',
    description: 'Get historical search volume data from Bing Ads in real-time.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' },
      date_from: { type: 'string', default: '2024-01-01' },
      date_to: { type: 'string', default: '2024-12-31' }
    },
    required: ['keywords']
  },
  
  // Clickstream Data Tools
  {
    name: 'ClickstreamDataGlobalSearchVolumeLiveTool',
    fileName: 'clickstream-data-global-search-volume-live.tool.ts',
    endpoint: '/v3/keywords_data/clickstream_data/global_search_volume/live',
    method: 'POST',
    description: 'Get global clickstream-based search volume data for keywords.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['keywords']
  },
  {
    name: 'ClickstreamDataBulkSearchVolumeLiveTool',
    fileName: 'clickstream-data-bulk-search-volume-live.tool.ts',
    endpoint: '/v3/keywords_data/clickstream_data/bulk_search_volume/live',
    method: 'POST',
    description: 'Get bulk clickstream-based search volume data with historical values.',
    params: {
      keywords: { type: 'array', items: { type: 'string' }, maxItems: 1000 },
      location_name: { type: 'string', default: 'United States' },
      language_code: { type: 'string', default: 'en' },
      device: { type: 'string', enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' }
    },
    required: ['keywords']
  }
];

// Function to generate tool content
function generateToolContent(tool) {
  const toolName = tool.name;
  const endpoint = tool.endpoint;
  const method = tool.method;
  const description = tool.description;
  const params = tool.params;
  const required = tool.required;

  let paramsSchema = '';
  if (Object.keys(params).length > 0) {
    paramsSchema = `{
      type: 'object',
      properties: {
        ${Object.entries(params).map(([key, value]) => {
          if (typeof value === 'object' && value.type) {
            let paramDef = `'${key}': {`;
            paramDef += `type: '${value.type}'`;
            if (value.items) {
              paramDef += `, items: { type: '${value.items.type}' }`;
            }
            if (value.maxItems) {
              paramDef += `, maxItems: ${value.maxItems}`;
            }
            if (value.enum) {
              paramDef += `, enum: [${value.enum.map(e => `'${e}'`).join(', ')}]`;
            }
            if (value.default) {
              paramDef += `, default: '${value.default}'`;
            }
            if (value.description) {
              paramDef += `, description: '${value.description}'`;
            }
            paramDef += '}';
            return paramDef;
          }
          return `'${key}': ${JSON.stringify(value)}`;
        }).join(',\n        ')}
      },
      required: [${required.map(r => `'${r}'`).join(', ')}]
    }`;
  } else {
    paramsSchema = `{
      type: 'object',
      properties: {}
    }`;
  }

  let handleMethod = '';
  if (method === 'GET') {
    if (endpoint.includes('{id}')) {
      handleMethod = `return await this.dataForSEOClient.get(\`${endpoint}/\${params.id}\`);`;
    } else {
      handleMethod = `return await this.dataForSEOClient.get('${endpoint}');`;
    }
  } else if (method === 'POST') {
    let requestData = '';
    if (Object.keys(params).length > 0) {
      const requestFields = Object.keys(params).map(key => {
        if (key === 'keywords') {
          return `keywords: params.keywords`;
        } else if (params[key].default) {
          return `${key}: params.${key} || '${params[key].default}'`;
        } else {
          return `${key}: params.${key}`;
        }
      }).join(',\n      ');
      requestData = `const requestData = [{
      ${requestFields}
    }];`;
    } else {
      requestData = `const requestData = [{}];`;
    }
    handleMethod = `${requestData}

    return await this.dataForSEOClient.post('${endpoint}', requestData);`;
  }

  return `import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../dataforseo-client.js';

export class ${toolName} extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
  }

  getName(): string {
    return '${toolName.toLowerCase().replace(/tool$/, '').replace(/([A-Z])/g, '_$1').toLowerCase().substring(1)}';
  }

  getDescription(): string {
    return '${description}';
  }

  getParams(): any {
    return ${paramsSchema};
  }

  async handle(params: any): Promise<any> {
    ${handleMethod}
  }
}`;
}

// Generate all missing tools
missingTools.forEach(tool => {
  const toolContent = generateToolContent(tool);
  const toolPath = path.join(__dirname, 'src/core/modules/keywords-data/tools', tool.fileName.replace('.ts', '.ts'));
  
  // Determine directory based on tool type
  let dir = '';
  if (tool.fileName.includes('bing-')) {
    dir = 'bing';
  } else if (tool.fileName.includes('clickstream-')) {
    dir = 'clickstream';
  }
  
  const fullPath = path.join(__dirname, 'src/core/modules/keywords-data/tools', dir, tool.fileName);
  
  // Create directory if it doesn't exist
  const dirPath = path.dirname(fullPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Write the tool file
  fs.writeFileSync(fullPath, toolContent);
  console.log(`Generated: ${fullPath}`);
});

console.log(`Generated ${missingTools.length} missing Keywords Data API tools!`);
