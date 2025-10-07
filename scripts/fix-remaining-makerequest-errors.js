import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Alle betroffenen Bing Tools
const filesToFix = [
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-audience-estimation.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keyword-performance-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keyword-performance.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-keywords-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-keywords.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-site-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-keywords-for-site.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-history-task-post.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-history.tool.ts',
  '../src/core/modules/keywords-data/tools/bing/bing-search-volume-task-post.tool.ts',
];

filesToFix.forEach(filePath => {
  try {
    const fullPath = path.join(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix makeRequest calls that are missing the method parameter
    // Pattern: makeRequest('/endpoint', requestData) -> makeRequest('/endpoint', 'POST', requestData)
    content = content.replace(
      /return await this\.client\.makeRequest\(`([^`]+)`, ([^)]+)\);/g,
      'return await this.client.makeRequest(\'$1\', \'POST\', $2);'
    );
    
    content = content.replace(
      /return await this\.client\.makeRequest\('([^']+)', ([^)]+)\);/g,
      'return await this.client.makeRequest(\'$1\', \'POST\', $2);'
    );
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed makeRequest: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎯 All makeRequest errors fixed!');
