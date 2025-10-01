// Test Script für direkten Blob-Zugriff
// Testet den direkten Zugriff auf Vercel Blob Storage ohne Proxy

const testDirectBlob = async () => {
  const directBlobUrl = 'https://eqgnvwc3atpdfa56.public.blob.vercel-storage.com/lighthouse/1759343753334-355ceba2-2a05-4895-86f1-da662a953f10.json';
  
  console.log('🧪 Testing Direct Blob Access...\n');
  console.log(`🔗 Direct Blob URL: ${directBlobUrl}\n`);
  
  try {
    // Teste direkten Blob-Zugriff
    console.log('1️⃣ Testing Direct Blob Access...');
    const blobResponse = await fetch(directBlobUrl);
    
    console.log('📊 Blob Response Status:', blobResponse.status);
    console.log('📊 Blob Response Headers:', Object.fromEntries(blobResponse.headers.entries()));
    
    if (blobResponse.ok) {
      console.log('✅ Direct Blob Access funktioniert!');
      
      // Teste JSON-Parsing
      const blobData = await blobResponse.json();
      console.log('\n📋 Blob Data Structure:');
      console.log('Keys:', Object.keys(blobData));
      
      if (blobData.tasks) {
        console.log('✅ Tasks array found');
        console.log('Task count:', blobData.tasks.length);
        
        if (blobData.tasks[0]?.result) {
          console.log('✅ Result found');
          const result = blobData.tasks[0].result[0];
          console.log('Result keys:', Object.keys(result));
          
          if (result.categories) {
            console.log('✅ Categories found');
            console.log('Category keys:', Object.keys(result.categories));
            
            // Zeige alle Scores
            console.log('\n🎯 Lighthouse Scores:');
            Object.entries(result.categories).forEach(([category, data]) => {
              if (data.score !== undefined) {
                const percentage = Math.round(data.score * 100);
                const emoji = percentage >= 90 ? '🟢' : percentage >= 50 ? '🟡' : '🔴';
                console.log(`${emoji} ${category.toUpperCase()}: ${percentage}% (${data.score})`);
              }
            });
          }
          
          if (result.audits) {
            console.log('\n🔍 Audits found:', Object.keys(result.audits).length);
            
            // Zeige Top Issues (schlechteste Scores)
            const issues = Object.entries(result.audits)
              .filter(([_, audit]) => audit.score !== null && audit.score < 0.9)
              .sort(([_, a], [__, b]) => a.score - b.score)
              .slice(0, 10);
            
            console.log('\n🚨 Top Issues (schlechteste Scores):');
            issues.forEach(([id, audit], index) => {
              const percentage = Math.round(audit.score * 100);
              const emoji = percentage >= 90 ? '🟢' : percentage >= 50 ? '🟡' : '🔴';
              console.log(`${index + 1}. ${emoji} ${audit.title} (${percentage}%)`);
              console.log(`   ID: ${id}`);
              console.log(`   Description: ${audit.description?.substring(0, 100)}...`);
              console.log('');
            });
            
            // Zeige Performance Metrics
            console.log('\n⚡ Performance Metrics:');
            const performanceAudits = [
              'first-contentful-paint',
              'largest-contentful-paint',
              'cumulative-layout-shift',
              'speed-index',
              'total-blocking-time',
              'interactive'
            ];
            
            performanceAudits.forEach(auditId => {
              const audit = result.audits[auditId];
              if (audit && audit.displayValue) {
                const percentage = Math.round(audit.score * 100);
                const emoji = percentage >= 90 ? '🟢' : percentage >= 50 ? '🟡' : '🔴';
                console.log(`${emoji} ${auditId}: ${audit.displayValue} (Score: ${percentage}%)`);
              }
            });
          }
          
          // Zeige weitere wichtige Informationen
          console.log('\n📊 Additional Info:');
          console.log('URL:', result.finalUrl || result.requestedUrl);
          console.log('Fetch Time:', result.fetchTime);
          console.log('Lighthouse Version:', result.lighthouseVersion);
          console.log('User Agent:', result.userAgent);
          
          if (result.configSettings) {
            console.log('Config Settings:', result.configSettings);
          }
          
          if (result.timing) {
            console.log('Timing:', result.timing);
          }
        }
      }
      
    } else {
      console.log('❌ Direct Blob Access failed:', blobResponse.status);
      const errorText = await blobResponse.text();
      console.log('Error:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Test ausführen
testDirectBlob();
