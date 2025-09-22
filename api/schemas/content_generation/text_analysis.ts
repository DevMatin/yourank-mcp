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

export const TextAnalysisApis: ToolApi[] = [
  {
    id: "dataforseo-text-analysis",
    name: "Text Analysis API",
    description:
      "Spezialisierte Text-Analyse-APIs für statistische Auswertung und Lesbarkeits-Analyse mit 2 verschiedenen Endpoints für Live-Analyse und Sprachen-Support.",
    category: "Content Generation - Analysis",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Content Generation API - Text Analysis",
        description:
          "2 APIs für Text-Statistiken, Lesbarkeits-Analyse und unterstützte Sprachen. Optimiert für detaillierte Analyse von Textinhalten.",
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
        "/v3/content_generation/text_summary/live": {
          post: {
            tags: ["TextAnalysis"],
            description: "This endpoint will provide you with detailed text statistics, readability metrics, and content analysis for the specified text.",
            operationId: "TextSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: {
                          type: "string",
                          description: "text for analysis (up to 10000 characters)",
                          example: "This is a sample text for analysis. It contains multiple sentences and paragraphs to demonstrate readability analysis."
                        },
                        language_name: {
                          type: "string",
                          description: "language name for analysis (e.g., English, German, Spanish)",
                          example: "English"
                        },
                        language_code: {
                          type: "string",
                          description: "ISO 639-1 language code (e.g., en, de, es)",
                          example: "en"
                        },
                        include_readability: {
                          type: "boolean",
                          description: "include readability scores in analysis",
                          example: true
                        },
                        include_keywords: {
                          type: "boolean",
                          description: "include keyword analysis",
                          example: true
                        },
                        tag: {
                          type: "string",
                          description: "user-defined task identifier (max 255 chars)"
                        }
                      },
                      required: ["text"]
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
                                    text_statistics: {
                                      type: "object",
                                      properties: {
                                        characters_count: { type: "integer" },
                                        characters_count_without_spaces: { type: "integer" },
                                        words_count: { type: "integer" },
                                        sentences_count: { type: "integer" },
                                        paragraphs_count: { type: "integer" },
                                        average_words_per_sentence: { type: "number" },
                                        average_characters_per_word: { type: "number" }
                                      }
                                    },
                                    readability_scores: {
                                      type: "object",
                                      properties: {
                                        flesch_reading_ease: { type: "number" },
                                        flesch_kincaid_grade_level: { type: "number" },
                                        automated_readability_index: { type: "number" },
                                        coleman_liau_index: { type: "number" },
                                        gunning_fog_index: { type: "number" },
                                        smog_index: { type: "number" }
                                      }
                                    },
                                    keyword_analysis: {
                                      type: "object",
                                      properties: {
                                        top_keywords: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              keyword: { type: "string" },
                                              frequency: { type: "integer" },
                                              density_percentage: { type: "number" }
                                            }
                                          }
                                        },
                                        keyword_density: { type: "number" }
                                      }
                                    },
                                    language_detection: {
                                      type: "object",
                                      properties: {
                                        detected_language: { type: "string" },
                                        confidence_score: { type: "number" }
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
        "/v3/content_generation/text_summary/languages": {
          get: {
            tags: ["TextAnalysis"],
            description: "This endpoint will provide you with a list of supported languages for text analysis and their language codes.",
            operationId: "TextSummaryLanguages",
            parameters: [
              {
                name: "language_name",
                in: "query",
                description: "filter by language name",
                required: false,
                schema: {
                  type: "string",
                  example: "English"
                }
              },
              {
                name: "language_code",
                in: "query",
                description: "filter by ISO 639-1 language code",
                required: false,
                schema: {
                  type: "string",
                  example: "en"
                }
              }
            ],
            responses: {
              "200": {
                description: "Successful operation",
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
                                    language_name: { 
                                      type: "string",
                                      example: "English"
                                    },
                                    language_code: { 
                                      type: "string",
                                      example: "en" 
                                    },
                                    supported_features: {
                                      type: "array",
                                      items: { type: "string" },
                                      example: ["readability_analysis", "keyword_analysis", "language_detection"]
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
    }
  }
]
