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

export const GoogleLabsApis: ToolApi[] = [
  {
    id: "dataforseo-google-labs",
    name: "Google Labs API",
    description:
      "Umfassende Google-Analyse mit 22 verschiedenen APIs für Keywords, Domains, SEO-Metriken und historische Daten. Optimiert für Google-spezifische Analysen.",
    category: "Google Labs",
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
          "DataForSEO Google Labs API - Vollständige Google-Analyse",
        description:
          "22 APIs für Google Keywords, Domain-Analysen, SEO-Metriken und historische Daten. Spezialisiert auf Google Search Engine Optimization.",
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
        "/v3/dataforseo_labs/google/keywords_for_site/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keywords für Domain",
            description: "Liste aller Keywords für eine bestimmte Domain mit Suchvolumen, CPC und Trend-Daten",
            operationId: "GoogleKeywordsForSiteLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Target domain" },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        limit: { type: "number", description: "Number of results" }
                      },
                      required: ["target"]
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
                                    search_volume: { type: "number" },
                                    competition: { type: "number" },
                                    cpc: { type: "number" }
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
        "/v3/dataforseo_labs/google/related_keywords/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Verwandte Keywords",
            description: "Keywords aus 'Verwandte Suchanfragen' mit bis zu 4680 Keyword-Ideen",
            operationId: "GoogleRelatedKeywordsLive"
          }
        },
        "/v3/dataforseo_labs/google/keyword_suggestions/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keyword-Vorschläge",
            description: "Suchanfragen die das Seed-Keyword enthalten",
            operationId: "GoogleKeywordSuggestionsLive"
          }
        },
        "/v3/dataforseo_labs/google/keyword_ideas/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keyword-Ideen",
            description: "Relevante Keywords für Produkt- oder Service-Kategorien",
            operationId: "GoogleKeywordIdeasLive"
          }
        },
        "/v3/dataforseo_labs/google/bulk_keyword_difficulty/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keyword-Schwierigkeit",
            description: "Keyword Difficulty für bis zu 1.000 Keywords (0-100 Skala)",
            operationId: "GoogleBulkKeywordDifficultyLive"
          }
        },
        "/v3/dataforseo_labs/google/search_intent/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Suchintention",
            description: "Suchintention und Wahrscheinlichkeit für bis zu 1.000 Keywords",
            operationId: "GoogleSearchIntentLive"
          }
        },
        "/v3/dataforseo_labs/google/ranked_keywords/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Ranking Keywords",
            description: "Keywords für die eine Domain/Webseite rankt mit SERP-Elementen",
            operationId: "GoogleRankedKeywordsLive"
          }
        },
        "/v3/dataforseo_labs/google/competitors_domain/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Domain-Konkurrenten",
            description: "Vollständige Ranking- und Traffic-Daten von Konkurrenz-Domains",
            operationId: "GoogleCompetitorsDomainLive"
          }
        },
        "/v3/dataforseo_labs/google/domain_rank_overview/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Domain-Ranking Übersicht",
            description: "Ranking- und Traffic-Daten für eine spezifische Domain",
            operationId: "GoogleDomainRankOverviewLive"
          }
        },
        "/v3/dataforseo_labs/google/bulk_traffic_estimation/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Traffic-Schätzung",
            description: "Geschätzte monatliche Traffic-Volumina für bis zu 1.000 Domains",
            operationId: "GoogleBulkTrafficEstimationLive"
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
