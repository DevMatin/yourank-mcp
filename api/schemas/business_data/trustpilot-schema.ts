// Trustpilot API - Trustpilot Reviews & Search
import { getDataForSEOAuthHeader } from "../envs"

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

export const TrustpilotApis: ToolApi[] = [
  {
    id: "dataforseo-trustpilot",
    name: "Trustpilot API",
    description:
      "Trustpilot Reviews & Search mit 2 APIs für Geschäftsprofile und Bewertungen. Spezialisiert für Trustpilot-Datenanalyse und Reputation-Management.",
    category: "Trustpilot",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Trustpilot API - Reviews & Search",
        description:
          "2 APIs für Trustpilot-Geschäftsprofile und Bewertungsanalyse mit umfassenden Review-Daten und Suchfunktionen.",
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
        "/business_data_trustpilot_search_live": {
          post: {
            summary: "Trustpilot Search",
            description: "Suche nach Geschäftsprofilen auf Trustpilot",
            operationId: "trustpilotSearch",
            tags: ["Trustpilot - Search"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["keyword"],
                    properties: {
                      keyword: { type: "string", description: "Suchbegriff für Trustpilot-Geschäfte" },
                      limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 20 },
                      offset: { type: "integer", description: "Offset für Paginierung" }
                    }
                  }
                }
              }
            }
          }
        },
        "/business_data_trustpilot_reviews_live": {
          post: {
            summary: "Trustpilot Reviews",
            description: "Bewertungen eines spezifischen Trustpilot-Geschäftsprofils",
            operationId: "trustpilotReviews",
            tags: ["Trustpilot - Reviews"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["domain"],
                    properties: {
                      domain: { type: "string", description: "Domain des Trustpilot-Profils" },
                      limit: { type: "integer", description: "Anzahl Reviews", maximum: 100 },
                      offset: { type: "integer", description: "Offset für Paginierung" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        securitySchemes: {
          basicAuth: {
            type: "http",
            scheme: "basic"
          }
        }
      },
      security: [{ basicAuth: [] }]
    }
  }
]
