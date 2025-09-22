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

export const AlleLabsApisComplete: ToolApi[] = [
  {
    id: "dataforseo-amazon-labs-complete",
    name: "Amazon Labs API - Complete",
    description:
      "Vollständige Amazon-Analyse mit 8 verschiedenen APIs für Amazon Marketplace, Produkt-Keywords, Ranking-Analysen und Konkurrenz-Analysen. Optimiert für Amazon SEO.",
    category: "Amazon Labs",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Amazon Labs API - Vollständige Amazon-Analyse",
        description: "8 APIs für Amazon Keywords, Produkt-Analysen, Ranking-Daten und Konkurrenz-Analysen. Spezialisiert auf Amazon Marketplace Optimization.",
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
        "/v3/dataforseo_labs/amazon/bulk_search_volume/live": {
          post: {
            tags: ["AmazonLabs"],
            summary: "Amazon Suchvolumen",
            description: "Suchvolumen-Daten für bis zu 1.000 Keywords in Amazon",
            operationId: "AmazonBulkSearchVolumeLive",
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
        },
        "/v3/dataforseo_labs/amazon/ranked_keywords/live": {
          post: {
            tags: ["AmazonLabs"],
            summary: "Amazon Ranking Keywords",
            description: "Keywords für die ein Produkt/Domain in Amazon rankt",
            operationId: "AmazonRankedKeywordsLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Target domain or ASIN" },
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
                                    rank_group: { type: "number" },
                                    rank_absolute: { type: "number" },
                                    position: { type: "number" },
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
        },
        "/v3/dataforseo_labs/amazon/product_rank_overview/live": {
          post: {
            tags: ["AmazonLabs"],
            summary: "Amazon Produkt-Ranking",
            description: "Ranking- und Traffic-Daten für Amazon-Produkte",
            operationId: "AmazonProductRankOverviewLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Target ASIN" },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
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
                                    target: { type: "string" },
                                    organic_etv: { type: "number" },
                                    count: { type: "number" }
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
        "/v3/dataforseo_labs/amazon/product_competitors/live": {
          post: {
            tags: ["AmazonLabs"],
            summary: "Amazon Produkt-Konkurrenten",
            description: "Konkurrenz-Produkte mit Ranking-Keywords und Priority Score",
            operationId: "AmazonProductCompetitorsLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Target ASIN" },
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/amazon/product_keyword_intersections/live": {
          post: {
            tags: ["AmazonLabs"],
            summary: "Amazon Keyword-Überschneidungen",
            description: "Keywords für die mehrere Produkte gleichzeitig ranken",
            operationId: "AmazonProductKeywordIntersectionsLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: { 
                          type: "array",
                          items: { type: "string" },
                          description: "Array of ASINs" 
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
                      },
                      required: ["targets"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/amazon/related_keywords/live": {
          post: {
            tags: ["AmazonLabs"],
            summary: "Amazon Verwandte Keywords",
            description: "Verwandte Keywords für Amazon-Produkte und -Kategorien",
            operationId: "AmazonRelatedKeywordsLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string", description: "Seed keyword" },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        limit: { type: "number", description: "Number of results" }
                      },
                      required: ["keyword"]
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
                      type: "object"
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
      security: [
        {
          basicAuth: []
        }
      ]
    }
  },
  {
    id: "dataforseo-bing-labs-complete",
    name: "Bing Labs API - Complete",
    description:
      "Vollständige Bing-Analyse mit 6 verschiedenen APIs für Bing Organic Search, Keyword-Analyse und Domain-Metriken. Optimiert für Bing-spezifische SEO-Analysen.",
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
        title: "DataForSEO Bing Labs API - Vollständige Bing-Analyse",
        description: "6 APIs für Bing Keywords, Domain-Analysen, Traffic-Schätzungen und Konkurrenz-Analysen. Spezialisiert auf Bing Search Engine Optimization.",
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
        "/v3/dataforseo_labs/bing/bulk_traffic_estimation/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Traffic-Schätzung",
            description: "Geschätzte monatliche Traffic-Volumina in Bing",
            operationId: "BingBulkTrafficEstimationLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Array of domains"
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
                      },
                      required: ["targets"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/bing/competitors_domain/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Domain-Konkurrenten",
            description: "Ranking- und Traffic-Daten von Konkurrenz-Domains in Bing",
            operationId: "BingCompetitorsDomainLive",
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
                      type: "object"
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
            operationId: "BingRankedKeywordsLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/bing/domain_rank_overview/live": {
          post: {
            tags: ["BingLabs"],
            summary: "Bing Domain-Ranking",
            description: "Ranking- und Traffic-Daten für eine Domain in Bing",
            operationId: "BingDomainRankOverviewLive",
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
                        language_code: { type: "string", description: "Language code" }
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
                      type: "object"
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
      security: [
        {
          basicAuth: []
        }
      ]
    }
  },
  {
    id: "dataforseo-google-labs-complete",
    name: "Google Labs API - Complete",
    description:
      "Vollständige Google-Analyse mit 30+ verschiedenen APIs für Keywords, Domains, SEO-Metriken, historische Daten und Wettbewerbsanalyse. Optimiert für Google-spezifische Analysen.",
    category: "Google Labs",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Google Labs API - Vollständige Google-Analyse",
        description: "30+ APIs für Google Keywords, Domain-Analysen, SEO-Metriken, historische Daten und Wettbewerbsanalyse. Spezialisiert auf Google Search Engine Optimization.",
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
        // Keyword Research APIs
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
            operationId: "GoogleRelatedKeywordsLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string", description: "Seed keyword" },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        limit: { type: "number", description: "Number of results" }
                      },
                      required: ["keyword"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/keyword_suggestions/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keyword-Vorschläge",
            description: "Suchanfragen die das Seed-Keyword enthalten",
            operationId: "GoogleKeywordSuggestionsLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string", description: "Seed keyword" },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        limit: { type: "number", description: "Number of results" }
                      },
                      required: ["keyword"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/keyword_ideas/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keyword-Ideen",
            description: "Relevante Keywords für Produkt- oder Service-Kategorien",
            operationId: "GoogleKeywordIdeasLive",
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
                          description: "Array of seed keywords"
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        limit: { type: "number", description: "Number of results" }
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/bulk_keyword_difficulty/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keyword-Schwierigkeit",
            description: "Keyword Difficulty für bis zu 1.000 Keywords (0-100 Skala)",
            operationId: "GoogleBulkKeywordDifficultyLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/search_intent/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Suchintention",
            description: "Suchintention und Wahrscheinlichkeit für bis zu 1.000 Keywords",
            operationId: "GoogleSearchIntentLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/keyword_overview/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Keyword-Übersicht",
            description: "Umfassende Keyword-Daten inklusive Suchvolumen, CPC, Wettbewerb",
            operationId: "GoogleKeywordOverviewLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        // Competitor Research APIs
        "/v3/dataforseo_labs/google/ranked_keywords/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Ranking Keywords",
            description: "Keywords für die eine Domain/Webseite rankt mit SERP-Elementen",
            operationId: "GoogleRankedKeywordsLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/competitors_domain/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Domain-Konkurrenten",
            description: "Vollständige Ranking- und Traffic-Daten von Konkurrenz-Domains",
            operationId: "GoogleCompetitorsDomainLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/domain_rank_overview/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Domain-Ranking Übersicht",
            description: "Ranking- und Traffic-Daten für eine spezifische Domain",
            operationId: "GoogleDomainRankOverviewLive",
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
                        language_code: { type: "string", description: "Language code" }
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/bulk_traffic_estimation/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Traffic-Schätzung",
            description: "Geschätzte monatliche Traffic-Volumina für bis zu 1.000 Domains",
            operationId: "GoogleBulkTrafficEstimationLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Array of domains"
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
                      },
                      required: ["targets"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/serp_competitors/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "SERP-Konkurrenten",
            description: "Domains die für ähnliche Keywords wie die Ziel-Domain ranken",
            operationId: "GoogleSerpCompetitorsLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/domain_intersection/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Domain-Intersection",
            description: "Keywords für die mehrere Domains gleichzeitig ranken",
            operationId: "GoogleDomainIntersectionLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Array of domains"
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
                      },
                      required: ["targets"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/page_intersection/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Page-Intersection",
            description: "Keywords für die mehrere Seiten gleichzeitig ranken",
            operationId: "GooglePageIntersectionLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Array of URLs"
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
                      },
                      required: ["targets"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/subdomains/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Subdomains",
            description: "Alle Subdomains einer Domain mit Ranking-Metriken",
            operationId: "GoogleSubdomainsLive",
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/relevant_pages/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Relevante Seiten",
            description: "Seiten einer Domain die für bestimmte Keywords ranken",
            operationId: "GoogleRelevantPagesLive",
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
                        keywords: {
                          type: "array",
                          items: { type: "string" },
                          description: "Array of keywords"
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" }
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        // Historical Data APIs
        "/v3/dataforseo_labs/google/historical_keyword_data/live": {
          post: {
            tags: ["GoogleLabs"],
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
            tags: ["GoogleLabs"],
            summary: "Historische SERPs",
            description: "Google-Suchergebnisse aus der Vergangenheit mit allen SERP-Features",
            operationId: "GoogleHistoricalSerpsLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string", description: "Target keyword" },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        target_date: { type: "string", description: "Target date YYYY-MM-DD" }
                      },
                      required: ["keyword"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/historical_rank_overview/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Historische Ranking-Übersicht",
            description: "Historische Ranking- und Traffic-Daten für eine Domain",
            operationId: "GoogleHistoricalRankOverviewLive",
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
                        target_date: { type: "string", description: "Target date YYYY-MM-DD" }
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/historical_bulk_traffic_estimation/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Historische Traffic-Schätzung",
            description: "Historische Traffic-Volumina für bis zu 1.000 Domains",
            operationId: "GoogleHistoricalBulkTrafficEstimationLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Array of domains"
                        },
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        target_date: { type: "string", description: "Target date YYYY-MM-DD" }
                      },
                      required: ["targets"]
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        // Market Analysis APIs
        "/v3/dataforseo_labs/google/top_searches/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Top-Suchanfragen",
            description: "Über 7 Milliarden Keywords aus der DataForSEO Keyword-Datenbank",
            operationId: "GoogleTopSearchesLive",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        location_code: { type: "number", description: "Location code" },
                        language_code: { type: "string", description: "Language code" },
                        limit: { type: "number", description: "Number of results" },
                        filters: { type: "array", description: "Filter conditions" }
                      }
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
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/dataforseo_labs/google/domain_metrics_by_categories/live": {
          post: {
            tags: ["GoogleLabs"],
            summary: "Domain-Metriken nach Kategorien",
            description: "Domain-Ranking-Metriken gruppiert nach Kategorien",
            operationId: "GoogleDomainMetricsByCategoriesLive",
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
                        language_code: { type: "string", description: "Language code" }
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
                      type: "object"
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
      security: [
        {
          basicAuth: []
        }
      ]
    }
  },
  {
    id: "dataforseo-general-labs",
    name: "General Labs API",
    description:
      "Allgemeine Labs-Funktionen mit 6 Verwaltungs-APIs für Tasks, Status, Fehler und Konfiguration. Optimiert für Meta-Operationen.",
    category: "General Labs",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO General Labs API - Verwaltungs-Funktionen",
        description: "6 APIs für Task-Management, Status-Überwachung, Fehler-Tracking und System-Konfiguration. Optimiert für administrative Operationen.",
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
        "/v3/dataforseo_labs/id_list": {
          get: {
            tags: ["GeneralLabs"],
            summary: "Task ID Liste",
            description: "Liste aller verfügbaren Task-IDs für DataForSEO Labs APIs",
            operationId: "DataForSEOLabsIdList",
            responses: {
              "200": {
                description: "Successful response",
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
        "/v3/dataforseo_labs/status": {
          get: {
            tags: ["GeneralLabs"],
            summary: "Labs Status",
            description: "Aktueller Status aller DataForSEO Labs Endpoints",
            operationId: "DataForSEOLabsStatus",
            responses: {
              "200": {
                description: "Successful response",
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
        "/v3/dataforseo_labs/errors": {
          get: {
            tags: ["GeneralLabs"],
            summary: "Labs Fehler",
            description: "Fehlerprotokoll der letzten 7 Tage für DataForSEO Labs APIs",
            operationId: "DataForSEOLabsErrors",
            responses: {
              "200": {
                description: "Successful response",
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
        "/v3/dataforseo_labs/available_filters": {
          get: {
            tags: ["GeneralLabs"],
            summary: "Verfügbare Filter",
            description: "Liste aller verfügbaren Filter für DataForSEO Labs APIs",
            operationId: "DataForSEOLabsAvailableFilters",
            responses: {
              "200": {
                description: "Successful response",
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
        "/v3/dataforseo_labs/locations_and_languages": {
          get: {
            tags: ["GeneralLabs"],
            summary: "Locations und Languages",
            description: "Verfügbare Standorte und Sprachen für DataForSEO Labs APIs",
            operationId: "DataForSEOLabsLocationsAndLanguages",
            responses: {
              "200": {
                description: "Successful response",
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
        "/v3/dataforseo_labs/categories": {
          get: {
            tags: ["GeneralLabs"],
            summary: "Kategorien",
            description: "Verfügbare Kategorien für DataForSEO Labs APIs",
            operationId: "DataForSEOLabsCategories",
            responses: {
              "200": {
                description: "Successful response",
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

// Export der einzelnen Kategorien für bessere Modularität
export const AmazonLabsApisComplete = AlleLabsApisComplete.filter(api => api.category === "Amazon Labs")
export const BingLabsApisComplete = AlleLabsApisComplete.filter(api => api.category === "Bing Labs")
export const GoogleLabsApisComplete = AlleLabsApisComplete.filter(api => api.category === "Google Labs")
export const GeneralLabsApis = AlleLabsApisComplete.filter(api => api.category === "General Labs")

// Hilfsfunktion zum Filtern nach Kategorie
export const getLabsApisByCategoryComplete = (category: string): ToolApi[] => {
  return AlleLabsApisComplete.filter(api => api.category === category)
}

// Hilfsfunktion zum Suchen nach API-ID
export const getLabsApiByIdComplete = (id: string): ToolApi | undefined => {
  return AlleLabsApisComplete.find(api => api.id === id)
}

// Statistiken
export const LabsStatsComplete = {
  totalApis: AlleLabsApisComplete.length,
  totalEndpoints: AlleLabsApisComplete.reduce((sum, api) => {
    // Typensicherheit: Überprüfen, ob schema ein Objekt mit "paths" ist
    const paths = (api.schema && typeof api.schema === "object" && "paths" in api.schema)
      ? (api.schema as { paths?: object }).paths
      : undefined;
    return sum + Object.keys(paths || {}).length;
  }, 0),
  categoriesCount: {
    "Amazon Labs": AmazonLabsApisComplete.length,
    "Bing Labs": BingLabsApisComplete.length, 
    "Google Labs": GoogleLabsApisComplete.length,
    "General Labs": GeneralLabsApis.length
  }
}
