"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataForSEOClient = void 0;
const global_tool_js_1 = require("../config/global.tool.js");
class DataForSEOClient {
    constructor(config) {
        this.config = config;
        if (global_tool_js_1.defaultGlobalToolConfig.debug) {
            console.error('DataForSEOClient initialized with config:', config);
        }
        const token = btoa(`${config.username}:${config.password}`);
        this.authHeader = `Basic ${token}`;
    }
    async makeRequest(endpoint, method = 'POST', body, forceFull = false) {
        let url = `${this.config.baseUrl || "https://api.dataforseo.com"}${endpoint}`;
        if (!global_tool_js_1.defaultGlobalToolConfig.fullResponse && !forceFull) {
            url += '.ai';
        }
        // Import version dynamically to avoid circular dependencies
        const { version } = await Promise.resolve().then(() => require('../utils/version.js'));
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
}
exports.DataForSEOClient = DataForSEOClient;
