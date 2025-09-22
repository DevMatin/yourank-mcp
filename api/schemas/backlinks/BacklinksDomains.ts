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

export const BacklinksDomainsApi: ToolApi = {
  id: "dataforseo-backlinks-domains",
  name: "Backlinks Domains API",
  description: "Domain-fokussierte Backlink-Analysen mit Domain Pages und Referring Domains",
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
      title: "DataForSEO Backlinks Domains API",
      description: "Domain-fokussierte Backlink-Analysen und Referring Domain Intelligence",
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
      "/v3/backlinks/domains/domain_pages": {
        post: {
          tags: ["Backlinks Domains"],
          summary: "Domain Pages Analysis",
          description: "Liefert eine Liste von Seiten der angegebenen Domain mit Backlink-Statistiken",
          operationId: "BacklinksDomainPages",
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
                        description: "Domain für die Analyse",
                        example: "dataforseo.com"
                      },
                      limit: {
                        type: "integer",
                        description: "Anzahl der zurückzugebenden Ergebnisse",
                        default: 100,
                        maximum: 1000
                      },
                      offset: {
                        type: "integer",
                        description: "Offset für Paginierung",
                        default: 0
                      },
                      filters: {
                        type: "array",
                        description: "Filter für Domain Pages",
                        items: {
                          type: "object",
                          properties: {
                            field: { 
                              type: "string",
                              enum: ["rank", "backlinks", "referring_domains", "broken_backlinks"]
                            },
                            operator: { 
                              type: "string",
                              enum: ["=", "!=", ">", "<", ">=", "<="]
                            },
                            value: { type: "string" }
                          },
                          required: ["field", "operator", "value"]
                        }
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
                                  rank: { type: "integer" },
                                  backlinks: { type: "integer" },
                                  first_seen: { type: "string" },
                                  lost_date: { type: "string" },
                                  broken_backlinks: { type: "integer" },
                                  broken_pages: { type: "integer" },
                                  referring_domains: { type: "integer" },
                                  referring_domains_nofollow: { type: "integer" },
                                  referring_main_domains: { type: "integer" },
                                  referring_main_domains_nofollow: { type: "integer" },
                                  referring_ips: { type: "integer" },
                                  referring_subnets: { type: "integer" },
                                  internal_links_count: { type: "integer" },
                                  external_links_count: { type: "integer" },
                                  size: { type: "integer" },
                                  encoding: { type: "string" },
                                  title: { type: "string" },
                                  page_type: { type: "string" }
                                }
                              }
                            }
                          }
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
      "/v3/backlinks/domains/referring_domains": {
        post: {
          tags: ["Backlinks Domains"],
          summary: "Referring Domains Analysis",
          description: "Liefert eine Liste von Domains, die auf die Ziel-Domain verlinken",
          operationId: "BacklinksReferringDomains",
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
                        description: "Domain für die Analyse",
                        example: "dataforseo.com"
                      },
                      limit: {
                        type: "integer",
                        description: "Anzahl der zurückzugebenden Ergebnisse",
                        default: 100,
                        maximum: 1000
                      },
                      offset: {
                        type: "integer",
                        description: "Offset für Paginierung",
                        default: 0
                      },
                      filters: {
                        type: "array",
                        description: "Filter für Referring Domains",
                        items: {
                          type: "object",
                          properties: {
                            field: { 
                              type: "string",
                              enum: ["domain_from", "backlinks", "rank", "first_seen", "lost_date"]
                            },
                            operator: { 
                              type: "string",
                              enum: ["=", "!=", ">", "<", ">=", "<=", "like", "not_like"]
                            },
                            value: { type: "string" }
                          },
                          required: ["field", "operator", "value"]
                        }
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
                                  domain_from: { type: "string" },
                                  domain_to: { type: "string" },
                                  backlinks: { type: "integer" },
                                  dofollow_backlinks: { type: "integer" },
                                  first_seen: { type: "string" },
                                  lost_date: { type: "string" },
                                  rank: { type: "integer" },
                                  main_domain_rank: { type: "integer" },
                                  domain_from_rank: { type: "integer" },
                                  domain_from_platform_type: { type: "array", items: { type: "string" }},
                                  domain_from_is_ip: { type: "boolean" },
                                  domain_from_ip: { type: "string" },
                                  domain_from_country: { type: "string" }
                                }
                              }
                            }
                          }
                        }
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
