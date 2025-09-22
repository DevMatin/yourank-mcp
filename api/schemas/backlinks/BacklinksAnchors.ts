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

export const BacklinksAnchorsApi: ToolApi = {
  id: "dataforseo-backlinks-anchors",
  name: "Backlinks Anchors API", 
  description: "Ankertexte und zugehörige Statistiken für detaillierte Anchor-Text-Analysen",
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
      title: "DataForSEO Backlinks Anchors API",
      description: "Ankertexte und zugehörige Statistiken für detaillierte Anchor-Text-Analysen",
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
      "/v3/backlinks/core/anchors": {
        post: {
          tags: ["Backlinks"],
          summary: "Anchor Text Analysis",
          description: "Ankertexte und zugehörige Statistiken für detaillierte Anchor-Text-Analysen",
          operationId: "BacklinksAnchors",
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
                        description: "Filter für Anchors",
                        items: {
                          type: "object",
                          properties: {
                            field: { 
                              type: "string",
                              description: "Feld zum Filtern",
                              enum: ["anchor", "referring_domains", "backlinks", "first_seen", "lost_date", "rank"]
                            },
                            operator: { 
                              type: "string",
                              description: "Vergleichsoperator",
                              enum: ["=", "!=", ">", "<", ">=", "<=", "like", "not_like"]
                            },
                            value: { 
                              type: "string",
                              description: "Wert für den Vergleich"
                            }
                          },
                          required: ["field", "operator", "value"]
                        }
                      },
                      order_by: {
                        type: "array",
                        description: "Sortierung der Ergebnisse",
                        items: { 
                          type: "string",
                          enum: ["referring_domains,desc", "backlinks,desc", "rank,desc", "first_seen,desc"]
                        }
                      },
                      include_subdomains: {
                        type: "boolean",
                        description: "Subdomains in Analyse einbeziehen",
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
                                  anchor: { 
                                    type: "string",
                                    description: "Ankertext"
                                  },
                                  referring_domains: { 
                                    type: "integer",
                                    description: "Anzahl verweisender Domains"
                                  },
                                  backlinks: { 
                                    type: "integer",
                                    description: "Anzahl Backlinks mit diesem Anker"
                                  },
                                  first_seen: { 
                                    type: "string",
                                    description: "Datum der ersten Entdeckung"
                                  },
                                  last_seen: { 
                                    type: "string",
                                    description: "Datum der letzten Überprüfung"
                                  },
                                  lost_date: { 
                                    type: "string",
                                    description: "Datum des Verlusts (falls verloren)"
                                  },
                                  rank: { 
                                    type: "integer",
                                    description: "Rank des Ankers"
                                  },
                                  backlinks_spam_score: { 
                                    type: "integer",
                                    description: "Spam Score der Backlinks"
                                  },
                                  broken_backlinks: { 
                                    type: "integer",
                                    description: "Anzahl gebrochener Backlinks"
                                  },
                                  broken_pages: { 
                                    type: "integer",
                                    description: "Anzahl gebrochener Seiten"
                                  }
                                }
                              }
                            }
                          }
                        }
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
