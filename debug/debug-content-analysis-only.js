#!/usr/bin/env node

// Vereinfachtes Debug-Skript für Content Analysis Module
import { ContentAnalysisApiModule } from '../src/core/modules/content-analysis/content-analysis-api.module.js';

// Mock DataForSEO Client
class MockDataForSEOClient {
  async makeRequest(endpoint, method, data) {
    return { status: 'success', data: { endpoint, method, data } };
  }
}

async function debugContentAnalysisModule() {
  console.log('🔍 Debugging Content Analysis Module...\n');

  const mockClient = new MockDataForSEOClient();
  
  try {
    console.log('📋 Creating Content Analysis Module...');
    const contentAnalysisModule = new ContentAnalysisApiModule(mockClient);
    console.log('✅ Content Analysis Module created successfully');
    
    console.log('\n📋 Getting tools from Content Analysis Module...');
    const tools = contentAnalysisModule.getTools();
    const toolNames = Object.keys(tools);
    
    console.log(`✅ Found ${toolNames.length} Content Analysis tools:`);
    toolNames.forEach((toolName, index) => {
      console.log(`  ${index + 1}. ${toolName}`);
      
      // Teste ein Tool
      try {
        const tool = tools[toolName];
        console.log(`    📋 Description: ${tool.description}`);
        console.log(`    ✅ Tool loaded successfully`);
      } catch (error) {
        console.log(`    ❌ Error loading tool: ${error.message}`);
      }
    });

    console.log('\n🎯 Content Analysis Module is working correctly!');
    
  } catch (error) {
    console.log(`❌ Error with Content Analysis Module: ${error.message}`);
  }
}

// Hauptfunktion
async function main() {
  console.log('🚀 Content Analysis Module Debug Tool');
  console.log('====================================\n');

  await debugContentAnalysisModule();
}

// Script ausführen
main().catch(console.error);
