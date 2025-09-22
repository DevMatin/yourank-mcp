// Google Maps API - Google Maps Business Listings
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

export const GoogleMapsApis: ToolApi[] = [
  {
    id: "dataforseo-google-maps",
    name: "Google Maps API",
    description:
      "Google Maps Business Listings mit 5 APIs für lokale Geschäftssuche, Kategorien, Filter und Standorte. Optimiert für lokale SEO und Business-Discovery.",
    category: "Google Maps",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Google Maps API - Business Listings",
        description:
          "5 APIs für Google Maps Business Listings mit lokaler Geschäftssuche, Kategorien und detaillierten Standortdaten für lokale SEO.",
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
        "/business_data_business_listings_search": {
          post: {
            summary: "Business Listings Search",
            description: "Suche nach lokalen Geschäften auf Google Maps",
            operationId: "businessListingsSearch",
            tags: ["Google Maps - Search"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["keyword", "location_code"],
                    properties: {
                      keyword: { type: "string", description: "Suchbegriff für lokale Geschäfte" },
                      location_code: { type: "integer", description: "Google Maps Standort-Code" },
                      language_code: { type: "string", description: "Sprach-Code" },
                      limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 20 },
                      filters: { type: "array", description: "Suchfilter" }
                    }
                  }
                }
              }
            }
          }
        },
        "/business_data_business_listings_categories": {
          get: {
            summary: "Business Listings Categories",
            description: "Top-Kategorien von Geschäften nach Anzahl",
            operationId: "businessListingsCategories",
            tags: ["Google Maps - Categories"]
          }
        },
        "/business_data_business_listings_categories_aggregation": {
          post: {
            summary: "Categories Aggregation",
            description: "Kategorien-Aggregation mit verwandten Kategorien und Geschäftsanzahl",
            operationId: "businessListingsCategoriesAggregation",
            tags: ["Google Maps - Analytics"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["location_code"],
                    properties: {
                      location_code: { type: "integer", description: "Standort-Code" },
                      filters: { type: "array", description: "Kategorien-Filter" }
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
