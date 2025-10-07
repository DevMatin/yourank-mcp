#!/usr/bin/env node

// Debug-Skript für Server-Module
const BASE_URL = 'https://yourank-mcp.vercel.app';

async function debugServerModules() {
  console.log('🔍 Debugging Server Modules...\n');

  // Teste verschiedene Tool-Namen, um zu sehen, welche verfügbar sind
  const testTools = [
    // OnPage Tools (sollten verfügbar sein)
    'on_page_instant_pages',
    'on_page_content_parsing',
    
    // Content Analysis Tools (neu implementiert)
    'content_analysis_search',
    'content_analysis_available_filters',
    'content_analysis_locations',
    
    // Andere mögliche Tools
    'serp_google_organic_live',
    'keywords_data_google_ads_keywords_for_keywords'
  ];

  for (const toolName of testTools) {
    const requestBody = {
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: toolName,
        arguments: {}
      },
      id: 1
    };

    try {
      const response = await fetch(`${BASE_URL}/http`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      
      if (result.error && result.error.code === -32601) {
        console.log(`❌ ${toolName} - NOT FOUND`);
      } else if (result.error) {
        console.log(`⚠️  ${toolName} - ERROR: ${result.error.message}`);
      } else {
        console.log(`✅ ${toolName} - AVAILABLE`);
      }
    } catch (error) {
      console.log(`❌ ${toolName} - NETWORK ERROR: ${error.message}`);
    }
  }

  console.log('\n📊 Debug Summary:');
  console.log('- OnPage Tools sollten verfügbar sein');
  console.log('- Content Analysis Tools sollten jetzt verfügbar sein');
  console.log('- Wenn Content Analysis Tools nicht verfügbar sind, gibt es ein Build/Deployment-Problem');
}

// Hauptfunktion
async function main() {
  console.log('🚀 Server Module Debug Tool');
  console.log('===========================\n');

  await debugServerModules();
}

// Script ausführen
main().catch(console.error);
