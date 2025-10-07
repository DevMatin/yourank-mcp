import { getDataForSEOAuthHeader } from "../envs";
export const DomainAnalyticsWhoisApis = [
    {
        id: "dataforseo-domain-analytics-whois",
        name: "Domain Analytics WHOIS API",
        description: "Spezialisierte WHOIS-Analyse mit 2 verschiedenen APIs für Domain-Registrierungsdaten und Filter-Informationen. Optimiert für bessere Performance durch Trennung von der Haupt-Domain Analytics API.",
        category: "Domain Analytics WHOIS",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Domain Analytics - WHOIS API",
                description: "2 APIs für WHOIS-Analyse: Available Filters und Overview Live für Domain-Registrierungsdaten mit Backlink Stats und Ranking Informationen. Optimiert für bessere Performance durch Trennung von der Haupt-Domain Analytics API.",
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
                "/v3/domain_analytics/whois/available_filters": {
                    get: {
                        tags: ["DomainAnalyticsWhois"],
                        description: "Here you will find all the necessary information about filters that can be used with Domain Analytics Whois API.",
                        operationId: "WhoisAvailableFilters",
                        responses: {
                            "200": {
                                description: "Successful operation"
                            }
                        }
                    }
                },
                "/v3/domain_analytics/whois/overview/live": {
                    post: {
                        tags: ["DomainAnalyticsWhois"],
                        description: "This endpoint will provide you with Whois data enriched with backlink stats, and ranking and traffic info from organic and paid search results.",
                        operationId: "WhoisOverviewLive",
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
                                                    description: "maximum number of returned domains"
                                                },
                                                offset: {
                                                    type: "integer",
                                                    description: "offset in the results array"
                                                },
                                                filters: {
                                                    type: "array",
                                                    items: {
                                                        type: "object"
                                                    },
                                                    description: "array of results filtering parameters"
                                                },
                                                order_by: {
                                                    type: "array",
                                                    items: {
                                                        type: "string"
                                                    },
                                                    description: "results sorting rules"
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
];
