const fs = require('fs');
const path = require('path');

// Funktion zum Korrigieren der JavaScript-Syntax
function fixJsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Spezifische Korrekturen
  content = content
    // Constructor korrigieren
    .replace(/constructor\(client}[\s\S]*?{[\s\S]*?super\(client};[\s\S]*?}/g, 'constructor(client) {\n    super(client);\n    this.client = client;\n  }')
    .replace(/constructor\(private\s+client}[\s\S]*?{[\s\S]*?super\(client};[\s\S]*?}/g, 'constructor(client) {\n    super(client);\n    this.client = client;\n  }')
    .replace(/constructor\(client\)\s*{\s*super\(client\);\s*}/g, 'constructor(client) {\n    super(client);\n    this.client = client;\n  }')
    
    // Methoden korrigieren
    .replace(/getName\(}[\s\S]*?{/g, 'getName() {')
    .replace(/getDescription\(}[\s\S]*?{/g, 'getDescription() {')
    .replace(/getParams\(}[\s\S]*?{/g, 'getParams() {')
    .replace(/async\s+handle\(params}[\s\S]*?{/g, 'async handle(params) {')
    
    // Parameter-Objekte korrigieren
    .replace(/target\s+type:\s*'string',\s*description:\s*"([^"]+)"/g, 'target: { type: "string", description: "$1" }')
    .replace(/model\s+type:\s*'string',\s*description:\s*"([^"]+)",\s*optional/g, 'model: { type: "string", description: "$1", optional: true }')
    .replace(/prompt\s+type:\s*'string',\s*description:\s*"([^"]+)",\s*optional/g, 'prompt: { type: "string", description: "$1", optional: true }')
    .replace(/max_tokens\s+type:\s*'number',\s*description:\s*"([^"]+)",\s*optional/g, 'max_tokens: { type: "number", description: "$1", optional: true }')
    .replace(/temperature\s+type:\s*'number',\s*description:\s*"([^"]+)",\s*optional/g, 'temperature: { type: "number", description: "$1", optional: true }')
    .replace(/top_p\s+type:\s*'number',\s*description:\s*"([^"]+)",\s*optional/g, 'top_p: { type: "number", description: "$1", optional: true }')
    .replace(/frequency_penalty\s+type:\s*'number',\s*description:\s*"([^"]+)",\s*optional/g, 'frequency_penalty: { type: "number", description: "$1", optional: true }')
    .replace(/presence_penalty\s+type:\s*'number',\s*description:\s*"([^"]+)",\s*optional/g, 'presence_penalty: { type: "number", description: "$1", optional: true }')
    .replace(/postback_url\s+type:\s*'string',\s*description:\s*"([^"]+)",\s*optional/g, 'postback_url: { type: "string", description: "$1", optional: true }')
    .replace(/id\s+type:\s*'string',\s*description:\s*"([^"]+)"/g, 'id: { type: "string", description: "$1" }')
    .replace(/keywords\s+type:\s*'array',\s*description:\s*"([^"]+)"/g, 'keywords: { type: "array", description: "$1" }')
    .replace(/location_code\s+type:\s*'number',\s*description:\s*"([^"]+)",\s*optional/g, 'location_code: { type: "number", description: "$1", optional: true }')
    .replace(/language_code\s+type:\s*'string',\s*description:\s*"([^"]+)",\s*optional/g, 'language_code: { type: "string", description: "$1", optional: true }')
    .replace(/search_partners\s+type:\s*'boolean',\s*description:\s*"([^"]+)",\s*optional/g, 'search_partners: { type: "boolean", description: "$1", optional: true }')
    .replace(/include_serp_info\s+type:\s*'boolean',\s*description:\s*"([^"]+)",\s*optional/g, 'include_serp_info: { type: "boolean", description: "$1", optional: true }')
    .replace(/include_subdomains\s+type:\s*'boolean',\s*description:\s*"([^"]+)",\s*optional/g, 'include_subdomains: { type: "boolean", description: "$1", optional: true }')
    
    // Weitere Korrekturen
    .replace(/target\.target/g, 'target: params.target')
    .replace(/response};/g, 'response);')
    .replace(/error};/g, 'error);')
    .replace(/\[requestData]};/g, '[requestData]);');

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
console.log('Fixing all AI Optimization JavaScript tools manually...');
processDirectory(toolsDir);
console.log('All JavaScript tools fixed successfully!');
