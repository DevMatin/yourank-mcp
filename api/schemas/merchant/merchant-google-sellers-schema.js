// DataForSEO MCP Server Schema - Google Sellers & Reviews
// Temporärer Import - die envs Datei existiert noch nicht
const getDataForSEOAuthHeader = () => "Bearer YOUR_API_KEY_HERE";
// Merchant Google Sellers API - Google Shopping Verkäufer & Reviews
export const MerchantGoogleSellersApis = [
    {
        id: "dataforseo-merchant-google-sellers",
        name: "Merchant Google Sellers API",
        description: "Google Shopping Verkäufer & Reviews APIs: Sellers, Reviews und Ad URL. Detaillierte Verkäufer- und Bewertungsanalysen für Google Shopping.",
        category: "Merchant Google Sellers",
        icon: "🏪",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Merchant API - Google Sellers & Reviews",
                description: "Google Shopping Verkäufer- und Bewertungsanalysen",
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
                // Google Sellers
                "/v3/merchant/google/sellers/task_post": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1sellers~1task_post" },
                "/v3/merchant/google/sellers/tasks_ready": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1sellers~1tasks_ready" },
                "/v3/merchant/google/sellers/task_get/advanced/{id}": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1sellers~1task_get~1advanced~1{id}" },
                "/v3/merchant/google/sellers/task_get/html/{id}": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1sellers~1task_get~1html~1{id}" },
                "/v3/merchant/google/sellers/ad_url/{shop_ad_aclk}": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1sellers~1ad_url~1{shop_ad_aclk}" },
                // Google Reviews
                "/v3/merchant/google/reviews/task_post": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1reviews~1task_post" },
                "/v3/merchant/google/reviews/tasks_ready": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1reviews~1tasks_ready" },
                "/v3/merchant/google/reviews/task_get/advanced/{id}": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1reviews~1task_get~1advanced~1{id}" },
                "/v3/merchant/google/reviews/task_get/html/{id}": { "$ref": "./merchant/merchant-google-sellers.yaml#/~1v3~1merchant~1google~1reviews~1task_get~1html~1{id}" }
            }
        }
    }
];
