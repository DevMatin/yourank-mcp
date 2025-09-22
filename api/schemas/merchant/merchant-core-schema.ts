// DataForSEO MCP Server Schema
// Temporärer Import - die envs Datei existiert noch nicht
const getDataForSEOAuthHeader = () => "Bearer YOUR_API_KEY_HERE"

export interface ToolApi {
  id: string
  name: string
  description: string
  category: string
  icon: string
  url?: string
  customHeaders?: object
  schema: object
}

// Merchant Core API - Grundlegende Merchant-Funktionen
export const MerchantCoreApis: ToolApi[] = [
  {
    id: "dataforseo-merchant-core",
    name: "Merchant Core API",
    description:
      "Grundlegende Merchant-Funktionen: ID-Listen, Fehlerbehandlung, Screenshots und Aufgabenverwaltung. E-Commerce-übergreifende Utilities.",
    category: "Merchant Core",
    icon: "🏪",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Merchant API - Core-Funktionen",
        description: "Grundlegende Merchant-Funktionen für alle E-Commerce-Plattformen",
        version: "v1.0.0",
        contact: {
          name: "DataForSEO",
          url: "https://dataforseo.com"
        }
      },
      servers: [
        {
          url: "https://yourank-mcp.vercel.app",
          description: "Vercel MCP Server"
        }
      ],
      paths: {
        "/v3/merchant/id_list": { "$ref": "./merchant/merchant-core.yaml#/~1v3~1merchant~1id_list" },
        "/v3/merchant/errors": { "$ref": "./merchant/merchant-core.yaml#/~1v3~1merchant~1errors" },
        "/v3/merchant/screenshot": { "$ref": "./merchant/merchant-core.yaml#/~1v3~1merchant~1screenshot" },
        "/v3/merchant/tasks_ready": { "$ref": "./merchant/merchant-core.yaml#/~1v3~1merchant~1tasks_ready" }
      }
    }
  }
]
