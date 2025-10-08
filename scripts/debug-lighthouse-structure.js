// Debug Script für Lighthouse Datenstruktur
// Analysiert die tatsächliche Struktur der Lighthouse API Responses

const debugLighthouseStructure = async () => {
  const baseUrl = 'https://yourank-mcp.vercel.app';
  const taskId = '10012109-1064-0317-0000-3b86337d4943'; // Task-ID aus dem Log
  
  console.log('🔍 Debugging Lighthouse Data Structure...\n');
  console.log(`📋 Task ID: ${taskId}\n`);
  
  try {
    // 1. Normale Lighthouse Ergebnisse abrufen
    console.log('1️⃣ Fetching normal Lighthouse results...');
    const resultsResponse = await fetch(`${baseUrl}/v3/on_page/lighthouse/task_get/json/${taskId}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('marcos.gonzalez@you-rank.de:23778ba164190549').toString('base64')
      }
    });
    
    if (!resultsResponse.ok) {
      throw new Error(`HTTP ${resultsResponse.status}: ${resultsResponse.statusText}`);
    }
    
    const resultsData = await resultsResponse.json();
    console.log('✅ Results received!\n');
    
    // 2. Datenstruktur analysieren
    console.log('📊 Data Structure Analysis:');
    console.log('='.repeat(50));
    
    console.log('🔍 Top Level Keys:', Object.keys(resultsData));
    console.log('');
    
    if (resultsData.tasks) {
      console.log('📋 Tasks Array Length:', resultsData.tasks.length);
      
      if (resultsData.tasks[0]) {
        const task = resultsData.tasks[0];
        console.log('📋 First Task Keys:', Object.keys(task));
        console.log('');
        
        if (task.result) {
          console.log('📊 Result Type:', typeof task.result);
          console.log('📊 Result Keys:', Object.keys(task.result));
          console.log('');
          
          if (Array.isArray(task.result) && task.result[0]) {
            const result = task.result[0];
            console.log('📊 First Result Keys:', Object.keys(result));
            console.log('');
            
            if (result.lighthouse) {
              console.log('🚀 Lighthouse Keys:', Object.keys(result.lighthouse));
              console.log('');
              
              if (result.lighthouse.categories) {
                console.log('📈 Categories Keys:', Object.keys(result.lighthouse.categories));
                console.log('');
              }
              
              if (result.lighthouse.audits) {
                console.log('🔍 Audits Count:', Object.keys(result.lighthouse.audits).length);
                console.log('🔍 First 5 Audit Keys:', Object.keys(result.lighthouse.audits).slice(0, 5));
                console.log('');
              }
            } else {
              console.log('❌ No lighthouse object in result');
            }
          } else {
            console.log('❌ Result is not an array or empty');
          }
        } else {
          console.log('❌ No result in task');
        }
      } else {
        console.log('❌ No tasks in response');
      }
    } else {
      console.log('❌ No tasks array in response');
    }
    
    // 3. Vollständige Struktur als JSON (begrenzt)
    console.log('📄 Full Structure (first 1000 chars):');
    console.log('-'.repeat(30));
    console.log(JSON.stringify(resultsData, null, 2).substring(0, 1000));
    console.log('...\n');
    
    // 4. Teste Summary Endpoint
    console.log('2️⃣ Testing Summary Endpoint...');
    const summaryResponse = await fetch(`${baseUrl}/v3/on_page/lighthouse/summary/${taskId}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('marcos.gonzalez@you-rank.de:23778ba164190549').toString('base64')
      }
    });
    
    const summaryData = await summaryResponse.json();
    console.log('📊 Summary Response Status:', summaryResponse.status);
    console.log('📊 Summary Response:', JSON.stringify(summaryData, null, 2));
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Debug ausführen
debugLighthouseStructure();
