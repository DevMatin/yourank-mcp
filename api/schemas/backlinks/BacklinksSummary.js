import { getDataForSEOAuthHeader } from "../envs";
export const BacklinksSummaryApi = {
    id: "dataforseo-backlinks-summary",
    name: "Backlinks Summary API",
    description: "Vollständiges Backlink-Profil des Zielobjekts mit Übersicht aller wichtigen Backlink-Metriken",
    category: "Backlinks",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
        Authorization: getDataForSEOAuthHeader(),
        "Content-Type": "application/json"
    },
    schema: {
        openapi: "3.1.0",
        info: {
            title: "DataForSEO Backlinks Summary API",
            description: "Vollständiges Backlink-Profil mit Übersicht aller wichtigen Backlink-Metriken",
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
            "/v3/backlinks/core/summary": {
                post: {
                    tags: ["Backlinks"],
                    summary: "Backlinks Summary",
                    description: "Vollständiges Backlink-Profil des Zielobjekts mit Übersicht aller wichtigen Backlink-Metriken",
                    operationId: "BacklinksSummary",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            target: {
                                                type: "string",
                                                description: "Domain, Subdomain oder Webseite für die Analyse",
                                                example: "dataforseo.com"
                                            },
                                            limit: {
                                                type: "integer",
                                                description: "Anzahl der zurückzugebenden Ergebnisse",
                                                default: 100,
                                                maximum: 1000
                                            },
                                            offset: {
                                                type: "integer",
                                                description: "Offset für Paginierung",
                                                default: 0
                                            },
                                            include_subdomains: {
                                                type: "boolean",
                                                description: "Subdomains in Analyse einbeziehen",
                                                default: true
                                            }
                                        },
                                        required: ["target"]
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Erfolgreiche Operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            version: { type: "string" },
                                            status_code: { type: "integer" },
                                            status_message: { type: "string" },
                                            time: { type: "string" },
                                            cost: { type: "number" },
                                            tasks_count: { type: "integer" },
                                            tasks_error: { type: "integer" },
                                            tasks: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        result: {
                                                            type: "array",
                                                            items: {
                                                                type: "object",
                                                                properties: {
                                                                    target: { type: "string" },
                                                                    total_count: { type: "integer" },
                                                                    backlinks_count: { type: "integer" },
                                                                    referring_domains_count: { type: "integer" },
                                                                    dofollow_backlinks: { type: "integer" },
                                                                    nofollow_backlinks: { type: "integer" },
                                                                    referring_domains: { type: "integer" },
                                                                    referring_main_domains: { type: "integer" },
                                                                    referring_ips: { type: "integer" },
                                                                    referring_subnets: { type: "integer" },
                                                                    referring_pages: { type: "integer" },
                                                                    rank: { type: "integer" },
                                                                    spam_score: { type: "integer" },
                                                                    broken_backlinks: { type: "integer" },
                                                                    broken_pages: { type: "integer" },
                                                                    first_seen: { type: "string" },
                                                                    last_seen: { type: "string" }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic",
                    description: "DataForSEO API Basis Authentifizierung"
                }
            }
        },
        security: [
            {
                basicAuth: []
            }
        ]
    }
};
