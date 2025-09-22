// Bing Keywords Data API Schema
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

export const KeywordsBingApis: ToolApi[] = [
  {
    id: "dataforseo-keywords-bing",
    name: "Keywords Bing API",
    description: "Bing Keywords Data API mit Search Volume, Keywords for Site/Keywords, Keyword Performance, Search Volume History und Audience Estimation. Optimiert für bessere Performance durch Trennung von der Haupt-Keywords API.",
    category: "Keywords Bing",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app", 
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Keywords Bing API",
        description: "Bing Keywords Data API mit Search Volume, Keywords for Site/Keywords, Keyword Performance, Search Volume History und Audience Estimation.",
        version: "v1.0.0",
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
      ]
    }
  }
]
