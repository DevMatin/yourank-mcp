// Test OnPage Analysis via Vercel
import https from 'https';

const VERCEL_URL = 'https://yourank-mcp.vercel.app/http';

// Domains für die Analyse
const domains = [
  { name: "Hauptdomain", domain: "glaxi.de" },
  { name: "Mitbewerber 1", domain: "car-wrapping-stuttgart.de" },
  { name: "Mitbewerber 2", domain: "signal-design.de" },
  { name: "Mitbewerber 3", domain: "wrapsign.de" },
  { name: "Mitbewerber 4", domain: "printtech.de" }
];

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

async function analyzeOnPageData(domain) {
  console.log(`\n🔍 Analysiere ${domain}...`);
  
  try {
    // 1. OnPage Task Post für Domain-weite Analyse
    const taskPostRequest = {
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: "on_page_task_post",
        arguments: {
          target: domain, // Ohne https://
          max_crawl_pages: 10,
          enable_javascript: true,
          accept_language: "de-DE",
          load_resources: true,
          enable_browser_rendering: true,
          store_raw_html: true
        }
      },
      id: `task_${domain}_${Date.now()}`
    };

    const taskResponse = await makeHttpRequest(taskPostRequest);
    console.log(`📝 Task Status für ${domain}:`, taskResponse.status);
    
    let taskId = null;
    if (taskResponse.body && taskResponse.body.result && taskResponse.status === 200) {
      const resultText = taskResponse.body.result.content?.[0]?.text;
      if (resultText) {
        try {
          const taskResult = JSON.parse(resultText);
          taskId = taskResult.tasks?.[0]?.id;
          console.log(`✅ Task ID für ${domain}: ${taskId}`);
        } catch (e) {
          console.log(`⚠️ Task Response für ${domain}:`, resultText);
        }
      }
    }

    // 2. Instant Pages Analysis als Fallback oder zusätzliche Info
    const instantPagesRequest = {
      jsonrpc: "2.0",
      method: "tools/call", 
      params: {
        name: "on_page_instant_pages",
        arguments: {
          url: `https://${domain}`,
          enable_javascript: true,
          accept_language: "de-DE"
        }
      },
      id: `instant_${domain}_${Date.now()}`
    };

    const instantResponse = await makeHttpRequest(instantPagesRequest);
    console.log(`📊 Instant Pages Status für ${domain}:`, instantResponse.status);
    
    if (instantResponse.body && instantResponse.body.result && instantResponse.status === 200) {
      // DataForSEO API gibt direkte Daten zurück, nicht als Text zum Parsen
      const parsedData = instantResponse.body.result;
      
      return {
        domain: domain,
        taskId: taskId,
        pageData: parsedData,
        instantPagesSuccess: true
      };
    }
    
    return {
      domain: domain,
      taskId: taskId,
      error: 'Keine auswertbaren Daten erhalten',
      taskResponse: taskResponse.body,
      instantResponse: instantResponse.body
    };
    
  } catch (error) {
    console.error(`❌ Fehler bei ${domain}:`, error.message);
    return {
      domain: domain,
      error: error.message
    };
  }
}

async function runComprehensiveAnalysis() {
  console.log('🚀 Starte umfassende OnPage-Analyse mit Wettbewerbsvergleich');
  console.log('📡 Server:', VERCEL_URL);
  console.log('🎯 Domains:', domains.map(d => d.domain).join(', '));
  
  const results = [];
  
  for (const domainInfo of domains) {
    const result = await analyzeOnPageData(domainInfo.domain);
    result.name = domainInfo.name;
    results.push(result);
    
    // Pause zwischen Requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Ergebnisse analysieren und vergleichen
  console.log('\n📊 ANALYSE-ERGEBNISSE:');
  console.log('═══════════════════════════════');
  
  for (const result of results) {
    console.log(`\n🏢 ${result.name} (${result.domain}):`);
    
    if (result.error) {
      console.log(`   ❌ Fehler: ${result.error}`);
      if (result.taskResponse) {
      console.log(`   📄 Task Response:`, JSON.stringify(result.taskResponse, null, 2));
      }
        if (result.instantResponse) {
          console.log(`   📄 Instant Response:`, JSON.stringify(result.instantResponse, null, 2));
        }
    } else if (result.pageData) {
      const data = result.pageData;
      
      console.log(`   ✅ Erfolgreich analysiert`);
      if (data.tasks && data.tasks[0] && data.tasks[0].result && data.tasks[0].result[0] && data.tasks[0].result[0].items) {
        const page = data.tasks[0].result[0].items[0];
        console.log(`   📄 Seiten-Titel: ${page.meta?.title || 'N/A'}`);
        console.log(`   📝 Meta Description: ${page.meta?.description || 'N/A'}`);
        console.log(`   🔗 Status Code: ${page.status_code || 'N/A'}`);
        console.log(`   ⚡ Ladezeit: ${page.page_timing?.duration_time || 'N/A'}ms`);
        console.log(`   📏 Seiten-Größe: ${page.size || 'N/A'} Bytes`);
        console.log(`   📊 OnPage Score: ${page.onpage_score || 'N/A'}/100`);
        
        if (page.checks) {
          const issues = Object.keys(page.checks).filter(check => page.checks[check] === false);
          const warnings = Object.keys(page.checks).filter(check => page.checks[check] === true && check.includes('no_') || check.includes('low_') || check.includes('high_'));
          console.log(`   ⚠️  SEO-Issues: ${issues.length} gefunden`);
          if (issues.length > 0) {
            console.log(`      - ${issues.slice(0, 5).join(', ')}${issues.length > 5 ? '...' : ''}`);
          }
        }
        
        // Core Web Vitals
        if (page.page_timing) {
          console.log(`   🚀 Core Web Vitals:`);
          console.log(`      • LCP: ${page.cumulative_layout_shift || 'N/A'}`);
          console.log(`      • FID: ${page.page_timing.first_input_delay || 'N/A'}ms`);
          console.log(`      • TTI: ${page.page_timing.time_to_interactive || 'N/A'}ms`);
        }
      }
    }
  }
  
  console.log('\n📈 WETTBEWERBSVERGLEICH:');
  console.log('═══════════════════════════════');
  
  const successfulResults = results.filter(r => r.pageData && !r.error);
  
  if (successfulResults.length > 1) {
    console.log('🎯 Vergleichbare Metriken gefunden!\n');
    
    // Performance-Vergleich
    console.log('⚡ PERFORMANCE-VERGLEICH:');
    successfulResults.forEach(result => {
      if (result.pageData.tasks && result.pageData.tasks[0] && result.pageData.tasks[0].result && result.pageData.tasks[0].result[0] && result.pageData.tasks[0].result[0].items) {
        const page = result.pageData.tasks[0].result[0].items[0];
        const loadTime = page.page_timing?.duration_time || 'N/A';
        const onPageScore = page.onpage_score || 'N/A';
        const pageSize = page.size ? Math.round(page.size / 1024) : 'N/A';
        console.log(`📊 ${result.name}: ${loadTime}ms | Score: ${onPageScore}/100 | Größe: ${pageSize}KB`);
      }
    });
    
    // SEO-Issues Vergleich
    console.log('\n⚠️  SEO-ISSUES VERGLEICH:');
    successfulResults.forEach(result => {
      if (result.pageData.tasks && result.pageData.tasks[0] && result.pageData.tasks[0].result && result.pageData.tasks[0].result[0] && result.pageData.tasks[0].result[0].items) {
        const page = result.pageData.tasks[0].result[0].items[0];
        if (page.checks) {
          const issues = Object.keys(page.checks).filter(check => page.checks[check] === false);
          console.log(`🔍 ${result.name}: ${issues.length} Issues`);
          if (issues.length > 0 && issues.length <= 3) {
            console.log(`   • ${issues.join(', ')}`);
          } else if (issues.length > 3) {
            console.log(`   • ${issues.slice(0, 3).join(', ')} + ${issues.length - 3} weitere`);
          }
        }
      }
    });

    // Wettbewerbsempfehlungen
    console.log('\n📈 HANDLUNGSEMPFEHLUNGEN:');
    const mainDomain = successfulResults.find(r => r.domain === 'glaxi.de');
    if (mainDomain) {
      const mainPage = mainDomain.pageData.tasks[0].result[0].items[0];
      const competitors = successfulResults.filter(r => r.domain !== 'glaxi.de');
      
      // Finde besten Performer
      let bestPerformer = competitors[0];
      competitors.forEach(comp => {
        const compPage = comp.pageData.tasks[0].result[0].items[0];
        const bestPage = bestPerformer.pageData.tasks[0].result[0].items[0];
        if (compPage.onpage_score > bestPage.onpage_score) {
          bestPerformer = comp;
        }
      });
      
      console.log(`🥇 Bester Performer: ${bestPerformer.name} (Score: ${bestPerformer.pageData.tasks[0].result[0].items[0].onpage_score}/100)`);
      console.log(`📊 Glaxi.de Score: ${mainPage.onpage_score}/100`);
      
      if (mainPage.onpage_score < bestPerformer.pageData.tasks[0].result[0].items[0].onpage_score) {
        console.log('💡 Verbesserungspotenzial vorhanden!');
      }
      
      // Spezifische Empfehlungen basierend auf Issues
      if (mainPage.checks) {
        const mainIssues = Object.keys(mainPage.checks).filter(check => mainPage.checks[check] === false);
        if (mainIssues.length > 0) {
          console.log('\n🎯 Prioritäre Optimierungen für glaxi.de:');
          mainIssues.slice(0, 5).forEach((issue, index) => {
            const priority = index < 2 ? '🔴 HOCH' : index < 4 ? '🟡 MITTEL' : '🟢 NIEDRIG';
            console.log(`   ${priority}: ${issue.replace(/_/g, ' ')}`);
          });
        }
      }
    }
  } else {
    console.log('❌ Nicht genügend Daten für Vergleich verfügbar');
  }
  
  console.log('\n🎉 Analyse abgeschlossen!');
  return results;
}

// Analyse starten
runComprehensiveAnalysis().catch(console.error);
