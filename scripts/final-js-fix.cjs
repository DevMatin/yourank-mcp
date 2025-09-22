const fs = require('fs');
const path = require('path');

// Funktion zum Korrigieren der JavaScript-Syntax
function fixJsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Spezifische Korrekturen
  content = content
    // Klammern korrigieren
    .replace(/\);(\s*})/g, ';$1')
    .replace(/\);(\s*};)/g, ';$1')
    .replace(/\);(\s*\))/g, ';$1')
    .replace(/\);(\s*$)/g, ';')
    
    // Parameter-Objekte korrigieren
    .replace(/}\s*\);(\s*})/g, '};$1')
    .replace(/}\s*\);(\s*};)/g, '};$1')
    
    // Weitere Korrekturen
    .replace(/target\.target/g, 'target: params.target')
    .replace(/params\.([a-zA-Z_]+)\)/g, 'params.$1)')
    .replace(/requestData\.([a-zA-Z_]+)\)/g, 'requestData.$1)');

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
console.log('Final fix of all AI Optimization JavaScript tools...');
processDirectory(toolsDir);
console.log('All JavaScript tools fixed successfully!');
