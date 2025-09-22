const fs = require('fs');
const path = require('path');

// Funktion zum Korrigieren der JavaScript-Syntax
function fixJsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // TypeScript-spezifische Syntax entfernen
  content = content
    .replace(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]([^'"]+)['"];?/g, 'import { $1 } from "$2";')
    .replace(/:\s*([A-Za-z<>\[\]{}|]+)/g, '') // Typen entfernen
    .replace(/private\s+client:\s*DataForSEOClient/g, 'client')
    .replace(/constructor\(private\s+client:\s*DataForSEOClient\)/g, 'constructor(client)')
    .replace(/constructor\(private\s+client}[\s\S]*?{[\s\S]*?super\(client};[\s\S]*?}/g, 'constructor(client) {\n    super(client);\n    this.client = client;\n  }')
    .replace(/constructor\(client\)\s*{\s*super\(client\);\s*}/g, 'constructor(client) {\n    super(client);\n    this.client = client;\n  }')
    .replace(/:\s*Promise<[^>]+>/g, '') // Promise-Typen entfernen
    .replace(/:\s*any/g, '') // any-Typen entfernen
    .replace(/:\s*z\.ZodRawShape/g, '') // ZodRawShape entfernen
    .replace(/\.ZodRawShape/g, '')
    
    // Zod-Syntax zu JavaScript-Objekt konvertieren
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
    .replace(/async\s+handle\(params:\s*any\):\s*Promise<[^>]+>\s*{/g, 'async handle(params) {')
    
    // Spezifische Korrekturen
    .replace(/\.string\(/g, '{ type: "string", description: ')
    .replace(/\.number\(/g, '{ type: "number", description: ')
    .replace(/\.boolean\(/g, '{ type: "boolean", description: ')
    .replace(/\.array\([^)]+\)/g, '{ type: "array", description: ')
    .replace(/\.optional\(\)/g, ', optional: true')
    .replace(/\.describe\(/g, ', description: ')
    .replace(/getParams\(\):\s*{/g, 'getParams() {')
    .replace(/getName\(\):\s*string\s*{/g, 'getName() {')
    .replace(/getDescription\(\):\s*string\s*{/g, 'getDescription() {')
    .replace(/async\s+handle\(params:\s*any\):\s*Promise<[^>]+>\s*{/g, 'async handle(params) {')
    
    // Weitere Korrekturen
    .replace(/params\.([a-zA-Z_]+)}/g, 'params.$1)')
    .replace(/requestData\.([a-zA-Z_]+)}/g, 'requestData.$1)')
    .replace(/response};/g, 'response);')
    .replace(/error};/g, 'error);');

  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${filePath}`);
}

// Alle JavaScript-Dateien finden und korrigieren
const aiOptimizationDir = path.join(__dirname, '../src/core/modules/ai-optimization');
const toolsDir = path.join(aiOptimizationDir, 'tools');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.js')) {
      fixJsFile(filePath);
    }
  });
}

// Starte die Korrektur
console.log('Fixing all AI Optimization JavaScript tools...');
processDirectory(toolsDir);
console.log('All JavaScript tools fixed successfully!');
