const fs = require('fs');
const path = require('path');

function convertJsToTs(jsFilePath) {
  const tsFilePath = jsFilePath.replace('.js', '.ts');
  
  if (fs.existsSync(tsFilePath)) {
    console.log(`Skipping ${jsFilePath} - .ts file already exists`);
    return;
  }
  
  let content = fs.readFileSync(jsFilePath, 'utf8');
  
  // Add TypeScript imports and types
  content = content.replace(
    /import { BaseTool } from '([^']+)';/,
    "import { BaseTool } from '$1';\nimport { DataForSEOClient } from '../../../../client/dataforseo.client.js';"
  );
  
  // Add type annotations
  content = content.replace(
    /constructor\(dataForSEOClient\)/,
    'constructor(dataForSEOClient: DataForSEOClient)'
  );
  
  content = content.replace(
    /getName\(\)/,
    'getName(): string'
  );
  
  content = content.replace(
    /getDescription\(\)/,
    'getDescription(): string'
  );
  
  content = content.replace(
    /getParams\(\)/,
    'getParams(): any'
  );
  
  content = content.replace(
    /async handle\(params\)/,
    'async handle(params: any): Promise<any>'
  );
  
  fs.writeFileSync(tsFilePath, content);
  console.log(`Created ${tsFilePath}`);
}

// Find all .js files in keywords-data/tools (except index.js)
const keywordsDataPath = 'src/core/modules/keywords-data/tools';
const jsFiles = [];

function findJsFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findJsFiles(fullPath);
    } else if (file.endsWith('.js') && file !== 'index.js') {
      jsFiles.push(fullPath);
    }
  }
}

findJsFiles(keywordsDataPath);

console.log(`Found ${jsFiles.length} .js files to convert`);

for (const jsFile of jsFiles) {
  convertJsToTs(jsFile);
}

console.log('Conversion complete!');
