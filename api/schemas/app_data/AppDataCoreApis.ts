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

export const AppDataCoreApis: ToolApi[] = [
  {
    id: "dataforseo-app-data-core",
    name: "App Data Core API",
    description:
      "Zentrale App Data API für Task Management, Error Handling und allgemeine App Data Funktionen. Ermöglicht das Abrufen von Task IDs, Fehlern und bereiten Tasks.",
    category: "App Data - Core",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO App Data Core API - Task Management",
        description:
          "Zentrale API für App Data Task Management, Error Handling und allgemeine Funktionen. Optimiert für bessere Performance durch Trennung der Core-Funktionen.",
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
        "/app_data_id_list": {
          post: {
            summary: "App Data Task IDs abrufen",
            description: "Liefert eine Liste aller App Data Task IDs während des angegebenen Zeitraums",
            operationId: "appDataIdList",
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
                        description: "Maximale Anzahl zurückgegebener Task IDs (Standard: 1000, Maximum: 1000)",
                        default: 1000
                      },
                      offset: {
                        type: "integer",
                        description: "Offset in der Ergebnisliste (Standard: 0)",
                        default: 0
                      },
                      sort: {
                        type: "string",
                        description: "Sortierung nach Ausführungszeit (asc/desc, Standard: asc)",
                        enum: ["asc", "desc"],
                        default: "asc"
                      },
                      include_metadata: {
                        type: "boolean",
                        description: "Task Metadata in Antwort einschließen (Standard: false)",
                        default: false
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
                              id: { type: "string" },
                              status_code: { type: "integer" },
                              status_message: { type: "string" },
                              time: { type: "string" },
                              cost: { type: "number" },
                              result_count: { type: "integer" },
                              path: { type: "array" },
                              data: { type: "object" },
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
                                    cost: { type: "number" },
                                    metadata: { type: "object" }
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
        "/app_data_errors": {
          post: {
            summary: "App Data API Fehler abrufen",
            description: "Liefert Informationen über App Data API Tasks, die einen Fehler zurückgegeben haben (letzte 7 Tage)",
            operationId: "appDataErrors",
            requestBody: {
              required: false,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      limit: {
                        type: "integer",
                        description: "Maximale Anzahl zurückgegebener Fehler-Tasks (Standard: 1000, Maximum: 1000)",
                        default: 1000
                      },
                      offset: {
                        type: "integer",
                        description: "Offset in der Ergebnisliste (Standard: 0)",
                        default: 0
                      },
                      filtered_function: {
                        type: "string",
                        description: "Filterung nach bestimmter Funktion (z.B. app_data/task_get/advanced, postback_url, pingback_url)"
                      },
                      datetime_from: {
                        type: "string",
                        description: "Startzeit für Filterung innerhalb der letzten 7 Tage (UTC Format)"
                      },
                      datetime_to: {
                        type: "string",
                        description: "Endzeit für Filterung innerhalb der letzten 7 Tage (UTC Format)"
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
        "/app_data_tasks_ready": {
          get: {
            summary: "Bereite App Data Tasks abrufen",
            description: "Liefert eine Liste abgeschlossener Tasks, die noch nicht abgeholt wurden",
            operationId: "appDataTasksReady",
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
                                    se: { type: "string" },
                                    se_type: { type: "string" },
                                    date_posted: { type: "string" },
                                    tag: { type: "string" },
                                    endpoint_advanced: { type: "string" },
                                    endpoint_html: { type: "string" }
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
]
