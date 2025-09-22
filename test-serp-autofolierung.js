import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { SerpApiModule } from './build/core/modules/serp/serp-api.module.js';
import { DataForSEOClient } from './build/core/client/dataforseo.client.js';

async function analyzeSerpAutofolierung() {
    console.log('🔍 SERP Analyse für "autofolierung"...\n');
    
    try {
        const client = new DataForSEOClient({
            login: process.env.DATAFORSEO_LOGIN,
            password: process.env.DATAFORSEO_PASSWORD
        });

        const serpModule = new SerpApiModule(client);
        
        // SERP Analyse für "autofolierung"
        console.log('📊 Analysiere SERP für "autofolierung"...');
        const serpResult = await serpModule.serpOrganicLiveAdvanced({
            keyword: "autofolierung",
            location_code: 2276, // Germany
            language_code: "de",
            depth: 100,
            calculate_serp_features: true,
            include_serp_info: true
        });

        if (!serpResult || !serpResult.items || serpResult.items.length === 0) {
            console.log('❌ Keine SERP-Daten erhalten');
            return;
        }

        const serpData = serpResult.items[0];
        
        console.log('\n═══════ SERP ANALYSE FÜR "AUTOFOLIERUNG" ═══════\n');
        
        // 1. Top Rankings
        console.log('🏆 TOP 10 RANKINGS:');
        console.log('─'.repeat(50));
        if (serpData.items) {
            serpData.items.slice(0, 10).forEach((item, index) => {
                if (item.type === 'organic') {
                    console.log(`${index + 1}. ${item.domain} - ${item.title}`);
                    console.log(`   URL: ${item.url}`);
                    console.log(`   Meta: ${item.description?.substring(0, 100)}...`);
                    console.log('');
                }
            });
        }

        // 2. Konkurrenz-Domains analysieren
        console.log('\n🎯 DOMAIN-ANALYSE FÜR KONKURRENTEN:');
        console.log('─'.repeat(50));
        const targetDomains = [
            'glaxi.de',
            'car-wrapping-stuttgart.de', 
            'signal-design.de',
            'wrapsign.de',
            'printtech.de'
        ];

        const organicResults = serpData.items?.filter(item => item.type === 'organic') || [];
        
        targetDomains.forEach(domain => {
            const found = organicResults.find(item => item.domain === domain);
            if (found) {
                const position = organicResults.findIndex(item => item.domain === domain) + 1;
                console.log(`✅ ${domain}: Position ${position}`);
                console.log(`   Titel: ${found.title}`);
                console.log(`   URL: ${found.url}`);
            } else {
                console.log(`❌ ${domain}: Nicht in Top 100`);
            }
            console.log('');
        });

        // 3. SERP Features
        console.log('\n📋 SERP FEATURES:');
        console.log('─'.repeat(50));
        if (serpData.serp_features) {
            Object.keys(serpData.serp_features).forEach(feature => {
                if (serpData.serp_features[feature] > 0) {
                    console.log(`✅ ${feature}: ${serpData.serp_features[feature]} Elemente`);
                }
            });
        }

        // 4. Spezifische SERP-Elemente
        console.log('\n🔍 WEITERE SERP ELEMENTE:');
        console.log('─'.repeat(50));
        if (serpData.items) {
            const specialElements = serpData.items.filter(item => item.type !== 'organic');
            specialElements.forEach((item, index) => {
                console.log(`${item.type.toUpperCase()}: ${item.title || 'N/A'}`);
                if (item.items) {
                    item.items.slice(0, 3).forEach(subItem => {
                        console.log(`  ▶ ${subItem.title || subItem.question || 'Item'}`);
                    });
                }
                console.log('');
            });
        }

        // 5. Keyword-Metriken
        console.log('\n📈 KEYWORD-METRIKEN:');
        console.log('─'.repeat(50));
        console.log(`Total Results: ${serpData.total_count || 'N/A'}`);
        console.log(`Items on page: ${serpData.items?.length || 0}`);
        
        console.log('\n🎉 SERP-Analyse abgeschlossen!');

    } catch (error) {
        console.error('❌ Fehler bei SERP-Analyse:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
    }
}

analyzeSerpAutofolierung();
