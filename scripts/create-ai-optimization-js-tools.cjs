const fs = require('fs');
const path = require('path');

// Funktion zum Konvertieren von TypeScript zu JavaScript
function convertTsToJs(tsContent, className) {
  // TypeScript-spezifische Syntax entfernen
  let jsContent = tsContent
    .replace(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]([^'"]+)['"];?/g, 'import { $1 } from "$2";')
    .replace(/:\s*([A-Za-z<>\[\]{}|]+)/g, '') // Typen entfernen
    .replace(/private\s+client:\s*DataForSEOClient/g, 'client')
    .replace(/constructor\(private\s+client:\s*DataForSEOClient\)/g, 'constructor(client)')
    .replace(/constructor\(client\)\s*{\s*super\(client\);\s*}/g, 'constructor(client) {\n    super(client);\n    this.client = client;\n  }')
    .replace(/:\s*Promise<[^>]+>/g, '') // Promise-Typen entfernen
    .replace(/:\s*any/g, '') // any-Typen entfernen
    .replace(/:\s*z\.ZodRawShape/g, '') // ZodRawShape entfernen
    .replace(/z\.string\(\)\.describe\(/g, '{ type: "string", description: ')
    .replace(/z\.number\(\)\.describe\(/g, '{ type: "number", description: ')
    .replace(/z\.boolean\(\)\.describe\(/g, '{ type: "boolean", description: ')
    .replace(/z\.array\([^)]+\)\.describe\(/g, '{ type: "array", description: ')
    .replace(/z\.string\(\)\.optional\(\)\.describe\(/g, '{ type: "string", description: ')
    .replace(/z\.number\(\)\.optional\(\)\.describe\(/g, '{ type: "number", description: ')
    .replace(/z\.boolean\(\)\.optional\(\)\.describe\(/g, '{ type: "boolean", description: ')
    .replace(/z\.array\([^)]+\)\.optional\(\)\.describe\(/g, '{ type: "array", description: ')
    .replace(/\)\.optional\(\)/g, ', optional: true')
    .replace(/\)\.describe\(/g, ', description: ')
    .replace(/\)/g, '}')
    .replace(/z\.ZodRawShape\s*=\s*{/g, 'return {')
    .replace(/getParams\(\):\s*z\.ZodRawShape\s*{/g, 'getParams() {')
    .replace(/getName\(\):\s*string\s*{/g, 'getName() {')
    .replace(/getDescription\(\):\s*string\s*{/g, 'getDescription() {')
    .replace(/async\s+handle\(params:\s*any\):\s*Promise<[^>]+>\s*{/g, 'async handle(params) {');

  return jsContent;
}

// Alle TypeScript-Dateien finden und konvertieren
const aiOptimizationDir = path.join(__dirname, '../src/core/modules/ai-optimization');
const toolsDir = path.join(aiOptimizationDir, 'tools');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      const jsFilePath = filePath.replace('.ts', '.js');
      
      if (!fs.existsSync(jsFilePath)) {
        const tsContent = fs.readFileSync(filePath, 'utf8');
        const className = file.replace('.tool.ts', '').replace('.module.ts', '');
        const jsContent = convertTsToJs(tsContent, className);
        
        fs.writeFileSync(jsFilePath, jsContent);
        console.log(`Created: ${jsFilePath}`);
      }
    }
  });
}

// Starte die Konvertierung
console.log('Creating JavaScript versions of AI Optimization tools...');
processDirectory(toolsDir);
console.log('JavaScript tools created successfully!');
