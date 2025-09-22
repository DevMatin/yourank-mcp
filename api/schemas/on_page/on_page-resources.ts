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

// OnPage Resources API
export const OnPageResourcesApi: ToolApi[] = [
  {
    id: "dataforseo-onpage-resources",
    name: "OnPage Resources API",
    description: "Alle Ressourcen von einer spezifischen Seite: Bilder, CSS, JavaScript, Fonts und andere Assets.",
    category: "OnPage - Resources",
    icon: "🖼️📁",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Resources",
        description: "Alle Ressourcen von einer spezifischen Seite.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/resources": {
          "post": {
            "tags": ["OnPage Resources"],
            "summary": "Page Resources",
            "description": "Get all resources from a specific page",
            "operationId": "PageResources",
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
    id: "dataforseo-onpage-resources-by-page",
    name: "OnPage Resources by Page API",
    description: "Ressourcen nach Seiten gruppiert für bessere Übersicht und Asset-Management.",
    category: "OnPage - Resources by Page",
    icon: "📄🖼️",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Resources by Page",
        description: "Ressourcen nach Seiten gruppiert.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/resources_by_page": {
          "post": {
            "tags": ["OnPage Resources"],
            "summary": "Resources by Page",
            "description": "Get resources grouped by page",
            "operationId": "ResourcesByPage",
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
    id: "dataforseo-onpage-resources-by-domain",
    name: "OnPage Resources by Domain API",
    description: "Ressourcen nach Domains gruppiert für Cross-Domain-Asset-Analyse.",
    category: "OnPage - Resources by Domain",
    icon: "🌐🖼️",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Resources by Domain",
        description: "Ressourcen nach Domains gruppiert.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/resources_by_domain": {
          "post": {
            "tags": ["OnPage Resources"],
            "summary": "Resources by Domain",
            "description": "Get resources grouped by domain",
            "operationId": "ResourcesByDomain",
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
    id: "dataforseo-onpage-pages-by-resource",
    name: "OnPage Pages by Resource API",
    description: "Seiten, die spezifische Ressourcen verwenden, für Asset-Abhängigkeitsanalyse.",
    category: "OnPage - Pages by Resource",
    icon: "🔗📄",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Pages by Resource",
        description: "Seiten, die spezifische Ressourcen verwenden.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/pages_by_resource": {
          "post": {
            "tags": ["OnPage Resources"],
            "summary": "Pages by Resource",
            "description": "Get pages that use specific resources",
            "operationId": "PagesByResource",
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
