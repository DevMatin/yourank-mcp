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

export const DomainAnalyticsTechnologiesApis: ToolApi[] = [
  {
    id: "dataforseo-domain-analytics-technologies",
    name: "Domain Analytics Technologies API",
    description:
      "Spezialisierte Technologies-Analyse mit 10 verschiedenen APIs für Technologie-Erkennung, Domain-Analyse und Aggregation. Optimiert für bessere Performance durch Trennung von der Haupt-Domain Analytics API.",
    category: "Domain Analytics Technologies",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Domain Analytics - Technologies API",
        description: "10 APIs für Technologie-Analyse: Available Filters, Locations, Languages, Technologies List, Aggregation, Summary, Stats, Domains by Technology, Domains by HTML Terms und Domain Technologies. Optimiert für bessere Performance durch Trennung von der Haupt-Domain Analytics API.",
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
        "/v3/domain_analytics/technologies/available_filters": {
          get: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "Here you will find all the necessary information about filters that can be used with Domain Analytics Technologies API endpoints.",
            operationId: "TechnologiesAvailableFilters",
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/locations": {
          get: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "You will receive the list of locations by this API call.",
            operationId: "DomainAnalyticsTechnologiesLocations",
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/languages": {
          get: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "You will receive the list of languages by calling this API.",
            operationId: "DomainAnalyticsTechnologiesLanguages",
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/technologies": {
          get: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "This endpoint will provide you with the full list of available technologies structured by technology groups and categories.",
            operationId: "TechnologiesTechnologies",
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/aggregation_technologies/live": {
          post: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "The Aggregation Technologies endpoint will provide you with a list of the most popular technologies websites use alongside the technologies you specify.",
            operationId: "TechnologiesAggregationTechnologiesLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        group: {
                          type: "string",
                          description: "id of the target technology group"
                        },
                        category: {
                          type: "string",
                          description: "id of the target technology category"
                        },
                        technology: {
                          type: "string",
                          description: "target technology"
                        },
                        keyword: {
                          type: "string",
                          description: "target keyword in the domain's meta keywords"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/technologies_summary/live": {
          post: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "The Technologies Summary endpoint will provide you with the number of domains across different countries and languages that use the specified technology names.",
            operationId: "TechnologiesTechnologiesSummaryLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        group: {
                          type: "string",
                          description: "id of the target technology group"
                        },
                        category: {
                          type: "string",
                          description: "id of the target technology category"
                        },
                        technology: {
                          type: "string",
                          description: "target technology"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/technology_stats/live": {
          post: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "The Technology Stats endpoint will provide you with historical data on the number of domains across different countries and languages that use the specified technology.",
            operationId: "TechnologiesTechnologyStatsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        technology: {
                          type: "string",
                          description: "target technology"
                        },
                        date_from: {
                          type: "string",
                          description: "starting date of the time range"
                        },
                        date_to: {
                          type: "string",
                          description: "finishing date of the time range"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/domains_by_technology/live": {
          post: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "This endpoint provides domains based on the technology they use. In addition to the list of domains, you will also get their technology profiles.",
            operationId: "TechnologiesDomainsByTechnologyLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        group: {
                          type: "string",
                          description: "id of the target technology group"
                        },
                        category: {
                          type: "string",
                          description: "id of the target technology category"
                        },
                        technology: {
                          type: "string",
                          description: "target technology"
                        },
                        limit: {
                          type: "integer",
                          description: "maximum number of returned domains"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/domains_by_html_terms/live": {
          post: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "This endpoint provides domains based on the HTML terms they use on their homepage.",
            operationId: "TechnologiesDomainsByHtmlTermsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keywords: {
                          type: "array",
                          items: {
                            type: "string"
                          },
                          description: "target keywords in the domain's title, description or meta keywords"
                        },
                        limit: {
                          type: "integer",
                          description: "maximum number of returned domains"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/technologies/domain_technologies/live": {
          post: {
            tags: ["DomainAnalyticsTechnologies"],
            description: "Using this endpoint you will get a list of technologies used in a particular domain.",
            operationId: "TechnologiesDomainTechnologiesLive",
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
                          description: "target domain - domain name of the website to analyze"
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
                description: "Successful operation"
              }
            }
          }
        }
      }
    }
  }
]
