// Google Ads Keywords Data API Schema
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

export const KeywordsGoogleAdsApis: ToolApi[] = [
  {
    id: "dataforseo-keywords-google-ads",
    name: "Keywords Google Ads API", 
    description: "Google Ads Keywords Data API mit Search Volume, Keywords for Site, Keywords for Keywords und Ad Traffic Funktionen. Optimiert für bessere Performance durch Trennung von der Haupt-Keywords API.",
    category: "Keywords Google Ads",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Keywords Google Ads API",
        description: "Google Ads Keywords Data API mit Search Volume, Keywords for Site, Keywords for Keywords und Ad Traffic Funktionen.",
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
      ]
    }
  }
]
