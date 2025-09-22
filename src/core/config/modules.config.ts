import { z } from 'zod';

// Define available module names - Erweitert um alle 11 APIs
export const AVAILABLE_MODULES = [
  'SERP', 
  'KEYWORDS_DATA', 
  'ONPAGE', 
  'DATAFORSEO_LABS', 
  'BACKLINKS', 
  'GOOGLE_BUSINESS',     // Getrennt: Google Business Data
  'TRUSTPILOT',          // Getrennt: Trustpilot Reviews & Search
  'TRIPADVISOR',         // Getrennt: TripAdvisor Business Data
  'GOOGLE_MAPS',         // Getrennt: Google Maps Business Listings
  'SOCIAL_MEDIA',        // Getrennt: Social Media APIs
  'BUSINESS_UTILITIES',  // Getrennt: Business Data Utilities
  'DOMAIN_ANALYTICS', 
  'CONTENT_ANALYSIS',
  'CONTENT_GENERATION',  // Neue API
  'MERCHANT',            // Neue API
  'GOOGLE_SHOPPING',     // Neue API
  'AI_OPTIMIZATION',     // Neue API
  'APP_DATA'             // App Data APIs
] as const;
export type ModuleName = typeof AVAILABLE_MODULES[number];

// Schema for validating the ENABLED_MODULES environment variable
export const EnabledModulesSchema = z.any()
  .transform((val:string) => {
    if (!val) return AVAILABLE_MODULES; // If not set, enable all modules
    return val.toString().split(',').map(name => name.trim().toUpperCase() as ModuleName);
  })
  .refine((modules) => {
    return modules.every(module => AVAILABLE_MODULES.includes(module));
  }, {
    message: `Invalid module name. Available modules are: ${AVAILABLE_MODULES.join(', ')}`
  });

export type EnabledModules = z.infer<typeof EnabledModulesSchema>;

// Helper function to check if a module is enabled
export function isModuleEnabled(moduleName: ModuleName, enabledModules: EnabledModules): boolean {
  return enabledModules.includes(moduleName);
}

// Default configuration (all modules enabled)
export const defaultEnabledModules: EnabledModules = AVAILABLE_MODULES; 