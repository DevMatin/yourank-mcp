import { getDataForSEOAuthHeader } from "../envs";
export const ContentAnalysisBaseApis = [
    {
        id: "dataforseo-content-analysis-base",
        name: "Content Analysis Base API",
        description: "Grundlegende Content Analysis APIs mit 5 verschiedenen Endpunkten für ID-Listen, Filter, Standorte, Sprachen und Kategorien. Optimiert für Basiskonfiguration und Metadaten.",
        category: "Content Analysis Base",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Content Analysis Base API",
                description: "5 APIs für grundlegende Content Analysis Funktionen - ID-Listen, Filter, Standorte, Sprachen und Kategorien. Optimiert für Basiskonfiguration und Metadaten.",
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
                "/v3/content_analysis/id_list": {
                    post: {
                        tags: ["ContentAnalysisBase"],
                        summary: "Content Analysis ID List",
                        description: "Provides list of IDs and metadata of completed Content Analysis tasks",
                        operationId: "contentAnalysisIdList",
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
                                                    description: "Start time for filtering results"
                                                },
                                                datetime_to: {
                                                    type: "string",
                                                    description: "Finish time for filtering results"
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
                "/v3/content_analysis/available_filters": {
                    get: {
                        tags: ["ContentAnalysisBase"],
                        summary: "Content Analysis Available Filters",
                        description: "Information about filters for Content Analysis API endpoints",
                        operationId: "contentAnalysisAvailableFilters",
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
                "/v3/content_analysis/locations": {
                    get: {
                        tags: ["ContentAnalysisBase"],
                        summary: "Content Analysis Locations",
                        description: "List of available locations for Content Analysis",
                        operationId: "contentAnalysisLocations",
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
                "/v3/content_analysis/languages": {
                    get: {
                        tags: ["ContentAnalysisBase"],
                        summary: "Content Analysis Languages",
                        description: "List of available languages for Content Analysis",
                        operationId: "contentAnalysisLanguages",
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
                "/v3/content_analysis/categories": {
                    get: {
                        tags: ["ContentAnalysisBase"],
                        summary: "Content Analysis Categories",
                        description: "List of available categories for Content Analysis",
                        operationId: "contentAnalysisCategories",
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
