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

export const ContentAnalysisGeneralSchema: ToolApi[] = [
  {
    id: "dataforseo-content-analysis-general",
    name: "Content Analysis General API - Alle Content Analysis Funktionen",
    description:
      "Vereinheitlichte Content Analysis API mit allen Funktionen: Base APIs, Search APIs, Sentiment APIs und Trends APIs. Umfassende Content-Analyse für Zitationsdaten, Sentiment und Trends.",
    category: "Content Analysis - General",
    icon: "📊🔍😊📈",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Content Analysis API - Allgemeine Schema",
        description:
          "Vereinheitlichte API für alle Content Analysis Funktionen: Base APIs, Search APIs, Sentiment APIs und Trends APIs. Optimiert für umfassende Content-Analyse und Zitationsdaten.",
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
        // ===== CONTENT ANALYSIS BASE APIs =====
        "/v3/content_analysis/id_list": {
          post: {
            tags: ["Content Analysis Base"],
            summary: "Content Analysis ID List",
            description: "Liefert eine Liste aller abgeschlossenen Content Analysis Tasks mit Metadaten",
            operationId: "contentAnalysisIdList",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        datetime_from: {
                          type: "string",
                          description: "Startzeit für Filterung der Ergebnisse (UTC Format)",
                          example: "2023-01-15 12:57:46 +00:00"
                        },
                        datetime_to: {
                          type: "string", 
                          description: "Endzeit für Filterung der Ergebnisse (UTC Format)",
                          example: "2023-01-31 13:57:46 +00:00"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              status_code: { type: "integer" },
                              status_message: { type: "string" },
                              time: { type: "string" },
                              cost: { type: "number" },
                              result_count: { type: "integer" },
                              path: { type: "array" },
                              data: { type: "object" },
                              result: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: { type: "string" },
                                    url: { type: "string" },
                                    datetime_posted: { type: "string" },
                                    datetime_done: { type: "string" },
                                    status: { type: "string" },
                                    cost: { type: "number" },
                                    metadata: { type: "object" }
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
        "/v3/content_analysis/available_filters": {
          get: {
            tags: ["Content Analysis Base"],
            summary: "Content Analysis Available Filters",
            description: "Informationen über verfügbare Filter für Content Analysis API Endpoints",
            operationId: "contentAnalysisAvailableFilters",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    filters: { type: "object" }
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
        "/v3/content_analysis/locations": {
          get: {
            tags: ["Content Analysis Base"],
            summary: "Content Analysis Locations",
            description: "Liste aller verfügbaren Standorte für Content Analysis",
            operationId: "contentAnalysisLocations",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    locations: { type: "array", items: { type: "object" } }
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
        "/v3/content_analysis/languages": {
          get: {
            tags: ["Content Analysis Base"],
            summary: "Content Analysis Languages",
            description: "Liste aller verfügbaren Sprachen für Content Analysis",
            operationId: "contentAnalysisLanguages",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    languages: { type: "array", items: { type: "object" } }
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
        "/v3/content_analysis/categories": {
          get: {
            tags: ["Content Analysis Base"],
            summary: "Content Analysis Categories",
            description: "Liste aller verfügbaren Kategorien für Content Analysis (Google Produkt- und Servicekategorien)",
            operationId: "contentAnalysisCategories",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    categories: { type: "array", items: { type: "object" } }
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

        // ===== CONTENT ANALYSIS SEARCH APIs =====
        "/v3/content_analysis/search/live": {
          post: {
            tags: ["Content Analysis Search"],
            summary: "Content Analysis Search Live",
            description: "Detaillierte Zitationsdaten für das Ziel-Keyword verfügbar",
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
                          description: "Ziel-Keyword für die Suche",
                          example: "artificial intelligence"
                        },
                        search_mode: {
                          type: "string",
                          description: "Art der Ergebnisgruppierung",
                          enum: ["as_is", "group_by_domain", "group_by_domain_and_title"],
                          default: "as_is"
                        },
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Zitationen",
                          default: 100,
                          maximum: 1000
                        }
                      },
                      required: ["keyword"]
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    search_mode: { type: "string" },
                                    items_count: { type: "integer" },
                                    items: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          type: { type: "string" },
                                          rank_group: { type: "integer" },
                                          rank_absolute: { type: "integer" },
                                          position: { type: "string" },
                                          url: { type: "string" },
                                          title: { type: "string" },
                                          description: { type: "string" },
                                          domain: { type: "string" },
                                          domain_rank: { type: "integer" },
                                          citations_count: { type: "integer" },
                                          backlinks_count: { type: "integer" },
                                          referring_domains_count: { type: "integer" }
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
        "/v3/content_analysis/summary/live": {
          post: {
            tags: ["Content Analysis Search"],
            summary: "Content Analysis Summary Live",
            description: "Übersicht der für das Ziel-Keyword verfügbaren Zitationsdaten",
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
                          description: "Ziel-Keyword für die Zusammenfassung",
                          example: "artificial intelligence"
                        },
                        search_mode: {
                          type: "string",
                          description: "Art der Ergebnisgruppierung",
                          enum: ["as_is", "group_by_domain", "group_by_domain_and_title"],
                          default: "as_is"
                        }
                      },
                      required: ["keyword"]
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    search_mode: { type: "string" },
                                    total_count: { type: "integer" },
                                    items_count: { type: "integer" },
                                    summary: {
                                      type: "object",
                                      properties: {
                                        citations_count: { type: "integer" },
                                        backlinks_count: { type: "integer" },
                                        referring_domains_count: { type: "integer" },
                                        top_domains: { type: "array", items: { type: "object" } }
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

        // ===== CONTENT ANALYSIS SENTIMENT APIs =====
        "/v3/content_analysis/sentiment_analysis/live": {
          post: {
            tags: ["Content Analysis Sentiment"],
            summary: "Content Analysis Sentiment Analysis Live",
            description: "Sentiment-Analyse-Daten für Zitationen des Ziel-Keywords verfügbar",
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
                          description: "Ziel-Keyword für Sentiment-Analyse",
                          example: "artificial intelligence"
                        },
                        search_mode: {
                          type: "string",
                          description: "Art der Ergebnisgruppierung",
                          enum: ["as_is", "group_by_domain", "group_by_domain_and_title"],
                          default: "as_is"
                        },
                        positive_connotation_threshold: {
                          type: "number",
                          description: "Schwellenwert für positive Konnotation",
                          default: 0.5,
                          minimum: 0,
                          maximum: 1
                        },
                        sentiments_connotation_threshold: {
                          type: "number",
                          description: "Schwellenwert für Sentiment-Konnotation",
                          default: 0.5,
                          minimum: 0,
                          maximum: 1
                        }
                      },
                      required: ["keyword"]
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    search_mode: { type: "string" },
                                    sentiment_analysis: {
                                      type: "object",
                                      properties: {
                                        positive_count: { type: "integer" },
                                        negative_count: { type: "integer" },
                                        neutral_count: { type: "integer" },
                                        positive_percentage: { type: "number" },
                                        negative_percentage: { type: "number" },
                                        neutral_percentage: { type: "number" }
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
        "/v3/content_analysis/rating_distribution/live": {
          post: {
            tags: ["Content Analysis Sentiment"],
            summary: "Content Analysis Rating Distribution Live",
            description: "Bewertungsverteilungsdaten für das Keyword und angegebene Parameter",
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
                          description: "Ziel-Keyword für Bewertungsverteilung",
                          example: "artificial intelligence"
                        },
                        search_mode: {
                          type: "string",
                          description: "Art der Ergebnisgruppierung",
                          enum: ["as_is", "group_by_domain", "group_by_domain_and_title"],
                          default: "as_is"
                        },
                        internal_list_limit: {
                          type: "integer",
                          description: "Maximale Anzahl von Elementen innerhalb interner Arrays",
                          default: 100,
                          maximum: 1000
                        }
                      },
                      required: ["keyword"]
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    search_mode: { type: "string" },
                                    rating_distribution: {
                                      type: "object",
                                      properties: {
                                        rating_1_count: { type: "integer" },
                                        rating_2_count: { type: "integer" },
                                        rating_3_count: { type: "integer" },
                                        rating_4_count: { type: "integer" },
                                        rating_5_count: { type: "integer" },
                                        average_rating: { type: "number" },
                                        total_ratings: { type: "integer" }
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

        // ===== CONTENT ANALYSIS TRENDS APIs =====
        "/v3/content_analysis/phrase_trends/live": {
          post: {
            tags: ["Content Analysis Trends"],
            summary: "Content Analysis Phrase Trends Live",
            description: "Daten zu allen Zitationen des Ziel-Keywords für den angegebenen Zeitraum",
            operationId: "contentAnalysisPhraseTrendsLive",
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
                          description: "Ziel-Keyword für Trend-Analyse",
                          example: "artificial intelligence"
                        },
                        date_from: {
                          type: "string",
                          description: "Startdatum des Zeitraums (Format: YYYY-MM-DD)",
                          example: "2023-01-01"
                        },
                        date_to: {
                          type: "string",
                          description: "Enddatum des Zeitraums (Format: YYYY-MM-DD)",
                          example: "2023-12-31"
                        },
                        date_group: {
                          type: "string",
                          description: "Zeitraum für Gruppierung der Ergebnisse",
                          enum: ["day", "week", "month"],
                          default: "month"
                        },
                        search_mode: {
                          type: "string",
                          description: "Art der Ergebnisgruppierung",
                          enum: ["as_is", "group_by_domain", "group_by_domain_and_title"],
                          default: "as_is"
                        }
                      },
                      required: ["keyword", "date_from", "date_to"]
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    search_mode: { type: "string" },
                                    date_from: { type: "string" },
                                    date_to: { type: "string" },
                                    date_group: { type: "string" },
                                    trends: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          date: { type: "string" },
                                          citations_count: { type: "integer" },
                                          backlinks_count: { type: "integer" },
                                          referring_domains_count: { type: "integer" }
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
        "/v3/content_analysis/category_trends/live": {
          post: {
            tags: ["Content Analysis Trends"],
            summary: "Content Analysis Category Trends Live",
            description: "Daten zu allen Zitationen in der Ziel-Kategorie für den angegebenen Zeitraum",
            operationId: "contentAnalysisCategoryTrendsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category_code: {
                          type: "string",
                          description: "Ziel-Kategorie-Code",
                          example: "gcid:computers_and_electronics"
                        },
                        date_from: {
                          type: "string",
                          description: "Startdatum des Zeitraums (Format: YYYY-MM-DD)",
                          example: "2023-01-01"
                        },
                        date_to: {
                          type: "string",
                          description: "Enddatum des Zeitraums (Format: YYYY-MM-DD)",
                          example: "2023-12-31"
                        },
                        date_group: {
                          type: "string",
                          description: "Zeitraum für Gruppierung der Ergebnisse",
                          enum: ["day", "week", "month"],
                          default: "month"
                        },
                        search_mode: {
                          type: "string",
                          description: "Art der Ergebnisgruppierung",
                          enum: ["as_is", "group_by_domain", "group_by_domain_and_title"],
                          default: "as_is"
                        }
                      },
                      required: ["category_code", "date_from", "date_to"]
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        version: { type: "string" },
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        time: { type: "string" },
                        cost: { type: "number" },
                        tasks_count: { type: "integer" },
                        tasks_error: { type: "integer" },
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
                                    category_code: { type: "string" },
                                    search_mode: { type: "string" },
                                    date_from: { type: "string" },
                                    date_to: { type: "string" },
                                    date_group: { type: "string" },
                                    trends: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          date: { type: "string" },
                                          citations_count: { type: "integer" },
                                          backlinks_count: { type: "integer" },
                                          referring_domains_count: { type: "integer" }
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
      },
      components: {
        securitySchemes: {
          basicAuth: {
            type: "http",
            scheme: "basic",
            description: "DataForSEO API Basis Authentifizierung"
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
