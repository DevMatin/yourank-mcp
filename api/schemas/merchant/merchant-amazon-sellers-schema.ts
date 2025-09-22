// DataForSEO MCP Server Schema - Amazon Sellers & Reviews
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

// Merchant Amazon Sellers API - Amazon Verkäufer & Reviews
export const MerchantAmazonSellersApis: ToolApi[] = [
  {
    id: "dataforseo-merchant-amazon-sellers",
    name: "Merchant Amazon Sellers API",
    description:
      "Amazon Verkäufer & Reviews APIs: Sellers und Reviews. Detaillierte Verkäufer- und Bewertungsanalysen für Amazon.",
    category: "Merchant Amazon Sellers",
    icon: "💼",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Merchant API - Amazon Sellers & Reviews",
        description: "Amazon Verkäufer- und Bewertungsanalysen",
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
        // Amazon Sellers
        "/v3/merchant/amazon/sellers/task_post": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1sellers~1task_post" },
        "/v3/merchant/amazon/sellers/tasks_ready": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1sellers~1tasks_ready" },
        "/v3/merchant/amazon/sellers/task_get/advanced/{id}": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1sellers~1task_get~1advanced~1{id}" },
        "/v3/merchant/amazon/sellers/task_get/html/{id}": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1sellers~1task_get~1html~1{id}" },

        // Amazon Reviews
        "/v3/merchant/amazon/reviews/task_post": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1reviews~1task_post" },
        "/v3/merchant/amazon/reviews/tasks_ready": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1reviews~1tasks_ready" },
        "/v3/merchant/amazon/reviews/task_get/advanced/{id}": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1reviews~1task_get~1advanced~1{id}" },
        "/v3/merchant/amazon/reviews/task_get/html/{id}": { "$ref": "./merchant/merchant-amazon-sellers.yaml#/~1v3~1merchant~1amazon~1reviews~1task_get~1html~1{id}" }
      }
    }
  }
]
