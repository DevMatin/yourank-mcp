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

// OnPage Content Analysis API
export const OnPageContentApi: ToolApi[] = [
  {
    id: "dataforseo-onpage-content-parsing",
    name: "OnPage Content Parsing API",
    description: "Content-Parsing für Webseiten mit JavaScript-Unterstützung und Browser-Rendering.",
    category: "OnPage - Content Parsing",
    icon: "📝🔍",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Content Parsing",
        description: "Content-Parsing für Webseiten mit erweiterten Funktionen.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/content_parsing": {
          "post": {
            "tags": ["OnPage Content"],
            "summary": "Content Parsing",
            "description": "Parse and extract content from web pages",
            "operationId": "ContentParsing",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {"type": "string"},
                        "url": {"type": "string", "format": "uri"},
                        "custom_js": {"type": "string"},
                        "enable_javascript": {"type": "boolean"},
                        "enable_browser_rendering": {"type": "boolean"}
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
    id: "dataforseo-onpage-content-parsing-tasks",
    name: "OnPage Content Parsing Tasks API",
    description: "Batch-Content-Parsing für mehrere URLs mit Task-Management.",
    category: "OnPage - Content Tasks",
    icon: "📋📝",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Content Parsing Tasks",
        description: "Batch-Content-Parsing mit Task-Management.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/content_parsing_tasks": {
          "post": {
            "tags": ["OnPage Content"],
            "summary": "Content Parsing Tasks",
            "description": "Create content parsing tasks for multiple URLs",
            "operationId": "ContentParsingTasks",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "format": "uri"},
                        "custom_js": {"type": "string"},
                        "enable_javascript": {"type": "boolean"},
                        "enable_browser_rendering": {"type": "boolean"}
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
    id: "dataforseo-onpage-content-parsing-live",
    name: "OnPage Content Parsing Live API",
    description: "Live Content-Parsing für sofortige Ergebnisse ohne Task-Erstellung.",
    category: "OnPage - Content Live",
    icon: "⚡📝",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Content Parsing Live",
        description: "Live Content-Parsing für sofortige Ergebnisse.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/content_parsing/live": {
          "post": {
            "tags": ["OnPage Content"],
            "summary": "Content Parsing Live",
            "description": "Live content parsing for immediate results",
            "operationId": "ContentParsingLive",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "format": "uri"},
                        "custom_js": {"type": "string"},
                        "enable_javascript": {"type": "boolean"},
                        "enable_browser_rendering": {"type": "boolean"}
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
    id: "dataforseo-onpage-page-screenshot",
    name: "OnPage Page Screenshot API",
    description: "Screenshot-Erstellung von Webseiten für visuelle Analyse.",
    category: "OnPage - Screenshots",
    icon: "📸🖼️",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Page Screenshots",
        description: "Screenshot-Erstellung von Webseiten.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/page_screenshot": {
          "post": {
            "tags": ["OnPage Content"],
            "summary": "Page Screenshot",
            "description": "Capture screenshots of web pages",
            "operationId": "PageScreenshot",
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
    id: "dataforseo-onpage-microdata",
    name: "OnPage Microdata API",
    description: "Extraktion von strukturierten Daten und Microdata von Webseiten.",
    category: "OnPage - Microdata",
    icon: "🏷️📊",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Microdata",
        description: "Extraktion von strukturierten Daten und Microdata.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/microdata": {
          "post": {
            "tags": ["OnPage Content"],
            "summary": "Microdata",
            "description": "Extract microdata and structured data from pages",
            "operationId": "Microdata",
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
    id: "dataforseo-onpage-raw-html",
    name: "OnPage Raw HTML API",
    description: "Rohes HTML-Content für detaillierte Analyse und Verarbeitung.",
    category: "OnPage - Raw HTML",
    icon: "📄🔍",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Raw HTML",
        description: "Rohes HTML-Content für detaillierte Analyse.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/raw_html": {
          "post": {
            "tags": ["OnPage Content"],
            "summary": "Raw HTML",
            "description": "Get raw HTML content for analysis",
            "operationId": "RawHtml",
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
  }
]
