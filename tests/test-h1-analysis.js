// H1-Tag Analyse aus DataForSEO Daten
import https from 'https';

const VERCEL_URL = 'https://yourank-mcp.vercel.app/http';

function makeHttpRequest(data) {
  return new Promise((resolve, reject) => {
    const url = new URL(VERCEL_URL);
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(body);
          resolve({
            status: res.statusCode,
            body: jsonResponse
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: body,
            error: e.message
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

async function analyzeH1Tags() {
  console.log('🔍 H1-Tag Analyse für glaxi.de\n');
  
  const request = {
    jsonrpc: "2.0",
    method: "tools/call",
    params: {
      name: "on_page_instant_pages",
      arguments: {
        url: "https://glaxi.de",
        enable_javascript: true,
        accept_language: "de-DE"
      }
    },
    id: "h1_analysis"
  };

  try {
    const response = await makeHttpRequest(request);
    
    if (response.body && response.body.result && response.body.result.tasks) {
      const task = response.body.result.tasks[0];
      if (task && task.result && task.result[0] && task.result[0].items) {
        const page = task.result[0].items[0];
        
        console.log('📊 H-TAG STRUKTUR ANALYSE:');
        console.log('═══════════════════════════════');
        
        if (page.meta && page.meta.htags) {
          const htags = page.meta.htags;
          
          // H1 Tags
          if (htags.h1) {
            console.log(`🔴 H1-Tags (${htags.h1.length} gefunden):`);
            htags.h1.forEach((h1, index) => {
              console.log(`   ${index + 1}. "${h1}"`);
            });
            
            if (htags.h1.length > 1) {
              console.log(`\n❌ PROBLEM: ${htags.h1.length} H1-Tags gefunden!`);
              console.log('   SEO-Best Practice: Nur 1 H1-Tag pro Seite!');
            } else {
              console.log('\n✅ H1-Struktur korrekt: Nur 1 H1-Tag');
            }
          } else {
            console.log('❌ PROBLEM: Keine H1-Tags gefunden!');
          }
          
          // H2 Tags
          if (htags.h2) {
            console.log(`\n🔵 H2-Tags (${htags.h2.length} gefunden):`);
            htags.h2.slice(0, 3).forEach((h2, index) => {
              console.log(`   ${index + 1}. "${h2}"`);
            });
            if (htags.h2.length > 3) {
              console.log(`   ... und ${htags.h2.length - 3} weitere`);
            }
          }
          
          // H3 Tags
          if (htags.h3) {
            console.log(`\n🟡 H3-Tags (${htags.h3.length} gefunden):`);
            htags.h3.slice(0, 3).forEach((h3, index) => {
              console.log(`   ${index + 1}. "${h3}"`);
            });
            if (htags.h3.length > 3) {
              console.log(`   ... und ${htags.h3.length - 3} weitere`);
            }
          }
          
          // Weitere H-Tags
          ['h4', 'h5', 'h6'].forEach(level => {
            if (htags[level]) {
              console.log(`\n🟢 ${level.toUpperCase()}-Tags: ${htags[level].length} gefunden`);
            }
          });
          
        } else {
          console.log('❌ Keine H-Tag-Daten verfügbar');
        }
        
      }
    } else {
      console.log('❌ Keine Analysedaten erhalten');
    }
    
  } catch (error) {
    console.error('❌ Fehler bei H1-Analyse:', error.message);
  }
}

analyzeH1Tags();
