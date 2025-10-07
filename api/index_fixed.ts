// Express Request/Response types instead of Next.js
import { Request, Response } from 'express';

interface McpRequest {
  method: string;
  params?: {
    name?: string;
    arguments?: Record<string, any>;
  };
  id?: string | null;
}

interface McpResponse {
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
  id: string | null;
}

interface DataForSEOResponse {
  status: number;
  body: any;
}

// MCP handler function
async function handleMcpRequest(req: Request, res: Response) {
  try {
    const { method, params } = req.body as McpRequest;
    
    // Check if it's a tools/call request
    if (method === 'tools/call' && params?.name) {
      const apiName = params.name;
      const arguments_ = params.arguments || {};

      // Universal handling for ALL APIs with German defaults and location mapping  
      if (true) { // Handle ALL APIs universally
        const engine = apiName.includes('_bing_')
          ? 'bing'
          : apiName.includes('_yahoo_')
          ? 'yahoo'
          : (arguments_.search_engine || 'google');

        // Universal endpoint mapping for ALL APIs
        let endpoint: string;
        if (apiName === 'serp_locations') {
          const country = arguments_.country_code || 'US';
          endpoint = `/v3/serp/${engine}/locations/${country}`;
        } else if ((ALL_ENDPOINTS as Record<string, string>)[apiName]) {
          // Use ALL_ENDPOINTS mapping for known APIs
          endpoint = (ALL_ENDPOINTS as Record<string, string>)[apiName];
        } else {
          // Fallback: Unknown API
          return res.status(400).json({ 
            jsonrpc: '2.0', 
            error: { code: -32601, message: 'Method not found: ' + apiName }, 
            id: req.body?.id || null 
          });
        }
        
        // Deutsche Standardwerte für ALLE APIs - universelle Parameter-Sammlung
        const requestData = [{
          // Location & Language (für alle APIs relevant)
          location_name: normalizeLocationName(arguments_.location_name || arguments_.location),
          language_code: arguments_.language_code || 'de',
          language_name: arguments_.language_name,
          
          // SERP & Search Parameter
          keyword: arguments_.keyword,
          depth: arguments_.depth || 20,
          max_crawl_pages: arguments_.max_crawl_pages || 1,
          device: arguments_.device || 'desktop',
          people_also_ask_click_depth: arguments_.people_also_ask_click_depth,
          
          // Business Data & Merchant Parameter
          search_partners: arguments_.search_partners,
          include_adult_keywords: arguments_.include_adult_keywords,
          limit: arguments_.limit || 100,
          
          // Domain Analytics Parameter
          domain: arguments_.domain || arguments_.target,
          target: arguments_.target || arguments_.domain,
          technology: arguments_.technology,
          html_terms: arguments_.html_terms,
          
          // Content Analysis Parameter
          query: arguments_.query,
          content: arguments_.content,
          text: arguments_.text,
          
          // Keywords Data Parameter
          keywords: arguments_.keywords,
          site: arguments_.site,
          
          // OnPage Parameter
          url: arguments_.url,
          
          // Backlinks Parameter
          backlinks_status_type: arguments_.backlinks_status_type,
          
          // Alle anderen Parameter durchreichen
          ...Object.fromEntries(
            Object.entries(arguments_).filter(([key, value]) => 
              !['location_name', 'location', 'language_code', 'language_name'].includes(key) && 
              value !== undefined && value !== null && value !== ''
            )
          )
        }];

        // Determine HTTP method based on endpoint pattern
        const httpMethod = (endpoint.includes('/languages') || 
                           endpoint.includes('/audits') || 
                           endpoint.includes('/versions') || 
                           endpoint.includes('/available_filters') || 
                           endpoint.includes('/index') || 
                           endpoint.includes('/status') || 
                           endpoint.includes('/locations') || 
                           endpoint.includes('/categories') || 
                           endpoint.includes('/grammar_rules') || 
                           endpoint.includes('/tasks_ready') || 
                           endpoint.includes('/task_get/') || 
                           endpoint.includes('/ad_url/') ||
                           endpoint.includes('/models') ||
                           endpoint.includes('/id_list') ||
                           endpoint.includes('/errors')) ? 'GET' : 'POST';

        const dataforseoResponse: DataForSEOResponse = await makeDataForSEORequest(endpoint, httpMethod === 'POST' ? requestData : null, httpMethod);
        if (dataforseoResponse.status === 200) {
          return res.json({ jsonrpc: '2.0', result: dataforseoResponse.body, id: req.body?.id || null });
        }
        return res.status(500).json({ jsonrpc: '2.0', error: { code: -32603, message: 'DataForSEO API returned an error' }, id: req.body?.id || null });
      } else {
        // Handle unknown methods  
        res.status(400).json({
          jsonrpc: "2.0",
          error: {
            code: -32601,
            message: "Method not found or not implemented"
          },
          id: req.body?.id || null
        });
      }
    } else {
      // Handle other methods or return error
      res.status(400).json({
        jsonrpc: "2.0",
        error: {
          code: -32601,
          message: "Method not found or not implemented"
        },
        id: req.body?.id || null
      });
    }
  } catch (error: any) {
    console.error('Error in MCP handler:', error);
    res.status(500).json({
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal server error: " + error.message
      },
      id: req.body?.id || null
    });
  }
}

// Placeholder functions - these would need to be implemented or imported
declare const ALL_ENDPOINTS: Record<string, string>;
declare function normalizeLocationName(location: string): string;
declare function makeDataForSEORequest(endpoint: string, data: any, method: string): Promise<DataForSEOResponse>;

export { handleMcpRequest };
