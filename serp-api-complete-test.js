#!/usr/bin/env node

/**
 * SERP API Komplett-Test
 * Testet alle verfügbaren SERP-APIs mit echten DataForSEO-Zugangsdaten
 * 
 * Verwendet den Vercel-Server: https://yourank-mcp.vercel.app
 */

const https = require('https');
const fs = require('fs');

// Echte DataForSEO-Zugangsdaten
const CREDENTIALS = {
  username: 'marcos.gonzalez@you-rank.de',
  password: '23778ba164190549'
};

// Vercel-Server URL
const BASE_URL = 'https://yourank-mcp.vercel.app';

// Test-Ergebnisse speichern
const testResults = {
  timestamp: new Date().toISOString(),
  totalTests: 0,
  successfulTests: 0,
  failedTests: 0,
  results: []
};

/**
 * HTTP Request Helper
 */
function makeRequest(endpoint, method = 'POST', data = null) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${endpoint}`;
    const credentials = Buffer.from(`${CREDENTIALS.username}:${CREDENTIALS.password}`).toString('base64');
    
    const options = {
      hostname: 'yourank-mcp.vercel.app',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'User-Agent': 'SERP-API-Test/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsed
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data && method === 'POST') {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Test-Funktion für einen API-Endpunkt
 */
async function testEndpoint(endpoint, testData, description) {
  testResults.totalTests++;
  
  console.log(`\n🧪 Teste: ${description}`);
  console.log(`   Endpoint: ${endpoint}`);
  
  try {
    const startTime = Date.now();
    const response = await makeRequest(endpoint, 'POST', testData);
    const duration = Date.now() - startTime;
    
    const result = {
      endpoint,
      description,
      statusCode: response.statusCode,
      duration: `${duration}ms`,
      success: response.statusCode >= 200 && response.statusCode < 300,
      response: response.data,
      timestamp: new Date().toISOString()
    };
    
    if (result.success) {
      testResults.successfulTests++;
      console.log(`   ✅ Erfolgreich (${response.statusCode}) - ${duration}ms`);
    } else {
      testResults.failedTests++;
      console.log(`   ❌ Fehlgeschlagen (${response.statusCode}) - ${duration}ms`);
    }
    
    testResults.results.push(result);
    return result;
    
  } catch (error) {
    testResults.failedTests++;
    const result = {
      endpoint,
      description,
      error: error.message,
      success: false,
      timestamp: new Date().toISOString()
    };
    
    console.log(`   💥 Fehler: ${error.message}`);
    testResults.results.push(result);
    return result;
  }
}

/**
 * Alle SERP-APIs testen
 */
async function runAllTests() {
  console.log('🚀 Starte SERP API Komplett-Test...');
  console.log(`📡 Server: ${BASE_URL}`);
  console.log(`👤 Benutzer: ${CREDENTIALS.username}`);
  console.log(`⏰ Startzeit: ${testResults.timestamp}`);
  console.log('=' .repeat(80));

  // ===== SERP GENERAL APIs =====
  console.log('\n🔍 SERP GENERAL APIs');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/id_list', [{
    date_from: '2024-01-01',
    date_to: '2024-12-31'
  }], 'SERP ID List - Abgeschlossene SERP-Aufgaben');
  
  await testEndpoint('/v3/serp/errors', [{}], 'SERP Errors - Fehlerhafte SERP-Aufgaben');
  
  await testEndpoint('/v3/serp/screenshot', [{
    url: 'https://www.google.com/search?q=test',
    width: 1920,
    height: 1080
  }], 'SERP Screenshot - Screenshot einer SERP-Seite');
  
  await testEndpoint('/v3/serp/ai_summary', [{
    keyword: 'kaffee erlangen',
    location_code: 2276, // Deutschland
    language_code: 'de',
    prompt: 'Zusammenfassung der wichtigsten Ergebnisse'
  }], 'SERP AI Summary - KI-Zusammenfassung der SERP-Ergebnisse');

  // ===== GOOGLE SERP APIs =====
  console.log('\n🔍 GOOGLE SERP APIs');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/google/organic/live/advanced', [{
    keyword: 'kaffee erlangen',
    location_code: 2276,
    language_code: 'de',
    device: 'desktop',
    depth: 100
  }], 'Google Organic Live Advanced - Organische Suchergebnisse');
  
  await testEndpoint('/v3/serp/google/ai_mode/live/advanced', [{
    keyword: 'beste kaffeehäuser deutschland',
    location_code: 2276,
    language_code: 'de'
  }], 'Google AI Mode Live Advanced - KI-generierte Antworten');
  
  await testEndpoint('/v3/serp/google/maps/live/advanced', [{
    keyword: 'kaffee erlangen',
    location_coordinate: '49.5897,11.0041',
    language_code: 'de'
  }], 'Google Maps Live Advanced - Google Maps Suchergebnisse');
  
  await testEndpoint('/v3/serp/google/local_finder/live/advanced', [{
    keyword: 'kaffee erlangen',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Local Finder Live Advanced - Lokale Geschäfte');
  
  await testEndpoint('/v3/serp/google/news/live/advanced', [{
    keyword: 'kaffee industrie',
    location_code: 2276,
    language_code: 'de',
    time_range: 'd'
  }], 'Google News Live Advanced - Google News Ergebnisse');
  
  await testEndpoint('/v3/serp/google/events/live/advanced', [{
    keyword: 'kaffee festival',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Events Live Advanced - Google Events Ergebnisse');
  
  await testEndpoint('/v3/serp/google/images/live/advanced', [{
    keyword: 'kaffee erlangen',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Images Live Advanced - Google Bilder Ergebnisse');
  
  await testEndpoint('/v3/serp/google/search_by_image/live/advanced', [{
    image_url: 'https://example.com/coffee-image.jpg',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Search by Image Live Advanced - Reverse Image Search');
  
  await testEndpoint('/v3/serp/google/jobs/live/advanced', [{
    keyword: 'barista',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Jobs Live Advanced - Google Jobs Ergebnisse');
  
  await testEndpoint('/v3/serp/google/autocomplete/live/advanced', [{
    keyword: 'kaffee',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Autocomplete Live Advanced - Suchvorschläge');
  
  await testEndpoint('/v3/serp/google/dataset_search/live/advanced', [{
    keyword: 'coffee consumption data',
    location_code: 2276,
    language_code: 'en'
  }], 'Google Dataset Search Live Advanced - Dataset-Suche');
  
  await testEndpoint('/v3/serp/google/dataset_info/live/advanced', [{
    dataset_id: 'example_dataset_id',
    language_code: 'en'
  }], 'Google Dataset Info Live Advanced - Dataset-Informationen');
  
  await testEndpoint('/v3/serp/google/ads/search/live/advanced', [{
    keyword: 'kaffee online kaufen',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Ads Search Live Advanced - Google Ads Ergebnisse');
  
  await testEndpoint('/v3/serp/google/ads/advertisers/live/advanced', [{
    keyword: 'kaffee',
    location_code: 2276,
    language_code: 'de'
  }], 'Google Ads Advertisers Live Advanced - Werbetreibende Informationen');

  // ===== BING SERP APIs =====
  console.log('\n🔍 BING SERP APIs');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/bing/organic/live/advanced', [{
    keyword: 'kaffee erlangen',
    location_code: 2276,
    language_code: 'de'
  }], 'Bing Organic Live Advanced - Bing organische Suchergebnisse');
  
  await testEndpoint('/v3/serp/bing/local_pack/live/advanced', [{
    keyword: 'kaffee erlangen',
    location_code: 2276,
    language_code: 'de'
  }], 'Bing Local Pack Live Advanced - Bing lokale Suchergebnisse');

  // ===== YOUTUBE SERP APIs =====
  console.log('\n🔍 YOUTUBE SERP APIs');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/youtube/organic/live/advanced', [{
    keyword: 'kaffee zubereitung',
    location_code: 2276,
    language_code: 'de'
  }], 'YouTube Organic Live Advanced - YouTube Suchergebnisse');
  
  await testEndpoint('/v3/serp/youtube/video_info/live/advanced', [{
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    language_code: 'de'
  }], 'YouTube Video Info Live Advanced - Video-Metriken');
  
  await testEndpoint('/v3/serp/youtube/video_subtitles/live/advanced', [{
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    language_code: 'de'
  }], 'YouTube Video Subtitles Live Advanced - Video-Untertitel');
  
  await testEndpoint('/v3/serp/youtube/video_comments/live/advanced', [{
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    language_code: 'de'
  }], 'YouTube Video Comments Live Advanced - Video-Kommentare');

  // ===== YAHOO SERP APIs =====
  console.log('\n🔍 YAHOO SERP APIs');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/yahoo/organic/live/advanced', [{
    keyword: 'kaffee erlangen',
    location_code: 2276,
    language_code: 'de'
  }], 'Yahoo Organic Live Advanced - Yahoo organische Suchergebnisse');

  // ===== LOCATION & LANGUAGE APIs =====
  console.log('\n🔍 LOCATION & LANGUAGE APIs');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/google/locations', null, 'Google Locations - Verfügbare Standorte (GET)');
  
  await testEndpoint('/v3/serp/google/locations/us', null, 'Google Locations by Country - Standorte nach Land (GET)');
  
  await testEndpoint('/v3/serp/google/languages', null, 'Google Languages - Verfügbare Sprachen (GET)');
  
  await testEndpoint('/v3/serp/youtube/locations', null, 'YouTube Locations - Verfügbare YouTube-Standorte (GET)');

  // ===== ZUSAMMENFASSUNG =====
  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST-ZUSAMMENFASSUNG');
  console.log('='.repeat(80));
  console.log(`⏰ Endzeit: ${new Date().toISOString()}`);
  console.log(`📈 Gesamte Tests: ${testResults.totalTests}`);
  console.log(`✅ Erfolgreiche Tests: ${testResults.successfulTests}`);
  console.log(`❌ Fehlgeschlagene Tests: ${testResults.failedTests}`);
  console.log(`📊 Erfolgsrate: ${((testResults.successfulTests / testResults.totalTests) * 100).toFixed(2)}%`);
  
  // Ergebnisse in Datei speichern
  const filename = `serp-api-test-results-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(filename, JSON.stringify(testResults, null, 2));
  console.log(`\n💾 Ergebnisse gespeichert in: ${filename}`);
  
  // Detaillierte Ergebnisse anzeigen
  console.log('\n📋 DETAILLIERTE ERGEBNISSE:');
  console.log('-'.repeat(40));
  
  testResults.results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    const statusCode = result.statusCode || 'N/A';
    const duration = result.duration || 'N/A';
    
    console.log(`${index + 1}. ${status} ${result.description}`);
    console.log(`   Endpoint: ${result.endpoint}`);
    console.log(`   Status: ${statusCode} | Dauer: ${duration}`);
    
    if (result.error) {
      console.log(`   Fehler: ${result.error}`);
    }
    console.log('');
  });
}

/**
 * Fehlerbehandlung
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unbehandelte Promise-Ablehnung:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Unbehandelter Fehler:', error);
});

// Tests starten
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests, testEndpoint };
