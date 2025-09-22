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

export const BacklinksBulkApi: ToolApi = {
  id: "dataforseo-backlinks-bulk",
  name: "Backlinks Bulk API",
  description: "Bulk-Operationen für effiziente Masse-Backlink-Analysen",
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
      title: "DataForSEO Backlinks Bulk API",
      description: "Bulk-Operationen für effiziente Masse-Backlink-Analysen",
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
      "/v3/backlinks/bulk/ranks": {
        post: {
          tags: ["Backlinks Bulk"],
          summary: "Bulk Ranks",
          description: "Bulk-Abfrage von Domain/Page Ranks für mehrere Targets",
          operationId: "BacklinksBulkRanks",
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
                        description: "Liste der Domains/URLs für Bulk-Analyse",
                        items: { type: "string" },
                        example: ["dataforseo.com", "semrush.com", "ahrefs.com"]
                      }
                    },
                    required: ["targets"]
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
                                  main_domain_rank: { type: "integer" },
                                  last_updated: { type: "string" }
                                }
                              }
                            }
                          }
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
      "/v3/backlinks/bulk/backlinks": {
        post: {
          tags: ["Backlinks Bulk"],
          summary: "Bulk Backlinks",
          description: "Bulk-Abfrage von Backlinks für mehrere Targets",
          operationId: "BacklinksBulkBacklinks",
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
                        description: "Liste der Domains/URLs für Bulk-Analyse",
                        items: { type: "string" },
                        example: ["dataforseo.com", "semrush.com"]
                      },
                      limit: {
                        type: "integer",
                        description: "Limit pro Target",
                        default: 100,
                        maximum: 1000
                      },
                      include_subdomains: {
                        type: "boolean",
                        description: "Subdomains einbeziehen",
                        default: true
                      }
                    },
                    required: ["targets"]
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
                                  backlinks_count: { type: "integer" },
                                  referring_domains: { type: "integer" },
                                  backlinks: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        domain_from: { type: "string" },
                                        url_from: { type: "string" },
                                        anchor: { type: "string" },
                                        rank: { type: "integer" },
                                        dofollow: { type: "boolean" },
                                        first_seen: { type: "string" },
                                        last_seen: { type: "string" }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
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
      "/v3/backlinks/bulk/spam_score": {
        post: {
          tags: ["Backlinks Bulk"],
          summary: "Bulk Spam Score",
          description: "Bulk-Abfrage von Spam Scores für mehrere Domains",
          operationId: "BacklinksBulkSpamScore",
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
                        description: "Liste der Domains für Spam Score Analyse",
                        items: { type: "string" },
                        example: ["example1.com", "example2.com"]
                      }
                    },
                    required: ["targets"]
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
                                  spam_score: { type: "integer" },
                                  update_date: { type: "string" }
                                }
                              }
                            }
                          }
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
      "/v3/backlinks/bulk/referring_domains": {
        post: {
          tags: ["Backlinks Bulk"],
          summary: "Bulk Referring Domains",
          description: "Bulk-Abfrage von Referring Domains für mehrere Targets",
          operationId: "BacklinksBulkReferringDomains",
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
                        description: "Liste der Domains/URLs für Bulk-Analyse",
                        items: { type: "string" },
                        example: ["dataforseo.com", "semrush.com"]
                      },
                      limit: {
                        type: "integer",
                        description: "Limit pro Target",
                        default: 100,
                        maximum: 1000
                      }
                    },
                    required: ["targets"]
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
                                  referring_domains_count: { type: "integer" },
                                  referring_domains: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        domain_from: { type: "string" },
                                        backlinks: { type: "integer" },
                                        dofollow_backlinks: { type: "integer" },
                                        rank: { type: "integer" },
                                        main_domain_rank: { type: "integer" },
                                        first_seen: { type: "string" },
                                        lost_date: { type: "string" }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
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
