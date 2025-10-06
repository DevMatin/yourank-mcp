#!/usr/bin/env node

/**
 * Test Script für Business Data API Korrekturen
 * Verifiziert alle kritischen Fixes aus dem Plan
 */

import https from 'https';

const BASE_URL = 'https://yourank-mcp.vercel.app';

// Test-Konfiguration
const tests = [
  {
    name: 'Google Reviews - Korrektur: Kein Live-Endpoint',
    endpoint: '/v3/business_data_google_reviews',
    method: 'POST',
    data: {
      type: 'reviews_task_post', // Korrigiert: reviews_live entfernt
      keyword: 'pizza restaurant munich',
      location_name: 'Munich,Germany',
      language_code: 'de',
      depth: 10
    },
    expectedStatus: 200,
    description: 'Sollte erfolgreich task_post verwenden statt nicht-existierendem live endpoint'
  },
  {
    name: 'Legacy Handler - Deprecated Warning',
    endpoint: '/v3/businessDataGoogleReviews', // Legacy Handler
    method: 'POST',
    data: {
      type: 'reviews_live',
      keyword: 'test'
    },
    expectedStatus: 400,
    description: 'Sollte deprecated warning zurückgeben'
  },
  {
    name: 'Parameter Validation - Missing Keyword',
    endpoint: '/v3/business_data_google_my_business',
    method: 'POST',
    data: {
      type: 'my_business_info_live'
      // keyword fehlt absichtlich
    },
    expectedStatus: 400,
    description: 'Sollte Parameter-Validierungsfehler zurückgeben'
  },
  {
    name: 'Parameter Validation - Invalid Depth',
    endpoint: '/v3/business_data_google_my_business',
    method: 'POST',
    data: {
      type: 'my_business_info_live',
      keyword: 'test',
      depth: 150 // Zu hoch
    },
    expectedStatus: 400,
    description: 'Sollte Depth-Validierungsfehler zurückgeben'
  },
  {
    name: 'Location Fallback - Unified Codes',
    endpoint: '/v3/business_data_google_my_business',
    method: 'POST',
    data: {
      type: 'my_business_info_live',
      keyword: 'test restaurant',
      location_name: 'InvalidCityName123' // Sollte Fallback verwenden
    },
    expectedStatus: 200,
    description: 'Sollte einheitlichen Fallback Location Code verwenden'
  }
];

// HTTP Request Helper
function makeRequest(endpoint, method = 'POST', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + endpoint);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve({
            status: res.statusCode,
            body: parsedBody,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: body,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test Runner
async function runTests() {
  console.log('🧪 Business Data API Korrektur-Tests\n');
  console.log('=' .repeat(60));
  
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n📋 Test: ${test.name}`);
    console.log(`📝 Beschreibung: ${test.description}`);
    console.log(`🔗 Endpoint: ${test.endpoint}`);
    
    try {
      const response = await makeRequest(test.endpoint, test.method, test.data);
      
      if (response.status === test.expectedStatus) {
        console.log(`✅ PASSED - Status: ${response.status}`);
        passed++;
        
        // Zusätzliche Validierungen für spezifische Tests
        if (test.name.includes('Legacy Handler')) {
          if (response.body.error && response.body.error.message.includes('deprecated')) {
            console.log(`✅ Legacy Handler korrekt als deprecated markiert`);
          } else {
            console.log(`⚠️ Legacy Handler Response unerwartet:`, response.body);
          }
        }
        
        if (test.name.includes('Parameter Validation')) {
          if (response.body.error && response.body.error.message.includes('validation')) {
            console.log(`✅ Parameter-Validierung funktioniert`);
          } else {
            console.log(`⚠️ Validierung Response unerwartet:`, response.body);
          }
        }
        
      } else {
        console.log(`❌ FAILED - Erwartet: ${test.expectedStatus}, Bekommen: ${response.status}`);
        console.log(`📄 Response:`, JSON.stringify(response.body, null, 2));
        failed++;
      }
      
    } catch (error) {
      console.log(`💥 ERROR - ${error.message}`);
      failed++;
    }
    
    console.log('-'.repeat(40));
  }
  
  console.log(`\n📊 Test-Zusammenfassung:`);
  console.log(`✅ Bestanden: ${passed}`);
  console.log(`❌ Fehlgeschlagen: ${failed}`);
  console.log(`📈 Erfolgsrate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log(`\n🎉 Alle Tests bestanden! Business Data API Korrekturen erfolgreich implementiert.`);
  } else {
    console.log(`\n⚠️ ${failed} Tests fehlgeschlagen. Überprüfung erforderlich.`);
  }
}

// Test ausführen
runTests().catch(console.error);

export { runTests, makeRequest };
