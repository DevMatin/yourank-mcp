// Test verfügbare Tools
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

async function getAvailableTools() {
  console.log('🔍 Abrufen der verfügbaren Tools...');
  
  const request = {
    jsonrpc: "2.0",
    method: "tools/list",
    params: {},
    id: "list_tools"
  };

  try {
    const response = await makeHttpRequest(request);
    console.log('Status:', response.status);
    
    if (response.body && response.body.result && response.body.result.tools) {
      const tools = response.body.result.tools;
      console.log(`\n📋 ${tools.length} Tools verfügbar:`);
      
      // Suche OnPage Tools
      const onPageTools = tools.filter(tool => 
        tool.name.includes('on_page') || 
        tool.name.includes('taskpost') ||
        tool.name.includes('instant_pages')
      );
      
      console.log(`\n🔧 OnPage Tools (${onPageTools.length}):`);
      onPageTools.forEach(tool => {
        console.log(`  • ${tool.name}: ${tool.description}`);
      });
      
      return tools;
    } else {
      console.log('❌ Keine Tools gefunden');
      console.log('Response:', JSON.stringify(response.body, null, 2));
    }
  } catch (error) {
    console.error('❌ Fehler:', error.message);
  }
}

getAvailableTools();
