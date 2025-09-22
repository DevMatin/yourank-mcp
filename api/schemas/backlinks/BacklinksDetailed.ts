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

export const BacklinksDetailedApi: ToolApi = {
  id: "dataforseo-backlinks-detailed",
  name: "Backlinks Detailed API",
  description: "Detaillierte Liste der Backlinks des Zielobjekts mit umfassenden Link-Informationen",
  category: "Backlinks",
  icon: "",
  url: "https://yourank-mcp.vercel.app",
  customHeaders: {
    Authorization: getDataForSEOAuthHeader(),
    "Content-Type": "application/json"
  },
  schema: {
    openapi: "3.1.0",
    info: {
      title: "DataForSEO Backlinks Detailed API",
      description: "Detaillierte Liste der Backlinks mit umfassenden Link-Informationen",
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
      "/v3/backlinks/core/backlinks": {
        post: {
          tags: ["Backlinks"],
          summary: "Detailed Backlinks",
          description: "Detaillierte Liste der Backlinks des Zielobjekts mit umfassenden Link-Informationen",
          operationId: "BacklinksDetailed",
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
                        description: "Filter für Backlinks",
                        items: {
                          type: "object",
                          properties: {
                            field: { 
                              type: "string",
                              description: "Feld zum Filtern",
                              enum: ["rank", "domain_from_rank", "page_from_rank", "dofollow", "anchor", "domain_from"]
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
                          enum: ["rank,desc", "rank,asc", "domain_from_rank,desc", "first_seen,desc"]
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
                                  domain_from: { 
                                    type: "string",
                                    description: "Domain von der der Link kommt"
                                  },
                                  url_from: { 
                                    type: "string",
                                    description: "URL von der der Link kommt"
                                  },
                                  domain_to: { 
                                    type: "string",
                                    description: "Ziel-Domain"
                                  },
                                  url_to: { 
                                    type: "string",
                                    description: "Ziel-URL"
                                  },
                                  tld_from: { type: "string" },
                                  is_new: { 
                                    type: "boolean",
                                    description: "Ob der Link neu ist"
                                  },
                                  is_lost: { 
                                    type: "boolean",
                                    description: "Ob der Link verloren gegangen ist"
                                  },
                                  rank: { 
                                    type: "integer",
                                    description: "Rank des Links"
                                  },
                                  page_from_rank: { 
                                    type: "integer",
                                    description: "Rank der Quell-Seite"
                                  },
                                  domain_from_rank: { 
                                    type: "integer",
                                    description: "Rank der Quell-Domain"
                                  },
                                  page_from_external_links: { 
                                    type: "integer",
                                    description: "Externe Links der Quell-Seite"
                                  },
                                  page_from_internal_links: { 
                                    type: "integer",
                                    description: "Interne Links der Quell-Seite"
                                  },
                                  page_from_size: { 
                                    type: "integer",
                                    description: "Größe der Quell-Seite in Bytes"
                                  },
                                  text_pre: { 
                                    type: "string",
                                    description: "Text vor dem Anker"
                                  },
                                  anchor: { 
                                    type: "string",
                                    description: "Ankertext des Links"
                                  },
                                  text_post: { 
                                    type: "string",
                                    description: "Text nach dem Anker"
                                  },
                                  semantic_location: { 
                                    type: "string",
                                    description: "Semantische Position des Links"
                                  },
                                  link_attribute: { 
                                    type: "string",
                                    description: "Link-Attribute (dofollow/nofollow)"
                                  },
                                  page_from_encoding: { type: "string" },
                                  page_from_language: { type: "string" },
                                  page_from_title: { 
                                    type: "string",
                                    description: "Titel der Quell-Seite"
                                  },
                                  first_seen: { 
                                    type: "string",
                                    description: "Datum der ersten Entdeckung"
                                  },
                                  prev_seen: { 
                                    type: "string",
                                    description: "Datum der vorherigen Überprüfung"
                                  },
                                  last_seen: { 
                                    type: "string",
                                    description: "Datum der letzten Überprüfung"
                                  },
                                  item_type: { type: "string" },
                                  attributes: { 
                                    type: "array", 
                                    items: { type: "string" },
                                    description: "Link-Attribute"
                                  },
                                  dofollow: { 
                                    type: "boolean",
                                    description: "Ob der Link dofollow ist"
                                  },
                                  original: { 
                                    type: "boolean",
                                    description: "Ob der Link original ist"
                                  },
                                  alt: { 
                                    type: "string",
                                    description: "Alt-Text des Links"
                                  },
                                  anchor_url_from: { type: "string" },
                                  anchor_url_to: { type: "string" },
                                  broken_redirect: { 
                                    type: "boolean",
                                    description: "Ob ein gebrochener Redirect vorliegt"
                                  },
                                  redirect: { 
                                    type: "boolean",
                                    description: "Ob ein Redirect vorliegt"
                                  },
                                  indirect_link_count: { 
                                    type: "integer",
                                    description: "Anzahl indirekter Links"
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
