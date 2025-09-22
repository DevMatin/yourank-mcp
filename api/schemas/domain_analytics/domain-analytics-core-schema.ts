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

export const DomainAnalyticsCoreApis: ToolApi[] = [
  {
    id: "dataforseo-domain-analytics-core",
    name: "Domain Analytics Core API",
    description:
      "Core Domain Analytics API mit 2 essentiellen Endpunkten für Task-Management: ID List für abgeschlossene Tasks und Error Handling für fehlerhafte Anfragen.",
    category: "Domain Analytics Core",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Domain Analytics - Core API",
        description: "Core API für Domain Analytics mit Task-Management und Error Handling. Optimiert für bessere Performance durch Trennung von der Haupt-Domain Analytics API.",
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
        "/v3/domain_analytics/id_list": {
          post: {
            tags: ["DomainAnalyticsCore"],
            description: "This endpoint is designed to provide you with the list of IDs and metadata of the completed Domain Analytics tasks during the specified period.",
            operationId: "DomainAnalyticsIdList",
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
                          description: "start time for filtering results"
                        },
                        datetime_to: {
                          type: "string", 
                          description: "finish time for filtering results"
                        },
                        limit: {
                          type: "integer",
                          description: "maximum number of returned task IDs"
                        },
                        offset: {
                          type: "integer",
                          description: "offset in the results array"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        },
        "/v3/domain_analytics/errors": {
          post: {
            tags: ["DomainAnalyticsCore"],
            description: "By calling this endpoint you will receive information about the Domain Analytics API tasks that returned an error within the past 7 days.",
            operationId: "DomainAnalyticsErrors",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        limit: {
                          type: "integer",
                          description: "maximum number of returned tasks that responded with an error"
                        },
                        offset: {
                          type: "integer",
                          description: "offset in the results array"
                        },
                        filtered_function: {
                          type: "string",
                          description: "return tasks with a certain function"
                        }
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Successful operation"
              }
            }
          }
        }
      }
    }
  }
]
