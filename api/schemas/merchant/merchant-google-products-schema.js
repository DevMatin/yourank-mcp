// DataForSEO MCP Server Schema
// Temporärer Import - die envs Datei existiert noch nicht
const getDataForSEOAuthHeader = () => "Bearer YOUR_API_KEY_HERE";
// Merchant Google Products API - Spezialisierte Google Shopping-Produkte
export const MerchantGoogleProductsApis = [
    {
        id: "dataforseo-merchant-google-products",
        name: "Merchant Google Products API",
        description: "Spezialisierte Google Shopping-Produktanalyse mit umfassenden APIs für Google Products, Spec und Info. Optimiert für detaillierte Produktdatengewinnung und Marktanalysen.",
        category: "Merchant Google Products",
        icon: "🛍️",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Merchant API - Google Products",
                description: "Vollständige Google Shopping-Produktanalyse für E-Commerce-Insights und Wettbewerbsanalysen",
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
                // Utilities
                "/v3/merchant/google/locations": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1locations" },
                "/v3/merchant/google/locations/{country}": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1locations~1{country}" },
                "/v3/merchant/google/languages": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1languages" },
                // Google Products
                "/v3/merchant/google/products/task_post": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1products~1task_post" },
                "/v3/merchant/google/products/tasks_ready": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1products~1tasks_ready" },
                "/v3/merchant/google/products/tasks_fixed": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1products~1tasks_fixed" },
                "/v3/merchant/google/products/task_get/advanced/{id}": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1products~1task_get~1advanced~1{id}" },
                "/v3/merchant/google/products/task_get/html/{id}": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1products~1task_get~1html~1{id}" },
                "/v3/merchant/google/products/live/advanced": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1products~1live~1advanced" },
                "/v3/merchant/google/products/live/html": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1products~1live~1html" },
                // Google Product Spec
                "/v3/merchant/google/product_spec/task_post": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_spec~1task_post" },
                "/v3/merchant/google/product_spec/tasks_ready": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_spec~1tasks_ready" },
                "/v3/merchant/google/product_spec/tasks_fixed": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_spec~1tasks_fixed" },
                "/v3/merchant/google/product_spec/task_get/advanced/{id}": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_spec~1task_get~1advanced~1{id}" },
                "/v3/merchant/google/product_spec/task_get/html/{id}": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_spec~1task_get~1html~1{id}" },
                "/v3/merchant/google/product_spec/live/advanced": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_spec~1live~1advanced" },
                "/v3/merchant/google/product_spec/live/html": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_spec~1live~1html" },
                // Google Product Info
                "/v3/merchant/google/product_info/task_post": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_info~1task_post" },
                "/v3/merchant/google/product_info/tasks_ready": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_info~1tasks_ready" },
                "/v3/merchant/google/product_info/tasks_fixed": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_info~1tasks_fixed" },
                "/v3/merchant/google/product_info/task_get/advanced/{id}": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_info~1task_get~1advanced~1{id}" },
                "/v3/merchant/google/product_info/task_get/html/{id}": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_info~1task_get~1html~1{id}" },
                "/v3/merchant/google/product_info/live/advanced": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_info~1live~1advanced" },
                "/v3/merchant/google/product_info/live/html": { "$ref": "./merchant/merchant-google-products.yaml#/~1v3~1merchant~1google~1product_info~1live~1html" }
            }
        }
    }
];
