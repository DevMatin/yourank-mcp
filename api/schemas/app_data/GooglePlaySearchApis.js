import { getDataForSEOAuthHeader } from "../envs";
export const GooglePlaySearchApis = [
    {
        id: "dataforseo-google-play-search",
        name: "Google Play Search API",
        description: "Spezialisierte Google Play App-Suche mit 10 verschiedenen APIs: App-Searches, App-Listings, Kategorien, Locations und Languages. Optimiert für mobile App-Recherche und Marktanalyse.",
        category: "App Data - Google Search",
        icon: "🔍",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO App Data API - Google Play Search",
                description: "10 APIs für Google Play App-Suche: App Searches, App Listings, Kategorien, Locations und Languages. Optimiert für mobile App-Marktanalyse und Keyword-Recherche.",
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
                "/google_play_search_live_advanced": {
                    post: {
                        summary: "Google Play App-Suche (Live Advanced)",
                        description: "Liefert Apps, die im Google Play Store für ein bestimmtes Keyword ranken",
                        operationId: "googlePlaySearchLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            keyword: {
                                                type: "string",
                                                description: "Suchbegriff (bis zu 700 Zeichen)",
                                                example: "vpn"
                                            },
                                            location_name: {
                                                type: "string",
                                                description: "Vollständiger Name des Standorts",
                                                example: "West Los Angeles,California,United States"
                                            },
                                            location_code: {
                                                type: "integer",
                                                description: "Standort-Code",
                                                example: 2840
                                            },
                                            language_name: {
                                                type: "string",
                                                description: "Vollständiger Name der Sprache",
                                                example: "English"
                                            },
                                            language_code: {
                                                type: "string",
                                                description: "Sprach-Code",
                                                example: "en"
                                            },
                                            priority: {
                                                type: "integer",
                                                description: "Task-Priorität (1=normal, 2=hoch)",
                                                enum: [1, 2],
                                                default: 1
                                            },
                                            depth: {
                                                type: "integer",
                                                description: "Anzahl der Ergebnisse (Standard: 30, Maximum: 200)",
                                                default: 30,
                                                maximum: 200
                                            },
                                            tag: {
                                                type: "string",
                                                description: "Benutzerdefinierte Task-ID (max 255 Zeichen)"
                                            }
                                        },
                                        required: ["keyword"]
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
                                                            id: { type: "string" },
                                                            status_code: { type: "integer" },
                                                            status_message: { type: "string" },
                                                            time: { type: "string" },
                                                            cost: { type: "number" },
                                                            result_count: { type: "integer" },
                                                            path: { type: "array" },
                                                            data: { type: "object" },
                                                            result: {
                                                                type: "array",
                                                                items: {
                                                                    type: "object",
                                                                    properties: {
                                                                        keyword: { type: "string" },
                                                                        se_domain: { type: "string" },
                                                                        location_code: { type: "integer" },
                                                                        language_code: { type: "string" },
                                                                        check_url: { type: "string" },
                                                                        datetime: { type: "string" },
                                                                        title: { type: "string" },
                                                                        se_results_count: { type: "integer" },
                                                                        items_count: { type: "integer" },
                                                                        items: {
                                                                            type: "array",
                                                                            items: {
                                                                                type: "object",
                                                                                properties: {
                                                                                    type: { type: "string" },
                                                                                    rank_group: { type: "integer" },
                                                                                    rank_absolute: { type: "integer" },
                                                                                    position: { type: "string" },
                                                                                    app_id: { type: "string" },
                                                                                    title: { type: "string" },
                                                                                    url: { type: "string" },
                                                                                    icon: { type: "string" },
                                                                                    description: { type: "string" },
                                                                                    reviews_count: { type: "integer" },
                                                                                    rating: {
                                                                                        type: "object",
                                                                                        properties: {
                                                                                            rating_type: { type: "string" },
                                                                                            value: { type: "number" },
                                                                                            votes_count: { type: "integer" },
                                                                                            rating_max: { type: "integer" }
                                                                                        }
                                                                                    },
                                                                                    price: {
                                                                                        type: "object",
                                                                                        properties: {
                                                                                            current: { type: "number" },
                                                                                            regular: { type: "number" },
                                                                                            max_value: { type: "number" },
                                                                                            currency: { type: "string" },
                                                                                            is_price_range: { type: "boolean" },
                                                                                            displayed_price: { type: "string" }
                                                                                        }
                                                                                    },
                                                                                    is_free: { type: "boolean" },
                                                                                    main_category: { type: "string" },
                                                                                    installs: { type: "string" },
                                                                                    developer: { type: "string" },
                                                                                    developer_id: { type: "string" },
                                                                                    developer_url: { type: "string" },
                                                                                    developer_email: { type: "string" },
                                                                                    content_rating: { type: "string" },
                                                                                    screenshot: { type: "array", items: { type: "string" } }
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
    }
];
