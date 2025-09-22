// SERP Allgemein API Schema - Grundlegende SERP-Funktionen
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

export const SerpAllgemeinApis: ToolApi[] = [
  {
    id: "dataforseo-serp-allgemein",
    name: "SERP Allgemein API",
    description:
      "Grundlegende SERP-Funktionen: ID-Listen, Fehlerbehandlung, Screenshots und AI-Zusammenfassungen. Suchmaschinenübergreifende Utilities.",
    category: "SERP General",
    icon: "🔍",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO SERP API - Allgemeine Funktionen",
        description: "Grundlegende SERP-Funktionen für alle Suchmaschinen",
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
        "/v3/serp/id_list": {
          post: {
            "summary": "SERP - operation",
            "description": "SERP - operation",
            "operationId": "v3serpidlistPost",
            "tags": [
              "SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/errors": {
          post: {
            "summary": "SERP - operation",
            "description": "SERP - operation",
            "operationId": "v3serperrorsPost",
            "tags": [
              "SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/screenshot": {
          post: {
            "summary": "SERP - operation",
            "description": "SERP - operation",
            "operationId": "v3serpscreenshotPost",
            "tags": [
              "SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/ai_summary": {
          post: {
            "summary": "SERP - operation",
            "description": "SERP - operation",
            "operationId": "v3serpaisummaryPost",
            "tags": [
              "SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/tasks_ready": {
          post: {
            "summary": "SERP - operation - Get Ready Tasks",
            "description": "SERP - operation - Get Ready Tasks",
            "operationId": "v3serptasksreadyPost",
            "tags": [
              "SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
]
