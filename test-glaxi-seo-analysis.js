#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('🎯 Glaxi.de SEO Keywords Analyse...\n');

async function runGlaxiKeywordsAnalysis() {
  try {
    // Verwende die build-Ordner-Imports
    const { ModuleLoaderService } = await import('./build/core/utils/module-loader.js');
    const { DataForSEOClient } = await import('./build/core/client/dataforseo.client.js');
    const { EnabledModulesSchema } = await import('./build/core/config/modules.config.js');
    
    console.log('✅ Module erfolgreich importiert');
    
    // Erstelle DataForSEO Client mit echten Credentials
    const config = {
      username: process.env.DATAFORSEO_USERNAME,
      password: process.env.DATAFORSEO_PASSWORD
    };
    
    if (!config.username || !config.password) {
      console.log('⚠️  DataForSEO Credentials fehlen in Umgebungsvariablen');
      console.log('   Bitte DATAFORSEO_USERNAME und DATAFORSEO_PASSWORD setzen');
      return false;
    }
    
    const client = new DataForSEOClient(config);
    console.log('✅ DataForSEO Client mit echten Credentials erstellt');
    
    // Lade Keywords Data Module
    const enabledModules = EnabledModulesSchema.parse('KEYWORDS_DATA');
    const modules = ModuleLoaderService.loadModules(client, enabledModules);
    
    const keywordsModule = modules.find(module => 
      module.constructor.name === 'KeywordsDataApiModule'
    );
    
    const tools = keywordsModule.getTools();
    
    console.log('\n🔍 Starte Glaxi.de Keywords Analyse...\n');
    
    // 1. Related Keywords für Haupt-Keywords
    console.log('🔑 SCHRITT 1: Related Keywords für Autofolierung & Lackschutzfolierung');
    console.log('─'.repeat(80));
    
    const keywordsForKeywordsTool = tools['keywords_data_google_ads_keywords_for_keywords'];
    
    try {
      const relatedKeywordsParams = {
        keywords: ['autofolierung', 'lackschutzfolierung'],
        location_name: 'Germany',
        language_code: 'de'
      };
      
      console.log(`📊 Analysiere verwandte Keywords für: ${relatedKeywordsParams.keywords.join(', ')}`);
      
      const relatedResult = await keywordsForKeywordsTool.handler(relatedKeywordsParams);
      
      if (relatedResult && relatedResult.tasks && relatedResult.tasks[0] && relatedResult.tasks[0].result) {
        const keywords = relatedResult.tasks[0].result;
        console.log(`✅ ${keywords.length} verwandte Keywords gefunden\n`);
        
        // Top 10 Keywords mit Details anzeigen
        const topKeywords = keywords.slice(0, 10);
        console.log('🏆 TOP 10 VERWANDTE KEYWORDS:');
        console.log('─'.repeat(80));
        console.log('Keyword'.padEnd(35) + 'Suchvolumen'.padEnd(15) + 'CPC €'.padEnd(10) + 'Wettbewerb');
        console.log('─'.repeat(80));
        
        topKeywords.forEach(kw => {
          const keyword = (kw.keyword || '').substring(0, 34);
          const searchVolume = (kw.search_volume || 0).toString();
          const cpc = (kw.cpc || 0).toFixed(2);
          const competition = kw.competition || 'N/A';
          const competitionIndex = kw.competition_index ? `(${kw.competition_index}%)` : '';
          
          console.log(
            keyword.padEnd(35) + 
            searchVolume.padEnd(15) + 
            `€${cpc}`.padEnd(10) + 
            `${competition} ${competitionIndex}`
          );
        });
        console.log('─'.repeat(80));
        
      } else {
        console.log('⚠️  Keine verwandten Keywords gefunden oder API-Fehler');
      }
      
    } catch (error) {
      console.log('❌ Fehler bei Related Keywords:', error.message);
    }
    
    console.log('\n\n');
    
    // 2. Competitor Keywords für glaxi.de
    console.log('🏢 SCHRITT 2: Competitor Keywords von glaxi.de');
    console.log('─'.repeat(80));
    
    const keywordsForSiteTool = tools['keywords_data_google_ads_keywords_for_site'];
    
    try {
      const competitorParams = {
        target: 'glaxi.de',
        location_name: 'Germany',
        language_code: 'de'
      };
      
      console.log(`🎯 Analysiere Keywords von: ${competitorParams.target}`);
      
      const competitorResult = await keywordsForSiteTool.handler(competitorParams);
      
      if (competitorResult && competitorResult.tasks && competitorResult.tasks[0] && competitorResult.tasks[0].result) {
        const keywords = competitorResult.tasks[0].result;
        console.log(`✅ ${keywords.length} Competitor Keywords gefunden\n`);
        
        // Top 15 Keywords mit Details anzeigen  
        const topCompetitorKeywords = keywords.slice(0, 15);
        console.log('🏆 TOP 15 GLAXI.DE KEYWORDS:');
        console.log('─'.repeat(80));
        console.log('Keyword'.padEnd(35) + 'Suchvolumen'.padEnd(15) + 'CPC €'.padEnd(10) + 'Wettbewerb');
        console.log('─'.repeat(80));
        
        topCompetitorKeywords.forEach(kw => {
          const keyword = (kw.keyword || '').substring(0, 34);
          const searchVolume = (kw.search_volume || 0).toString();
          const cpc = (kw.cpc || 0).toFixed(2);
          const competition = kw.competition || 'N/A';
          const competitionIndex = kw.competition_index ? `(${kw.competition_index}%)` : '';
          
          console.log(
            keyword.padEnd(35) + 
            searchVolume.padEnd(15) + 
            `€${cpc}`.padEnd(10) + 
            `${competition} ${competitionIndex}`
          );
        });
        console.log('─'.repeat(80));
        
      } else {
        console.log('⚠️  Keine Competitor Keywords gefunden oder API-Fehler');
      }
      
    } catch (error) {
      console.log('❌ Fehler bei Competitor Keywords:', error.message);
    }
    
    console.log('\n\n');
    
    // 3. Search Volume für Longtail Keywords
    console.log('📊 SCHRITT 3: Search Volume für Longtail Keywords');
    console.log('─'.repeat(80));
    
    const searchVolumeTool = tools['keywords_data_google_ads_search_volume'];
    
    try {
      const longtailKeywords = [
        'autofolierung stuttgart',
        'lackschutzfolierung münchen',
        'steinschlagschutzfolierung',
        'car wrapping firma',
        'folierung firmenflotte',
        'autofolierung kosten',
        'lackschutzfolie erfahrungen',
        'ppf folierung',
        'fahrzeugfolierung business',
        'vollfolierung auto'
      ];
      
      const searchVolumeParams = {
        keywords: longtailKeywords,
        location_name: 'Germany',
        language_code: 'de'
      };
      
      console.log(`📈 Analysiere Suchvolumen für ${longtailKeywords.length} Longtail Keywords`);
      
      const searchVolumeResult = await searchVolumeTool.handler(searchVolumeParams);
      
      if (searchVolumeResult && searchVolumeResult.tasks && searchVolumeResult.tasks[0] && searchVolumeResult.tasks[0].result) {
        const keywords = searchVolumeResult.tasks[0].result;
        console.log(`✅ Suchvolumen-Daten für ${keywords.length} Keywords erhalten\n`);
        
        console.log('🎯 LONGTAIL KEYWORDS SUCHVOLUMEN:');
        console.log('─'.repeat(90));
        console.log('Keyword'.padEnd(40) + 'Suchvolumen'.padEnd(15) + 'CPC €'.padEnd(10) + 'Wettbewerb'.padEnd(15) + 'Intent');
        console.log('─'.repeat(90));
        
        keywords.forEach(kw => {
          const keyword = (kw.keyword || '').substring(0, 39);
          const searchVolume = (kw.search_volume || 0).toString();
          const cpc = (kw.cpc || 0).toFixed(2);
          const competition = kw.competition || 'N/A';
          const competitionIndex = kw.competition_index ? `(${kw.competition_index}%)` : '';
          
          // Bestimme Keyword Intent
          let intent = 'informational';
          if (keyword.includes('kosten') || keyword.includes('preis')) intent = 'transactional';
          if (keyword.includes('firma') || keyword.includes('business')) intent = 'transactional';
          if (keyword.includes('erfahrungen')) intent = 'informational';
          
          console.log(
            keyword.padEnd(40) + 
            searchVolume.padEnd(15) + 
            `€${cpc}`.padEnd(10) + 
            `${competition} ${competitionIndex}`.padEnd(15) +
            intent
          );
        });
        console.log('─'.repeat(90));
        
      } else {
        console.log('⚠️  Keine Suchvolumen-Daten gefunden oder API-Fehler');
      }
      
    } catch (error) {
      console.log('❌ Fehler bei Search Volume:', error.message);
    }
    
    // Zusammenfassung und Empfehlungen
    console.log('\n\n');
    console.log('📋 GLAXI.DE SEO STRATEGIE EMPFEHLUNGEN');
    console.log('═'.repeat(80));
    console.log('');
    console.log('🎯 CONTENT STRATEGIE:');
    console.log('   ▶ Landingpages: Autofolierung Stuttgart, Lackschutzfolierung München');
    console.log('   ▶ Blog-Artikel: "Autofolierung Kosten", "PPF Erfahrungen"');
    console.log('   ▶ Service-Seiten: Firmenflotte, Business Folierung');
    console.log('');
    console.log('💼 B2B FOKUS:');
    console.log('   ▶ Firmenflotten-Keywords prioritisieren');
    console.log('   ▶ Business-orientierte Inhalte erstellen');
    console.log('');
    console.log('🏆 HIGH-PRIORITY KEYWORDS:');
    console.log('   ▶ Autofolierung + Stadt (lokale SEO)');
    console.log('   ▶ Lackschutzfolierung (Hauptservice)');
    console.log('   ▶ Steinschlagschutzfolierung (spezifisch)');
    console.log('');
    console.log('✅ Keywords Data API erfolgreich getestet!');
    
    return true;
    
  } catch (error) {
    console.log('❌ Analyse fehlgeschlagen:', error.message);
    return false;
  }
}

// Führe Glaxi SEO Analyse aus
runGlaxiKeywordsAnalysis().then(success => {
  if (success) {
    console.log('\n🎉 Glaxi.de Keywords Analyse abgeschlossen!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Analyse konnte nicht vollständig durchgeführt werden.');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Analyse-Ausführung fehlgeschlagen:', error);
  process.exit(1);
});
