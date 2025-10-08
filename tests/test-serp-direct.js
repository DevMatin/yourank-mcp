import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { DataForSEOClient } from './build/core/client/dataforseo.client.js';

async function testSerpDirect() {
    console.log('🎯 SERP ANALYSE für "autofolierung"');
    console.log('═'.repeat(60));
    
    try {
        const client = new DataForSEOClient({
            username: process.env.DATAFORSEO_LOGIN,
            password: process.env.DATAFORSEO_PASSWORD
        });

        // Direkte API-Anfrage für organische Suchergebnisse
        const requestData = [{
            keyword: "autofolierung",
            location_code: 2276, // Germany
            language_code: "de", 
            depth: 100,
            calculate_serp_features: true,
            include_serp_info: true
        }];

        console.log('\n🔍 Lade SERP-Daten...');
        const response = await client.makeRequest('/v3/serp/google/organic/live/advanced', 'POST', requestData);
        
        if (!response || !response.tasks || response.tasks.length === 0) {
            console.log('❌ Keine SERP-Daten erhalten');
            return;
        }

        const taskResult = response.tasks[0];
        if (taskResult.status_code !== 20000) {
            console.log('❌ API Fehler:', taskResult.status_message);
            return;
        }

        const serpData = taskResult.result[0];
        
        console.log('\n🏆 TOP 10 RANKINGS für "autofolierung":');
        console.log('─'.repeat(50));
        
        const targetDomains = [
            'glaxi.de',
            'car-wrapping-stuttgart.de', 
            'signal-design.de',
            'wrapsign.de',
            'printtech.de'
        ];

        const organicItems = serpData.items.filter(item => item.type === 'organic');
        
        // Zeige Top 10
        organicItems.slice(0, 10).forEach((item, index) => {
            const position = index + 1;
            console.log(`${position}. ${item.domain}`);
            console.log(`   📄 ${item.title}`);
            console.log(`   🔗 ${item.url}`);
            console.log('');
        });

        console.log('\n🎯 KONKURRENZ-ANALYSE:');
        console.log('─'.repeat(50));
        
        targetDomains.forEach(domain => {
            const foundItem = organicItems.find(item => item.domain === domain);
            if (foundItem) {
                const position = organicItems.findIndex(item => item.domain === domain) + 1;
                console.log(`✅ ${domain}: Position ${position}`);
                console.log(`   📄 ${foundItem.title}`);
                console.log(`   🔗 ${foundItem.url}`);
            } else {
                console.log(`❌ ${domain}: Nicht in Top 100`);
            }
            console.log('');
        });

        console.log('\n📊 SERP FEATURES:');
        console.log('─'.repeat(50));
        
        if (serpData.se_results_count) {
            console.log(`📈 Gesamte Suchergebnisse: ${serpData.se_results_count.toLocaleString('de-DE')}`);
        }
        
        // Analyse verschiedener SERP-Elementtypen
        const serpFeatures = {};
        serpData.items.forEach(item => {
            if (serpFeatures[item.type]) {
                serpFeatures[item.type]++;
            } else {
                serpFeatures[item.type] = 1;
            }
        });

        Object.entries(serpFeatures).forEach(([feature, count]) => {
            console.log(`📋 ${feature.toUpperCase()}: ${count} Element(e)`);
        });

        console.log('\n🔍 WEITERE SERP-ELEMENTE:');
        console.log('─'.repeat(50));
        
        const specialElements = serpData.items.filter(item => item.type !== 'organic');
        specialElements.forEach(item => {
            console.log(`🎯 ${item.type.toUpperCase()}`);
            if (item.title) console.log(`   📄 ${item.title}`);
            if (item.description) console.log(`   📝 ${item.description.substring(0, 100)}...`);
            if (item.items && item.items.length > 0) {
                console.log('   📚 Enthält:');
                item.items.slice(0, 3).forEach(subItem => {
                    console.log(`      ▶ ${subItem.title || subItem.question || subItem.text || 'Element'}`);
                });
            }
            console.log('');
        });

        console.log('\n📈 KEYWORD-METRIKEN:');
        console.log('─'.repeat(50));
        console.log(`🔍 Keyword: "${serpData.keyword}"`);
        console.log(`🌍 Location: ${serpData.location_code} (${serpData.language_code})`);
        console.log(`📊 Items auf Seite: ${serpData.items_count}`);
        console.log(`📅 Check-Zeit: ${serpData.check_url}`);

        console.log('\n🎉 SERP-Analyse erfolgreich abgeschlossen!');

    } catch (error) {
        console.error('❌ Fehler bei SERP-Analyse:', error.message);
        if (error.response?.data) {
            console.error('📋 API Response:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testSerpDirect();
