// Test Script für Lighthouse Blob Storage Implementation
// Testet die neue Blob Storage Funktionalität für große Lighthouse Responses

const testLighthouseBlob = async () => {
  const baseUrl = 'https://yourank-mcp.vercel.app';
  
  console.log('🧪 Testing Lighthouse Blob Storage Implementation...\n');
  
  try {
    // 1. Lighthouse Task erstellen
    console.log('1️⃣ Creating Lighthouse Task...');
    const taskResponse = await fetch(`${baseUrl}/v3/on_page/lighthouse/task_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('marcos.gonzalez@you-rank.de:23778ba164190549').toString('base64')
      },
      body: JSON.stringify({
        url: 'https://example.com',
        enable_javascript: true,
        categories: ['performance', 'accessibility', 'seo']
      })
    });
    
    const taskData = await taskResponse.json();
    console.log('✅ Task created:', taskData);
    
    if (!taskData.tasks?.[0]?.data?.task_id) {
      throw new Error('No task ID received');
    }
    
    const taskId = taskData.tasks[0].data.task_id;
    console.log(`📋 Task ID: ${taskId}\n`);
    
    // 2. Warten bis Task fertig ist
    console.log('2️⃣ Waiting for task completion...');
    let attempts = 0;
    let taskReady = false;
    
    while (attempts < 30 && !taskReady) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 Sekunden warten
      
      const readyResponse = await fetch(`${baseUrl}/v3/on_page/lighthouse/tasks_ready`, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from('marcos.gonzalez@you-rank.de:23778ba164190549').toString('base64')
        }
      });
      
      const readyData = await readyResponse.json();
      console.log(`⏳ Attempt ${attempts + 1}: Checking task status...`);
      
      if (readyData.tasks?.some(task => task.id === taskId)) {
        taskReady = true;
        console.log('✅ Task is ready!\n');
      }
      
      attempts++;
    }
    
    if (!taskReady) {
      throw new Error('Task did not complete within timeout');
    }
    
    // 3. Lighthouse Ergebnisse abrufen
    console.log('3️⃣ Fetching Lighthouse results...');
    const resultsResponse = await fetch(`${baseUrl}/v3/on_page/lighthouse/task_get/json/${taskId}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('marcos.gonzalez@you-rank.de:23778ba164190549').toString('base64')
      }
    });
    
    const resultsData = await resultsResponse.json();
    console.log('📊 Results received:', {
      status_code: resultsData.status_code,
      status_message: resultsData.status_message,
      has_blob_storage: !!resultsData.blob_storage,
      has_summary: !!resultsData.summary,
      message: resultsData._message
    });
    
    // 4. Prüfe ob Blob Storage verwendet wurde
    if (resultsData.blob_storage) {
      console.log('\n🎯 Blob Storage wurde verwendet!');
      console.log('📦 Blob Storage Info:', {
        storage: resultsData.blob_storage.storage,
        size_bytes: resultsData.blob_storage.size_bytes,
        proxy_url: resultsData.blob_storage.proxy_url,
        expires_at: resultsData.blob_storage.expires_at
      });
      
      console.log('\n📈 Lighthouse Summary:', resultsData.summary);
      
      // 5. Teste Proxy URL
      console.log('\n4️⃣ Testing proxy URL...');
      const proxyResponse = await fetch(resultsData.blob_storage.proxy_url);
      
      if (proxyResponse.ok) {
        const proxyData = await proxyResponse.json();
        console.log('✅ Proxy URL funktioniert!');
        console.log('📊 Full data available via proxy:', {
          has_tasks: !!proxyData.tasks,
          task_count: proxyData.tasks?.length || 0,
          has_lighthouse: !!proxyData.tasks?.[0]?.result?.[0]?.lighthouse
        });
      } else {
        console.log('❌ Proxy URL failed:', proxyResponse.status);
      }
      
    } else {
      console.log('\n📝 Normale Response (kein Blob Storage nötig)');
      console.log('📊 Direct data:', {
        has_tasks: !!resultsData.tasks,
        task_count: resultsData.tasks?.length || 0
      });
    }
    
    console.log('\n🎉 Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Test ausführen
testLighthouseBlob();
