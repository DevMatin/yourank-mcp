// DataForSEO MCP Server Schema - Vollständiges Merchant General Schema (Alle 48 Tools)
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

// Vollständiges Merchant General API Schema - ALLE 48 implementierten Tools
export const MerchantGeneralCompleteSchema: ToolApi[] = [
  {
    id: "dataforseo-merchant-general-complete",
    name: "Merchant General API - Vollständiges Schema (48 Tools)",
    description:
      "Vollständige Merchant API mit ALLEN 48 implementierten Tools: 3 Core APIs, 22 Google Shopping Tools (Products, Sellers, Product Spec, Product Info), 23 Amazon Tools (Products, ASIN, Sellers, Reviews) inkl. Locations/Languages. Umfassende E-Commerce-Analyse für Google Shopping und Amazon Marketplace.",
    category: "Merchant - General Complete",
    icon: "🛍️🏪📦⭐",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Merchant API - Vollständiges Schema (48 Tools)",
        description:
          "Vollständige API für ALLE 48 implementierten Merchant Tools: Core APIs (3), Google Shopping Tools (22), Amazon Tools (23). Optimiert für umfassende E-Commerce-Analyse mit vollständigen Task-Management-Zyklen.",
        version: "v3.0.0",
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
        // ===== MERCHANT CORE APIs (3 Tools) =====
        "/v3/merchant/id_list": {
          post: {
            tags: ["Merchant Core"],
            summary: "Merchant ID List",
            description: "Liefert eine Liste aller abgeschlossenen Merchant Tasks mit Metadaten",
            operationId: "MerchantIdList",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        datetime_from: {
                          type: "string",
                          description: "Startzeit für Filterung der Ergebnisse (UTC Format)",
                          example: "2023-01-15 12:57:46 +00:00"
                        },
                        datetime_to: {
                          type: "string",
                          description: "Endzeit für Filterung der Ergebnisse (UTC Format)",
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
                        },
                        sort: {
                          type: "string",
                          description: "Sortierung nach Ausführungszeit",
                          enum: ["asc", "desc"],
                          default: "asc"
                        },
                        include_metadata: {
                          type: "boolean",
                          description: "Task Metadata in Antwort einschließen",
                          default: false
                        }
                      },
                      required: ["datetime_from", "datetime_to"]
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
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/errors": {
          post: {
            tags: ["Merchant Core"],
            summary: "Merchant Errors",
            description: "Liefert Informationen über Merchant API Tasks, die einen Fehler zurückgegeben haben",
            operationId: "MerchantErrors",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        datetime_from: {
                          type: "string",
                          description: "Startzeit für Filterung der Fehler (UTC Format)",
                          example: "2023-01-15 12:57:46 +00:00"
                        },
                        datetime_to: {
                          type: "string",
                          description: "Endzeit für Filterung der Fehler (UTC Format)",
                          example: "2023-01-31 13:57:46 +00:00"
                        }
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
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/tasks_ready": {
          post: {
            tags: ["Merchant Core"],
            summary: "Merchant Tasks Ready",
            description: "Überprüft den Status von Merchant Tasks",
            operationId: "MerchantTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          description: "Task ID zur Überprüfung",
                          example: "1234567890"
                        }
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
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== GOOGLE MERCHANT UTILITIES (3 Tools) =====
        "/v3/merchant/google/locations": {
          get: {
            tags: ["Google Merchant Utilities"],
            summary: "Google Merchant Locations",
            description: "Liefert alle unterstützten Google Merchant Standorte",
            operationId: "GoogleMerchantLocations",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/LocationResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/locations/{country}": {
          get: {
            tags: ["Google Merchant Utilities"],
            summary: "Google Merchant Locations by Country",
            description: "Liefert Google Merchant Standorte für ein bestimmtes Land",
            operationId: "GoogleMerchantLocationsCountry",
            parameters: [
              {
                name: "country",
                in: "path",
                required: true,
                description: "Ländercode für die Standortsuche",
                schema: { type: "string" },
                example: "US"
              }
            ],
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/LocationResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/languages": {
          get: {
            tags: ["Google Merchant Utilities"],
            summary: "Google Merchant Languages",
            description: "Liefert alle unterstützten Google Merchant Sprachen",
            operationId: "GoogleMerchantLanguages",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/LanguageResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== GOOGLE PRODUCTS APIs (4 Tools) =====
        "/v3/merchant/google/products/task_post": {
          post: {
            tags: ["Google Products"],
            summary: "Google Products Task Post",
            description: "Erstellt einen neuen Google Products Task",
            operationId: "GoogleProductsTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GoogleProductsTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/products/tasks_ready": {
          post: {
            tags: ["Google Products"],
            summary: "Google Products Tasks Ready",
            description: "Überprüft den Status von Google Products Tasks",
            operationId: "GoogleProductsTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/products/task_get/advanced/{id}": {
          get: {
            tags: ["Google Products"],
            summary: "Google Products Task Get Advanced",
            description: "Ruft erweiterte Google Products Task-Daten ab",
            operationId: "GoogleProductsTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/products/task_get/html/{id}": {
          get: {
            tags: ["Google Products"],
            summary: "Google Products Task Get HTML",
            description: "Ruft HTML-Daten von Google Products Tasks ab",
            operationId: "GoogleProductsTaskGetHtml",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den HTML-Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "HTML-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== GOOGLE SELLERS APIs (5 Tools) =====
        "/v3/merchant/google/sellers/task_post": {
          post: {
            tags: ["Google Sellers"],
            summary: "Google Sellers Task Post",
            description: "Erstellt einen neuen Google Sellers Task",
            operationId: "GoogleSellersTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GoogleSellersTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/sellers/tasks_ready": {
          post: {
            tags: ["Google Sellers"],
            summary: "Google Sellers Tasks Ready",
            description: "Überprüft den Status von Google Sellers Tasks",
            operationId: "GoogleSellersTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/sellers/task_get/advanced/{id}": {
          get: {
            tags: ["Google Sellers"],
            summary: "Google Sellers Task Get Advanced",
            description: "Ruft erweiterte Google Sellers Task-Daten ab",
            operationId: "GoogleSellersTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/sellers/task_get/html/{id}": {
          get: {
            tags: ["Google Sellers"],
            summary: "Google Sellers Task Get HTML",
            description: "Ruft HTML-Daten von Google Sellers Tasks ab",
            operationId: "GoogleSellersTaskGetHtml",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den HTML-Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "HTML-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/sellers/ad_url": {
          post: {
            tags: ["Google Sellers"],
            summary: "Google Sellers Ad URL",
            description: "Erstellt Anzeigen-URLs für Google Sellers",
            operationId: "GoogleSellersAdUrl",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GoogleSellersAdUrlRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Ad URL erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== GOOGLE PRODUCT SPEC APIs (4 Tools) =====
        "/v3/merchant/google/product_spec/task_post": {
          post: {
            tags: ["Google Product Spec"],
            summary: "Google Product Spec Task Post",
            description: "Erstellt einen neuen Google Product Spec Task",
            operationId: "GoogleProductSpecTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GoogleProductSpecTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/product_spec/tasks_ready": {
          post: {
            tags: ["Google Product Spec"],
            summary: "Google Product Spec Tasks Ready",
            description: "Überprüft den Status von Google Product Spec Tasks",
            operationId: "GoogleProductSpecTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/product_spec/task_get/advanced/{id}": {
          get: {
            tags: ["Google Product Spec"],
            summary: "Google Product Spec Task Get Advanced",
            description: "Ruft erweiterte Google Product Spec Task-Daten ab",
            operationId: "GoogleProductSpecTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/product_spec/task_get/html/{id}": {
          get: {
            tags: ["Google Product Spec"],
            summary: "Google Product Spec Task Get HTML",
            description: "Ruft HTML-Daten von Google Product Spec Tasks ab",
            operationId: "GoogleProductSpecTaskGetHtml",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den HTML-Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "HTML-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== GOOGLE PRODUCT INFO APIs (3 Tools) =====
        "/v3/merchant/google/product_info/task_post": {
          post: {
            tags: ["Google Product Info"],
            summary: "Google Product Info Task Post",
            description: "Erstellt einen neuen Google Product Info Task",
            operationId: "GoogleProductInfoTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GoogleProductInfoTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/product_info/tasks_ready": {
          post: {
            tags: ["Google Product Info"],
            summary: "Google Product Info Tasks Ready",
            description: "Überprüft den Status von Google Product Info Tasks",
            operationId: "GoogleProductInfoTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/google/product_info/task_get/advanced/{id}": {
          get: {
            tags: ["Google Product Info"],
            summary: "Google Product Info Task Get Advanced",
            description: "Ruft erweiterte Google Product Info Task-Daten ab",
            operationId: "GoogleProductInfoTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== AMAZON UTILITIES (3 Tools) =====
        "/v3/merchant/amazon/locations": {
          get: {
            tags: ["Amazon Utilities"],
            summary: "Amazon Locations",
            description: "Liefert alle unterstützten Amazon Standorte",
            operationId: "AmazonLocations",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/LocationResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/locations/{country}": {
          get: {
            tags: ["Amazon Utilities"],
            summary: "Amazon Locations by Country",
            description: "Liefert Amazon Standorte für ein bestimmtes Land",
            operationId: "AmazonLocationsCountry",
            parameters: [
              {
                name: "country",
                in: "path",
                required: true,
                description: "Ländercode für die Standortsuche",
                schema: { type: "string" },
                example: "US"
              }
            ],
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/LocationResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/languages": {
          get: {
            tags: ["Amazon Utilities"],
            summary: "Amazon Languages",
            description: "Liefert alle unterstützten Amazon Sprachen",
            operationId: "AmazonLanguages",
            responses: {
              "200": {
                description: "Erfolgreiche Operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/LanguageResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== AMAZON PRODUCTS APIs (4 Tools) =====
        "/v3/merchant/amazon/products/task_post": {
          post: {
            tags: ["Amazon Products"],
            summary: "Amazon Products Task Post",
            description: "Erstellt einen neuen Amazon Products Task",
            operationId: "AmazonProductsTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AmazonProductsTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/products/tasks_ready": {
          post: {
            tags: ["Amazon Products"],
            summary: "Amazon Products Tasks Ready",
            description: "Überprüft den Status von Amazon Products Tasks",
            operationId: "AmazonProductsTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/products/task_get/advanced/{id}": {
          get: {
            tags: ["Amazon Products"],
            summary: "Amazon Products Task Get Advanced",
            description: "Ruft erweiterte Amazon Products Task-Daten ab",
            operationId: "AmazonProductsTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/products/task_get/html/{id}": {
          get: {
            tags: ["Amazon Products"],
            summary: "Amazon Products Task Get HTML",
            description: "Ruft HTML-Daten von Amazon Products Tasks ab",
            operationId: "AmazonProductsTaskGetHtml",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den HTML-Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "HTML-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== AMAZON ASIN APIs (4 Tools) =====
        "/v3/merchant/amazon/asin/task_post": {
          post: {
            tags: ["Amazon ASIN"],
            summary: "Amazon ASIN Task Post",
            description: "Erstellt einen neuen Amazon ASIN Task",
            operationId: "AmazonAsinTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AmazonAsinTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/asin/tasks_ready": {
          post: {
            tags: ["Amazon ASIN"],
            summary: "Amazon ASIN Tasks Ready",
            description: "Überprüft den Status von Amazon ASIN Tasks",
            operationId: "AmazonAsinTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/asin/task_get/advanced/{id}": {
          get: {
            tags: ["Amazon ASIN"],
            summary: "Amazon ASIN Task Get Advanced",
            description: "Ruft erweiterte Amazon ASIN Task-Daten ab",
            operationId: "AmazonAsinTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/asin/task_get/html/{id}": {
          get: {
            tags: ["Amazon ASIN"],
            summary: "Amazon ASIN Task Get HTML",
            description: "Ruft HTML-Daten von Amazon ASIN Tasks ab",
            operationId: "AmazonAsinTaskGetHtml",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den HTML-Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "HTML-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== AMAZON SELLERS APIs (4 Tools) =====
        "/v3/merchant/amazon/sellers/task_post": {
          post: {
            tags: ["Amazon Sellers"],
            summary: "Amazon Sellers Task Post",
            description: "Erstellt einen neuen Amazon Sellers Task",
            operationId: "AmazonSellersTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AmazonSellersTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/sellers/tasks_ready": {
          post: {
            tags: ["Amazon Sellers"],
            summary: "Amazon Sellers Tasks Ready",
            description: "Überprüft den Status von Amazon Sellers Tasks",
            operationId: "AmazonSellersTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/sellers/task_get/advanced/{id}": {
          get: {
            tags: ["Amazon Sellers"],
            summary: "Amazon Sellers Task Get Advanced",
            description: "Ruft erweiterte Amazon Sellers Task-Daten ab",
            operationId: "AmazonSellersTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/sellers/task_get/html/{id}": {
          get: {
            tags: ["Amazon Sellers"],
            summary: "Amazon Sellers Task Get HTML",
            description: "Ruft HTML-Daten von Amazon Sellers Tasks ab",
            operationId: "AmazonSellersTaskGetHtml",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den HTML-Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "HTML-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },

        // ===== AMAZON REVIEWS APIs (4 Tools) =====
        "/v3/merchant/amazon/reviews/task_post": {
          post: {
            tags: ["Amazon Reviews"],
            summary: "Amazon Reviews Task Post",
            description: "Erstellt einen neuen Amazon Reviews Task",
            operationId: "AmazonReviewsTaskPost",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AmazonReviewsTaskPostRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task erfolgreich erstellt",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/reviews/tasks_ready": {
          post: {
            tags: ["Amazon Reviews"],
            summary: "Amazon Reviews Tasks Ready",
            description: "Überprüft den Status von Amazon Reviews Tasks",
            operationId: "AmazonReviewsTasksReady",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TaskIdRequest"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Task-Status erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/reviews/task_get/advanced/{id}": {
          get: {
            tags: ["Amazon Reviews"],
            summary: "Amazon Reviews Task Get Advanced",
            description: "Ruft erweiterte Amazon Reviews Task-Daten ab",
            operationId: "AmazonReviewsTaskGetAdvanced",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "Erweiterte Task-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/merchant/amazon/reviews/task_get/html/{id}": {
          get: {
            tags: ["Amazon Reviews"],
            summary: "Amazon Reviews Task Get HTML",
            description: "Ruft HTML-Daten von Amazon Reviews Tasks ab",
            operationId: "AmazonReviewsTaskGetHtml",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                description: "Task ID für den HTML-Datenabruf",
                schema: { type: "string" },
                example: "1234567890"
              }
            ],
            responses: {
              "200": {
                description: "HTML-Daten erfolgreich abgerufen",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/StandardTaskResponse"
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          StandardTaskResponse: {
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
          },
          LocationResponse: {
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
                          location_code: { type: "integer" },
                          location_name: { type: "string" },
                          country_iso_code: { type: "string" },
                          location_type: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          LanguageResponse: {
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
                          language_name: { type: "string" },
                          language_code: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          TaskIdRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "Task ID zur Überprüfung",
                  example: "1234567890"
                }
              }
            }
          },
          GoogleProductsTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                keyword: {
                  type: "string",
                  description: "Suchbegriff für Google Products-Suche",
                  example: "bluetooth headphones"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                },
                device: {
                  type: "string",
                  description: "Gerätetyp für die Suche",
                  enum: ["desktop", "mobile"],
                  default: "desktop"
                },
                os: {
                  type: "string",
                  description: "Betriebssystem",
                  example: "windows"
                }
              },
              required: ["keyword", "location_code", "language_code"]
            }
          },
          GoogleSellersTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                keyword: {
                  type: "string",
                  description: "Suchbegriff für Google Sellers-Suche",
                  example: "electronics seller"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                }
              },
              required: ["keyword", "location_code", "language_code"]
            }
          },
          GoogleSellersAdUrlRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  description: "URL für die Ad URL-Generierung",
                  example: "https://shopping.google.com/seller"
                }
              },
              required: ["url"]
            }
          },
          GoogleProductSpecTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                product_id: {
                  type: "string",
                  description: "Google Product ID",
                  example: "17951321251827081024"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                }
              },
              required: ["product_id", "location_code", "language_code"]
            }
          },
          GoogleProductInfoTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                product_id: {
                  type: "string",
                  description: "Google Product ID",
                  example: "17951321251827081024"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                }
              },
              required: ["product_id", "location_code", "language_code"]
            }
          },
          AmazonProductsTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                keyword: {
                  type: "string",
                  description: "Suchbegriff für Amazon Products-Suche",
                  example: "wireless mouse"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                }
              },
              required: ["keyword", "location_code", "language_code"]
            }
          },
          AmazonAsinTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                asin: {
                  type: "string",
                  description: "Amazon Standard Identification Number",
                  example: "B08N5WRWNW"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                }
              },
              required: ["asin", "location_code", "language_code"]
            }
          },
          AmazonSellersTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                keyword: {
                  type: "string",
                  description: "Suchbegriff für Amazon Sellers-Suche",
                  example: "electronics seller"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                }
              },
              required: ["keyword", "location_code", "language_code"]
            }
          },
          AmazonReviewsTaskPostRequest: {
            type: "array",
            items: {
              type: "object",
              properties: {
                asin: {
                  type: "string",
                  description: "Amazon Standard Identification Number",
                  example: "B08N5WRWNW"
                },
                location_code: {
                  type: "integer",
                  description: "Standort-Code für die Suche",
                  example: 2840
                },
                language_code: {
                  type: "string",
                  description: "Sprach-Code für die Suche",
                  example: "en"
                },
                sort_by: {
                  type: "string",
                  description: "Sortierung der Reviews",
                  enum: ["most_recent", "top_reviews", "most_helpful"],
                  default: "most_recent"
                }
              },
              required: ["asin", "location_code", "language_code"]
            }
          }
        },
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
