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

export const TrendsLabsApis: ToolApi[] = [
  {
    id: "dataforseo-trends-labs",
    name: "Trends Labs API",
    description:
      "Spezialisierte Trends-Analyse mit 5 verschiedenen APIs für historische Daten, Trend-Analysen und zeitbezogene SEO-Metriken. Optimiert für Trend-Analysen.",
    category: "Trends Labs",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title:
          "DataForSEO Trends Labs API - Vollständige Trend-Analyse",
        description:
          "5 APIs für historische Keyword-Daten, SERP-Historie, Ranking-Trends und Traffic-Entwicklung. Spezialisiert auf zeitbezogene SEO-Analysen.",
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
        "/v3/dataforseo_labs/google/historical_keyword_data/live": {
          post: {
            tags: ["TrendsLabs"],
            summary: "Historische Keyword-Daten",
            description: "Historische Daten für Keywords - bis zu 7 Jahre Suchvolumen, CPC und Trends",
            operationId: "GoogleHistoricalKeywordDataLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keywords: { 
                          type: "array",
                          items: { type: "string" },
                          description: "Array of keywords" 
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        date_from: { type: "string", description: "Start date YYYY-MM-DD" },
                        date_to: { type: "string", description: "End date YYYY-MM-DD" }
                      },
                      required: ["keywords"]
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              result: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    keyword: { type: "string" },
                                    monthly_searches: { 
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          year: { type: "number" },
                                          month: { type: "number" },
                                          search_volume: { type: "number" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/historical_serps/live": {
          post: {
            tags: ["TrendsLabs"],
            summary: "Historische SERPs",
            description: "Google-Suchergebnisse aus der Vergangenheit mit allen SERP-Features",
            operationId: "GoogleHistoricalSerpsLive"
          }
        },
        "/v3/dataforseo_labs/google/historical_rank_overview/live": {
          post: {
            tags: ["TrendsLabs"],
            summary: "Historische Ranking-Übersicht",
            description: "Historische Ranking- und Traffic-Daten für eine Domain",
            operationId: "GoogleHistoricalRankOverviewLive"
          }
        },
        "/v3/dataforseo_labs/google/historical_bulk_traffic_estimation/live": {
          post: {
            tags: ["TrendsLabs"],
            summary: "Historische Traffic-Schätzung",
            description: "Historische Traffic-Volumina für bis zu 1.000 Domains",
            operationId: "GoogleHistoricalBulkTrafficEstimationLive"
          }
        },
        "/v3/dataforseo_labs/google/top_searches/live": {
          post: {
            tags: ["TrendsLabs"],
            summary: "Top-Suchanfragen",
            description: "Über 7 Milliarden Keywords aus der DataForSEO Keyword-Datenbank",
            operationId: "GoogleTopSearchesLive"
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
      security: [
        {
          basicAuth: []
        }
      ]
    }
  }
]
