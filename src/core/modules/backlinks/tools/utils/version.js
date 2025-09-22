"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.version = void 0;
// Environment detection and version loading for both Node.js and Workers
let packageVersion = '1.0.0'; // Default version
let packageName = 'dataforseo-mcp-server'; // Default name
// Check if we're in a Node.js environment (has fs module)
const isNodeEnvironment = typeof globalThis !== 'undefined' &&
    typeof globalThis.process !== 'undefined' &&
    globalThis.process.versions?.node;
if (isNodeEnvironment) {
    // Node.js environment - read from package.json
    try {
        const fs = await Promise.resolve().then(() => require('fs'));
        const path = await Promise.resolve().then(() => require('path'));
        const { fileURLToPath } = await Promise.resolve().then(() => require('url'));
        // Get the directory of the current module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const packageJsonPath = path.resolve(__dirname, '../../../../package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageVersion = packageJson.version || packageVersion;
        packageName = packageJson.name || packageName;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Could not read package.json, using default version:', errorMessage);
    }
}
else {
    // Worker environment - use compile-time constants
    // These will be replaced by the build process or use defaults
    packageVersion = globalThis.__PACKAGE_VERSION__ || packageVersion;
    packageName = globalThis.__PACKAGE_NAME__ || packageName;
}
exports.version = packageVersion;
exports.name = packageName;
exports.default = {
    version: exports.version,
    name: exports.name
};
