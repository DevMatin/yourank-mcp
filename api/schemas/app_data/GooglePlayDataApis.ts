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

export const GooglePlayDataApis: ToolApi[] = [
  {
    id: "dataforseo-google-play-data",
    name: "Google Play Data API",
    description:
      "Detaillierte Google Play App-Daten mit 12 verschiedenen APIs: App Info, App Reviews, App Lists und Top Charts. Umfassende Analyse von App-Details, Bewertungen und Rankings.",
    category: "App Data - Google Data",
    icon: "📊",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO App Data API - Google Play Data",
        description:
          "12 APIs für detaillierte Google Play App-Daten: App Info, App Reviews, App Lists und Top Charts. Umfassende Marktanalyse und App-Intelligence.",
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
        "/google_play_data_info_live_advanced": {
          post: {
            summary: "Google Play App-Informationen (Live Advanced)",
            description: "Liefert detaillierte Informationen über eine spezifische Google Play App",
            operationId: "googlePlayDataInfoLiveAdvanced",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      app_id: {
                        type: "string",
                        description: "App-ID der Google Play App",
                        example: "com.nordvpn.android"
                      },
                      location_name: {
                        type: "string",
                        description: "Vollständiger Name des Standorts",
                        example: "West Los Angeles,California,United States"
                      },
                      location_code: {
                        type: "integer",
                        description: "Standort-Code",
                        example: 2840
                      },
                      language_name: {
                        type: "string",
                        description: "Vollständiger Name der Sprache",
                        example: "English"
                      },
                      language_code: {
                        type: "string",
                        description: "Sprach-Code",
                        example: "en"
                      },
                      priority: {
                        type: "integer",
                        description: "Task-Priorität (1=normal, 2=hoch)",
                        enum: [1, 2],
                        default: 1
                      },
                      tag: {
                        type: "string",
                        description: "Benutzerdefinierte Task-ID (max 255 Zeichen)"
                      }
                    },
                    required: ["app_id"]
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
                                    app_id: { type: "string" },
                                    se_domain: { type: "string" },
                                    location_code: { type: "integer" },
                                    language_code: { type: "string" },
                                    check_url: { type: "string" },
                                    datetime: { type: "string" },
                                    item: {
                                      type: "object",
                                      properties: {
                                        type: { type: "string" },
                                        app_id: { type: "string" },
                                        title: { type: "string" },
                                        url: { type: "string" },
                                        icon: { type: "string" },
                                        description: { type: "string" },
                                        genre: { type: "string" },
                                        genre_id: { type: "string" },
                                        reviews_count: { type: "integer" },
                                        rating: {
                                          type: "object",
                                          properties: {
                                            rating_type: { type: "string" },
                                            value: { type: "number" },
                                            votes_count: { type: "integer" },
                                            rating_max: { type: "integer" }
                                          }
                                        },
                                        price: {
                                          type: "object",
                                          properties: {
                                            current: { type: "number" },
                                            regular: { type: "number" },
                                            max_value: { type: "number" },
                                            currency: { type: "string" },
                                            is_price_range: { type: "boolean" },
                                            displayed_price: { type: "string" }
                                          }
                                        },
                                        is_free: { type: "boolean" },
                                        main_category: { type: "string" },
                                        installs: { type: "string" },
                                        installs_count: { type: "integer" },
                                        developer: { type: "string" },
                                        developer_id: { type: "string" },
                                        developer_url: { type: "string" },
                                        developer_email: { type: "string" },
                                        content_rating: { type: "string" },
                                        release_date: { type: "string" },
                                        last_update_date: { type: "string" },
                                        what_is_new: { type: "string" },
                                        images: { type: "array", items: { type: "string" } },
                                        videos: { type: "array", items: { type: "string" } }
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
        "/google_play_data_reviews_live_advanced": {
          post: {
            summary: "Google Play App-Bewertungen (Live Advanced)",
            description: "Liefert Bewertungen für eine spezifische Google Play App",
            operationId: "googlePlayDataReviewsLiveAdvanced",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      app_id: {
                        type: "string",
                        description: "App-ID der Google Play App",
                        example: "com.nordvpn.android"
                      },
                      location_code: {
                        type: "integer",
                        description: "Standort-Code",
                        example: 2840
                      },
                      language_code: {
                        type: "string",
                        description: "Sprach-Code",
                        example: "en"
                      },
                      priority: {
                        type: "integer",
                        description: "Task-Priorität (1=normal, 2=hoch)",
                        enum: [1, 2],
                        default: 1
                      },
                      depth: {
                        type: "integer",
                        description: "Anzahl der Bewertungen (Standard: 50, Maximum: 500)",
                        default: 50,
                        maximum: 500
                      },
                      sort_by: {
                        type: "string",
                        description: "Sortierung der Bewertungen",
                        enum: ["most_recent", "most_helpful"],
                        default: "most_helpful"
                      },
                      tag: {
                        type: "string",
                        description: "Benutzerdefinierte Task-ID (max 255 Zeichen)"
                      }
                    },
                    required: ["app_id"]
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
                                    app_id: { type: "string" },
                                    se_domain: { type: "string" },
                                    location_code: { type: "integer" },
                                    language_code: { type: "string" },
                                    check_url: { type: "string" },
                                    datetime: { type: "string" },
                                    title: { type: "string" },
                                    rating: {
                                      type: "object",
                                      properties: {
                                        rating_type: { type: "string" },
                                        value: { type: "number" },
                                        votes_count: { type: "integer" },
                                        rating_max: { type: "integer" }
                                      }
                                    },
                                    reviews_count: { type: "integer" },
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
                                          rating: {
                                            type: "object",
                                            properties: {
                                              rating_type: { type: "string" },
                                              value: { type: "number" },
                                              votes_count: { type: "integer" },
                                              rating_max: { type: "integer" }
                                            }
                                          },
                                          timestamp: { type: "string" },
                                          id: { type: "string" },
                                          helpful_count: { type: "integer" },
                                          title: { type: "string" },
                                          review_text: { type: "string" },
                                          user_profile: {
                                            type: "object",
                                            properties: {
                                              name: { type: "string" },
                                              url: { type: "string" },
                                              image_url: { type: "string" },
                                              reviews_count: { type: "integer" }
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
