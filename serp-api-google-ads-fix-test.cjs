#!/usr/bin/env node

/**
 * Google Ads API Fix Test
 * Testet die Google Ads APIs mit den korrekten URLs (Unterstrich statt Slash)
 */

const https = require('https');

// Echte DataForSEO-Zugangsdaten
const CREDENTIALS = {
  username: 'marcos.gonzalez@you-rank.de',
  password: '23778ba164190549'
};

// Vercel-Server URL
const BASE_URL = 'https://mcp-server-typescript-six.vercel.app';

/**
 * HTTP Request Helper
 */
function makeRequest(endpoint, method = 'POST', data = null) {
  return new Promise((resolve, reject) => {
    const credentials = Buffer.from(`${CREDENTIALS.username}:${CREDENTIALS.password}`).toString('base64');
    
    const options = {
      hostname: 'mcp-server-typescript-six.vercel.app',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Google-Ads-API-Fix-Test/1.0'
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
 * Test-Funktion
 */
async function testEndpoint(endpoint, testData, description) {
  console.log(`\n🧪 Teste: ${description}`);
  console.log(`   Endpoint: ${endpoint}`);
  
  try {
    const startTime = Date.now();
    const response = await makeRequest(endpoint, 'POST', testData);
    const duration = Date.now() - startTime;
    
    console.log(`   Status: ${response.statusCode}`);
    console.log(`   Dauer: ${duration}ms`);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`   ✅ Erfolgreich!`);
      console.log(`   Antwort: ${JSON.stringify(response.data, null, 2).substring(0, 500)}...`);
    } else {
      console.log(`   ❌ Fehlgeschlagen`);
      console.log(`   Antwort: ${JSON.stringify(response.data, null, 2)}`);
    }
    
    return response;
    
  } catch (error) {
    console.log(`   💥 Fehler: ${error.message}`);
    return null;
  }
}

/**
 * Alle Google Ads URL-Varianten testen
 */
async function runGoogleAdsTests() {
  console.log('🚀 Starte Google Ads API URL-Fix Test...');
  console.log(`📡 Server: ${BASE_URL}`);
  console.log(`👤 Benutzer: ${CREDENTIALS.username}`);
  console.log('=' .repeat(80));

  const testData = [{
    keyword: 'kaffee online kaufen',
    location_code: 2276,
    language_code: 'de'
  }];

  // ===== TEST 1: Schema-URLs (mit Slash) =====
  console.log('\n🔍 TEST 1: Schema-URLs (mit Slash)');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/google/ads/search/live/advanced', testData, 
    'Google Ads Search - Schema URL (ads/search)');
  
  await testEndpoint('/v3/serp/google/ads/advertisers/live/advanced', testData, 
    'Google Ads Advertisers - Schema URL (ads/advertisers)');

  // ===== TEST 2: Tool-URLs (mit Unterstrich) =====
  console.log('\n🔍 TEST 2: Tool-URLs (mit Unterstrich)');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/google/ads_search/live/advanced', testData, 
    'Google Ads Search - Tool URL (ads_search)');
  
  await testEndpoint('/v3/serp/google/ads_advertisers/live/advanced', testData, 
    'Google Ads Advertisers - Tool URL (ads_advertisers)');

  // ===== TEST 3: Alternative URL-Varianten =====
  console.log('\n🔍 TEST 3: Alternative URL-Varianten');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/google/ads-search/live/advanced', testData, 
    'Google Ads Search - Alternative (ads-search)');
  
  await testEndpoint('/v3/serp/google/ads-advertisers/live/advanced', testData, 
    'Google Ads Advertisers - Alternative (ads-advertisers)');

  // ===== TEST 4: Verfügbare Endpunkte prüfen =====
  console.log('\n🔍 TEST 4: Verfügbare Endpunkte prüfen');
  console.log('-'.repeat(40));
  
  await testEndpoint('/v3/serp/google/organic/live/advanced', testData, 
    'Google Organic (sollte funktionieren)');

  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST-ANALYSE');
  console.log('='.repeat(80));
  console.log('Das Problem liegt wahrscheinlich an der URL-Struktur:');
  console.log('- Schema verwendet: ads/search, ads/advertisers');
  console.log('- Tools verwenden: ads_search, ads_advertisers');
  console.log('- Der Server erwartet möglicherweise eine andere URL-Struktur');
}

// Tests starten
if (require.main === module) {
  runGoogleAdsTests().catch(console.error);
}

module.exports = { runGoogleAdsTests };
