# DataForSEO MCP Server - Agent Guide

## Build & Development Commands
- `npm run build` - Compile TypeScript to build/ directory
- `npm run dev` - Watch mode for development
- `npm start` - Run compiled server
- `npm run cli` - Run CLI interface
- `npm run worker:build` - Build Cloudflare Worker version
- `npm run worker:dev` - Development mode for Worker
- Single test: `node tests/test-[specific].js` (e.g., `node tests/test-simple.js`)

## Architecture & Structure
- **Core Architecture**: Modular MCP (Model Context Protocol) server for DataForSEO APIs
- **Module System**: Each API endpoint organized as separate module in `src/core/modules/`
- **Key Directories**: 
  - `src/core/` - Core client, config, and base modules
  - `src/main/` - Main server entry points
  - `src/worker/` - Cloudflare Worker implementation
  - `apis/` - API type definitions
  - `tests/` - Extensive test suite with individual API tests
- **Transport Modes**: STDIO (main), HTTP, SSE, Worker deployments

## Code Style & Conventions
- **TypeScript**: ES2022, ESNext modules, strict mode disabled
- **Imports**: Use `.js` extensions for TypeScript imports (ESM)
- **Error Handling**: Use `formatError()` and `formatErrorResponse()` methods
- **Module Pattern**: Extend `BaseModule`, implement `getTools()` method
- **Tool Definition**: Use `ToolDefinition` interface with zod schema validation
- **Response Format**: Use `formatResponse()` for consistent MCP responses
