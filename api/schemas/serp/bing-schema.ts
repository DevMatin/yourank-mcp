// SERP Bing API Schema - Spezialisierte Bing-Analyse
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

export const SerpBingApis: ToolApi[] = [
  {
    id: "dataforseo-serp-bing",
    name: "SERP Bing API", 
    description:
      "Spezialisierte Bing-Analyse mit 2 verschiedenen APIs für Bing Organic Search und Local Pack. Optimiert für bessere Performance durch Trennung von der Haupt-SERP API.",
    category: "SERP Bing",
    icon: "🔍",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO SERP API - Vollständige Bing-Analyse",
        description: "2 APIs für Bing: Organic Search und Local Pack. Optimiert für bessere Performance durch Trennung von der Haupt-SERP API.",
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
        // Utilities
        "/v3/serp/bing/locations": {
          post: {
            "summary": "Bing SERP - Locations - Get Locations",
            "description": "Bing SERP - Locations - Get Locations",
            "operationId": "v3serpbinglocationsPost",
            "tags": [
              "Bing SERP - Locations"
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
        "/v3/serp/bing/locations/{country}": {
          get: {
            "summary": "Bing SERP - Locations - Get Locations",
            "description": "Bing SERP - Locations - Get Locations",
            "operationId": "v3serpbinglocationsGet",
            "tags": [
              "Bing SERP - Locations"
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
            "parameters": [
              {
                "name": "country",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/bing/languages": {
          post: {
            "summary": "Bing SERP - Languages - Get Languages",
            "description": "Bing SERP - Languages - Get Languages",
            "operationId": "v3serpbinglanguagesPost",
            "tags": [
              "Bing SERP - Languages"
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
        },
        
        // Organic Search
        "/v3/serp/bing/organic/task_post": {
          post: {
            "summary": "Bing SERP - Organic Search - Post Task",
            "description": "Bing SERP - Organic Search - Post Task",
            "operationId": "v3serpbingorganictaskpostPost",
            "tags": [
              "Bing SERP - Organic Search"
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
        "/v3/serp/bing/organic/tasks_ready": {
          post: {
            "summary": "Bing SERP - Organic Search - Get Ready Tasks",
            "description": "Bing SERP - Organic Search - Get Ready Tasks",
            "operationId": "v3serpbingorganictasksreadyPost",
            "tags": [
              "Bing SERP - Organic Search"
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
        },
        "/v3/serp/bing/organic/tasks_fixed": {
          post: {
            "summary": "Bing SERP - Organic Search - Get Fixed Tasks",
            "description": "Bing SERP - Organic Search - Get Fixed Tasks",
            "operationId": "v3serpbingorganictasksfixedPost",
            "tags": [
              "Bing SERP - Organic Search"
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
        },
        "/v3/serp/bing/organic/task_get/regular/{id}": {
          get: {
            "summary": "Bing SERP - Organic Search - Get Task Results",
            "description": "Bing SERP - Organic Search - Get Task Results",
            "operationId": "v3serpbingorganictaskgetregularGet",
            "tags": [
              "Bing SERP - Organic Search"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/bing/organic/task_get/advanced/{id}": {
          get: {
            "summary": "Bing SERP - Organic Search - Get Task Results",
            "description": "Bing SERP - Organic Search - Get Task Results",
            "operationId": "v3serpbingorganictaskgetadvancedGet",
            "tags": [
              "Bing SERP - Organic Search"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/bing/organic/task_get/html/{id}": {
          get: {
            "summary": "Bing SERP - Organic Search - Get Task Results",
            "description": "Bing SERP - Organic Search - Get Task Results",
            "operationId": "v3serpbingorganictaskgethtmlGet",
            "tags": [
              "Bing SERP - Organic Search"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/bing/organic/live/regular": {
          post: {
            "summary": "Bing SERP - Organic Search - Live Results",
            "description": "Bing SERP - Organic Search - Live Results",
            "operationId": "v3serpbingorganicliveregularPost",
            "tags": [
              "Bing SERP - Organic Search"
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
        "/v3/serp/bing/organic/live/advanced": {
          post: {
            "summary": "Bing SERP - Organic Search - Live Results",
            "description": "Bing SERP - Organic Search - Live Results",
            "operationId": "v3serpbingorganicliveadvancedPost",
            "tags": [
              "Bing SERP - Organic Search"
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
        "/v3/serp/bing/organic/live/html": {
          post: {
            "summary": "Bing SERP - Organic Search - Live Results",
            "description": "Bing SERP - Organic Search - Live Results",
            "operationId": "v3serpbingorganiclivehtmlPost",
            "tags": [
              "Bing SERP - Organic Search"
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

        // Local Pack
        "/v3/serp/bing/local_pack/task_post": {
          post: {
            "summary": "Bing SERP - operation - Post Task",
            "description": "Bing SERP - operation - Post Task",
            "operationId": "v3serpbinglocalpacktaskpostPost",
            "tags": [
              "Bing SERP - operation"
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
        "/v3/serp/bing/local_pack/tasks_ready": {
          post: {
            "summary": "Bing SERP - operation - Get Ready Tasks",
            "description": "Bing SERP - operation - Get Ready Tasks",
            "operationId": "v3serpbinglocalpacktasksreadyPost",
            "tags": [
              "Bing SERP - operation"
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
        },
        "/v3/serp/bing/local_pack/tasks_fixed": {
          post: {
            "summary": "Bing SERP - operation - Get Fixed Tasks",
            "description": "Bing SERP - operation - Get Fixed Tasks",
            "operationId": "v3serpbinglocalpacktasksfixedPost",
            "tags": [
              "Bing SERP - operation"
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
        },
        "/v3/serp/bing/local_pack/task_get/regular/{id}": {
          get: {
            "summary": "Bing SERP - operation - Get Task Results",
            "description": "Bing SERP - operation - Get Task Results",
            "operationId": "v3serpbinglocalpacktaskgetregularGet",
            "tags": [
              "Bing SERP - operation"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/bing/local_pack/task_get/html/{id}": {
          get: {
            "summary": "Bing SERP - operation - Get Task Results",
            "description": "Bing SERP - operation - Get Task Results",
            "operationId": "v3serpbinglocalpacktaskgethtmlGet",
            "tags": [
              "Bing SERP - operation"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/bing/local_pack/live/regular": {
          post: {
            "summary": "Bing SERP - operation - Live Results",
            "description": "Bing SERP - operation - Live Results",
            "operationId": "v3serpbinglocalpackliveregularPost",
            "tags": [
              "Bing SERP - operation"
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
        "/v3/serp/bing/local_pack/live/html": {
          post: {
            "summary": "Bing SERP - operation - Live Results",
            "description": "Bing SERP - operation - Live Results",
            "operationId": "v3serpbinglocalpacklivehtmlPost",
            "tags": [
              "Bing SERP - operation"
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
        }
      }
    }
  }
]
