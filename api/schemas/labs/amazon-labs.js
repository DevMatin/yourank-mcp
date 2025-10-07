import { getDataForSEOAuthHeader } from "../envs";
export const AmazonLabsApis = [
    {
        id: "dataforseo-amazon-labs",
        name: "Amazon Labs API",
        description: "Spezialisierte Amazon-Analyse mit 5 verschiedenen APIs für Amazon Marketplace, Produkt-Keywords und Konkurrenz-Analysen. Optimiert für Amazon SEO.",
        category: "Amazon Labs",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Amazon Labs API - Vollständige Amazon-Analyse",
                description: "5 APIs für Amazon Keywords, Produkt-Analysen, Ranking-Daten und Konkurrenz-Analysen. Spezialisiert auf Amazon Marketplace Optimization.",
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
                "/v3/dataforseo_labs/amazon/bulk_search_volume/live": {
                    post: {
                        tags: ["AmazonLabs"],
                        summary: "Amazon Suchvolumen",
                        description: "Suchvolumen-Daten für bis zu 1.000 Keywords in Amazon",
                        operationId: "AmazonBulkSearchVolumeLive",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                keywords: {
                                                    type: "array",
                                                    items: { type: "string" },
                                                    description: "Array of keywords (max 1000)"
                                                },
                                                location_code: { type: "number", description: "Location code" },
                                                language_code: { type: "string", description: "Language code" }
                                            },
                                            required: ["keywords"]
                                        }
                                    }
                                }
                            }
                        },
                        responses: {
                            "200": {
                                description: "Successful response",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
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
                                                                        keyword: { type: "string" },
                                                                        search_volume: { type: "number" }
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
                "/v3/dataforseo_labs/amazon/ranked_keywords/live": {
                    post: {
                        tags: ["AmazonLabs"],
                        summary: "Amazon Ranking Keywords",
                        description: "Keywords für die ein Produkt/Domain in Amazon rankt",
                        operationId: "AmazonRankedKeywordsLive"
                    }
                },
                "/v3/dataforseo_labs/amazon/product_rank_overview/live": {
                    post: {
                        tags: ["AmazonLabs"],
                        summary: "Amazon Produkt-Ranking",
                        description: "Ranking- und Traffic-Daten für Amazon-Produkte",
                        operationId: "AmazonProductRankOverviewLive"
                    }
                },
                "/v3/dataforseo_labs/amazon/product_competitors/live": {
                    post: {
                        tags: ["AmazonLabs"],
                        summary: "Amazon Produkt-Konkurrenten",
                        description: "Konkurrenz-Produkte mit Ranking-Keywords und Priority Score",
                        operationId: "AmazonProductCompetitorsLive"
                    }
                },
                "/v3/dataforseo_labs/amazon/product_keyword_intersections/live": {
                    post: {
                        tags: ["AmazonLabs"],
                        summary: "Amazon Keyword-Überschneidungen",
                        description: "Keywords für die mehrere Produkte gleichzeitig ranken",
                        operationId: "AmazonProductKeywordIntersectionsLive"
                    }
                }
            },
            components: {
                securitySchemes: {
                    basicAuth: {
                        type: "http",
                        scheme: "basic"
                    }
                }
            },
            security: [
                {
                    basicAuth: []
                }
            ]
        }
    }
];
