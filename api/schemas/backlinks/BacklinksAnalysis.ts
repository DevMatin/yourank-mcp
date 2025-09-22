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

export const BacklinksAnalysisApi: ToolApi = {
  id: "dataforseo-backlinks-analysis",
  name: "Backlinks Analysis API",
  description: "Erweiterte Backlink-Analysen mit Competitors, Domain Intersection und Page Intersection",
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
      title: "DataForSEO Backlinks Analysis API",
      description: "Erweiterte Backlink-Analysen: Competitors, Domain & Page Intersection",
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
      "/v3/backlinks/competitors": {
        post: {
          tags: ["Backlinks Analysis"],
          summary: "Competitors Analysis",
          description: "Identifiziert Konkurrenten basierend auf gemeinsamen Backlink-Quellen",
          operationId: "BacklinksCompetitors",
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
                        description: "Domain für Konkurrenz-Analyse",
                        example: "dataforseo.com"
                      },
                      limit: {
                        type: "integer",
                        description: "Anzahl der zurückzugebenden Konkurrenten",
                        default: 100,
                        maximum: 1000
                      },
                      offset: {
                        type: "integer",
                        description: "Offset für Paginierung",
                        default: 0
                      },
                      exclude_target: {
                        type: "boolean",
                        description: "Ziel-Domain aus Ergebnissen ausschließen",
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
                                  competitor: { type: "string" },
                                  avg_rank: { type: "number" },
                                  sum_rank: { type: "integer" },
                                  intersections: { type: "integer" },
                                  competitor_rank: { type: "integer" },
                                  competitor_domain_rank: { type: "integer" },
                                  full_match: { type: "integer" },
                                  metrics: {
                                    type: "object",
                                    properties: {
                                      organic: {
                                        type: "object",
                                        properties: {
                                          pos_1: { type: "integer" },
                                          pos_2_3: { type: "integer" },
                                          pos_4_10: { type: "integer" },
                                          pos_11_20: { type: "integer" },
                                          pos_21_30: { type: "integer" },
                                          pos_31_40: { type: "integer" },
                                          pos_41_50: { type: "integer" },
                                          pos_51_100: { type: "integer" },
                                          etv: { type: "number" },
                                          impressions_etv: { type: "number" },
                                          count: { type: "integer" },
                                          estimated_paid_traffic_cost: { type: "number" },
                                          is_new: { type: "integer" },
                                          is_up: { type: "integer" },
                                          is_down: { type: "integer" },
                                          is_lost: { type: "integer" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
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
      "/v3/backlinks/domain_intersection": {
        post: {
          tags: ["Backlinks Analysis"],
          summary: "Domain Intersection Analysis",
          description: "Vergleicht Backlink-Profile zwischen mehreren Domains",
          operationId: "BacklinksDomainIntersection",
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
                        description: "Liste der zu vergleichenden Domains",
                        items: { type: "string" },
                        example: ["dataforseo.com", "semrush.com"]
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
                      intersection_mode: {
                        type: "string",
                        description: "Modus für Intersection-Analyse",
                        enum: ["one_to_many", "many_to_many", "many_to_one"],
                        default: "one_to_many"
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
                                  referring_domain: { type: "string" },
                                  intersection_result: {
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
                                        broken_pages: { type: "integer" }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
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
      "/v3/backlinks/page_intersection": {
        post: {
          tags: ["Backlinks Analysis"],
          summary: "Page Intersection Analysis",
          description: "Vergleicht Backlink-Profile zwischen spezifischen Seiten",
          operationId: "BacklinksPageIntersection",
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
                        description: "Liste der zu vergleichenden URLs",
                        items: { type: "string" },
                        example: ["https://dataforseo.com/apis", "https://semrush.com/features"]
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
                                  referring_page: { type: "string" },
                                  intersection_result: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        target: { type: "string" },
                                        rank: { type: "integer" },
                                        anchor: { type: "string" },
                                        first_seen: { type: "string" },
                                        prev_seen: { type: "string" },
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
