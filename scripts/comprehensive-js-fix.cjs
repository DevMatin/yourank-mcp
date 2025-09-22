const fs = require('fs');
const path = require('path');

// Funktion zum Korrigieren der JavaScript-Syntax
function fixJsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Umfassende Korrekturen
  content = content
    // Imports korrigieren
    .replace(/import\s*{\s*z\s*}\s*from\s*["']zod["'];?/g, '')
    .replace(/import\s*{\s*([^}]+)\s*}\s*from\s*["']([^"']+)["'];?/g, 'import { $1 } from "$2";')
    
    // Constructor korrigieren
    .replace(/constructor\(client\)\s*{\s*super\(client\);\s*this\.client\s*=\s*client;\s*}/g, 'constructor(client) {\n    super(client);\n    this.client = client;\n  }')
    
    // Parameter-Objekte korrigieren
    .replace(/([a-zA-Z_]+)\{\s*type:\s*["']([^"']+)["'],\s*description:\s*,\s*description:\s*["']([^"']+)["']\}/g, '$1: { type: "$2", description: "$3" }')
    .replace(/([a-zA-Z_]+)\{\s*type:\s*["']([^"']+)["'],\s*description:\s*["']([^"']+)["'],\s*optional\s*:\s*true\s*}/g, '$1: { type: "$2", description: "$3", optional: true }')
    .replace(/([a-zA-Z_]+)\{\s*type:\s*["']([^"']+)["'],\s*description:\s*["']([^"']+)["']\}/g, '$1: { type: "$2", description: "$3" }')
    
    // Klammern korrigieren
    .replace(/\);(\s*})/g, ';$1')
    .replace(/\);(\s*};)/g, ';$1')
    .replace(/\);(\s*\))/g, ';$1')
    .replace(/\);(\s*$)/g, ';')
    .replace(/error};/g, 'error);')
    .replace(/response};/g, 'response);')
    .replace(/\[requestData]};/g, '[requestData]);')
    
    // Weitere Korrekturen
    .replace(/target\.target/g, 'target: params.target')
    .replace(/params\.([a-zA-Z_]+)\)/g, 'params.$1)')
    .replace(/requestData\.([a-zA-Z_]+)\)/g, 'requestData.$1)')
    .replace(/return \{;/g, 'return {};')
    .replace(/return \{\);/g, 'return {};');

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
console.log('Comprehensive fix of all AI Optimization JavaScript tools...');
processDirectory(toolsDir);
console.log('All JavaScript tools fixed successfully!');
