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

export const ContentAnalysisSentimentApis: ToolApi[] = [
  {
    id: "dataforseo-content-analysis-sentiment",
    name: "Content Analysis Sentiment API",
    description:
      "Spezialisierte Content Analysis APIs mit 2 verschiedenen Endpunkten für Sentiment-Analyse und Bewertungsverteilung. Optimiert für emotionale Reaktionsanalyse.",
    category: "Content Analysis Sentiment",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Content Analysis Sentiment API",
        description:
          "2 APIs für Content Analysis Sentiment-Analyse und Bewertungsverteilung. Optimiert für emotionale Reaktionsanalyse und Rating-Daten.",
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
        "/v3/content_analysis/sentiment_analysis/live": {
          post: {
            tags: ["ContentAnalysisSentiment"],
            summary: "Content Analysis Sentiment Analysis Live",
            description: "Sentiment analysis data for citations available for the target keyword",
            operationId: "contentAnalysisSentimentAnalysisLive",
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
                        positive_connotation_threshold: {
                          type: "number",
                          description: "Positive connotation threshold"
                        },
                        sentiments_connotation_threshold: {
                          type: "number",
                          description: "Sentiment connotation threshold"
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
        "/v3/content_analysis/rating_distribution/live": {
          post: {
            tags: ["ContentAnalysisSentiment"],
            summary: "Content Analysis Rating Distribution Live",
            description: "Rating distribution data for the keyword and specified parameters",
            operationId: "contentAnalysisRatingDistributionLive",
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
                        internal_list_limit: {
                          type: "integer",
                          description: "Maximum number of elements within internal arrays"
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
