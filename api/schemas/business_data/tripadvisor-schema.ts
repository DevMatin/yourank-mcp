// TripAdvisor API - TripAdvisor Business Data
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

export const TripadvisorApis: ToolApi[] = [
  {
    id: "dataforseo-tripadvisor",
    name: "TripAdvisor API",
    description:
      "TripAdvisor Business Data mit 5 APIs für Standorte, Sprachen, Suche und Reviews. Spezialisiert für Tourismus- und Hospitality-Branche mit umfassenden Bewertungsdaten.",
    category: "TripAdvisor",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO TripAdvisor API - Business Data",
        description:
          "5 APIs für TripAdvisor-Geschäftsdaten mit Locations, Reviews und Suchfunktionen. Optimiert für Tourismus- und Hospitality-Analyse.",
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
        "/business_data_tripadvisor_locations": {
          get: {
            summary: "TripAdvisor Locations",
            description: "Liste aller verfügbaren TripAdvisor Standorte (nur City und Region)",
            operationId: "tripadvisorLocations",
            tags: ["TripAdvisor - Locations"]
          }
        },
        "/business_data_tripadvisor_search_live": {
          post: {
            summary: "TripAdvisor Search",
            description: "Suche nach Geschäftsprofilen auf TripAdvisor",
            operationId: "tripadvisorSearch",
            tags: ["TripAdvisor - Search"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["keyword", "location_code"],
                    properties: {
                      keyword: { type: "string", description: "Suchbegriff für TripAdvisor" },
                      location_code: { type: "integer", description: "TripAdvisor Standort-Code" },
                      limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 20 }
                    }
                  }
                }
              }
            }
          }
        },
        "/business_data_tripadvisor_reviews_live": {
          post: {
            summary: "TripAdvisor Reviews",
            description: "Bewertungen eines spezifischen TripAdvisor-Geschäftsprofils",
            operationId: "tripadvisorReviews",
            tags: ["TripAdvisor - Reviews"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["url_path"],
                    properties: {
                      url_path: { type: "string", description: "TripAdvisor URL-Pfad des Geschäfts" },
                      location_code: { type: "integer", description: "Standort-Code" },
                      limit: { type: "integer", description: "Anzahl Reviews", maximum: 100 }
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
