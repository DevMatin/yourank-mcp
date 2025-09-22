// Clickstream Keywords Data API Schema
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

export const KeywordsClickstreamApis: ToolApi[] = [
  {
    id: "dataforseo-keywords-clickstream",
    name: "Keywords Clickstream API",
    description: "Clickstream Keywords Data API mit DataForSEO Search Volume, Global Search Volume und Bulk Search Volume. Optimiert für bessere Performance durch Trennung von der Haupt-Keywords API.",
    category: "Keywords Clickstream",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Keywords Clickstream API",
        description: "Clickstream Keywords Data API mit DataForSEO Search Volume, Global Search Volume und Bulk Search Volume.",
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
