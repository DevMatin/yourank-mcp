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

export const ContentAnalysisSearchApis: ToolApi[] = [
  {
    id: "dataforseo-content-analysis-search",
    name: "Content Analysis Search API",
    description:
      "Spezialisierte Content Analysis APIs mit 2 verschiedenen Endpunkten für Live-Suche und Zusammenfassungen. Optimiert für detaillierte Zitationsdaten und Übersichten.",
    category: "Content Analysis Search",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Content Analysis Search API",
        description:
          "2 APIs für Content Analysis Such- und Übersichtsfunktionen - Live-Suche und Zusammenfassungen. Optimiert für detaillierte Zitationsdaten.",
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
        "/v3/content_analysis/search/live": {
          post: {
            tags: ["ContentAnalysisSearch"],
            summary: "Content Analysis Search Live",
            description: "Detailed citation data available for the target keyword",
            operationId: "contentAnalysisSearchLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: {
                          type: "string",
                          description: "Target keyword"
                        },
                        search_mode: {
                          type: "string",
                          description: "Results grouping type"
                        },
                        limit: {
                          type: "integer",
                          description: "Maximum number of returned citations"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/content_analysis/summary/live": {
          post: {
            tags: ["ContentAnalysisSearch"],
            summary: "Content Analysis Summary Live",
            description: "Overview of citation data available for the target keyword",
            operationId: "contentAnalysisSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: {
                          type: "string",
                          description: "Target keyword"
                        },
                        search_mode: {
                          type: "string",
                          description: "Results grouping type"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object"
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
]
