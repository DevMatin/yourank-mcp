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

// VOLLSTÄNDIGES BACKLINKS GENERAL API SCHEMA MIT KORREKTEN PFADEN
export const BacklinksGeneralCompleteApi: ToolApi[] = [
  {
    id: "dataforseo-backlinks-general-complete",
    name: "Backlinks General API - Alle Backlinks Funktionen",
    description: "Vollständige Backlinks API mit allen 25 Funktionen: Core Analysis, Bulk Operations, Domain Analysis, Timeseries und Utilities. Umfassende Backlink-Analyse und -Überwachung.",
    category: "Backlinks - General Complete",
    icon: "🔗📊📈🔍",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Backlinks API - General Complete",
        description: "Vollständige Backlinks API mit allen 25 Funktionen für umfassende Backlink-Analyse.",
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
        // ===== BACKLINKS CORE APIs =====
        "/v3/backlinks/backlinks/live": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Backlinks Live",
            description: "Detaillierte Liste der Backlinks des Zielobjekts",
            operationId: "BacklinksLive",
            requestBody: {
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/anchors/live": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Backlinks Anchors Live",
            description: "Ankertext-Analyse für das Zielobjekt",
            operationId: "BacklinksAnchorsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für Ankertext-Analyse" },
                        limit: { type: "integer", default: 100 },
                        offset: { type: "integer", default: 0 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/summary/live": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Backlinks Summary Live",
            description: "Vollständiges Backlink-Profil des Zielobjekts",
            operationId: "BacklinksSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für Summary-Analyse" },
                        include_subdomains: { type: "boolean", default: true }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/history/live": {
          post: {
            tags: ["Backlinks Core"],
            summary: "Backlinks History Live",
            description: "Historische Backlink-Entwicklung",
            operationId: "BacklinksHistoryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für History-Analyse" },
                        date_from: { type: "string", format: "date" },
                        date_to: { type: "string", format: "date" }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/domain_pages/live": {
          post: {
            tags: ["Backlinks Domains"],
            summary: "Domain Pages Live",
            description: "Alle Seiten einer Domain mit Backlink-Daten",
            operationId: "BacklinksDomainPagesLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel-Domain für Seiten-Analyse" },
                        limit: { type: "integer", default: 100 },
                        offset: { type: "integer", default: 0 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/domain_pages_summary/live": {
          post: {
            tags: ["Backlinks Domains"],
            summary: "Domain Pages Summary Live",
            description: "Zusammenfassung der Domain-Seiten mit Backlink-Metriken",
            operationId: "BacklinksDomainPagesSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel-Domain für Summary" },
                        include_subdomains: { type: "boolean", default: true }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/referring_domains/live": {
          post: {
            tags: ["Backlinks Domains"],
            summary: "Referring Domains Live",
            description: "Alle verweisenden Domains für ein Ziel",
            operationId: "BacklinksReferringDomainsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für Referring Domains Analyse" },
                        limit: { type: "integer", default: 100 },
                        offset: { type: "integer", default: 0 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/referring_networks/live": {
          post: {
            tags: ["Backlinks Domains"],
            summary: "Referring Networks Live",
            description: "Verweisende Netzwerke und IP-Ranges",
            operationId: "BacklinksReferringNetworksLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für Netzwerk-Analyse" },
                        limit: { type: "integer", default: 100 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/competitors/live": {
          post: {
            tags: ["Backlinks Analysis"],
            summary: "Backlinks Competitors Live",
            description: "Konkurrenten-Analyse basierend auf gemeinsamen Backlinks",
            operationId: "BacklinksCompetitorsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für Konkurrenten-Analyse" },
                        limit: { type: "integer", default: 100 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/domain_intersection/live": {
          post: {
            tags: ["Backlinks Analysis"],
            summary: "Domain Intersection Live",
            description: "Gemeinsame verweisende Domains zwischen mehreren Zielen",
            operationId: "BacklinksDomainIntersectionLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          minItems: 2,
                          description: "Mindestens 2 Ziele für Intersection-Analyse"
                        },
                        limit: { type: "integer", default: 100 },
                        offset: { type: "integer", default: 0 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/page_intersection/live": {
          post: {
            tags: ["Backlinks Analysis"],
            summary: "Page Intersection Live",
            description: "Gemeinsame Backlinks zwischen spezifischen Seiten",
            operationId: "BacklinksPageIntersectionLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          minItems: 2,
                          description: "Mindestens 2 URLs für Page Intersection"
                        },
                        limit: { type: "integer", default: 100 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },

        // ===== BACKLINKS TIMESERIES APIs =====
        "/v3/backlinks/timeseries_summary/live": {
          post: {
            tags: ["Backlinks Timeseries"],
            summary: "Timeseries Summary Live",
            description: "Zeitreihen-Daten für Backlink-Entwicklung",
            operationId: "BacklinksTimeseriesSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für Zeitreihen-Analyse" },
                        date_from: { type: "string", format: "date" },
                        date_to: { type: "string", format: "date" }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/timeseries_new_lost_summary/live": {
          post: {
            tags: ["Backlinks Timeseries"],
            summary: "Timeseries New Lost Summary Live",
            description: "Neue und verlorene Backlinks über Zeit",
            operationId: "BacklinksTimeseriesNewLostSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für New/Lost Analyse" },
                        date_from: { type: "string", format: "date" },
                        date_to: { type: "string", format: "date" }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },

        // ===== BACKLINKS BULK APIs =====
        "/v3/backlinks/bulk_backlinks/live": {
          post: {
            tags: ["Backlinks Bulk"],
            summary: "Bulk Backlinks Live",
            description: "Backlinks für mehrere Ziele in einer Anfrage",
            operationId: "BacklinksBulkBacklinksLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Ziele für Bulk-Analyse"
                        },
                        limit: { type: "integer", default: 100 }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/bulk_ranks/live": {
          post: {
            tags: ["Backlinks Bulk"],
            summary: "Bulk Ranks Live",
            description: "Domain-Rankings für mehrere Ziele",
            operationId: "BacklinksBulkRanksLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Ziele für Rank-Analyse"
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/bulk_spam_score/live": {
          post: {
            tags: ["Backlinks Bulk"],
            summary: "Bulk Spam Score Live",
            description: "Spam-Scores für mehrere Ziele",
            operationId: "BacklinksBulkSpamScoreLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Ziele für Spam Score Analyse"
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/bulk_referring_domains/live": {
          post: {
            tags: ["Backlinks Bulk"],
            summary: "Bulk Referring Domains Live",
            description: "Verweisende Domains für mehrere Ziele",
            operationId: "BacklinksBulkReferringDomainsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Ziele für Referring Domains Analyse"
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/bulk_new_lost_backlinks/live": {
          post: {
            tags: ["Backlinks Bulk"],
            summary: "Bulk New Lost Backlinks Live",
            description: "Neue und verlorene Backlinks für mehrere Ziele",
            operationId: "BacklinksBulkNewLostBacklinksLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Ziele für New/Lost Analyse"
                        },
                        date_from: { type: "string", format: "date" },
                        date_to: { type: "string", format: "date" }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/bulk_new_lost_referring_domains/live": {
          post: {
            tags: ["Backlinks Bulk"],
            summary: "Bulk New Lost Referring Domains Live",
            description: "Neue und verlorene verweisende Domains für mehrere Ziele",
            operationId: "BacklinksBulkNewLostReferringDomainsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Ziele für New/Lost Domains Analyse"
                        },
                        date_from: { type: "string", format: "date" },
                        date_to: { type: "string", format: "date" }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/bulk_pages_summary/live": {
          post: {
            tags: ["Backlinks Bulk"],
            summary: "Bulk Pages Summary Live", 
            description: "Seiten-Zusammenfassung für mehrere Ziele",
            operationId: "BacklinksBulkPagesSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        targets: {
                          type: "array",
                          items: { type: "string" },
                          description: "Liste der Ziele für Pages Summary"
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },

        // ===== BACKLINKS UTILITY APIs =====
        "/v3/backlinks/id_list": {
          post: {
            tags: ["Backlinks Utils"],
            summary: "Backlinks ID List",
            description: "Liste aller abgeschlossenen Backlinks Tasks",
            operationId: "BacklinksIdList",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        datetime_from: {
                          type: "string",
                          description: "Startzeit für Filterung der Ergebnisse"
                        },
                        datetime_to: {
                          type: "string",
                          description: "Endzeit für Filterung der Ergebnisse"
                        }
                      }
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
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/errors": {
          post: {
            tags: ["Backlinks Utils"],
            summary: "Backlinks Errors",
            description: "Backlinks API Tasks mit Fehlern der letzten 7 Tage",
            operationId: "BacklinksErrors",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/available_filters": {
          get: {
            tags: ["Backlinks Utils"],
            summary: "Backlinks Available Filters",
            description: "Verfügbare Filter für Backlinks API",
            operationId: "BacklinksAvailableFilters",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: { type: "object" }
                  }
                }
              }
            }
          }
        },
        "/v3/backlinks/index": {
          post: {
            tags: ["Backlinks Utils"],
            summary: "Backlinks Index",
            description: "Backlinks Index-Informationen",
            operationId: "BacklinksIndex",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        target: { type: "string", description: "Ziel für Index-Informationen" }
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
                    schema: { type: "object" }
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
