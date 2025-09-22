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

// OnPage Quality API
export const OnPageQualityApi: ToolApi[] = [
  {
    id: "dataforseo-onpage-instant-pages",
    name: "OnPage Instant Pages API",
    description: "Sofortige Seitenanalyse und Qualitätsmetriken ohne Task-Erstellung.",
    category: "OnPage - Instant Analysis",
    icon: "⚡📊",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Instant Pages",
        description: "Sofortige Seitenanalyse und Qualitätsmetriken.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/instant_pages": {
          "post": {
            "tags": ["OnPage Quality"],
            "summary": "Instant Pages",
            "description": "Get instant page analysis and quality metrics",
            "operationId": "InstantPages",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "format": "uri"},
                        "enable_javascript": {"type": "boolean"},
                        "enable_browser_rendering": {"type": "boolean"},
                        "custom_js": {"type": "string"}
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
    id: "dataforseo-onpage-page-content",
    name: "OnPage Page Content API",
    description: "Detaillierte Seitenanalyse und Content-Qualitätsprüfung.",
    category: "OnPage - Page Content",
    icon: "📄🔍",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Page Content",
        description: "Detaillierte Seitenanalyse und Content-Qualität.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/page_content": {
          "post": {
            "tags": ["OnPage Quality"],
            "summary": "Page Content",
            "description": "Get detailed page content and quality analysis",
            "operationId": "PageContent",
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
    id: "dataforseo-onpage-keyword-density",
    name: "OnPage Keyword Density API",
    description: "Keyword-Dichte-Analyse und Verteilung auf Webseiten.",
    category: "OnPage - Keyword Analysis",
    icon: "🔑📊",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Keyword Density",
        description: "Keyword-Dichte-Analyse und Verteilung.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/keyword_density": {
          "post": {
            "tags": ["OnPage Quality"],
            "summary": "Keyword Density",
            "description": "Analyze keyword density and distribution on pages",
            "operationId": "KeywordDensity",
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
    id: "dataforseo-onpage-waterfall",
    name: "OnPage Waterfall API",
    description: "Seitenlade-Waterfall und Performance-Metriken für Performance-Optimierung.",
    category: "OnPage - Performance",
    icon: "📈⚡",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Waterfall",
        description: "Seitenlade-Waterfall und Performance-Metriken.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/waterfall": {
          "post": {
            "tags": ["OnPage Quality"],
            "summary": "Waterfall",
            "description": "Get page loading waterfall and performance metrics",
            "operationId": "Waterfall",
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
    id: "dataforseo-onpage-non-indexable",
    name: "OnPage Non-Indexable API",
    description: "Identifikation nicht-indexierbarer Seiten und deren Gründe.",
    category: "OnPage - Indexability",
    icon: "🚫🔍",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Non-Indexable",
        description: "Identifikation nicht-indexierbarer Seiten.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/non_indexable": {
          "post": {
            "tags": ["OnPage Quality"],
            "summary": "Non Indexable",
            "description": "Identify non-indexable pages and reasons",
            "operationId": "NonIndexable",
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
