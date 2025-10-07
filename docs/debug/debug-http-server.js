#!/usr/bin/env node

// Debug-Skript für HTTP-Server Module-Loading
import { ModuleLoaderService } from '../../src/core/utils/module-loader.js';
import { DataForSEOClient } from '../../src/core/client/dataforseo.client.js';

// Mock DataForSEO Client
class MockDataForSEOClient {
  async makeRequest(endpoint, method, data) {
    return { status: 'success', data: { endpoint, method, data } };
  }
}

async function debugHttpServerModules() {
  console.log('🔍 Debugging HTTP Server Module Loading...\n');

  const mockClient = new MockDataForSEOClient();
  
  // Teste verschiedene Konfigurationen
  const testConfigs = [
    {
      name: 'Default Config (all modules)',
      enabledModules: ['SERP', 'KEYWORDS_DATA', 'ONPAGE', 'DATAFORSEO_LABS', 'BACKLINKS', 'BUSINESS_DATA', 'DOMAIN_ANALYTICS', 'CONTENT_ANALYSIS', 'CONTENT_GENERATION', 'MERCHANT', 'GOOGLE_SHOPPING']
    },
    {
      name: 'Only OnPage and Content Analysis',
      enabledModules: ['ONPAGE', 'CONTENT_ANALYSIS']
    },
    {
      name: 'Only OnPage',
      enabledModules: ['ONPAGE']
    }
  ];

  for (const config of testConfigs) {
    console.log(`\n📋 Testing: ${config.name}`);
    console.log(`📊 Enabled Modules: ${config.enabledModules.join(', ')}`);
    
    try {
      const modules = ModuleLoaderService.loadModules(mockClient, config.enabledModules);
      
      console.log(`✅ Loaded ${modules.length} modules:`);
      modules.forEach((module, index) => {
        console.log(`  ${index + 1}. ${module.constructor.name}`);
        
        // Teste Tools in jedem Modul
        try {
          const tools = module.getTools();
          const toolNames = Object.keys(tools);
          console.log(`    📊 Found ${toolNames.length} tools`);
          
          // Zeige erste paar Tools
          toolNames.slice(0, 3).forEach((toolName, toolIndex) => {
            console.log(`      ${toolIndex + 1}. ${toolName}`);
          });
          
          if (toolNames.length > 3) {
            console.log(`      ... and ${toolNames.length - 3} more`);
          }
        } catch (error) {
          console.log(`    ❌ Error loading tools: ${error.message}`);
        }
      });

      // Teste Content Analysis Module speziell
      const contentAnalysisModule = modules.find(module => module.constructor.name === 'ContentAnalysisApiModule');
      if (contentAnalysisModule) {
        console.log(`\n🎯 Content Analysis Module found!`);
        const tools = contentAnalysisModule.getTools();
        const toolNames = Object.keys(tools);
        console.log(`📊 Content Analysis Tools: ${toolNames.length}`);
        toolNames.forEach((toolName, index) => {
          console.log(`  ${index + 1}. ${toolName}`);
        });
      } else {
        console.log(`\n❌ Content Analysis Module NOT found!`);
      }

    } catch (error) {
      console.log(`❌ Error loading modules: ${error.message}`);
    }
  }
}

// Hauptfunktion
async function main() {
  console.log('🚀 HTTP Server Module Debug Tool');
  console.log('================================\n');

  await debugHttpServerModules();
}

// Script ausführen
main().catch(console.error);
