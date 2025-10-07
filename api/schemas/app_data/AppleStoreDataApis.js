import { getDataForSEOAuthHeader } from "../envs";
export const AppleStoreDataApis = [
    {
        id: "dataforseo-apple-store-data",
        name: "Apple Store Data API",
        description: "Detaillierte Apple App Store Daten mit 9 verschiedenen APIs: App Info, App Reviews und App Lists. Umfassende Analyse von iOS App-Details, Bewertungen und Rankings.",
        category: "App Data - Apple Data",
        icon: "📱",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO App Data API - Apple Store Data",
                description: "9 APIs für detaillierte Apple App Store Daten: App Info, App Reviews und App Lists. Umfassende iOS App-Marktanalyse und App-Intelligence.",
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
                "/apple_store_data_info_live_advanced": {
                    post: {
                        summary: "Apple App Store App-Informationen (Live Advanced)",
                        description: "Liefert detaillierte Informationen über eine spezifische Apple App Store App",
                        operationId: "appleStoreDataInfoLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            app_id: {
                                                type: "string",
                                                description: "App-ID der Apple App Store App",
                                                example: "835599320"
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
                                            tag: {
                                                type: "string",
                                                description: "Benutzerdefinierte Task-ID (max 255 Zeichen)"
                                            }
                                        },
                                        required: ["app_id"]
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
                                                                        app_id: { type: "string" },
                                                                        se_domain: { type: "string" },
                                                                        location_code: { type: "integer" },
                                                                        language_code: { type: "string" },
                                                                        check_url: { type: "string" },
                                                                        datetime: { type: "string" },
                                                                        item: {
                                                                            type: "object",
                                                                            properties: {
                                                                                type: { type: "string" },
                                                                                app_id: { type: "string" },
                                                                                title: { type: "string" },
                                                                                url: { type: "string" },
                                                                                icon: { type: "string" },
                                                                                description: { type: "string" },
                                                                                genre: { type: "string" },
                                                                                genre_id: { type: "string" },
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
                                                                                developer: { type: "string" },
                                                                                developer_id: { type: "string" },
                                                                                developer_url: { type: "string" },
                                                                                content_rating: { type: "string" },
                                                                                release_date: { type: "string" },
                                                                                version: { type: "string" },
                                                                                version_history: { type: "array" },
                                                                                what_is_new: { type: "string" },
                                                                                images: { type: "array", items: { type: "string" } },
                                                                                videos: { type: "array", items: { type: "string" } }
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
                "/apple_store_data_reviews_live_advanced": {
                    post: {
                        summary: "Apple App Store Bewertungen (Live Advanced)",
                        description: "Liefert Bewertungen für eine spezifische Apple App Store App",
                        operationId: "appleStoreDataReviewsLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            app_id: {
                                                type: "string",
                                                description: "App-ID der Apple App Store App",
                                                example: "835599320"
                                            },
                                            location_code: {
                                                type: "integer",
                                                description: "Standort-Code",
                                                example: 2840
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
                                                description: "Anzahl der Bewertungen (Standard: 50, Maximum: 500)",
                                                default: 50,
                                                maximum: 500
                                            },
                                            sort_by: {
                                                type: "string",
                                                description: "Sortierung der Bewertungen",
                                                enum: ["most_recent", "most_helpful"],
                                                default: "most_helpful"
                                            },
                                            tag: {
                                                type: "string",
                                                description: "Benutzerdefinierte Task-ID (max 255 Zeichen)"
                                            }
                                        },
                                        required: ["app_id"]
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
                                                                        app_id: { type: "string" },
                                                                        se_domain: { type: "string" },
                                                                        location_code: { type: "integer" },
                                                                        language_code: { type: "string" },
                                                                        check_url: { type: "string" },
                                                                        datetime: { type: "string" },
                                                                        title: { type: "string" },
                                                                        rating: {
                                                                            type: "object",
                                                                            properties: {
                                                                                rating_type: { type: "string" },
                                                                                value: { type: "number" },
                                                                                votes_count: { type: "integer" },
                                                                                rating_max: { type: "integer" }
                                                                            }
                                                                        },
                                                                        reviews_count: { type: "integer" },
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
                                                                                    version: { type: "string" },
                                                                                    rating: {
                                                                                        type: "object",
                                                                                        properties: {
                                                                                            rating_type: { type: "string" },
                                                                                            value: { type: "number" },
                                                                                            votes_count: { type: "integer" },
                                                                                            rating_max: { type: "integer" }
                                                                                        }
                                                                                    },
                                                                                    timestamp: { type: "string" },
                                                                                    id: { type: "string" },
                                                                                    title: { type: "string" },
                                                                                    review_text: { type: "string" },
                                                                                    user_profile: {
                                                                                        type: "object",
                                                                                        properties: {
                                                                                            name: { type: "string" },
                                                                                            url: { type: "string" }
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
