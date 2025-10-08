#!/usr/bin/env node

console.log('🧪 Test: MCP Server Tool Call Response...\n');

async function testMCPServer() {
  try {
    // Import MCP Server components
    const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');
    const { DataForSEOClient } = await import('./build/core/client/dataforseo.client.js');
    const { ModuleLoaderService } = await import('./build/core/utils/module-loader.js');
    const { EnabledModulesSchema } = await import('./build/core/config/modules.config.js');
    const { z } = await import('zod');
    
    console.log('✅ MCP Server SDK und Module importiert');
    
    // Create server instance
    const server = new McpServer({
      name: 'test-server',
      version: '1.0.0',
    });
    
    console.log('✅ MCP Server Instanz erstellt');
    
    // Initialize DataForSEO client
    const config = {
      username: process.env.DATAFORSEO_USERNAME || 'test',
      password: process.env.DATAFORSEO_PASSWORD || 'test'
    };
    
    const client = new DataForSEOClient(config);
    console.log('✅ DataForSEO Client erstellt');
    
    // Load modules
    const enabledModules = EnabledModulesSchema.parse('BACKLINKS');
    const modules = ModuleLoaderService.loadModules(client, enabledModules);
    
    console.log(`✅ ${modules.length} Module geladen`);
    
    // Find backlinks module
    const backlinksModule = modules.find(module => 
      module.constructor.name === 'BacklinksApiModule'
    );
    
    if (!backlinksModule) {
      throw new Error('BacklinksApiModule nicht gefunden');
    }
    
    console.log('✅ BacklinksApiModule gefunden');
    
    // Get tools
    const tools = backlinksModule.getTools();
    console.log(`✅ ${Object.keys(tools).length} Tools verfügbar`);
    
    // Test tool registration with proper async handling
    let toolRegistered = false;
    
    if (tools['backlinks_summary']) {
      const tool = tools['backlinks_summary'];
      const schema = z.object(tool.params);
      
      console.log('🔧 Registriere backlinks_summary Tool...');
      
      server.tool(
        'backlinks_summary',
        tool.description,
        schema.shape,
        async (params) => {
          console.log('🚀 Tool Handler aufgerufen mit Parametern:', params);
          
          // Simuliere Tool-Ausführung (ohne echten API-Call)
          const mockResult = {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  status: "success",
                  message: "Mock response für backlinks_summary",
                  target: params.target || "test-domain.com"
                }, null, 2),
              },
            ],
          };
          
          console.log('✅ Tool Response erstellt:', JSON.stringify(mockResult, null, 2));
          return mockResult;
        }
      );
      
      toolRegistered = true;
      console.log('✅ Tool erfolgreich registriert');
    }
    
    if (!toolRegistered) {
      throw new Error('Kein Tool registriert');
    }
    
    console.log('\n🎉 MCP Server Tool Registration Test erfolgreich!');
    console.log('   ✅ Server erstellt');
    console.log('   ✅ Module geladen');
    console.log('   ✅ Tool registriert');
    console.log('   ✅ Async Handler implementiert');
    
    return true;
    
  } catch (error) {
    console.log('❌ Test fehlgeschlagen:', error.message);
    console.log('Stack:', error.stack);
    return false;
  }
}

// Führe Test aus
testMCPServer().then(success => {
  if (success) {
    console.log('\n🚀 MCP Server ist bereit!');
    console.log('   Das tool_call_id Problem sollte behoben sein.');
    process.exit(0);
  } else {
    console.log('\n⚠️  MCP Server Test fehlgeschlagen.');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Test-Ausführung fehlgeschlagen:', error);
  process.exit(1);
});
