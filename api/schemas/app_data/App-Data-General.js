import { getDataForSEOAuthHeader } from "../envs";
export const AppDataGeneralSchemaComplete = [
    {
        id: "dataforseo-app-data-general-complete",
        name: "App Data General API - Vollständige App Data Funktionen",
        description: "Vollständige App Data API mit allen 13 Endpunkten: Core APIs (3), Apple Store Data & Search (5), Google Play Data & Search (5). Professionelle mobile App-Marktanalyse und App-Intelligence für iOS und Android Ökosystem mit korrekten DataForSEO API-Pfaden.",
        category: "App Data - Complete",
        icon: "📱🔍📊🍎🤖",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO App Data API - Vollständiges Schema",
                description: "Vollständige API für alle App Data Funktionen mit 13 spezialisierten Endpunkten: Core APIs (3), Apple Store Data & Search (5), Google Play Data & Search (5). Professionell optimiert für mobile App-Marktanalyse und App-Intelligence mit korrekten DataForSEO API-Pfaden.",
                version: "v1.1.0",
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
                // ===== CORE APIs =====
                "/v3/app_data/id_list": {
                    post: {
                        tags: ["Core"],
                        summary: "App Data Task IDs abrufen",
                        description: "Liefert eine Liste aller App Data Task IDs während des angegebenen Zeitraums",
                        operationId: "appDataIdList",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            datetime_from: {
                                                type: "string",
                                                description: "Startzeit für Filterung (UTC Format: yyyy-mm-dd hh-mm-ss +00:00)",
                                                example: "2023-01-15 12:57:46 +00:00"
                                            },
                                            datetime_to: {
                                                type: "string",
                                                description: "Endzeit für Filterung (UTC Format: yyyy-mm-dd hh-mm-ss +00:00)",
                                                example: "2023-01-31 13:57:46 +00:00"
                                            },
                                            limit: {
                                                type: "integer",
                                                description: "Maximale Anzahl zurückgegebener Task IDs (Standard: 1000, Maximum: 1000)",
                                                default: 1000
                                            },
                                            offset: {
                                                type: "integer",
                                                description: "Offset in der Ergebnisliste (Standard: 0)",
                                                default: 0
                                            },
                                            sort: {
                                                type: "string",
                                                description: "Sortierung nach Ausführungszeit (asc/desc, Standard: asc)",
                                                enum: ["asc", "desc"],
                                                default: "asc"
                                            },
                                            include_metadata: {
                                                type: "boolean",
                                                description: "Task Metadata in Antwort einschließen (Standard: false)",
                                                default: false
                                            }
                                        },
                                        required: ["datetime_from", "datetime_to"]
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
                                            $ref: "#/components/schemas/StandardTaskResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/errors": {
                    post: {
                        tags: ["Core"],
                        summary: "App Data API Fehler abrufen",
                        description: "Liefert Informationen über App Data API Tasks, die einen Fehler zurückgegeben haben (letzte 7 Tage)",
                        operationId: "appDataErrors",
                        requestBody: {
                            required: false,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            limit: {
                                                type: "integer",
                                                description: "Maximale Anzahl zurückgegebener Fehler-Tasks (Standard: 1000, Maximum: 1000)",
                                                default: 1000
                                            },
                                            offset: {
                                                type: "integer",
                                                description: "Offset in der Ergebnisliste (Standard: 0)",
                                                default: 0
                                            },
                                            filtered_function: {
                                                type: "string",
                                                description: "Filterung nach bestimmter Funktion"
                                            },
                                            datetime_from: {
                                                type: "string",
                                                description: "Startzeit für Filterung innerhalb der letzten 7 Tage (UTC Format)"
                                            },
                                            datetime_to: {
                                                type: "string",
                                                description: "Endzeit für Filterung innerhalb der letzten 7 Tage (UTC Format)"
                                            }
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
                                            $ref: "#/components/schemas/ErrorTaskResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/tasks_ready": {
                    get: {
                        tags: ["Core"],
                        summary: "Bereite App Data Tasks abrufen",
                        description: "Liefert eine Liste abgeschlossener Tasks, die noch nicht abgeholt wurden",
                        operationId: "appDataTasksReady",
                        responses: {
                            "200": {
                                description: "Erfolgreiche Operation",
                                content: {
                                    "application/json": {
                                        schema: {
                                            $ref: "#/components/schemas/ReadyTaskResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                // ===== APPLE STORE DATA APIs =====
                "/v3/app_data/apple/app_info/task_post": {
                    post: {
                        tags: ["Apple Store Data"],
                        summary: "Apple App Store App-Informationen (Live Advanced)",
                        description: "Liefert detaillierte Informationen über eine spezifische Apple App Store App",
                        operationId: "appleStoreDataInfoLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppInfoRequest"
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
                                            $ref: "#/components/schemas/AppInfoResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/apple/app_info/task_post/advanced": {
                    post: {
                        tags: ["Apple Store Data"],
                        summary: "Apple App Store App-Informationen (Advanced)",
                        description: "Liefert erweiterte detaillierte Informationen über eine spezifische Apple App Store App",
                        operationId: "appleStoreDataAppInfoLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppInfoRequest"
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
                                            $ref: "#/components/schemas/AppInfoResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/apple/app_reviews/task_post": {
                    post: {
                        tags: ["Apple Store Data"],
                        summary: "Apple App Store Bewertungen (Live Advanced)",
                        description: "Liefert Bewertungen für eine spezifische Apple App Store App",
                        operationId: "appleStoreDataReviewsLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppReviewsRequest"
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
                                            $ref: "#/components/schemas/AppReviewsResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/apple/app_searches/task_post": {
                    post: {
                        tags: ["Apple Store Data"],
                        summary: "Apple Store App-Suchen (Advanced)",
                        description: "Liefert App-Suchdaten für eine spezifische Apple App Store App",
                        operationId: "appleStoreDataAppSearchesLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppSearchRequest"
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
                                            $ref: "#/components/schemas/AppSearchResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                // ===== APPLE STORE SEARCH APIs =====
                "/v3/app_data/apple/search/task_post": {
                    post: {
                        tags: ["Apple Store Search"],
                        summary: "Apple Store App-Suche (Live Advanced)",
                        description: "Liefert Apps, die im Apple App Store für ein bestimmtes Keyword ranken",
                        operationId: "appleStoreSearchLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SearchRequest"
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
                                            $ref: "#/components/schemas/SearchResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                // ===== GOOGLE PLAY DATA APIs =====
                "/v3/app_data/google/app_info/task_post": {
                    post: {
                        tags: ["Google Play Data"],
                        summary: "Google Play App-Informationen (Live Advanced)",
                        description: "Liefert detaillierte Informationen über eine spezifische Google Play App",
                        operationId: "googlePlayDataInfoLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppInfoRequest"
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
                                            $ref: "#/components/schemas/AppInfoResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/google/app_info/task_post/advanced": {
                    post: {
                        tags: ["Google Play Data"],
                        summary: "Google Play App-Informationen (Advanced)",
                        description: "Liefert erweiterte detaillierte Informationen über eine spezifische Google Play App",
                        operationId: "googlePlayDataAppInfoLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppInfoRequest"
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
                                            $ref: "#/components/schemas/AppInfoResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/google/app_reviews/task_post": {
                    post: {
                        tags: ["Google Play Data"],
                        summary: "Google Play App-Bewertungen (Live Advanced)",
                        description: "Liefert Bewertungen für eine spezifische Google Play App",
                        operationId: "googlePlayDataReviewsLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppReviewsRequest"
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
                                            $ref: "#/components/schemas/AppReviewsResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/app_data/google/app_searches/task_post": {
                    post: {
                        tags: ["Google Play Data"],
                        summary: "Google Play App-Suchen (Advanced)",
                        description: "Liefert App-Suchdaten für eine spezifische Google Play App",
                        operationId: "googlePlayDataAppSearchesLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AppSearchRequest"
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
                                            $ref: "#/components/schemas/AppSearchResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                // ===== GOOGLE PLAY SEARCH APIs =====
                "/v3/app_data/google/search/task_post": {
                    post: {
                        tags: ["Google Play Search"],
                        summary: "Google Play App-Suche (Live Advanced)",
                        description: "Liefert Apps, die im Google Play Store für ein bestimmtes Keyword ranken",
                        operationId: "googlePlaySearchLiveAdvanced",
                        requestBody: {
                            required: true,
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SearchRequest"
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
                                            $ref: "#/components/schemas/SearchResponse"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            components: {
                schemas: {
                    StandardTaskResponse: {
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
                                        result: { type: "array" }
                                    }
                                }
                            }
                        }
                    },
                    ErrorTaskResponse: {
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
                                                    id: { type: "string" },
                                                    datetime: { type: "string" },
                                                    function: { type: "string" },
                                                    error_code: { type: "integer" },
                                                    error_message: { type: "string" },
                                                    http_url: { type: "string" },
                                                    http_method: { type: "string" },
                                                    http_code: { type: "integer" },
                                                    http_time: { type: "number" },
                                                    http_response: { type: "string" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    ReadyTaskResponse: {
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
                                                    id: { type: "string" },
                                                    se: { type: "string" },
                                                    se_type: { type: "string" },
                                                    date_posted: { type: "string" },
                                                    tag: { type: "string" },
                                                    endpoint_advanced: { type: "string" },
                                                    endpoint_html: { type: "string" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    AppInfoRequest: {
                        type: "object",
                        properties: {
                            app_id: {
                                type: "string",
                                description: "App-ID der Store App",
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
                    },
                    AppInfoResponse: {
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
                    },
                    AppReviewsRequest: {
                        type: "object",
                        properties: {
                            app_id: {
                                type: "string",
                                description: "App-ID der Store App",
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
                    },
                    AppReviewsResponse: {
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
                                                                helpful_count: { type: "integer" },
                                                                title: { type: "string" },
                                                                review_text: { type: "string" },
                                                                user_profile: {
                                                                    type: "object",
                                                                    properties: {
                                                                        name: { type: "string" },
                                                                        url: { type: "string" },
                                                                        image_url: { type: "string" },
                                                                        reviews_count: { type: "integer" }
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
                    AppSearchRequest: {
                        type: "object",
                        properties: {
                            app_id: {
                                type: "string",
                                description: "App-ID der Store App",
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
                                description: "Anzahl der Ergebnisse (Standard: 30, Maximum: 200)",
                                default: 30,
                                maximum: 200
                            },
                            tag: {
                                type: "string",
                                description: "Benutzerdefinierte Task-ID (max 255 Zeichen)"
                            }
                        },
                        required: ["app_id"]
                    },
                    AppSearchResponse: {
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
                                                    keyword: { type: "string" },
                                                    se_domain: { type: "string" },
                                                    location_code: { type: "integer" },
                                                    language_code: { type: "string" },
                                                    check_url: { type: "string" },
                                                    datetime: { type: "string" },
                                                    title: { type: "string" },
                                                    se_results_count: { type: "integer" },
                                                    items_count: { type: "integer" },
                                                    items: { type: "array" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    SearchRequest: {
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
                    },
                    SearchResponse: {
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
                },
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
