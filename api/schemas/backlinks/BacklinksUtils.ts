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

export const BacklinksUtilsApi: ToolApi = {
  id: "dataforseo-backlinks-utils",
  name: "Backlinks Utils API",
  description: "Utility-Funktionen und Management-Tools für Backlinks",
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
        url: "https://mcp-server-typescript-six.vercel.app",
        description: "Vercel MCP Server"
      }
    ],
    paths: {
      "/v3/backlinks/available_filters": {
        get: {
          tags: ["Backlinks Utils"],
          summary: "Available Filters",
          description: "Liefert verfügbare Filter für Backlinks APIs",
          operationId: "BacklinksAvailableFilters",
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
                              type: "object",
                              additionalProperties: {
                                type: "object",
                                properties: {
                                  type: { type: "string" },
                                  operations: {
                                    type: "array",
                                    items: { type: "string" }
                                  },
                                  description: { type: "string" },
                                  format: { type: "string" }
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
      "/v3/backlinks/id_list": {
        post: {
          tags: ["Backlinks Utils"],
          summary: "Backlinks ID List",
          description: "Liefert eine Liste aller Backlinks Task IDs während des angegebenen Zeitraums",
          operationId: "BacklinksIdList",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    datetime_from: {
                      type: "string",
                      description: "Startzeit für Filterung (UTC Format: yyyy-mm-dd hh-mm-ss +00:00)",
                      example: "2023-01-15 12:57:46 +00:00"
                    },
                    datetime_to: {
                      type: "string", 
                      description: "Endzeit für Filterung (UTC Format: yyyy-mm-dd hh-mm-ss +00:00)",
                      example: "2023-01-31 13:57:46 +00:00"
                    },
                    limit: {
                      type: "integer",
                      description: "Maximale Anzahl zurückgegebener Task IDs",
                      default: 1000,
                      maximum: 1000
                    },
                    offset: {
                      type: "integer",
                      description: "Offset in der Ergebnisliste",
                      default: 0
                    }
                  },
                  required: ["datetime_from", "datetime_to"]
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
                                  id: { type: "string" },
                                  url: { type: "string" },
                                  datetime_posted: { type: "string" },
                                  datetime_done: { type: "string" },
                                  status: { type: "string" },
                                  cost: { type: "number" }
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
      "/v3/backlinks/errors": {
        post: {
          tags: ["Backlinks Utils"],
          summary: "Backlinks Errors",
          description: "Liefert Informationen über Backlinks API Tasks, die einen Fehler zurückgegeben haben",
          operationId: "BacklinksErrors",
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    limit: {
                      type: "integer",
                      description: "Maximale Anzahl zurückgegebener Fehler-Tasks",
                      default: 1000,
                      maximum: 1000
                    },
                    offset: {
                      type: "integer",
                      description: "Offset in der Ergebnisliste",
                      default: 0
                    },
                    datetime_from: {
                      type: "string",
                      description: "Startzeit für Filterung innerhalb der letzten 7 Tage"
                    },
                    datetime_to: {
                      type: "string",
                      description: "Endzeit für Filterung innerhalb der letzten 7 Tage"
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
                                  id: { type: "string" },
                                  datetime: { type: "string" },
                                  function: { type: "string" },
                                  error_code: { type: "integer" },
                                  error_message: { type: "string" },
                                  http_url: { type: "string" },
                                  http_method: { type: "string" },
                                  http_code: { type: "integer" },
                                  http_time: { type: "number" },
                                  http_response: { type: "string" }
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
      "/v3/backlinks/index": {
        get: {
          tags: ["Backlinks Utils"],
          summary: "Backlinks Index",
          description: "Liefert Index-Informationen für Backlinks APIs",
          operationId: "BacklinksIndex",
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
                              type: "object",
                              properties: {
                                available_datasets: {
                                  type: "array",
                                  items: { type: "string" }
                                },
                                available_locations: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      location_code: { type: "integer" },
                                      location_name: { type: "string" },
                                      location_code_parent: { type: "integer" },
                                      country_iso_code: { type: "string" },
                                      location_type: { type: "string" }
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
