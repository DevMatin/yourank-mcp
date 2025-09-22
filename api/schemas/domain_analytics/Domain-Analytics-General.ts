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

export const DomainAnalyticsGeneralSchema: ToolApi[] = [
  {
    id: "dataforseo-domain-analytics-general",
    name: "Domain Analytics General API - Alle Domain Analytics Funktionen",
    description:
      "Vereinheitlichte Domain Analytics API mit allen Funktionen: Core APIs, Technologies APIs, WHOIS APIs und erweiterten Domain-Analyse-Funktionen. Umfassende Domain-Intelligence und Technologie-Analyse.",
    category: "Domain Analytics - General",
    icon: "🌐🔧🚀📊",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Domain Analytics API - Allgemeine Schema",
        description:
          "Vereinheitlichte API für alle Domain Analytics Funktionen: Core APIs, Technologies APIs, WHOIS APIs und erweiterte Domain-Analyse. Optimiert für umfassende Domain-Intelligence und Technologie-Analyse.",
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
        // ===== DOMAIN ANALYTICS CORE APIs =====
        "/v3/domain_analytics/id_list": {
          post: {
            tags: ["Domain Analytics Core"],
            summary: "Domain Analytics ID List",
            description: "Liefert eine Liste aller abgeschlossenen Domain Analytics Tasks mit Metadaten",
            operationId: "DomainAnalyticsIdList",
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
                        },
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Task IDs",
                          default: 1000,
                          maximum: 1000
                        },
                        offset: {
                          type: "integer",
                          description: "Offset in der Ergebnisliste",
                          default: 0
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
        "/v3/domain_analytics/errors": {
          post: {
            tags: ["Domain Analytics Core"],
            summary: "Domain Analytics Errors",
            description: "Liefert Informationen über Domain Analytics API Tasks, die einen Fehler zurückgegeben haben (letzte 7 Tage)",
            operationId: "DomainAnalyticsErrors",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Fehler-Tasks",
                          default: 1000,
                          maximum: 1000
                        },
                        offset: {
                          type: "integer",
                          description: "Offset in der Ergebnisliste",
                          default: 0
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
                              result: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: { type: "string" },
                                    datetime: { type: "string" },
                                    function: { type: "string" },
                                    error_code: { type: "integer" },
                                    error_message: { type: "string" },
                                    http_url: { type: "string" },
                                    http_method: { type: "string" },
                                    http_code: { type: "integer" },
                                    http_time: { type: "number" },
                                    http_response: { type: "string" }
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

        // ===== DOMAIN ANALYTICS TECHNOLOGIES APIs =====
        "/v3/domain_analytics/technologies/available_filters": {
          get: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies Available Filters",
            description: "Informationen über verfügbare Filter für Domain Analytics Technologies API Endpoints",
            operationId: "TechnologiesAvailableFilters",
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
        "/v3/domain_analytics/technologies/locations": {
          get: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies Locations",
            description: "Liste aller verfügbaren Standorte für Domain Analytics Technologies",
            operationId: "DomainAnalyticsTechnologiesLocations",
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
        "/v3/domain_analytics/technologies/languages": {
          get: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies Languages",
            description: "Liste aller verfügbaren Sprachen für Domain Analytics Technologies",
            operationId: "DomainAnalyticsTechnologiesLanguages",
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
        "/v3/domain_analytics/technologies/technologies": {
          get: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies List",
            description: "Vollständige Liste aller verfügbaren Technologien, strukturiert nach Technologie-Gruppen und Kategorien",
            operationId: "TechnologiesTechnologies",
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
                                    technologies: { type: "array", items: { type: "object" } }
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
        "/v3/domain_analytics/technologies/technologies_summary/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies Summary Live",
            description: "Zusammenfassende Statistiken und Trends für Technologie-Verwendung",
            operationId: "TechnologiesTechnologiesSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: {
                          type: "string",
                          description: "Ziel-Domain oder -Bereich für Summary",
                          example: "example.com"
                        },
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Ergebnisse",
                          default: 100,
                          maximum: 1000
                        },
                        offset: {
                          type: "integer",
                          description: "Offset in der Ergebnisliste",
                          default: 0
                        }
                      },
                      required: ["target"]
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
                                    target: { type: "string" },
                                    summary: {
                                      type: "object",
                                      properties: {
                                        total_technologies: { type: "integer" },
                                        technology_categories: { type: "array", items: { type: "object" } },
                                        popular_technologies: { type: "array", items: { type: "object" } }
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
        "/v3/domain_analytics/technologies/technology_stats/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technology Stats Live",
            description: "Detaillierte Statistiken für spezifische Technologien",
            operationId: "TechnologiesTechnologyStatsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        technology: {
                          type: "string",
                          description: "Technologie für Statistik-Analyse",
                          example: "WordPress"
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        },
                        language_code: {
                          type: "string",
                          description: "Sprach-Code für die Analyse",
                          example: "en"
                        }
                      },
                      required: ["technology"]
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
                                    technology: { type: "string" },
                                    stats: {
                                      type: "object",
                                      properties: {
                                        usage_count: { type: "integer" },
                                        market_share: { type: "number" },
                                        trend: { type: "string" },
                                        related_technologies: { type: "array", items: { type: "object" } }
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
        "/v3/domain_analytics/technologies/aggregation_technologies/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies Aggregation Live",
            description: "Liefert eine Liste der beliebtesten Technologien, die Websites zusammen mit den von Ihnen angegebenen Technologien verwenden",
            operationId: "TechnologiesAggregationTechnologiesLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: {
                          type: "string",
                          description: "Ziel-Domain für Technologie-Analyse",
                          example: "example.com"
                        },
                        technologies: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Technologien für Aggregation",
                          example: ["WordPress", "Google Analytics"]
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        },
                        language_code: {
                          type: "string",
                          description: "Sprach-Code für die Analyse",
                          example: "en"
                        },
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Ergebnisse",
                          default: 100,
                          maximum: 1000
                        },
                        offset: {
                          type: "integer",
                          description: "Offset in der Ergebnisliste",
                          default: 0
                        }
                      },
                      required: ["target", "technologies"]
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
                                    target: { type: "string" },
                                    technologies: { type: "array", items: { type: "string" } },
                                    aggregation_data: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          technology: { type: "string" },
                                          count: { type: "integer" },
                                          percentage: { type: "number" }
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
        "/v3/domain_analytics/technologies/summary/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies Summary Live",
            description: "Zusammenfassung der Technologie-Analyse für eine spezifische Domain",
            operationId: "TechnologiesSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: {
                          type: "string",
                          description: "Ziel-Domain für Technologie-Analyse",
                          example: "example.com"
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        },
                        language_code: {
                          type: "string",
                          description: "Sprach-Code für die Analyse",
                          example: "en"
                        }
                      },
                      required: ["target"]
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
                                    target: { type: "string" },
                                    summary: {
                                      type: "object",
                                      properties: {
                                        total_technologies: { type: "integer" },
                                        technology_categories: { type: "array", items: { type: "object" } },
                                        top_technologies: { type: "array", items: { type: "object" } }
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
        "/v3/domain_analytics/technologies/stats/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Technologies Stats Live",
            description: "Detaillierte Statistiken der Technologie-Analyse für eine spezifische Domain",
            operationId: "TechnologiesStatsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: {
                          type: "string",
                          description: "Ziel-Domain für Technologie-Analyse",
                          example: "example.com"
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        },
                        language_code: {
                          type: "string",
                          description: "Sprach-Code für die Analyse",
                          example: "en"
                        }
                      },
                      required: ["target"]
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
                                    target: { type: "string" },
                                    stats: {
                                      type: "object",
                                      properties: {
                                        technology_distribution: { type: "object" },
                                        category_breakdown: { type: "array", items: { type: "object" } },
                                        performance_metrics: { type: "object" }
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
        "/v3/domain_analytics/technologies/domains_by_technology/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Domains by Technology Live",
            description: "Liste von Domains, die eine spezifische Technologie verwenden",
            operationId: "TechnologiesDomainsByTechnologyLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        technology: {
                          type: "string",
                          description: "Technologie für die Suche",
                          example: "WordPress"
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        },
                        language_code: {
                          type: "string",
                          description: "Sprach-Code für die Analyse",
                          example: "en"
                        },
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Ergebnisse",
                          default: 100,
                          maximum: 1000
                        },
                        offset: {
                          type: "integer",
                          description: "Offset in der Ergebnisliste",
                          default: 0
                        }
                      },
                      required: ["technology"]
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
                                    technology: { type: "string" },
                                    domains: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          domain: { type: "string" },
                                          rank: { type: "integer" },
                                          traffic: { type: "number" }
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
        "/v3/domain_analytics/technologies/domains_by_html_terms/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Domains by HTML Terms Live",
            description: "Liste von Domains basierend auf HTML-Terms und Technologie-Erkennung",
            operationId: "TechnologiesDomainsByHtmlTermsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        html_terms: {
                          type: "array",
                          items: { type: "string" },
                          description: "HTML-Terms für die Suche",
                          example: ["wp-content", "wordpress"]
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        },
                        language_code: {
                          type: "string",
                          description: "Sprach-Code für die Analyse",
                          example: "en"
                        },
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Ergebnisse",
                          default: 100,
                          maximum: 1000
                        },
                        offset: {
                          type: "integer",
                          description: "Offset in der Ergebnisliste",
                          default: 0
                        }
                      },
                      required: ["html_terms"]
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
                                    html_terms: { type: "array", items: { type: "string" } },
                                    domains: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          domain: { type: "string" },
                                          rank: { type: "integer" },
                                          traffic: { type: "number" }
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
        "/v3/domain_analytics/technologies/domain_technologies/live": {
          post: {
            tags: ["Domain Analytics Technologies"],
            summary: "Domain Technologies Live",
            description: "Detaillierte Technologie-Analyse für eine spezifische Domain",
            operationId: "TechnologiesDomainTechnologiesLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: {
                          type: "string",
                          description: "Ziel-Domain für Technologie-Analyse",
                          example: "example.com"
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        },
                        language_code: {
                          type: "string",
                          description: "Sprach-Code für die Analyse",
                          example: "en"
                        }
                      },
                      required: ["target"]
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
                                    target: { type: "string" },
                                    technologies: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          name: { type: "string" },
                                          category: { type: "string" },
                                          version: { type: "string" },
                                          confidence: { type: "number" }
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

        // ===== DOMAIN ANALYTICS WHOIS APIs =====
        "/v3/domain_analytics/whois/available_filters": {
          get: {
            tags: ["Domain Analytics WHOIS"],
            summary: "WHOIS Available Filters",
            description: "Informationen über verfügbare Filter für Domain Analytics WHOIS API",
            operationId: "WhoisAvailableFilters",
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
        "/v3/domain_analytics/whois/overview/live": {
          post: {
            tags: ["Domain Analytics WHOIS"],
            summary: "WHOIS Overview Live",
            description: "WHOIS-Daten angereichert mit Backlink-Statistiken, Ranking- und Traffic-Informationen aus organischen und bezahlten Suchergebnissen",
            operationId: "WhoisOverviewLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        limit: {
                          type: "integer",
                          description: "Maximale Anzahl zurückgegebener Domains",
                          default: 100,
                          maximum: 1000
                        },
                        offset: {
                          type: "integer",
                          description: "Offset in der Ergebnisliste",
                          default: 0
                        },
                        filters: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              field: { type: "string" },
                              operator: { type: "string" },
                              value: { type: "string" }
                            }
                          },
                          description: "Array von Ergebnis-Filterparametern"
                        },
                        order_by: {
                          type: "array",
                          items: { type: "string" },
                          description: "Ergebnis-Sortierregeln"
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
                              result: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    domains: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          domain: { type: "string" },
                                          whois_data: { type: "object" },
                                          backlink_stats: { type: "object" },
                                          ranking_info: { type: "object" },
                                          traffic_info: { type: "object" }
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
