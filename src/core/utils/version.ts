// Environment detection and version loading for both Node.js and Workers
let packageVersion = '1.0.0'; // Default version
let packageName = 'dataforseo-mcp-server'; // Default name

// Type declarations for worker environment globals
declare global {
  var __PACKAGE_VERSION__: string | undefined;
  var __PACKAGE_NAME__: string | undefined;
}

// Check if we're in a Node.js environment (has fs module)
const isNodeEnvironment = typeof globalThis !== 'undefined' && 
  typeof globalThis.process !== 'undefined' && 
  globalThis.process.versions?.node;

if (isNodeEnvironment) {
  // Node.js environment - read from package.json
  try {
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');

    // Get the directory of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Try multiple possible locations for package.json
    const possiblePaths = [
      path.resolve(process.cwd(), 'package.json'), // Current working directory
      path.resolve(__dirname, '../../../../package.json'), // Original relative path
      path.resolve(__dirname, '../../../package.json'), // Alternative relative path
      path.resolve(__dirname, '../../package.json'), // Another alternative
      path.resolve(__dirname, '../package.json'), // Closer alternative
    ];

    let packageJsonPath: string | null = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        packageJsonPath = possiblePath;
        break;
      }
    }

    if (packageJsonPath) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageVersion = packageJson.version || packageVersion;
      packageName = packageJson.name || packageName;
    } else {
      console.warn('Could not find package.json in any expected location, using default version');
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn('Could not read package.json, using default version:', errorMessage);
  }
} else {
  // Worker environment - use compile-time constants
  // These will be replaced by the build process or use defaults
  packageVersion = globalThis.__PACKAGE_VERSION__ || packageVersion;
  packageName = globalThis.__PACKAGE_NAME__ || packageName;
}

export const version = packageVersion;
export const name = packageName;

export default {
  version,
  name
};