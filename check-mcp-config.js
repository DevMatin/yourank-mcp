#!/usr/bin/env node

console.log('🔍 MCP Server Konfiguration Check...\n');

// Check verschiedene MCP Client Konfigurationsdateien
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const possibleConfigPaths = [
  // Claude Desktop Konfiguration  
  path.join(process.env.HOME || '', 'Library/Application Support/Claude/claude_desktop_config.json'),
  path.join(process.env.HOME || '', '.config/claude/claude_desktop_config.json'),
  
  // Cline/Cursor Konfiguration
  path.join(process.env.HOME || '', '.vscode/settings.json'),
  path.join(process.env.HOME || '', '.cursor/settings.json'),
  
  // Andere MCP Client Configs
  path.join(process.env.HOME || '', '.mcp/config.json'),
  path.join(process.cwd(), 'mcp_config.json'),
  path.join(process.cwd(), '.mcp.json')
];

console.log('📋 Suche MCP Konfigurationsdateien...\n');

let foundConfigs = 0;

possibleConfigPaths.forEach((configPath, index) => {
  try {
    if (fs.existsSync(configPath)) {
      console.log(`✅ ${index + 1}. Gefunden: ${configPath}`);
      foundConfigs++;
      
      try {
        const content = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(content);
        
        // Suche nach DataForSEO MCP Server Konfiguration
        const searchForDataforSEO = (obj, depth = 0) => {
          if (depth > 10) return; // Prevent infinite recursion
          
          if (typeof obj === 'object' && obj !== null) {
            for (const [key, value] of Object.entries(obj)) {
              if (typeof value === 'string' && (
                value.includes('dataforseo') || 
                value.includes('mcp-server-typescript') ||
                value.includes('build/main') ||
              )) {
                console.log(`   🎯 DataForSEO MCP gefunden:`);
                console.log(`      Key: ${key}`);
                console.log(`      Value: ${value}`);
                console.log(`      🔍 Server Type: ${value.includes('serp-') ? 'SERP-spezifisch ❌' : 'Standard ✅'}`);
                console.log('');
              }
              
              if (typeof value === 'object') {
                searchForDataforSEO(value, depth + 1);
              }
            }
          }
        };
        
        searchForDataforSEO(config);
        
      } catch (parseError) {
        console.log(`   ⚠️ Kann Datei nicht parsen: ${parseError.message}`);
      }
      
      console.log('');
    }
  } catch (error) {
    // Ignore file access errors
  }
});

if (foundConfigs === 0) {
  console.log('❌ Keine MCP Konfigurationsdateien gefunden');
  console.log('\n💡 Mögliche Gründe:');
  console.log('   • MCP Client ist nicht installiert');
  console.log('   • Konfiguration ist an einem anderen Ort');
  console.log('   • Verwendung über andere Methode (z.B. direkter Server-Start)');
} else {
  console.log(`📊 Zusammenfassung: ${foundConfigs} Konfigurationsdatei(en) gefunden`);
}

console.log('\n🔧 Server-Status Befehle:');
console.log('   Standard Server:    npm run start');
console.log('   HTTP Server:        npm run http');  

console.log('\n✅ Empfehlung: Verwende IMMER den Standard Server (npm run start)');
