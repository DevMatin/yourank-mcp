// Trends Keywords Data API Schema
import { getDataForSEOAuthHeader } from "../envs";
export const KeywordsTrendsApis = [
    {
        id: "dataforseo-keywords-trends",
        name: "Keywords Trends API",
        description: "Google Trends und DataForSEO Trends API mit Explore, Subregion Interests, Demography und Merged Data Funktionen. Optimiert für bessere Performance durch Trennung von der Haupt-Keywords API.",
        category: "Keywords Trends",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Keywords Trends API",
                description: "Google Trends und DataForSEO Trends API mit Explore, Subregion Interests, Demography und Merged Data Funktionen.",
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
