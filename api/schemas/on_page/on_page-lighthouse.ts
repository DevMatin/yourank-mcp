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

// OnPage Lighthouse API
export const OnPageLighthouseApi: ToolApi[] = [
  {
    id: "dataforseo-onpage-lighthouse",
    name: "OnPage Lighthouse API",
    description: "OnPage API für Lighthouse-Performance-Tests: Core Web Vitals, Performance-Scores, Accessibility und Best Practices.",
    category: "OnPage - Lighthouse",
    icon: "🚀📊⚡",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Lighthouse",
        description: "OnPage API für Lighthouse-Performance-Tests und Core Web Vitals Analyse.",
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
        "/v3/on_page/lighthouse": {
          "post": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Test",
            "description": "Run Lighthouse performance tests on web pages",
            "operationId": "Lighthouse",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "format": "uri"},
                        "device": {"type": "string", "enum": ["desktop", "mobile"]},
                        "categories": {"type": "array", "items": {"type": "string"}},
                        "locale": {"type": "string"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse_tasks": {
          "post": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Tasks",
            "description": "Create Lighthouse performance test tasks",
            "operationId": "LighthouseTasks",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "format": "uri"},
                        "device": {"type": "string", "enum": ["desktop", "mobile"]},
                        "categories": {"type": "array", "items": {"type": "string"}},
                        "locale": {"type": "string"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse_tasks_ready": {
          "post": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Tasks Ready",
            "description": "Check if Lighthouse tasks are ready",
            "operationId": "LighthouseTasksReady",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {"type": "string"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse/languages": {
          "get": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Languages",
            "description": "Get available languages for Lighthouse tests",
            "operationId": "LighthouseLanguages",
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse/audits": {
          "get": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Audits",
            "description": "Get available Lighthouse audit categories",
            "operationId": "LighthouseAudits",
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse/versions": {
          "get": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Versions",
            "description": "Get available Lighthouse versions",
            "operationId": "LighthouseVersions",
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse/task_post": {
          "post": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Task Post",
            "description": "Create new Lighthouse performance test tasks",
            "operationId": "LighthouseTaskPost",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "format": "uri"},
                        "device": {"type": "string", "enum": ["desktop", "mobile"]},
                        "categories": {"type": "array", "items": {"type": "string"}},
                        "locale": {"type": "string"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse/task_get/json/{id}": {
          "get": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Task Get",
            "description": "Get Lighthouse task results by ID",
            "operationId": "LighthouseTaskGet",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {"type": "string"}
              }
            ],
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/on_page/lighthouse/live/json": {
          "post": {
            "tags": ["OnPage Lighthouse"],
            "summary": "Lighthouse Live",
            "description": "Run live Lighthouse tests for immediate results",
            "operationId": "LighthouseLive",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "format": "uri"},
                        "device": {"type": "string", "enum": ["desktop", "mobile"]},
                        "categories": {"type": "array", "items": {"type": "string"}},
                        "locale": {"type": "string"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
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
