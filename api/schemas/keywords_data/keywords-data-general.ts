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

// Keywords Data General API - Complete
export const KeywordsDataGeneralCompleteApi: ToolApi[] = [
  {
    id: "dataforseo-keywords-data-general-complete",
    name: "Keywords Data General API - Alle Keywords Funktionen", 
    description: "Vollständige Keywords Data API mit allen Funktionen: Google Ads, Google Trends, DataForSEO Trends, Bing und Core APIs. Umfassende Keyword-Recherche und -Analyse für alle 27 implementierten Endpoints.",
    category: "Keywords Data - General Complete",
    icon: "🔍📊🚀📈",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Keywords Data API - General Complete",
        description: "Vollständige Keywords Data API mit allen 27 Funktionen: Google Ads, Google Trends, DataForSEO Trends, Bing und Core APIs.",
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
        // ===== KEYWORDS DATA CORE APIs =====
        "/v3/keywords_data/id_list": {
          post: {
            tags: ["Keywords Data Core"],
            summary: "Keywords Data ID List",
            description: "Liefert eine Liste aller abgeschlossenen Keywords Data Tasks mit Metadaten",
            operationId: "KeywordsDataIdList",
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
                          description: "Startzeit für Filterung der Ergebnisse",
                          example: "2023-01-15 12:57:46 +00:00"
                        },
                        datetime_to: {
                          type: "string",
                          description: "Endzeit für Filterung der Ergebnisse",
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              result: { type: "array", items: { type: "object" } }
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
        "/v3/keywords_data/errors": {
          post: {
            tags: ["Keywords Data Core"],
            summary: "Keywords Data Errors",
            description: "Liefert Informationen über Keywords Data API Tasks mit Fehlern",
            operationId: "KeywordsDataErrors",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },

        // ===== GOOGLE ADS APIs =====
        "/v3/keywords_data/google_ads/status": {
          get: {
            tags: ["Google Ads"],
            summary: "Google Ads Status",
            description: "Liefert den aktuellen Status der Google Ads API",
            operationId: "GoogleAdsStatus",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/google_ads/locations": {
          get: {
            tags: ["Google Ads"],
            summary: "Google Ads Locations",
            description: "Liefert alle verfügbaren Standorte für Google Ads Keywords API",
            operationId: "GoogleAdsLocations",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    location_code: { type: "integer" },
                                    location_name: { type: "string" },
                                    country_iso_code: { type: "string" }
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
        "/v3/keywords_data/google_ads/languages": {
          get: {
            tags: ["Google Ads"],
            summary: "Google Ads Languages",
            description: "Liefert alle verfügbaren Sprachen für Google Ads Keywords API",
            operationId: "GoogleAdsLanguages",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    language_code: { type: "string" },
                                    language_name: { type: "string" }
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
        "/v3/keywords_data/google_ads/search_volume/live": {
          post: {
            tags: ["Google Ads"],
            summary: "Google Ads Search Volume Live",
            description: "Liefert Suchvolumen-Daten für Keywords in Echtzeit",
            operationId: "GoogleAdsSearchVolumeLive",
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
                          description: "Ziel-Keyword für Suchvolumen-Analyse",
                          example: "digital marketing"
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
                        device: {
                          type: "string",
                          enum: ["desktop", "mobile"],
                          description: "Gerät für die Analyse"
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    search_volume: { type: "integer" },
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
        "/v3/keywords_data/google_ads/keywords_for_site/live": {
          post: {
            tags: ["Google Ads"],
            summary: "Google Ads Keywords for Site Live",
            description: "Liefert Keywords für eine bestimmte Website in Echtzeit",
            operationId: "GoogleAdsKeywordsForSiteLive",
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
                          description: "Ziel-Website für Keyword-Analyse",
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    search_volume: { type: "integer" },
                                    competition: { type: "number" }
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
        "/v3/keywords_data/google_ads/keywords_for_keywords/live": {
          post: {
            tags: ["Google Ads"],
            summary: "Google Ads Keywords for Keywords Live",
            description: "Liefert ähnliche Keywords für ein Seed-Keyword in Echtzeit",
            operationId: "GoogleAdsKeywordsForKeywordsLive",
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
                          description: "Seed-Keyword für Keyword-Vorschläge",
                          example: "seo tools"
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    search_volume: { type: "integer" },
                                    competition: { type: "number" }
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

        // ===== GOOGLE TRENDS APIs =====
        "/v3/keywords_data/google_trends/categories": {
          get: {
            tags: ["Google Trends"],
            summary: "Google Trends Categories",
            description: "Liefert alle verfügbaren Kategorien für Google Trends",
            operationId: "GoogleTrendsCategories",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    category_code: { type: "integer" },
                                    category_name: { type: "string" }
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
        "/v3/keywords_data/google_trends/locations": {
          get: {
            tags: ["Google Trends"],
            summary: "Google Trends Locations",
            description: "Liefert alle verfügbaren Standorte für Google Trends",
            operationId: "GoogleTrendsLocations",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    location_code: { type: "integer" },
                                    location_name: { type: "string" }
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
        "/v3/keywords_data/google_trends/languages": {
          get: {
            tags: ["Google Trends"],
            summary: "Google Trends Languages",
            description: "Liefert alle verfügbaren Sprachen für Google Trends",
            operationId: "GoogleTrendsLanguages",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    language_code: { type: "string" },
                                    language_name: { type: "string" }
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
        "/v3/keywords_data/google_trends/explore/live": {
          post: {
            tags: ["Google Trends"],
            summary: "Google Trends Explore Live",
            description: "Liefert Google Trends-Daten für Keywords in Echtzeit",
            operationId: "GoogleTrendsExploreLive",
            requestBody: {
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
                          description: "Keywords für Trends-Analyse",
                          example: ["artificial intelligence", "machine learning"]
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
                        date_from: {
                          type: "string",
                          description: "Startdatum für die Analyse",
                          example: "2023-01-01"
                        },
                        date_to: {
                          type: "string",
                          description: "Enddatum für die Analyse",
                          example: "2023-12-31"
                        }
                      },
                      required: ["keywords"]
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    keywords: { type: "array", items: { type: "string" } },
                                    trends_data: { type: "array", items: { type: "object" } }
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

        // ===== DATAFORSEO TRENDS APIs =====
        "/v3/keywords_data/dataforseo_trends/locations": {
          get: {
            tags: ["DataForSEO Trends"],
            summary: "DataForSEO Trends Locations",
            description: "Liefert alle verfügbaren Standorte für DataForSEO Trends",
            operationId: "DataForSEOTrendsLocations",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    location_code: { type: "integer" },
                                    location_name: { type: "string" }
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
        "/v3/keywords_data/dataforseo_trends/explore/live": {
          post: {
            tags: ["DataForSEO Trends"],
            summary: "DataForSEO Trends Explore Live",
            description: "Liefert DataForSEO Trends-Daten für Keywords in Echtzeit",
            operationId: "DataForSEOTrendsExploreLive",
            requestBody: {
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
                          description: "Keywords für Trends-Analyse",
                          example: ["seo", "digital marketing"]
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        }
                      },
                      required: ["keywords"]
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/dataforseo_trends/demography/live": {
          post: {
            tags: ["DataForSEO Trends"],
            summary: "DataForSEO Trends Demography Live",
            description: "Liefert demografische Trends-Daten für Keywords",
            operationId: "DataForSEOTrendsDemographyLive",
            requestBody: {
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
                          description: "Keywords für demografische Analyse",
                          example: ["fitness", "health"]
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        }
                      },
                      required: ["keywords"]
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/dataforseo_trends/subregion_interests/live": {
          post: {
            tags: ["DataForSEO Trends"],
            summary: "DataForSEO Trends Subregion Interests Live",
            description: "Liefert regionale Interesse-Daten für Keywords",
            operationId: "DataForSEOTrendsSubregionInterestsLive",
            requestBody: {
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
                          description: "Keywords für regionale Analyse",
                          example: ["travel", "tourism"]
                        },
                        location_code: {
                          type: "integer",
                          description: "Standort-Code für die Analyse",
                          example: 2840
                        }
                      },
                      required: ["keywords"]
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },

        // ===== BING APIs =====
        "/v3/keywords_data/bing/locations": {
          get: {
            tags: ["Bing"],
            summary: "Bing Locations",
            description: "Liefert alle verfügbaren Standorte für Bing Keywords API",
            operationId: "BingLocations",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    location_code: { type: "integer" },
                                    location_name: { type: "string" }
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
        "/v3/keywords_data/bing/languages": {
          get: {
            tags: ["Bing"],
            summary: "Bing Languages",
            description: "Liefert alle verfügbaren Sprachen für Bing Keywords API",
            operationId: "BingLanguages",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    language_code: { type: "string" },
                                    language_name: { type: "string" }
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
        "/v3/keywords_data/bing/search_volume/live": {
          post: {
            tags: ["Bing"],
            summary: "Bing Search Volume Live",
            description: "Liefert Suchvolumen-Daten für Bing Keywords in Echtzeit",
            operationId: "BingSearchVolumeLive",
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
                          description: "Ziel-Keyword für Suchvolumen-Analyse",
                          example: "microsoft office"
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
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
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
                                    search_volume: { type: "integer" },
                                    competition: { type: "number" }
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

        // ===== TASK-BASED APIs (Asynchron) =====
        "/v3/keywords_data/google_ads/search_volume/task_post": {
          post: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Search Volume Task Post",
            description: "Startet eine asynchrone Search Volume Aufgabe",
            operationId: "GoogleAdsSearchVolumeTaskPost",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        location_code: { type: "integer" },
                        language_code: { type: "string" },
                        device: { type: "string", enum: ["desktop", "mobile"] }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich gestartet",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              result: { type: "array", items: { type: "object" } }
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
        "/v3/keywords_data/google_ads/search_volume/tasks_ready": {
          post: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Search Volume Tasks Ready",
            description: "Liefert fertige Search Volume Tasks",
            operationId: "GoogleAdsSearchVolumeTasksReady",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              result: { type: "array", items: { type: "object" } }
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
        "/v3/keywords_data/google_ads/search_volume/task_get/{id}": {
          get: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Search Volume Task Get",
            description: "Holt Ergebnisse einer spezifischen Search Volume Task",
            operationId: "GoogleAdsSearchVolumeTaskGet",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
                description: "Task ID"
              }
            ],
            responses: {
              "200": {
                description: "Task-Ergebnisse erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              result: { type: "array", items: { type: "object" } }
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
        "/v3/keywords_data/google_ads/keywords_for_site/task_post": {
          post: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Keywords for Site Task Post",
            description: "Startet eine asynchrone Keywords for Site Aufgabe",
            operationId: "GoogleAdsKeywordsForSiteTaskPost",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string" },
                        location_code: { type: "integer" },
                        language_code: { type: "string" },
                        device: { type: "string", enum: ["desktop", "mobile"] }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich gestartet",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/google_ads/keywords_for_site/tasks_ready": {
          post: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Keywords for Site Tasks Ready",
            description: "Liefert fertige Keywords for Site Tasks",
            operationId: "GoogleAdsKeywordsForSiteTasksReady",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/google_ads/keywords_for_site/task_get/{id}": {
          get: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Keywords for Site Task Get",
            description: "Holt Ergebnisse einer spezifischen Keywords for Site Task",
            operationId: "GoogleAdsKeywordsForSiteTaskGet",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
                description: "Task ID"
              }
            ],
            responses: {
              "200": {
                description: "Task-Ergebnisse erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/google_ads/keywords_for_keywords/task_post": {
          post: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Keywords for Keywords Task Post",
            description: "Startet eine asynchrone Keywords for Keywords Aufgabe",
            operationId: "GoogleAdsKeywordsForKeywordsTaskPost",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        location_code: { type: "integer" },
                        language_code: { type: "string" },
                        device: { type: "string", enum: ["desktop", "mobile"] }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich gestartet",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/google_ads/keywords_for_keywords/tasks_ready": {
          post: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Keywords for Keywords Tasks Ready",
            description: "Liefert fertige Keywords for Keywords Tasks",
            operationId: "GoogleAdsKeywordsForKeywordsTasksReady",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/google_ads/keywords_for_keywords/task_get/{id}": {
          get: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Keywords for Keywords Task Get",
            description: "Holt Ergebnisse einer spezifischen Keywords for Keywords Task",
            operationId: "GoogleAdsKeywordsForKeywordsTaskGet",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
                description: "Task ID"
              }
            ],
            responses: {
              "200": {
                description: "Task-Ergebnisse erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_post": {
          post: {
            tags: ["Google Ads Tasks"],
            summary: "Google Ads Ad Traffic by Keywords Task Post",
            description: "Startet eine asynchrone Ad Traffic by Keywords Aufgabe",
            operationId: "GoogleAdsAdTrafficByKeywordsTaskPost",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        location_code: { type: "integer" },
                        language_code: { type: "string" },
                        device: { type: "string", enum: ["desktop", "mobile"] }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich gestartet",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status_code: { type: "integer" },
                        status_message: { type: "string" },
                        tasks: { type: "array", items: { type: "object" } }
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
