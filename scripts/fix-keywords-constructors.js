import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Alle Keywords Data Tool-Dateien
const filesToFix = [
  // Google Ads Tools
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-search-volume.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-status.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-locations.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-languages.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-site.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-keywords.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-ad-traffic-by-keywords.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-search-volume-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-search-volume-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-search-volume-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-site-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-site-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-site-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-keywords-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-keywords-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-keywords-for-keywords-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-ad-traffic-by-keywords-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-ad-traffic-by-keywords-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/google-ads/google-ads-ad-traffic-by-keywords-task-get.tool.ts',

  // Bing Tools
  '../src/core/modules/keywords-data/tools/bing/bing-locations.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-languages.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-site.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-site-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-site-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-site-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-keywords.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-keywords-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-keywords-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-keywords-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keyword-performance-locations-and-languages.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keyword-performance.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keyword-performance-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keyword-performance-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keyword-performance-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-history-locations-and-languages.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-history.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-history-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-history-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-history-task-get.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation-job-functions.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation-industries.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation-task-get.tool.ts',

  // Google Trends Tools
  '../src/core/modules/keywords-data/tools/google-trends/google-trends-categories.tool.ts',
  '../src/core/modules/keywords-data/tools/google-trends/google-trends-explore.tool.ts',
  '../src/core/modules/keywords-data/tools/google-trends/google-trends-locations.tool.ts',
  '../src/core/modules/keywords-data/tools/google-trends/google-trends-languages.tool.ts',
  '../src/core/modules/keywords-data/tools/google-trends/google-trends-explore-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/google-trends/google-trends-explore-tasks-ready.tool.ts',
  '../src/core/modules/keywords-data/tools/google-trends/google-trends-explore-task-get.tool.ts',

  // Clickstream Tools
  '../src/core/modules/keywords-data/tools/clickstream/clickstream-data-locations-and-languages.tool.ts',
  '../src/core/modules/keywords-data/tools/clickstream/clickstream-data-dataforseo-search-volume-live.tool.ts',
  '../src/core/modules/keywords-data/tools/clickstream/clickstream-data-global-search-volume-live.tool.ts',
  '../src/core/modules/keywords-data/tools/clickstream/clickstream-data-bulk-search-volume-live.tool.ts',
];

filesToFix.forEach(filePath => {
  try {
    const fullPath = path.join(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix constructor parameter name and super call
    content = content.replace(
      /constructor\(dataForSEOClient: any\)\s*{\s*super\(dataForSEOClient\);\s*this\.client = dataForSEOClient;\s*}/g,
      'constructor(private client: DataForSEOClient) {\n    super(client);\n  }'
    );
    
    // Fix constructor with DataForSEOClient type
    content = content.replace(
      /constructor\(dataForSEOClient: DataForSEOClient\)\s*{\s*super\(dataForSEOClient\);\s*}/g,
      'constructor(private client: DataForSEOClient) {\n    super(client);\n  }'
    );
    
    // Fix property usage - replace this.dataForSEOClient with this.client
    content = content.replace(/this\.dataForSEOClient\./g, 'this.client.');
    
    // Add DataForSEOClient import if not present
    if (content.includes('DataForSEOClient') && !content.includes('import { DataForSEOClient }')) {
      content = content.replace(
        /import { BaseTool } from.*?;/,
        'import { BaseTool } from \'../../../base.tool.js\';\nimport { DataForSEOClient } from \'../../../../client/dataforseo.client.js\';'
      );
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎯 Keywords Data API constructor patterns fixed!');
