#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DataForSEOClient } from '../core/client/dataforseo.client.js';
import { EnabledModulesSchema } from '../core/config/modules.config.js';
import { z } from 'zod';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { randomUUID } from "node:crypto";
import { name, version } from '../core/utils/version.js';
import { ModuleLoaderService } from "../core/utils/module-loader.js";
import { initializeFieldConfiguration } from '../core/config/field-configuration.js';
import { MerchantApiModule } from '../core/modules/merchant/merchant-api.module.js';
import { SerpApiModule } from '../core/modules/serp/serp-api.module.js';
import { isModuleEnabled } from '../core/config/modules.config.js';
// Initialize field configuration if provided
initializeFieldConfiguration();
console.error('Starting DataForSEO MCP Server...');
console.error(`Server name: ${name}, version: ${version}`);
function getServer(username, password) {
    const server = new McpServer({
        name,
        version,
    }, { capabilities: { logging: {} } });
    // Initialize DataForSEO client
    const dataForSEOConfig = {
        username: username || "",
        password: password || "",
    };
    const dataForSEOClient = new DataForSEOClient(dataForSEOConfig);
    console.error('DataForSEO client initialized');
    // Parse enabled modules from environment
    let enabledModules = EnabledModulesSchema.parse(process.env.ENABLED_MODULES);
    
    // Ensure CONTENT_GENERATION is enabled
    if (!enabledModules.includes('CONTENT_GENERATION')) {
        enabledModules = [...enabledModules, 'CONTENT_GENERATION'];
        console.error('CONTENT_GENERATION module explicitly enabled');
    }
    
    // Ensure SERP is enabled
    if (!enabledModules.includes('SERP')) {
        enabledModules = [...enabledModules, 'SERP'];
        console.error('SERP module explicitly enabled');
    }
    
    // Initialize modules
    const modules = ModuleLoaderService.loadModules(dataForSEOClient, enabledModules);
    
    // Always add SERP API Module if not already loaded
    let serpModuleLoaded = false;
    for (const module of modules) {
        if (module.constructor.name === 'SerpApiModule') {
            serpModuleLoaded = true;
            break;
        }
    }

    if (!serpModuleLoaded) {
        console.error('Explicitly loading SERP API Module...');
        try {
            const serpModule = new SerpApiModule(dataForSEOClient);
            modules.push(serpModule);
            console.error('SERP API Module loaded explicitly');
        } catch (error) {
            console.error('Failed to load SERP API Module:', error);
        }
    }
    
    console.error('Modules initialized');
    function registerModuleTools() {
        console.error('Registering tools');
        console.error(modules.length);
        modules.forEach(module => {
            const tools = module.getTools();
            Object.entries(tools).forEach(([name, tool]) => {
                const typedTool = tool;
                const schema = z.object(typedTool.params);
                server.tool(name, typedTool.description, schema.shape, typedTool.handler);
            });
        });
    }
    registerModuleTools();
    console.error('Tools registered');
    return server;
}
function getSessionId() {
    return randomUUID().toString();
}
async function main() {
    const app = express();
    app.use(express.json());
    // Basic Auth Middleware
    const basicAuth = (req, res, next) => {
        // Check for Authorization header
        const authHeader = req.headers.authorization;
        console.error(authHeader);
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            next();
            return;
        }
        // Extract credentials
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        if (!username || !password) {
            console.error('Invalid credentials');
            res.status(401).json({
                jsonrpc: "2.0",
                error: {
                    code: -32001,
                    message: "Invalid credentials"
                },
                id: null
            });
            return;
        }
        // Add credentials to request
        req.username = username;
        req.password = password;
        next();
    };
    const handleMcpRequest = async (req, res) => {
        // In stateless mode, create a new instance of transport and server for each request
        // to ensure complete isolation. A single instance would cause request ID collisions
        // when multiple clients connect concurrently.
        try {
            console.error(Date.now().toLocaleString());
            // Check if we have valid credentials
            if (!req.username && !req.password) {
                // If no request auth, check environment variables
                const envUsername = process.env.DATAFORSEO_USERNAME;
                const envPassword = process.env.DATAFORSEO_PASSWORD;
                if (!envUsername || !envPassword) {
                    console.error('No DataForSEO credentials provided');
                    res.status(401).json({
                        jsonrpc: "2.0",
                        error: {
                            code: -32001,
                            message: "Authentication required. Provide DataForSEO credentials."
                        },
                        id: null
                    });
                    return;
                }
                // Use environment variables
                req.username = envUsername;
                req.password = envPassword;
            }
            const server = getServer(req.username, req.password);
            console.error(Date.now().toLocaleString());
            const transport = new StreamableHTTPServerTransport({
                sessionIdGenerator: undefined
            });
            await server.connect(transport);
            console.error('handle request');
            await transport.handleRequest(req, res, req.body);
            console.error('end handle request');
            req.on('close', () => {
                console.error('Request closed');
                transport.close();
                server.close();
            });
        }
        catch (error) {
            console.error('Error handling MCP request:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32603,
                        message: 'Internal server error',
                    },
                    id: null,
                });
            }
        }
    };
    const handleNotAllowed = (method) => async (req, res) => {
        console.error(`Received ${method} request`);
        res.status(405).json({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed."
            },
            id: null
        });
    };
    // Apply basic auth and shared handler to both endpoints
    app.post('/http', basicAuth, handleMcpRequest);
    app.post('/mcp', basicAuth, handleMcpRequest);
    app.get('/http', handleNotAllowed('GET HTTP'));
    app.get('/mcp', handleNotAllowed('GET MCP'));
    app.delete('/http', handleNotAllowed('DELETE HTTP'));
    app.delete('/mcp', handleNotAllowed('DELETE MCP'));
    // Start the server
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.listen(PORT, () => {
        console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
    });
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
