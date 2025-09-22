"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGlobalToolConfig = exports.GlobalToolConfigSchema = void 0;
exports.parseGlobalToolConfig = parseGlobalToolConfig;
const zod_1 = require("zod");
exports.GlobalToolConfigSchema = zod_1.z.object({
    fullResponse: zod_1.z.boolean().default(false),
    debug: zod_1.z.boolean().default(false)
});
// Parse config from environment variables
function parseGlobalToolConfig() {
    const fullResponseEnv = process.env.DATAFORSEO_FULL_RESPONSE;
    const debugEnv = process.env.DEBUG;
    const config = {
        fullResponse: fullResponseEnv === 'true',
        debug: debugEnv === 'true'
    };
    return exports.GlobalToolConfigSchema.parse(config);
}
// Export default config
exports.defaultGlobalToolConfig = parseGlobalToolConfig();
