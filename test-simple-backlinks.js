#!/usr/bin/env node

console.log('🔗 Test: Backlinks API Tools...\n');

async function testBacklinksTools() {
  try {
    // Verwende die build-Ordner-Imports
    const { ModuleLoaderService } = await import('./build/core/utils/module-loader.js');
    const { DataForSEOClient } = await import('./build/core/client/dataforseo.client.js');
    const { EnabledModulesSchema } = await import('./build/core/config/modules.config.js');
    
    console.log('✅ Module erfolgreich importiert');
    
    // Erstelle DataForSEO Client
    const config = {
      username: process.env.DATAFORSEO_USERNAME || 'test',
      password: process.env.DATAFORSEO_PASSWORD || 'test'
    };
    
    const client = new DataForSEOClient(config);
    console.log('✅ DataForSEO Client erstellt');
    
    // Lade Backlinks Module
    const enabledModules = EnabledModulesSchema.parse('BACKLINKS');
    const modules = ModuleLoaderService.loadModules(client, enabledModules);
    
    console.log(`✅ ${modules.length} Module geladen`);
    
    // Finde Backlinks Module
    const backlinksModule = modules.find(module => 
      module.constructor.name === 'BacklinksApiModule'
    );
    
    if (!backlinksModule) {
      console.log('❌ BacklinksApiModule nicht gefunden');
      return false;
    }
    
    console.log('✅ BacklinksApiModule gefunden');
    
    // Hole alle Tools
    const tools = backlinksModule.getTools();
    const toolNames = Object.keys(tools);
    
    console.log(`✅ ${toolNames.length} Backlinks Tools verfügbar`);
    
    // Überprüfe wichtige Tools für die Analyse
    const analysisTools = [
      'backlinks_summary',
      'backlinks_anchors',
      'backlinks_bulk_backlinks', 
      'backlinks_competitors'
    ];
    
    console.log('\n🔍 Analysiere benötigte Tools:');
    
    let foundAnalysisTools = 0;
    for (const toolName of analysisTools) {
      if (tools[toolName]) {
        console.log(`   ✅ ${toolName}: OK`);
        foundAnalysisTools++;
        
        // Zeige Tool-Details
        const tool = tools[toolName];
        console.log(`      📄 ${tool.description.substring(0, 80)}...`);
        console.log(`      🔧 Parameter: ${Object.keys(tool.params).join(', ')}`);
      } else {
        console.log(`   ❌ ${toolName}: FEHLT`);
      }
    }
    
    console.log(`\n📊 Analyseergebnis: ${foundAnalysisTools}/${analysisTools.length} Tools verfügbar`);
    
    // Teste ein Tool exemplarisch (ohne API-Call)
    if (tools['backlinks_summary']) {
      console.log('\n🧪 Test: backlinks_summary Tool-Struktur');
      const summaryTool = tools['backlinks_summary'];
      
      console.log('   ✅ Tool ist verfügbar');
      console.log('   ✅ Handler-Funktion vorhanden:', typeof summaryTool.handler === 'function');
      console.log('   ✅ Parameter definiert:', Object.keys(summaryTool.params).length > 0);
    }
    
    return foundAnalysisTools === analysisTools.length;
    
  } catch (error) {
    console.log('❌ Test fehlgeschlagen:', error.message);
    return false;
  }
}

// Führe Test aus
testBacklinksTools().then(success => {
  if (success) {
    console.log('\n🎉 Backlinks-Tools sind bereit für die Analyse!');
    console.log('   Die Domain Analytics API kann verwendet werden.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Problem mit Backlinks-Tools gefunden.');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Test-Ausführung fehlgeschlagen:', error);
  process.exit(1);
});
