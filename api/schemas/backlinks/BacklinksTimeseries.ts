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

export const BacklinksTimeseriesApi: ToolApi = {
  id: "dataforseo-backlinks-timeseries",
  name: "Backlinks Timeseries API",
  description: "Zeitbasierte Backlink-Analysen mit Timeseries Summary und New/Lost Summary",
  category: "Backlinks",
  icon: "",
  url: "https://mcp-server-typescript-six.vercel.app",
  customHeaders: {
    Authorization: getDataForSEOAuthHeader(),
    "Content-Type": "application/json"
  },
  schema: {
    openapi: "3.1.0",
    info: {
      title: "DataForSEO Backlinks Timeseries API",
      description: "Zeitbasierte Backlink-Analysen und historische Trend-Daten",
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
      "/v3/backlinks/timeseries/summary": {
        post: {
          tags: ["Backlinks Timeseries"],
          summary: "Timeseries Summary",
          description: "Zeitbasierte Zusammenfassung der Backlink-Entwicklung",
          operationId: "BacklinksTimeseriesSummary",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      target: {
                        type: "string",
                        description: "Domain oder URL für die Analyse",
                        example: "dataforseo.com"
                      },
                      date_from: {
                        type: "string",
                        description: "Startdatum (Format: YYYY-MM-DD)",
                        format: "date",
                        example: "2023-01-01"
                      },
                      date_to: {
                        type: "string",
                        description: "Enddatum (Format: YYYY-MM-DD)",
                        format: "date",
                        example: "2023-12-31"
                      },
                      aggregation_period: {
                        type: "string",
                        description: "Aggregationsperiode",
                        enum: ["daily", "weekly", "monthly"],
                        default: "monthly"
                      },
                      include_subdomains: {
                        type: "boolean",
                        description: "Subdomains einbeziehen",
                        default: true
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
                                  date: { type: "string" },
                                  backlinks: { type: "integer" },
                                  new_backlinks: { type: "integer" },
                                  lost_backlinks: { type: "integer" },
                                  referring_domains: { type: "integer" },
                                  new_referring_domains: { type: "integer" },
                                  lost_referring_domains: { type: "integer" },
                                  crawled_pages: { type: "integer" },
                                  info: {
                                    type: "object",
                                    properties: {
                                      referring_domains_nofollow: { type: "integer" },
                                      referring_main_domains: { type: "integer" },
                                      referring_main_domains_nofollow: { type: "integer" },
                                      dofollow_referring_domains: { type: "integer" }
                                    }
                                  }
                                }
                              }
                            }
                          }
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
      "/v3/backlinks/timeseries/new_lost_summary": {
        post: {
          tags: ["Backlinks Timeseries"],
          summary: "New/Lost Summary",
          description: "Zusammenfassung neuer und verlorener Backlinks über die Zeit",
          operationId: "BacklinksNewLostSummary",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      target: {
                        type: "string",
                        description: "Domain oder URL für die Analyse",
                        example: "dataforseo.com"
                      },
                      date_from: {
                        type: "string",
                        description: "Startdatum (Format: YYYY-MM-DD)",
                        format: "date",
                        example: "2023-01-01"
                      },
                      date_to: {
                        type: "string",
                        description: "Enddatum (Format: YYYY-MM-DD)",
                        format: "date",
                        example: "2023-12-31"
                      },
                      aggregation_period: {
                        type: "string",
                        description: "Aggregationsperiode",
                        enum: ["daily", "weekly", "monthly"],
                        default: "monthly"
                      },
                      include_subdomains: {
                        type: "boolean",
                        description: "Subdomains einbeziehen",
                        default: true
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
                                  date: { type: "string" },
                                  new_backlinks: { type: "integer" },
                                  lost_backlinks: { type: "integer" },
                                  new_referring_domains: { type: "integer" },
                                  lost_referring_domains: { type: "integer" },
                                  new_backlinks_info: {
                                    type: "object",
                                    properties: {
                                      dofollow: { type: "integer" },
                                      nofollow: { type: "integer" },
                                      text: { type: "integer" },
                                      image: { type: "integer" },
                                      redirect: { type: "integer" },
                                      canonical: { type: "integer" },
                                      alternate: { type: "integer" }
                                    }
                                  },
                                  lost_backlinks_info: {
                                    type: "object",
                                    properties: {
                                      dofollow: { type: "integer" },
                                      nofollow: { type: "integer" },
                                      text: { type: "integer" },
                                      image: { type: "integer" },
                                      redirect: { type: "integer" },
                                      canonical: { type: "integer" },
                                      alternate: { type: "integer" }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
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
