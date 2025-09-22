// SERP Google API Schema - Spezialisierte Google-Analyse
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

export const SerpGoogleApis: ToolApi[] = [
  {
    id: "dataforseo-serp-google",
    name: "SERP Google API",
    description:
      "Spezialisierte Google-Analyse mit 8 verschiedenen APIs: Organic Search, AI Mode, Images, Search by Image, Jobs, Autocomplete, Dataset Search und Dataset Info. Optimiert für bessere Performance durch Trennung von der Haupt-SERP API.",
    category: "SERP Google",
    icon: "🔍",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO SERP API - Vollständige Google-Analyse",
        description: "8 APIs für Google: Organic Search, AI Mode, Images, Search by Image, Jobs, Autocomplete, Dataset Search und Dataset Info. Optimiert für bessere Performance durch Trennung von der Haupt-SERP API.",
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
        "/v3/serp/google/locations": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1locations" },
        "/v3/serp/google/locations/{country}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1locations~1{country}" },
        "/v3/serp/google/languages": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1languages" },
        
        // Organic Search
        "/v3/serp/google/organic/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1task_post" },
        "/v3/serp/google/organic/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1tasks_ready" },
        "/v3/serp/google/organic/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1tasks_fixed" },
        "/v3/serp/google/organic/task_get/regular/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1task_get~1regular~1{id}" },
        "/v3/serp/google/organic/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1task_get~1advanced~1{id}" },
        "/v3/serp/google/organic/task_get/html/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1task_get~1html~1{id}" },
        "/v3/serp/google/organic/live/regular": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1live~1regular" },
        "/v3/serp/google/organic/live/advanced": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1live~1advanced" },
        "/v3/serp/google/organic/live/html": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1organic~1live~1html" },

        // AI Mode
        "/v3/serp/google/ai_mode/languages": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1ai_mode~1languages" },
        "/v3/serp/google/ai_mode/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1ai_mode~1task_post" },
        "/v3/serp/google/ai_mode/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1ai_mode~1tasks_ready" },
        "/v3/serp/google/ai_mode/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1ai_mode~1tasks_fixed" },
        "/v3/serp/google/ai_mode/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1ai_mode~1task_get~1advanced~1{id}" },
        "/v3/serp/google/ai_mode/live/advanced": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1ai_mode~1live~1advanced" },

        // Images
        "/v3/serp/google/images/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1images~1task_post" },
        "/v3/serp/google/images/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1images~1tasks_ready" },
        "/v3/serp/google/images/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1images~1tasks_fixed" },
        "/v3/serp/google/images/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1images~1task_get~1advanced~1{id}" },
        "/v3/serp/google/images/task_get/html/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1images~1task_get~1html~1{id}" },
        "/v3/serp/google/images/live/advanced": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1images~1live~1advanced" },
        "/v3/serp/google/images/live/html": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1images~1live~1html" },

        // Search by Image
        "/v3/serp/google/search_by_image/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1search_by_image~1task_post" },
        "/v3/serp/google/search_by_image/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1search_by_image~1tasks_ready" },
        "/v3/serp/google/search_by_image/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1search_by_image~1tasks_fixed" },
        "/v3/serp/google/search_by_image/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1search_by_image~1task_get~1advanced~1{id}" },

        // Jobs
        "/v3/serp/google/jobs/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1jobs~1task_post" },
        "/v3/serp/google/jobs/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1jobs~1tasks_ready" },
        "/v3/serp/google/jobs/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1jobs~1tasks_fixed" },
        "/v3/serp/google/jobs/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1jobs~1task_get~1advanced~1{id}" },
        "/v3/serp/google/jobs/task_get/html/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1jobs~1task_get~1html~1{id}" },

        // Autocomplete
        "/v3/serp/google/autocomplete/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1autocomplete~1task_post" },
        "/v3/serp/google/autocomplete/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1autocomplete~1tasks_ready" },
        "/v3/serp/google/autocomplete/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1autocomplete~1tasks_fixed" },
        "/v3/serp/google/autocomplete/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1autocomplete~1task_get~1advanced~1{id}" },
        "/v3/serp/google/autocomplete/live/advanced": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1autocomplete~1live~1advanced" },

        // Dataset Search
        "/v3/serp/google/dataset_search/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_search~1task_post" },
        "/v3/serp/google/dataset_search/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_search~1tasks_ready" },
        "/v3/serp/google/dataset_search/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_search~1tasks_fixed" },
        "/v3/serp/google/dataset_search/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_search~1task_get~1advanced~1{id}" },
        "/v3/serp/google/dataset_search/live/advanced": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_search~1live~1advanced" },

        // Dataset Info
        "/v3/serp/google/dataset_info/task_post": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_info~1task_post" },
        "/v3/serp/google/dataset_info/tasks_ready": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_info~1tasks_ready" },
        "/v3/serp/google/dataset_info/tasks_fixed": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_info~1tasks_fixed" },
        "/v3/serp/google/dataset_info/task_get/advanced/{id}": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_info~1task_get~1advanced~1{id}" },
        "/v3/serp/google/dataset_info/live/advanced": { "$ref": "./serp/serp-google.yaml#/~1v3~1serp~1google~1dataset_info~1live~1advanced" }
      }
    }
  }
]
