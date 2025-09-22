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

export const BacklinksHistoryApi: ToolApi = {
  id: "dataforseo-backlinks-history",
  name: "Backlinks History API",
  description: "Historische Backlink-Daten und Linkbuilding-Performance über die Zeit",
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
      title: "DataForSEO Backlinks History API",
      description: "Historische Backlink-Daten und Linkbuilding-Performance über die Zeit",
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
      "/v3/backlinks/core/history": {
        post: {
          tags: ["Backlinks"],
          summary: "Backlinks History",
          description: "Historische Backlink-Daten und Linkbuilding-Performance über die Zeit",
          operationId: "BacklinksHistory", 
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
                        description: "Domain, Subdomain oder Webseite für die Analyse",
                        example: "dataforseo.com"
                      },
                      date_from: {
                        type: "string",
                        description: "Startdatum für historische Analyse (Format: YYYY-MM-DD)",
                        format: "date",
                        example: "2023-01-01"
                      },
                      date_to: {
                        type: "string",
                        description: "Enddatum für historische Analyse (Format: YYYY-MM-DD)",
                        format: "date",
                        example: "2023-12-31"
                      },
                      include_subdomains: {
                        type: "boolean",
                        description: "Subdomains in Analyse einbeziehen",
                        default: true
                      },
                      aggregation_period: {
                        type: "string",
                        description: "Aggregationsperiode für die Daten",
                        enum: ["daily", "weekly", "monthly"],
                        default: "monthly"
                      },
                      backlinks_status_type: {
                        type: "string",
                        description: "Status-Typ der Backlinks",
                        enum: ["all", "live", "lost"],
                        default: "all"
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
                                  target: { 
                                    type: "string",
                                    description: "Ziel-Domain oder URL"
                                  },
                                  date: { 
                                    type: "string",
                                    description: "Datum der Messung"
                                  },
                                  backlinks: { 
                                    type: "integer",
                                    description: "Gesamtanzahl Backlinks"
                                  },
                                  new_backlinks: { 
                                    type: "integer",
                                    description: "Neue Backlinks in diesem Zeitraum"
                                  },
                                  lost_backlinks: { 
                                    type: "integer",
                                    description: "Verlorene Backlinks in diesem Zeitraum"
                                  },
                                  referring_domains: { 
                                    type: "integer",
                                    description: "Gesamtanzahl verweisende Domains"
                                  },
                                  new_referring_domains: { 
                                    type: "integer",
                                    description: "Neue verweisende Domains"
                                  },
                                  lost_referring_domains: { 
                                    type: "integer",
                                    description: "Verlorene verweisende Domains"
                                  },
                                  crawled_pages: { 
                                    type: "integer",
                                    description: "Anzahl gecrawlter Seiten"
                                  },
                                  info: {
                                    type: "object",
                                    description: "Zusätzliche Informationen",
                                    properties: {
                                      referring_domains_nofollow: { type: "integer" },
                                      referring_main_domains: { type: "integer" },
                                      referring_main_domains_nofollow: { type: "integer" },
                                      dofollow_referring_domains: { type: "integer" },
                                      referring_ips: { type: "integer" },
                                      referring_subnets: { type: "integer" }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
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
