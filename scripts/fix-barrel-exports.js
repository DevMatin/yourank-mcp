import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Alle barrel export Dateien
const filesToFix = [
  '../src/core/modules/keywords-data/tools/index.ts',
  '../src/core/modules/keywords-data/tools/google-ads/index.ts',
  '../src/core/modules/keywords-data/tools/bing/index.ts',
  '../src/core/modules/keywords-data/tools/google-trends/index.ts',
  '../src/core/modules/keywords-data/tools/clickstream/index.ts',
  '../src/core/modules/keywords-data/tools/dataforseo-trends/index.ts',
];

filesToFix.forEach(filePath => {
  try {
    const fullPath = path.join(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace all .ts extensions with .js in import statements
    content = content.replace(/\.tool\.ts'/g, '.tool.js\'');
    content = content.replace(/\.tool\.ts";/g, '.tool.js";');
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed barrel exports: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎯 All barrel exports fixed!');
