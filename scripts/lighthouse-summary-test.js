// Test Script für Lighthouse Summary Endpoint
// Testet die neue Summary-Funktionalität für große Lighthouse Responses

const testLighthouseSummary = async () => {
  const baseUrl = 'https://yourank-mcp.vercel.app';
  const taskId = '10012111-1064-0317-0000-bc0183b166b7'; // Deine Task-ID
  
  console.log('🧪 Testing Lighthouse Summary Endpoint...\n');
  console.log(`📋 Task ID: ${taskId}\n`);
  
  try {
    // Lighthouse Summary abrufen
    console.log('1️⃣ Fetching Lighthouse Summary...');
    const summaryResponse = await fetch(`${baseUrl}/v3/on_page/lighthouse/summary/${taskId}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('marcos.gonzalez@you-rank.de:23778ba164190549').toString('base64')
      }
    });
    
    if (!summaryResponse.ok) {
      throw new Error(`HTTP ${summaryResponse.status}: ${summaryResponse.statusText}`);
    }
    
    const summaryData = await summaryResponse.json();
    console.log('✅ Summary received successfully!\n');
    
    // Zeige wichtige Informationen
    console.log('📊 Lighthouse Summary:');
    console.log('='.repeat(50));
    console.log(`🌐 URL: ${summaryData.url}`);
    console.log(`⏰ Fetch Time: ${summaryData.fetch_time}`);
    console.log(`🔧 Lighthouse Version: ${summaryData.lighthouse_version}`);
    console.log(`📋 Task ID: ${summaryData.task_id}\n`);
    
    // Scores anzeigen
    console.log('🎯 Lighthouse Scores:');
    console.log('-'.repeat(30));
    if (summaryData.scores) {
      Object.entries(summaryData.scores).forEach(([category, score]) => {
        if (score !== null) {
          const percentage = Math.round(score * 100);
          const emoji = percentage >= 90 ? '🟢' : percentage >= 50 ? '🟡' : '🔴';
          console.log(`${emoji} ${category.toUpperCase()}: ${percentage}% (${score})`);
        }
      });
    }
    console.log('');
    
    // Performance Metrics anzeigen
    if (summaryData.performance_metrics) {
      console.log('⚡ Performance Metrics:');
      console.log('-'.repeat(30));
      Object.entries(summaryData.performance_metrics).forEach(([metric, data]) => {
        if (data.displayValue) {
          console.log(`📈 ${metric}: ${data.displayValue} (Score: ${data.score})`);
        }
      });
      console.log('');
    }
    
    // Top Issues anzeigen
    if (summaryData.top_issues && summaryData.top_issues.length > 0) {
      console.log('🚨 Top Issues (schlechteste Scores):');
      console.log('-'.repeat(30));
      summaryData.top_issues.slice(0, 5).forEach((issue, index) => {
        const percentage = Math.round(issue.score * 100);
        const emoji = percentage >= 90 ? '🟢' : percentage >= 50 ? '🟡' : '🔴';
        console.log(`${index + 1}. ${emoji} ${issue.title}`);
        console.log(`   Score: ${percentage}% | Category: ${issue.category}`);
        console.log(`   Description: ${issue.description.substring(0, 100)}...`);
        console.log('');
      });
    }
    
    // Blob Storage Info
    if (summaryData.blob_storage) {
      console.log('📦 Blob Storage Info:');
      console.log('-'.repeat(30));
      console.log(`💾 Storage: ${summaryData.blob_storage.storage}`);
      console.log(`📏 Size: ${summaryData.blob_storage.size_bytes} bytes`);
      console.log(`🔗 Proxy URL: ${summaryData.blob_storage.proxy_url}`);
      console.log(`⏰ Expires: ${summaryData.blob_storage.expires_at}`);
      console.log('');
    }
    
    console.log('🎉 Summary Test completed successfully!');
    console.log(`📝 Message: ${summaryData._message}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Test ausführen
testLighthouseSummary();
