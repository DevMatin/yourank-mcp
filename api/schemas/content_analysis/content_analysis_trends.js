import { getDataForSEOAuthHeader } from "../envs";
export const ContentAnalysisTrendsApis = [
    {
        id: "dataforseo-content-analysis-trends",
        name: "Content Analysis Trends API",
        description: "Spezialisierte Content Analysis APIs mit 2 verschiedenen Endpunkten für Phrase-Trends und Kategorie-Trends. Optimiert für zeitbasierte Trend-Analysen.",
        category: "Content Analysis Trends",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Content Analysis Trends API",
                description: "2 APIs für Content Analysis Trend-Analysen - Phrase-Trends und Kategorie-Trends. Optimiert für zeitbasierte Analyse von Zitationen.",
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
                "/v3/content_analysis/phrase_trends/live": {
                    post: {
                        tags: ["ContentAnalysisTrends"],
                        summary: "Content Analysis Phrase Trends Live",
                        description: "Data on all citations of the target keyword for the indicated date range",
                        operationId: "contentAnalysisPhraseTrendsLive",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                keyword: {
                                                    type: "string",
                                                    description: "Target keyword"
                                                },
                                                date_from: {
                                                    type: "string",
                                                    description: "Starting date of the time range"
                                                },
                                                date_to: {
                                                    type: "string",
                                                    description: "Ending date of the time range"
                                                },
                                                date_group: {
                                                    type: "string",
                                                    description: "Time range for grouping results (day, week, month)"
                                                },
                                                search_mode: {
                                                    type: "string",
                                                    description: "Results grouping type"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        responses: {
                            "200": {
                                description: "Successful operation",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/content_analysis/category_trends/live": {
                    post: {
                        tags: ["ContentAnalysisTrends"],
                        summary: "Content Analysis Category Trends Live",
                        description: "Data on all citations in the target category for the indicated date range",
                        operationId: "contentAnalysisCategoryTrendsLive",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                category_code: {
                                                    type: "string",
                                                    description: "Target category code"
                                                },
                                                date_from: {
                                                    type: "string",
                                                    description: "Starting date of the time range"
                                                },
                                                date_to: {
                                                    type: "string",
                                                    description: "Ending date of the time range"
                                                },
                                                date_group: {
                                                    type: "string",
                                                    description: "Time range for grouping results (day, week, month)"
                                                },
                                                search_mode: {
                                                    type: "string",
                                                    description: "Results grouping type"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        responses: {
                            "200": {
                                description: "Successful operation",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object"
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
];
