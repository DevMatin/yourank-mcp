// Business Utilities API - Business Data Utilities
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

export const BusinessUtilitiesApis: ToolApi[] = [
  {
    id: "dataforseo-business-utilities",
    name: "Business Utilities API",
    description:
      "Business Data Utilities mit 5 APIs für Task-Management, Error-Handling, Hotel-Suchen und Google Reviews. Unterstützende Tools für Business Data Analyse.",
    category: "Business Utilities",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Business Utilities API - Support Tools",
        description:
          "5 APIs für Business Data Utility-Funktionen mit Task-Verwaltung, Error-Monitoring, Hotel-Suche und Google Reviews-Analyse.",
        version: "v1.0.0",
        contact: {
          name: "DataForSEO",
          url: "https://dataforseo.com"
        }
      },
      servers: [
        {
          url: "https://mcp-server-typescript-six.vercel.app",
          description: "Vercel MCP Server"
        }
      ],
      paths: {
        "/business_data_id_list": {
          post: {
            summary: "Business Data ID List",
            description: "Liste aller abgeschlossenen Business Data Tasks",
            operationId: "businessDataIdList",
            tags: ["Business Utilities - Management"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      date_from: { type: "string", description: "Start-Datum (YYYY-MM-DD)" },
                      date_to: { type: "string", description: "End-Datum (YYYY-MM-DD)" },
                      limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 1000 }
                    }
                  }
                }
              }
            }
          }
        },
        "/business_data_google_hotel_searches_live": {
          post: {
            summary: "Google Hotel Searches",
            description: "Hotel-Suche auf Google mit detaillierten Hotel-Informationen",
            operationId: "googleHotelSearches",
            tags: ["Business Utilities - Hotels"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["keyword", "location_code"],
                    properties: {
                      keyword: { type: "string", description: "Hotel-Suchbegriff" },
                      location_code: { type: "integer", description: "Standort-Code" },
                      check_in: { type: "string", description: "Check-in Datum (YYYY-MM-DD)" },
                      check_out: { type: "string", description: "Check-out Datum (YYYY-MM-DD)" }
                    }
                  }
                }
              }
            }
          }
        },
        "/business_data_google_reviews_live": {
          post: {
            summary: "Google Reviews",
            description: "Google-Bewertungen für ein spezifisches Business",
            operationId: "googleReviews",
            tags: ["Business Utilities - Reviews"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["business_name", "location_code"],
                    properties: {
                      business_name: { type: "string", description: "Name des Geschäfts" },
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
