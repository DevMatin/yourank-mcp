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

// OnPage Analysis API
export const OnPageAnalysisApi: ToolApi[] = [
  {
    id: "dataforseo-onpage-summary",
    name: "OnPage Summary API",
    description: "Zusammenfassung der Seitenanalyse und Metriken für einen Überblick.",
    category: "OnPage - Summary",
    icon: "📊📋",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Summary",
        description: "Zusammenfassung der Seitenanalyse und Metriken.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/summary": {
          "post": {
            "tags": ["OnPage Analysis"],
            "summary": "Page Summary",
            "description": "Get summary of page analysis and metrics",
            "operationId": "PageSummary",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {"type": "string"},
                        "url": {"type": "string", "format": "uri"}
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
  },
  {
    id: "dataforseo-onpage-summary-by-id",
    name: "OnPage Summary by ID API",
    description: "Zusammenfassung nach Task-ID für spezifische Analysen.",
    category: "OnPage - Summary by ID",
    icon: "🆔📊",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Summary by ID",
        description: "Zusammenfassung nach Task-ID.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/summary/{id}": {
          "get": {
            "tags": ["OnPage Analysis"],
            "summary": "Summary by ID",
            "description": "Get summary by task ID",
            "operationId": "SummaryById",
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
        }
      }
    }
  },
  {
    id: "dataforseo-onpage-pages",
    name: "OnPage Pages API",
    description: "Alle Seiten eines Crawling-Tasks für umfassende Website-Analyse.",
    category: "OnPage - Pages",
    icon: "📄🌐",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Pages",
        description: "Alle Seiten eines Crawling-Tasks.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/pages": {
          "post": {
            "tags": ["OnPage Analysis"],
            "summary": "Pages",
            "description": "Get all pages from a crawling task",
            "operationId": "Pages",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {"type": "string"},
                        "limit": {"type": "integer"},
                        "offset": {"type": "integer"}
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
  },
  {
    id: "dataforseo-onpage-duplicate-content",
    name: "OnPage Duplicate Content API",
    description: "Identifikation von dupliziertem Content über verschiedene Seiten hinweg.",
    category: "OnPage - Duplicate Content",
    icon: "📋🔄",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Duplicate Content",
        description: "Identifikation von dupliziertem Content.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/duplicate_content": {
          "post": {
            "tags": ["OnPage Analysis"],
            "summary": "Duplicate Content",
            "description": "Identify duplicate content across pages",
            "operationId": "DuplicateContent",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {"type": "string"},
                        "limit": {"type": "integer"},
                        "offset": {"type": "integer"}
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
  },
  {
    id: "dataforseo-onpage-duplicate-tags",
    name: "OnPage Duplicate Tags API",
    description: "Identifikation von duplizierten HTML-Tags und Elementen für Code-Optimierung.",
    category: "OnPage - Duplicate Tags",
    icon: "🏷️🔄",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Duplicate Tags",
        description: "Identifikation von duplizierten HTML-Tags und Elementen.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/duplicate_tags": {
          "post": {
            "tags": ["OnPage Analysis"],
            "summary": "Duplicate Tags",
            "description": "Identify duplicate HTML tags and elements",
            "operationId": "DuplicateTags",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {"type": "string"},
                        "limit": {"type": "integer"},
                        "offset": {"type": "integer"}
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
