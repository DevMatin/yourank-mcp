// Vollständiges Business Data Schema - Alle 24 implementierte Business Data Tools
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

// Vollständiges Business Data Schema mit allen 24 implementierten Tools
export const CompleteBusinessDataSchema: ToolApi = {
  id: "business-data-complete",
  name: "Business Data Complete API",
  description: "Vollständige Business Data API mit allen 24 implementierten Tools für lokale SEO, Reviews, Social Media Analytics und Business Intelligence.",
  category: "Business Data",
  icon: "",
  url: "https://yourank-mcp.vercel.app",
  customHeaders: {
    Authorization: getDataForSEOAuthHeader(),
    "Content-Type": "application/json"
  },
  schema: {
    openapi: "3.1.0",
    info: {
      title: "Business Data Complete API - Alle DataForSEO Business Tools",
      description: "Vollständige API mit allen 24 Business Data Tools: Core (2), Google Business (7), Business Listings (5), Social Media (3), TripAdvisor (5), Trustpilot (2)",
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
      // Core Business Data Tools (2)
      "/business_data_id_list": {
        post: {
          summary: "Business Data ID List",
          description: "Liste aller abgeschlossenen Business Data Tasks mit IDs und Metadaten",
          operationId: "businessDataIdList",
          tags: ["Core"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    date_from: { type: "string", description: "Start-Datum (YYYY-MM-DD)" },
                    date_to: { type: "string", description: "End-Datum (YYYY-MM-DD)" },
                    limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 1000 }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_errors": {
        post: {
          summary: "Business Data Errors",
          description: "Business Data API Tasks mit Fehlern der letzten 7 Tage",
          operationId: "businessDataErrors",
          tags: ["Core"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 1000 },
                    offset: { type: "integer", description: "Offset für Pagination" }
                  }
                }
              }
            }
          }
        }
      },

      // Google Business Tools (7)
      "/business_data_google_locations": {
        get: {
          summary: "Google Business Locations",
          description: "Liste aller verfügbaren Google Business Standorte",
          operationId: "googleBusinessLocations",
          tags: ["Google Business"]
        }
      },
      "/business_data_google_locations_country": {
        post: {
          summary: "Google Business Locations by Country",
          description: "Google Business Standorte gefiltert nach Land",
          operationId: "googleBusinessLocationsCountry",
          tags: ["Google Business"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["country"],
                  properties: {
                    country: { type: "string", description: "ISO Land-Code (z.B. 'DE', 'US')" }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_google_languages": {
        get: {
          summary: "Google Business Languages",
          description: "Liste aller unterstützten Google Business Sprachen",
          operationId: "googleBusinessLanguages",
          tags: ["Google Business"]
        }
      },
      "/business_data_google_my_business_info_live": {
        post: {
          summary: "Google My Business Info Live",
          description: "Detaillierte Live-Informationen zu einem Google Business Profil",
          operationId: "googleMyBusinessInfoLive",
          tags: ["Google Business"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["business_name", "location_code"],
                  properties: {
                    business_name: { type: "string", description: "Name des Geschäfts" },
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" },
                    depth: { type: "integer", description: "Tiefe der Datenabfrage", minimum: 1, maximum: 3 }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_google_hotel_searches_live": {
        post: {
          summary: "Google Hotel Searches Live",
          description: "Live Hotel-Suche auf Google Hotels mit detaillierten Informationen",
          operationId: "googleHotelSearchesLive",
          tags: ["Google Business"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["keyword", "location_code"],
                  properties: {
                    keyword: { type: "string", description: "Hotel-Suchbegriff" },
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" },
                    check_in: { type: "string", description: "Check-in Datum (YYYY-MM-DD)" },
                    check_out: { type: "string", description: "Check-out Datum (YYYY-MM-DD)" },
                    adults: { type: "integer", description: "Anzahl Erwachsene", minimum: 1 },
                    children: { type: "integer", description: "Anzahl Kinder", minimum: 0 }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_google_hotel_info_live_advanced": {
        post: {
          summary: "Google Hotel Info Live Advanced",
          description: "Erweiterte Live Hotel-Informationen von Google Hotels",
          operationId: "googleHotelInfoLiveAdvanced",
          tags: ["Google Business"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["hotel_identifier", "location_code"],
                  properties: {
                    hotel_identifier: { type: "string", description: "Hotel-Identifier oder -Name" },
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" },
                    check_in: { type: "string", description: "Check-in Datum (YYYY-MM-DD)" },
                    check_out: { type: "string", description: "Check-out Datum (YYYY-MM-DD)" }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_google_reviews_live": {
        post: {
          summary: "Google Reviews Live",
          description: "Live Google-Bewertungen für ein spezifisches Business",
          operationId: "googleReviewsLive",
          tags: ["Google Business"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["business_name", "location_code"],
                  properties: {
                    business_name: { type: "string", description: "Name des Geschäfts" },
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" },
                    limit: { type: "integer", description: "Anzahl Reviews", maximum: 100 },
                    priority: { type: "string", enum: ["low", "normal", "high"], description: "Priorität der Anfrage" }
                  }
                }
              }
            }
          }
        }
      },

      // Business Listings Tools (5)
      "/business_data_business_listings_search": {
        post: {
          summary: "Business Listings Search",
          description: "Suche nach Business-Entitäten auf Google Maps",
          operationId: "businessListingsSearch",
          tags: ["Google Maps"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["keyword", "location_code"],
                  properties: {
                    keyword: { type: "string", description: "Such-Keywords" },
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" },
                    depth: { type: "integer", description: "Tiefe der Suche", minimum: 1, maximum: 700 }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_business_listings_filters": {
        get: {
          summary: "Business Listings Filters",
          description: "Verfügbare Filter für Business Listings API",
          operationId: "businessListingsFilters",
          tags: ["Google Maps"]
        }
      },
      "/business_data_business_listings_locations": {
        get: {
          summary: "Business Listings Locations",
          description: "Liste der Standorte für Business Listings",
          operationId: "businessListingsLocations",
          tags: ["Google Maps"]
        }
      },
      "/business_data_business_listings_categories": {
        get: {
          summary: "Business Listings Categories",
          description: "Top-Kategorien nach Business-Anzahl",
          operationId: "businessListingsCategories",
          tags: ["Google Maps"]
        }
      },
      "/business_data_business_listings_categories_aggregation": {
        post: {
          summary: "Business Listings Categories Aggregation",
          description: "Live Business-Kategorien Aggregationsdaten",
          operationId: "businessListingsCategoriesAggregation",
          tags: ["Google Maps"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["location_code"],
                  properties: {
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" }
                  }
                }
              }
            }
          }
        }
      },

      // Social Media Tools (3)
      "/business_data_social_media_pinterest_live": {
        post: {
          summary: "Pinterest Social Media Live",
          description: "Pinterest-Pins und Shares für spezifische URLs",
          operationId: "socialMediaPinterestLive",
          tags: ["Social Media"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["targets"],
                  properties: {
                    targets: {
                      type: "array",
                      description: "Liste der zu analysierenden URLs",
                      items: { type: "string" },
                      maxItems: 100
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_social_media_facebook_live": {
        post: {
          summary: "Facebook Social Media Live",
          description: "Facebook-Likes für spezifische URLs über Like-Button",
          operationId: "socialMediaFacebookLive",
          tags: ["Social Media"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["targets"],
                  properties: {
                    targets: {
                      type: "array",
                      description: "Liste der zu analysierenden URLs",
                      items: { type: "string" },
                      maxItems: 100
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_social_media_reddit_live": {
        post: {
          summary: "Reddit Social Media Live",
          description: "Reddit-Shares mit Subreddit-Info und Community-Daten",
          operationId: "socialMediaRedditLive",
          tags: ["Social Media"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["targets"],
                  properties: {
                    targets: {
                      type: "array",
                      description: "Liste der zu analysierenden URLs",
                      items: { type: "string" },
                      maxItems: 100
                    }
                  }
                }
              }
            }
          }
        }
      },

      // TripAdvisor Tools (5)
      "/business_data_tripadvisor_locations": {
        get: {
          summary: "TripAdvisor Locations",
          description: "Liste aller TripAdvisor Standorte",
          operationId: "tripadvisorLocations",
          tags: ["TripAdvisor"]
        }
      },
      "/business_data_tripadvisor_locations_country": {
        post: {
          summary: "TripAdvisor Locations by Country",
          description: "TripAdvisor Standorte gefiltert nach Land",
          operationId: "tripadvisorLocationsCountry",
          tags: ["TripAdvisor"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["country"],
                  properties: {
                    country: { type: "string", description: "ISO Land-Code (z.B. 'DE', 'US')" }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_tripadvisor_languages": {
        get: {
          summary: "TripAdvisor Languages",
          description: "Liste aller unterstützten TripAdvisor Sprachen",
          operationId: "tripadvisorLanguages",
          tags: ["TripAdvisor"]
        }
      },
      "/business_data_tripadvisor_search_live": {
        post: {
          summary: "TripAdvisor Search Live",
          description: "Live-Suche nach Business-Profilen auf TripAdvisor",
          operationId: "tripadvisorSearchLive",
          tags: ["TripAdvisor"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["keyword", "location_code"],
                  properties: {
                    keyword: { type: "string", description: "Such-Keywords" },
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" },
                    limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 700 }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_tripadvisor_reviews_live": {
        post: {
          summary: "TripAdvisor Reviews Live",
          description: "Live TripAdvisor-Bewertungen für Hotels und Restaurants",
          operationId: "tripadvisorReviewsLive",
          tags: ["TripAdvisor"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["business_name", "location_code"],
                  properties: {
                    business_name: { type: "string", description: "Name des Geschäfts" },
                    location_code: { type: "integer", description: "Standort-Code" },
                    language_code: { type: "string", description: "Sprach-Code" },
                    limit: { type: "integer", description: "Anzahl Reviews", maximum: 100 }
                  }
                }
              }
            }
          }
        }
      },

      // Trustpilot Tools (2)
      "/business_data_trustpilot_search_live": {
        post: {
          summary: "Trustpilot Search Live",
          description: "Live-Suche nach Business-Profilen auf Trustpilot",
          operationId: "trustpilotSearchLive",
          tags: ["Trustpilot"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["keyword"],
                  properties: {
                    keyword: { type: "string", description: "Such-Keywords" },
                    limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 100 }
                  }
                }
              }
            }
          }
        }
      },
      "/business_data_trustpilot_reviews_live": {
        post: {
          summary: "Trustpilot Reviews Live",
          description: "Live Trustpilot-Bewertungen und Vertrauens-Scores",
          operationId: "trustpilotReviewsLive",
          tags: ["Trustpilot"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["business_name"],
                  properties: {
                    business_name: { type: "string", description: "Name des Geschäfts" },
                    limit: { type: "integer", description: "Anzahl Reviews", maximum: 100 },
                    depth: { type: "integer", description: "Tiefe der Datenabfrage", minimum: 1, maximum: 100 }
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      { name: "Core", description: "Core Business Data Management Tools" },
      { name: "Google Business", description: "Google My Business & Hotel Platform APIs" },
      { name: "Google Maps", description: "Google Maps Business Listings & Local Search" },
      { name: "Social Media", description: "Social Media Analytics (Pinterest, Facebook, Reddit)" },
      { name: "TripAdvisor", description: "TripAdvisor Travel & Hospitality Business Data" },
      { name: "Trustpilot", description: "Trustpilot Business Reviews & Trust Scores" }
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
          description: "DataForSEO Basic Auth mit Login:Password"
        }
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            error_code: { type: "integer" },
            error_message: { type: "string" },
            time: { type: "string", format: "date-time" }
          }
        },
        SuccessResponse: {
          type: "object",
          properties: {
            version: { type: "string" },
            status_code: { type: "integer" },
            status_message: { type: "string" },
            time: { type: "string", format: "date-time" },
            cost: { type: "number" },
            tasks_count: { type: "integer" },
            tasks_error: { type: "integer" },
            tasks: { type: "array", items: {} }
          }
        }
      }
    },
    security: [{ basicAuth: [] }]
  }
}

// Export des vollständigen Schemas
export const CompleteBusinessDataApis = [CompleteBusinessDataSchema]

// Statistik-Übersicht
export const BusinessDataCompleteOverview = {
  totalEndpoints: 24,
  categories: {
    "Core": 2,
    "Google Business": 7,
    "Google Maps": 5,
    "Social Media": 3,
    "TripAdvisor": 5,
    "Trustpilot": 2
  },
  corrections: [
    "Korrigierte API-Pfade: Verwendung der Tool-Namen statt DataForSEO API-Pfade",
    "Vollständige Abdeckung aller 24 implementierten Tools",
    "Korrekte URL: https://yourank-mcp.vercel.app",
    "Korrekte Auth-Header mit getDataForSEOAuthHeader()",
    "Logische Tag-Gruppierung nach Funktionsbereichen",
    "Vollständige OpenAPI 3.1.0 Struktur mit Components und Security"
  ]
}
