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

export const BingLabsApis: ToolApi[] = [
  {
    id: "dataforseo-bing-labs",
    name: "Bing Labs API",
    description:
      "Spezialisierte Bing-Analyse mit 11 verschiedenen APIs für Bing Organic Search, Keyword-Analyse und Domain-Metriken. Optimiert für Bing-spezifische SEO-Analysen.",
    category: "Bing Labs",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title:
          "DataForSEO Bing Labs API - Vollständige Bing-Analyse",
        description:
          "11 APIs für Bing Keywords, Domain-Analysen, Traffic-Schätzungen und Konkurrenz-Analysen. Spezialisiert auf Bing Search Engine Optimization.",
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
        "/v3/dataforseo_labs/bing/bulk_keyword_difficulty/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Keyword-Schwierigkeit",
            description: "Keyword Difficulty für bis zu 1.000 Keywords in Bing (0-100 Skala)",
            operationId: "BingBulkKeywordDifficultyLive",
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
                          description: "Array of keywords (max 1000)" 
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
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
                                    keyword_difficulty: { type: "number" }
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
        "/v3/dataforseo_labs/bing/ranked_keywords/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Ranking Keywords",
            description: "Keywords für die eine Domain/Webseite in Bing rankt",
            operationId: "BingRankedKeywordsLive"
          }
        },
        "/v3/dataforseo_labs/bing/competitors_domain/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Domain-Konkurrenten",
            description: "Ranking- und Traffic-Daten von Konkurrenz-Domains in Bing",
            operationId: "BingCompetitorsDomainLive"
          }
        },
        "/v3/dataforseo_labs/bing/domain_rank_overview/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Domain-Ranking",
            description: "Ranking- und Traffic-Daten für eine Domain in Bing",
            operationId: "BingDomainRankOverviewLive"
          }
        },
        "/v3/dataforseo_labs/bing/bulk_traffic_estimation/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Traffic-Schätzung",
            description: "Geschätzte monatliche Traffic-Volumina in Bing",
            operationId: "BingBulkTrafficEstimationLive"
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
