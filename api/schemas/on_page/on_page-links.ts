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

// OnPage Links API
export const OnPageLinksApi: ToolApi[] = [
  {
    id: "dataforseo-onpage-links",
    name: "OnPage Links API",
    description: "Alle Links von einer spezifischen Seite mit detaillierter Analyse.",
    category: "OnPage - Links",
    icon: "🔗📊",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Links",
        description: "Alle Links von einer spezifischen Seite.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/links": {
          "post": {
            "tags": ["OnPage Links"],
            "summary": "Page Links",
            "description": "Get all links from a specific page",
            "operationId": "PageLinks",
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
    id: "dataforseo-onpage-links-by-page",
    name: "OnPage Links by Page API",
    description: "Links nach Seiten gruppiert für bessere Übersicht und Analyse.",
    category: "OnPage - Links by Page",
    icon: "📄🔗",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Links by Page",
        description: "Links nach Seiten gruppiert.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/links_by_page": {
          "post": {
            "tags": ["OnPage Links"],
            "summary": "Links by Page",
            "description": "Get links grouped by page",
            "operationId": "LinksByPage",
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
    id: "dataforseo-onpage-links-by-domain",
    name: "OnPage Links by Domain API",
    description: "Links nach Domains gruppiert für Cross-Domain-Link-Analyse.",
    category: "OnPage - Links by Domain",
    icon: "🌐🔗",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Links by Domain",
        description: "Links nach Domains gruppiert.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/links_by_domain": {
          "post": {
            "tags": ["OnPage Links"],
            "summary": "Links by Domain",
            "description": "Get links grouped by domain",
            "operationId": "LinksByDomain",
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
    id: "dataforseo-onpage-redirect-chains",
    name: "OnPage Redirect Chains API",
    description: "Analyse von Weiterleitungsketten und Redirect-Pfaden für SEO-Optimierung.",
    category: "OnPage - Redirect Chains",
    icon: "🔄🔗",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO OnPage API - Redirect Chains",
        description: "Analyse von Weiterleitungsketten und Redirect-Pfaden.",
        version: "v1.0.0"
      },
      paths: {
        "/v3/on_page/redirect_chains": {
          "post": {
            "tags": ["OnPage Links"],
            "summary": "Redirect Chains",
            "description": "Analyze redirect chains and redirect paths",
            "operationId": "RedirectChains",
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
