// DataForSEO MCP Server Schema - Amazon Products & ASIN
// Temporärer Import - die envs Datei existiert noch nicht
const getDataForSEOAuthHeader = () => "Bearer YOUR_API_KEY_HERE"

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

// Merchant Amazon Products API - Amazon Produkte & ASIN
export const MerchantAmazonProductsApis: ToolApi[] = [
  {
    id: "dataforseo-merchant-amazon-products",
    name: "Merchant Amazon Products API",
    description:
      "Amazon Produkte & ASIN APIs: Products und ASIN Management. Vollständige Amazon Produktanalyse und ASIN-Verwaltung.",
    category: "Merchant Amazon Products",
    icon: "📦",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Merchant API - Amazon Products & ASIN",
        description: "Amazon Produktanalyse und ASIN-Verwaltung",
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
        // Amazon Products
        "/v3/merchant/amazon/products/task_post": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1products~1task_post" },
        "/v3/merchant/amazon/products/tasks_ready": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1products~1tasks_ready" },
        "/v3/merchant/amazon/products/task_get/advanced/{id}": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1products~1task_get~1advanced~1{id}" },
        "/v3/merchant/amazon/products/task_get/html/{id}": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1products~1task_get~1html~1{id}" },

        // Amazon ASIN
        "/v3/merchant/amazon/asin/task_post": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1asin~1task_post" },
        "/v3/merchant/amazon/asin/tasks_ready": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1asin~1tasks_ready" },
        "/v3/merchant/amazon/asin/task_get/advanced/{id}": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1asin~1task_get~1advanced~1{id}" },
        "/v3/merchant/amazon/asin/task_get/html/{id}": { "$ref": "./merchant/merchant-amazon-products.yaml#/~1v3~1merchant~1amazon~1asin~1task_get~1html~1{id}" }
      }
    }
  }
]
