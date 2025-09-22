// DataForSEO Backlinks APIs - Aufgeteilt in spezialisierte Kategorien
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

export const BacklinksApis: ToolApi[] = [
  {
    id: "dataforseo-backlinks-core",
    name: "Backlinks Core API",
    description:
      "Grundlegende Backlink-Analysen mit 4 Core-APIs: Summary, Backlinks, Anchors und History. Optimiert für die wichtigsten Backlink-Funktionen.",
    category: "Backlinks Core",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Backlinks Core API",
        description: "Grundlegende Backlink-Analysen: Summary, Backlinks, Anchors und History",
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
        "/v3/backlinks/core/summary": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Backlinks Summary",
            description: "Vollständiges Backlink-Profil des Zielobjekts",
            operationId: "BacklinksSummary",
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
                                    target: { type: "string" },
                                    total_count: { type: "integer" },
                                    backlinks_count: { type: "integer" },
                                    referring_domains_count: { type: "integer" },
                                    dofollow_backlinks: { type: "integer" },
                                    nofollow_backlinks: { type: "integer" }
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
        "/v3/backlinks/core/backlinks": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Detailed Backlinks",
            description: "Detaillierte Liste der Backlinks des Zielobjekts",
            operationId: "BacklinksBacklinks",
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
                              field: { type: "string" },
                              operator: { type: "string" },
                              value: { type: "string" }
                            }
                          }
                        },
                        order_by: {
                          type: "array",
                          description: "Sortierung der Ergebnisse",
                          items: { type: "string" }
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
                                    url_from: { type: "string" },
                                    domain_to: { type: "string" },
                                    url_to: { type: "string" },
                                    tld_from: { type: "string" },
                                    is_new: { type: "boolean" },
                                    is_lost: { type: "boolean" },
                                    rank: { type: "integer" },
                                    page_from_rank: { type: "integer" },
                                    domain_from_rank: { type: "integer" },
                                    page_from_external_links: { type: "integer" },
                                    page_from_internal_links: { type: "integer" },
                                    page_from_size: { type: "integer" },
                                    text_pre: { type: "string" },
                                    anchor: { type: "string" },
                                    text_post: { type: "string" },
                                    semantic_location: { type: "string" },
                                    link_attribute: { type: "string" },
                                    page_from_encoding: { type: "string" },
                                    page_from_language: { type: "string" },
                                    page_from_title: { type: "string" },
                                    first_seen: { type: "string" },
                                    prev_seen: { type: "string" },
                                    last_seen: { type: "string" },
                                    item_type: { type: "string" },
                                    attributes: { type: "array", items: { type: "string" }},
                                    dofollow: { type: "boolean" },
                                    original: { type: "boolean" },
                                    alt: { type: "string" },
                                    anchor_url_from: { type: "string" },
                                    anchor_url_to: { type: "string" },
                                    broken_redirect: { type: "boolean" },
                                    redirect: { type: "boolean" },
                                    indirect_link_count: { type: "integer" }
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
        "/v3/backlinks/core/anchors": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Anchor Text Analysis",
            description: "Ankertexte und zugehörige Statistiken",
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
                              field: { type: "string" },
                              operator: { type: "string" },
                              value: { type: "string" }
                            }
                          }
                        },
                        order_by: {
                          type: "array",
                          description: "Sortierung der Ergebnisse",
                          items: { type: "string" }
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
                                    anchor: { type: "string" },
                                    referring_domains: { type: "integer" },
                                    backlinks: { type: "integer" },
                                    first_seen: { type: "string" },
                                    last_seen: { type: "string" },
                                    lost_date: { type: "string" },
                                    rank: { type: "integer" }
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
        "/v3/backlinks/core/history": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Backlinks History",
            description: "Vergangene Linkbuilding-Performance",
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
                          description: "Startdatum für historische Analyse",
                          format: "date",
                          example: "2023-01-01"
                        },
                        date_to: {
                          type: "string",
                          description: "Enddatum für historische Analyse",
                          format: "date",
                          example: "2023-12-31"
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
                                    target: { type: "string" },
                                    date: { type: "string" },
                                    backlinks: { type: "integer" },
                                    new_backlinks: { type: "integer" },
                                    lost_backlinks: { type: "integer" },
                                    referring_domains: { type: "integer" },
                                    new_referring_domains: { type: "integer" },
                                    lost_referring_domains: { type: "integer" },
                                    crawled_pages: { type: "integer" }
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
  },
  {
    id: "dataforseo-backlinks-domains",
    name: "Backlinks Domains API",
    description:
      "Domain-fokussierte Backlink-Analysen mit 4 APIs: Domain Pages, Referring Domains, und Network-Analysen. Spezialisiert auf Domain-Level Insights.",
    category: "Backlinks Domains",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
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
          url: "https://yourank-mcp.vercel.app",
          description: "Vercel MCP Server"
        }
      ]
    }
  },
  {
    id: "dataforseo-backlinks-analysis",
    name: "Backlinks Analysis API",
    description:
      "Erweiterte Backlink-Analysen mit 3 spezialisierten APIs: Competitors, Domain Intersection und Page Intersection. Ideal für Konkurrenz-Analysen.",
    category: "Backlinks Analysis",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
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
          url: "https://yourank-mcp.vercel.app",
          description: "Vercel MCP Server"
        }
      ]
    }
  },
  {
    id: "dataforseo-backlinks-timeseries",
    name: "Backlinks Timeseries API",
    description:
      "Zeitbasierte Backlink-Analysen mit 2 APIs: Timeseries Summary und New/Lost Summary. Perfekt für historische Trend-Analysen.",
    category: "Backlinks Timeseries",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
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
          url: "https://yourank-mcp.vercel.app",
          description: "Vercel MCP Server"
        }
      ]
    }
  },
  {
    id: "dataforseo-backlinks-bulk",
    name: "Backlinks Bulk API",
    description:
      "Bulk-Operationen für Backlinks mit 7 APIs: Bulk Ranks, Backlinks, Spam Score, Referring Domains und mehr. Optimiert für Masse-Analysen.",
    category: "Backlinks Bulk",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
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
          url: "https://yourank-mcp.vercel.app",
          description: "Vercel MCP Server"
        }
      ]
    }
  },
  {
    id: "dataforseo-backlinks-utils",
    name: "Backlinks Utils API",
    description:
      "Utility-Funktionen für Backlinks mit 5 APIs: Filters, ID List, Errors, Index und Available Filters. Essential für Backlink-Management.",
    category: "Backlinks Utils",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Backlinks Utils API",
        description: "Utility-Funktionen und Management-Tools für Backlinks",
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
      ]
    }
  }
]
