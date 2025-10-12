import { defaultGlobalToolConfig } from '../config/global.tool.js';

export class DataForSEOClient {
  private config: DataForSEOConfig;
  private authHeader: string;

  constructor(config: DataForSEOConfig) {
    this.config = config;
    if(defaultGlobalToolConfig.debug) {
      console.error('DataForSEOClient initialized with config:', config);
    }
    const token = btoa(`${config.username}:${config.password}`);
    this.authHeader = `Basic ${token}`;
  }

  async makeRequest<T>(endpoint: string, method: string = 'POST', body?: any, forceFull: boolean = false): Promise<T> {
    let url = `${this.config.baseUrl || "https://api.dataforseo.com"}${endpoint}`;    
    // Only add .ai suffix for specific endpoints that support it
    if(!defaultGlobalToolConfig.fullResponse && !forceFull && this.shouldUseAiEndpoint(endpoint)){
      url += '.ai';
    }
    // Import version dynamically to avoid circular dependencies
    const { version } = await import('../utils/version.js');
    
    const headers = {
      'Authorization': this.authHeader,
      'Content-Type': 'application/json',
      'User-Agent': `DataForSEO-MCP-TypeScript-SDK/${version}`
    };

    console.error(`Making request to ${url} with method ${method} and body`, body);
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private shouldUseAiEndpoint(endpoint: string): boolean {
    // Define endpoints that support .ai suffix
    const aiSupportedEndpoints = [
      '/v3/serp/google/organic/live',
      '/v3/serp/google/organic/live/advanced',
      '/v3/serp/google/organic/live/html',
      '/v3/serp/google/organic/live/regular',
      '/v3/serp/google/live',
      '/v3/serp/google/live/advanced',
      '/v3/serp/google/live/html',
      '/v3/serp/google/live/regular'
    ];
    
    return aiSupportedEndpoints.some(aiEndpoint => endpoint.includes(aiEndpoint));
  }
} 

export interface DataForSEOConfig {
  username: string;
  password: string;
  baseUrl?: string;
}