#!/usr/bin/env node

// Script zur automatischen Generierung aller OnPage Tools
import fs from 'fs';
import path from 'path';

const TOOLS_DIR = 'src/core/modules/onpage/tools';
const LIGHTHOUSE_DIR = 'src/core/modules/onpage/tools/lighthouse';

// OnPage Tools Konfiguration
const ONPAGE_TOOLS = [
  {
    name: 'PageScreenshotTool',
    endpoint: '/v3/on_page/page_screenshot',
    description: 'Capture a full high-quality screenshot of any webpage',
    params: {
      url: 'string',
      enable_javascript: 'boolean?',
      custom_js: 'string?',
      custom_user_agent: 'string?',
      accept_language: 'string?',
      viewport_width: 'number?',
      viewport_height: 'number?'
    }
  },
  {
    name: 'RawHtmlTool',
    endpoint: '/v3/on_page/raw_html',
    description: 'Returns the HTML of a page you indicate in the request',
    params: {
      url: 'string',
      enable_javascript: 'boolean?',
      custom_js: 'string?',
      custom_user_agent: 'string?',
      accept_language: 'string?'
    }
  },
  {
    name: 'MicrodataTool',
    endpoint: '/v3/on_page/microdata',
    description: 'Validate structured JSON-LD data and Microdata',
    params: {
      url: 'string',
      enable_javascript: 'boolean?',
      custom_js: 'string?',
      custom_user_agent: 'string?',
      accept_language: 'string?'
    }
  },
  {
    name: 'KeywordDensityTool',
    endpoint: '/v3/on_page/keyword_density',
    description: 'Keyword density and keyword frequency data for terms',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'WaterfallTool',
    endpoint: '/v3/on_page/waterfall',
    description: 'Page speed insights and loading time details',
    params: {
      url: 'string',
      enable_javascript: 'boolean?',
      custom_js: 'string?',
      custom_user_agent: 'string?',
      accept_language: 'string?'
    }
  },
  {
    name: 'NonIndexableTool',
    endpoint: '/v3/on_page/non_indexable',
    description: 'Pages blocked from being indexed by search engines',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'RedirectChainsTool',
    endpoint: '/v3/on_page/redirect_chains',
    description: 'Redirect chains and redirect loops',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'DuplicateContentTool',
    endpoint: '/v3/on_page/duplicate_content',
    description: 'Pages with similar content to specified page',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'DuplicateTagsTool',
    endpoint: '/v3/on_page/duplicate_tags',
    description: 'Pages with duplicate title or description tags',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'ResourcesTool',
    endpoint: '/v3/on_page/resources',
    description: 'List of resources including images, scripts, stylesheets',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'PagesByResourceTool',
    endpoint: '/v3/on_page/pages_by_resource',
    description: 'Pages where a specific resource is located',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'PagesTool',
    endpoint: '/v3/on_page/pages',
    description: 'List of crawled pages with on-page check-ups',
    params: {
      id: 'string',
      limit: 'number?',
      offset: 'number?',
      filters: 'array?',
      order_by: 'array?'
    }
  },
  {
    name: 'SummaryTool',
    endpoint: '/v3/on_page/summary/{id}',
    description: 'Overall information on a website and on-page issues',
    params: {
      id: 'string'
    }
  },
  {
    name: 'TaskPostTool',
    endpoint: '/v3/on_page/task_post',
    description: 'Create OnPage analysis tasks',
    params: {
      target: 'string',
      enable_javascript: 'boolean?',
      custom_js: 'string?',
      custom_user_agent: 'string?',
      accept_language: 'string?',
      enable_browser_rendering: 'boolean?',
      load_resources: 'boolean?',
      custom_settings: 'object?'
    }
  },
  {
    name: 'TasksReadyTool',
    endpoint: '/v3/on_page/tasks_ready',
    description: 'List of completed tasks',
    params: {}
  },
  {
    name: 'ForceStopTool',
    endpoint: '/v3/on_page/force_stop',
    description: 'Force stop the crawl process of websites',
    params: {
      id: 'string'
    }
  },
  {
    name: 'IdListTool',
    endpoint: '/v3/on_page/id_list',
    description: 'List of IDs and metadata of completed OnPage tasks',
    params: {
      limit: 'number?',
      offset: 'number?',
      date_from: 'string?',
      date_to: 'string?'
    }
  },
  {
    name: 'ErrorsTool',
    endpoint: '/v3/on_page/errors',
    description: 'OnPage API tasks that returned an error',
    params: {
      limit: 'number?',
      offset: 'number?'
    }
  },
  {
    name: 'AvailableFiltersTool',
    endpoint: '/v3/on_page/available_filters',
    description: 'Available filters and thresholds for OnPage API',
    params: {}
  }
];

// Lighthouse Tools
const LIGHTHOUSE_TOOLS = [
  {
    name: 'LighthouseLanguagesTool',
    endpoint: '/v3/on_page/lighthouse/languages',
    description: 'List of supported languages for Lighthouse',
    params: {}
  },
  {
    name: 'LighthouseAuditsTool',
    endpoint: '/v3/on_page/lighthouse/audits',
    description: 'Available Lighthouse audits',
    params: {}
  },
  {
    name: 'LighthouseVersionsTool',
    endpoint: '/v3/on_page/lighthouse/versions',
    description: 'Lighthouse versions',
    params: {}
  },
  {
    name: 'LighthouseTaskPostTool',
    endpoint: '/v3/on_page/lighthouse/task_post',
    description: 'Create Lighthouse analysis tasks',
    params: {
      target: 'string',
      language_code: 'string?',
      category: 'array?',
      version: 'string?'
    }
  },
  {
    name: 'LighthouseTasksReadyTool',
    endpoint: '/v3/on_page/lighthouse/tasks_ready',
    description: 'List of completed Lighthouse tasks',
    params: {}
  },
  {
    name: 'LighthouseTaskGetTool',
    endpoint: '/v3/on_page/lighthouse/task_get/json/{id}',
    description: 'Get Lighthouse task results',
    params: {
      id: 'string'
    }
  },
  {
    name: 'LighthouseLiveTool',
    endpoint: '/v3/on_page/lighthouse/live/json',
    description: 'Live Lighthouse analysis',
    params: {
      target: 'string',
      language_code: 'string?',
      category: 'array?',
      version: 'string?'
    }
  }
];

function generateToolFile(tool, isLighthouse = false) {
  const toolName = tool.name;
  const endpoint = tool.endpoint;
  const description = tool.description;
  const params = tool.params;

  // Korrekte Import-Pfade basierend auf Verzeichnis
  const clientImport = isLighthouse ? '../../../client/dataforseo.client.js' : '../../../client/dataforseo.client.js';
  const baseToolImport = isLighthouse ? '../../base.tool.js' : '../../base.tool.js';

  const paramTypes = Object.entries(params).map(([key, type]) => {
    const isOptional = type.endsWith('?');
    const cleanType = type.replace('?', '');
    const zodType = cleanType === 'string' ? 'z.string()' : 
                   cleanType === 'number' ? 'z.number()' : 
                   cleanType === 'boolean' ? 'z.boolean()' : 
                   cleanType === 'array' ? 'z.array(z.any())' : 
                   cleanType === 'object' ? 'z.object({})' : 'z.string()';
    
    return `${key}: ${zodType}${isOptional ? '.optional()' : ''}.describe("${key}")`;
  }).join(',\n      ');

  const paramInterface = Object.entries(params).map(([key, type]) => {
    const isOptional = type.endsWith('?');
    const cleanType = type.replace('?', '');
    const tsType = cleanType === 'string' ? 'string' : 
                  cleanType === 'number' ? 'number' : 
                  cleanType === 'boolean' ? 'boolean' : 
                  cleanType === 'array' ? 'any[]' : 
                  cleanType === 'object' ? 'any' : 'string';
    
    return `${key}${isOptional ? '?' : ''}: ${tsType}`;
  }).join('; ');

  const requestData = Object.keys(params).map(key => {
    const isOptional = params[key].endsWith('?');
    if (isOptional) {
      return `if (params.${key} !== undefined) requestData.${key} = params.${key};`;
    } else {
      return `requestData.${key} = params.${key};`;
    }
  }).join('\n      ');

  const template = `import { z } from 'zod';
import { DataForSEOClient } from '${clientImport}';
import { BaseTool } from '${baseToolImport}';

export class ${toolName} extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return '${toolName.replace('Tool', '').toLowerCase()}';
  }

  getDescription(): string {
    return "${description}";
  }

  getParams(): z.ZodRawShape {
    return {
      ${paramTypes}
    };
  }

  async handle(params: { ${paramInterface} }): Promise<any> {
    try {
      const requestData: any = {};
      ${requestData}

      const response = await this.dataForSEOClient.makeRequest('${endpoint}', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}`;

  return template;
}

// Erstelle Verzeichnisse
if (!fs.existsSync(LIGHTHOUSE_DIR)) {
  fs.mkdirSync(LIGHTHOUSE_DIR, { recursive: true });
}

// Generiere OnPage Tools
ONPAGE_TOOLS.forEach(tool => {
  const fileName = `${tool.name.replace('Tool', '').toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}.tool.ts`;
  const filePath = path.join(TOOLS_DIR, fileName);
  
  if (!fs.existsSync(filePath)) {
    const content = generateToolFile(tool);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated: ${fileName}`);
  } else {
    console.log(`⏭️  Skipped: ${fileName} (already exists)`);
  }
});

// Generiere Lighthouse Tools
LIGHTHOUSE_TOOLS.forEach(tool => {
  const fileName = `${tool.name.replace('Tool', '').toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}.tool.ts`;
  const filePath = path.join(LIGHTHOUSE_DIR, fileName);
  
  if (!fs.existsSync(filePath)) {
    const content = generateToolFile(tool, true);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated: ${fileName}`);
  } else {
    console.log(`⏭️  Skipped: ${fileName} (already exists)`);
  }
});

console.log('\n🎉 All OnPage tools generated successfully!'); 