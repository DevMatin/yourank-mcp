// Shared Keywords Data API Schema
import { getDataForSEOAuthHeader } from "../envs";
export const KeywordsSharedApis = [
    {
        id: "dataforseo-keywords-shared",
        name: "Keywords Shared API",
        description: "Gemeinsame Keywords Data API Funktionen wie ID List und Errors. Optimiert für bessere Performance durch Trennung von der Haupt-Keywords API.",
        category: "Keywords Shared",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Keywords Shared API",
                description: "Gemeinsame Keywords Data API Funktionen wie ID List und Errors.",
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
];
