// Test Script für Blob Proxy Fix
// Testet den korrigierten Blob Proxy für Lighthouse-Daten

const testBlobProxy = async () => {
  const baseUrl = 'https://yourank-mcp.vercel.app';
  const proxyUrl = 'https://yourank-mcp.vercel.app/api/blob/proxy?url=https%3A%2F%2Feqgnvwc3atpdfa56.public.blob.vercel-storage.com%2Flighthouse%2F1759343753334-355ceba2-2a05-4895-86f1-da662a953f10.json';
  
  console.log('🧪 Testing Blob Proxy Fix...\n');
  console.log(`🔗 Proxy URL: ${proxyUrl}\n`);
  
  try {
    // Teste Blob Proxy
    console.log('1️⃣ Testing Blob Proxy...');
    const proxyResponse = await fetch(proxyUrl);
    
    console.log('📊 Proxy Response Status:', proxyResponse.status);
    console.log('📊 Proxy Response Headers:', Object.fromEntries(proxyResponse.headers.entries()));
    
    if (proxyResponse.ok) {
      console.log('✅ Blob Proxy funktioniert!');
      
      // Teste JSON-Parsing
      const proxyData = await proxyResponse.json();
      console.log('\n📋 Blob Data Structure:');
      console.log('Keys:', Object.keys(proxyData));
      
      if (proxyData.tasks) {
        console.log('✅ Tasks array found');
        console.log('Task count:', proxyData.tasks.length);
        
        if (proxyData.tasks[0]?.result) {
          console.log('✅ Result found');
          const result = proxyData.tasks[0].result[0];
          console.log('Result keys:', Object.keys(result));
          
          if (result.categories) {
            console.log('✅ Categories found');
            console.log('Category keys:', Object.keys(result.categories));
            
            // Zeige Scores
            console.log('\n🎯 Lighthouse Scores:');
            Object.entries(result.categories).forEach(([category, data]) => {
              if (data.score !== undefined) {
                const percentage = Math.round(data.score * 100);
                console.log(`${category}: ${percentage}%`);
              }
            });
          }
          
          if (result.audits) {
            console.log('\n🔍 Audits found:', Object.keys(result.audits).length);
            
            // Zeige Top Issues
            const issues = Object.entries(result.audits)
              .filter(([_, audit]) => audit.score !== null && audit.score < 0.9)
              .sort(([_, a], [__, b]) => a.score - b.score)
              .slice(0, 5);
            
            console.log('\n🚨 Top Issues:');
            issues.forEach(([id, audit], index) => {
              const percentage = Math.round(audit.score * 100);
              console.log(`${index + 1}. ${audit.title} (${percentage}%)`);
            });
          }
        }
      }
      
    } else {
      console.log('❌ Blob Proxy failed:', proxyResponse.status);
      const errorText = await proxyResponse.text();
      console.log('Error:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Test ausführen
testBlobProxy();
