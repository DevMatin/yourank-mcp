// Business Data General Schema - Alle Business Data APIs
import { getDataForSEOAuthHeader } from "../envs";
// Alle Business Data APIs zusammenfassen
export const AllBusinessDataApis = [
    // Business Data Core APIs
    {
        id: "dataforseo-business-data-core",
        name: "Business Data Core API",
        description: "Kern-APIs für Business Data mit Task-Management, Error-Handling und allgemeinen Business-Informationen.",
        category: "Business Data Core",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Business Data Core API",
                description: "Kern-APIs für Business Data mit Task-Management, Error-Handling und allgemeinen Business-Informationen.",
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
                "/v3/business_data/id_list": {
                    post: {
                        summary: "Business Data ID List",
                        description: "Liste aller abgeschlossenen Business Data Tasks",
                        operationId: "businessDataIdList",
                        tags: ["Business Data Core - Management"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                date_from: { type: "string", description: "Start-Datum (YYYY-MM-DD)" },
                                                date_to: { type: "string", description: "End-Datum (YYYY-MM-DD)" },
                                                limit: { type: "integer", description: "Anzahl Ergebnisse", maximum: 1000 }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/errors": {
                    post: {
                        summary: "Business Data Errors",
                        description: "Business Data API Tasks die einen Fehler zurückgegeben haben",
                        operationId: "businessDataErrors",
                        tags: ["Business Data Core - Error Handling"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                date_from: { type: "string", description: "Start-Datum (YYYY-MM-DD)" },
                                                date_to: { type: "string", description: "End-Datum (YYYY-MM-DD)" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/tasks_ready": {
                    get: {
                        summary: "Business Data Tasks Ready",
                        description: "Liste aller abgeschlossenen Business Data Tasks",
                        operationId: "businessDataTasksReady",
                        tags: ["Business Data Core - Task Management"]
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
            security: [{ basicAuth: [] }]
        }
    },
    // Business Listings APIs
    {
        id: "dataforseo-business-listings",
        name: "Business Listings API",
        description: "Business Listings APIs für lokale Business-Suche, Kategorien und Standorte.",
        category: "Business Listings",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Business Listings API",
                description: "Business Listings APIs für lokale Business-Suche, Kategorien und Standorte.",
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
                "/v3/business_data/business_listings/locations": {
                    get: {
                        summary: "Business Listings Locations",
                        description: "Liste aller verfügbaren Standorte für Business Listings",
                        operationId: "businessListingsLocations",
                        tags: ["Business Listings - Locations"]
                    }
                },
                "/v3/business_data/business_listings/categories": {
                    get: {
                        summary: "Business Listings Categories",
                        description: "Top-Kategorien nach Business-Anzahl",
                        operationId: "businessListingsCategories",
                        tags: ["Business Listings - Categories"]
                    }
                },
                "/v3/business_data/business_listings/available_filters": {
                    get: {
                        summary: "Business Listings Available Filters",
                        description: "Verfügbare Filter für Business Listings API",
                        operationId: "businessListingsAvailableFilters",
                        tags: ["Business Listings - Filters"]
                    }
                },
                "/v3/business_data/business_listings/search/live": {
                    post: {
                        summary: "Business Listings Search Live",
                        description: "Live-Suche nach Business-Entitäten auf Google Maps",
                        operationId: "businessListingsSearchLive",
                        tags: ["Business Listings - Search"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                keyword: { type: "string", description: "Suchbegriff" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                category_code: { type: "integer", description: "Kategorie-Code" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/business_listings/categories_aggregation/live": {
                    post: {
                        summary: "Business Listings Categories Aggregation",
                        description: "Kategorien-Aggregation mit Anzahl der Entitäten",
                        operationId: "businessListingsCategoriesAggregation",
                        tags: ["Business Listings - Categories"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                location_code: { type: "integer", description: "Standort-Code" }
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
                        scheme: "basic"
                    }
                }
            },
            security: [{ basicAuth: [] }]
        }
    },
    // Google Business APIs
    {
        id: "dataforseo-google-business",
        name: "Google Business API",
        description: "Google Business Data mit APIs für Locations, Languages, My Business Info, Updates, Hotel-Suche und Reviews.",
        category: "Google Business",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Google Business API",
                description: "Google Business Data mit APIs für Locations, Languages, My Business Info, Updates, Hotel-Suche und Reviews.",
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
                "/v3/business_data/google/locations": {
                    get: {
                        summary: "Google Business Locations",
                        description: "Liste aller verfügbaren Google Business Standorte",
                        operationId: "googleBusinessLocations",
                        tags: ["Google Business - Locations"]
                    }
                },
                "/v3/business_data/google/locations/{country}": {
                    get: {
                        summary: "Google Business Locations by Country",
                        description: "Google Business Standorte gefiltert nach Land",
                        operationId: "googleBusinessLocationsCountry",
                        tags: ["Google Business - Locations"],
                        parameters: [
                            {
                                name: "country",
                                in: "path",
                                required: true,
                                schema: { type: "string" },
                                description: "ISO Land-Code (z.B. 'de', 'us')"
                            }
                        ]
                    }
                },
                "/v3/business_data/google/languages": {
                    get: {
                        summary: "Google Business Languages",
                        description: "Liste aller verfügbaren Sprachen für Google Business",
                        operationId: "googleBusinessLanguages",
                        tags: ["Google Business - Languages"]
                    }
                },
                "/v3/business_data/google/my_business_info/live": {
                    post: {
                        summary: "Google My Business Info Live",
                        description: "Detaillierte Informationen zu einem Google Business Profil",
                        operationId: "googleMyBusinessInfoLive",
                        tags: ["Google Business - My Business Info"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["business_name", "location_code"],
                                            properties: {
                                                business_name: { type: "string", description: "Name des Geschäfts" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                language_code: { type: "string", description: "Sprach-Code" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/google/my_business_updates/live": {
                    post: {
                        summary: "Google My Business Updates Live",
                        description: "Aktualisierungen und Änderungen an Google Business Profilen",
                        operationId: "googleMyBusinessUpdatesLive",
                        tags: ["Google Business - Updates"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["business_name", "location_code"],
                                            properties: {
                                                business_name: { type: "string", description: "Name des Geschäfts" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                language_code: { type: "string", description: "Sprach-Code" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/google/hotel_searches/live": {
                    post: {
                        summary: "Google Hotel Searches Live",
                        description: "Hotel-Suche auf Google mit detaillierten Hotel-Informationen",
                        operationId: "googleHotelSearchesLive",
                        tags: ["Google Business - Hotel Searches"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["keyword", "location_code"],
                                            properties: {
                                                keyword: { type: "string", description: "Hotel-Suchbegriff" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                check_in: { type: "string", description: "Check-in Datum (YYYY-MM-DD)" },
                                                check_out: { type: "string", description: "Check-out Datum (YYYY-MM-DD)" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/google/hotel_info/live/advanced": {
                    post: {
                        summary: "Google Hotel Info Live Advanced",
                        description: "Erweiterte Hotel-Informationen von Google Hotels",
                        operationId: "googleHotelInfoLiveAdvanced",
                        tags: ["Google Business - Hotel Info"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["hotel_identifier"],
                                            properties: {
                                                hotel_identifier: { type: "string", description: "Hotel-Identifier" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                language_code: { type: "string", description: "Sprach-Code" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/google/reviews/live": {
                    post: {
                        summary: "Google Reviews Live",
                        description: "Google-Bewertungen für ein spezifisches Business",
                        operationId: "googleReviewsLive",
                        tags: ["Google Business - Reviews"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["business_name", "location_code"],
                                            properties: {
                                                business_name: { type: "string", description: "Name des Geschäfts" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                language_code: { type: "string", description: "Sprach-Code" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/google/extended_reviews/live": {
                    post: {
                        summary: "Google Extended Reviews Live",
                        description: "Erweiterte Reviews von Google und anderen Quellen",
                        operationId: "googleExtendedReviewsLive",
                        tags: ["Google Business - Extended Reviews"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["business_name", "location_code"],
                                            properties: {
                                                business_name: { type: "string", description: "Name des Geschäfts" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                language_code: { type: "string", description: "Sprach-Code" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/google/questions_and_answers/live": {
                    post: {
                        summary: "Google Questions and Answers Live",
                        description: "Fragen und Antworten zu Google Business Profilen",
                        operationId: "googleQuestionsAndAnswersLive",
                        tags: ["Google Business - Q&A"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["business_name", "location_code"],
                                            properties: {
                                                business_name: { type: "string", description: "Name des Geschäfts" },
                                                location_code: { type: "integer", description: "Standort-Code" },
                                                language_code: { type: "string", description: "Sprach-Code" }
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
                        scheme: "basic"
                    }
                }
            },
            security: [{ basicAuth: [] }]
        }
    },
    // Social Media APIs
    {
        id: "dataforseo-social-media",
        name: "Social Media API",
        description: "Social Media Analytics mit APIs für Pinterest, Facebook und Reddit. Analysiert Social Shares, Likes und Community-Engagement.",
        category: "Social Media",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Social Media API",
                description: "Social Media Analytics mit APIs für Pinterest, Facebook und Reddit. Analysiert Social Shares, Likes und Community-Engagement.",
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
                "/v3/business_data/social_media/pinterest/live": {
                    post: {
                        summary: "Pinterest Analytics Live",
                        description: "Anzahl Pinterest-Pins und Shares für spezifische URLs",
                        operationId: "socialMediaPinterestLive",
                        tags: ["Social Media - Pinterest"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["targets"],
                                            properties: {
                                                targets: {
                                                    type: "array",
                                                    description: "Liste der zu analysierenden URLs",
                                                    items: { type: "string" },
                                                    maxItems: 100
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/social_media/facebook/live": {
                    post: {
                        summary: "Facebook Analytics Live",
                        description: "Anzahl Facebook-Likes für spezifische URLs über Like-Button",
                        operationId: "socialMediaFacebookLive",
                        tags: ["Social Media - Facebook"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["targets"],
                                            properties: {
                                                targets: {
                                                    type: "array",
                                                    description: "Liste der zu analysierenden URLs",
                                                    items: { type: "string" },
                                                    maxItems: 100
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/social_media/reddit/live": {
                    post: {
                        summary: "Reddit Analytics Live",
                        description: "Reddit-Shares mit Subreddit-Info und Community-Daten",
                        operationId: "socialMediaRedditLive",
                        tags: ["Social Media - Reddit"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["targets"],
                                            properties: {
                                                targets: {
                                                    type: "array",
                                                    description: "Liste der zu analysierenden URLs",
                                                    items: { type: "string" },
                                                    maxItems: 100
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
                        scheme: "basic"
                    }
                }
            },
            security: [{ basicAuth: [] }]
        }
    },
    // TripAdvisor APIs
    {
        id: "dataforseo-tripadvisor",
        name: "TripAdvisor API",
        description: "TripAdvisor Business Data mit APIs für Locations, Languages, Search und Reviews. Hotel- und Restaurant-Bewertungen.",
        category: "TripAdvisor",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO TripAdvisor API",
                description: "TripAdvisor Business Data mit APIs für Locations, Languages, Search und Reviews. Hotel- und Restaurant-Bewertungen.",
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
                "/v3/business_data/tripadvisor/locations": {
                    get: {
                        summary: "TripAdvisor Locations",
                        description: "Liste aller verfügbaren TripAdvisor Standorte",
                        operationId: "tripadvisorLocations",
                        tags: ["TripAdvisor - Locations"]
                    }
                },
                "/v3/business_data/tripadvisor/locations/{country}": {
                    get: {
                        summary: "TripAdvisor Locations by Country",
                        description: "TripAdvisor Standorte gefiltert nach Land",
                        operationId: "tripadvisorLocationsCountry",
                        tags: ["TripAdvisor - Locations"],
                        parameters: [
                            {
                                name: "country",
                                in: "path",
                                required: true,
                                schema: { type: "string" },
                                description: "ISO Land-Code (z.B. 'de', 'us')"
                            }
                        ]
                    }
                },
                "/v3/business_data/tripadvisor/languages": {
                    get: {
                        summary: "TripAdvisor Languages",
                        description: "Liste aller verfügbaren Sprachen für TripAdvisor",
                        operationId: "tripadvisorLanguages",
                        tags: ["TripAdvisor - Languages"]
                    }
                },
                "/v3/business_data/tripadvisor/search/live": {
                    post: {
                        summary: "TripAdvisor Search Live",
                        description: "Live-Suche nach Business-Profilen auf TripAdvisor",
                        operationId: "tripadvisorSearchLive",
                        tags: ["TripAdvisor - Search"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["keyword", "location_code"],
                                            properties: {
                                                keyword: { type: "string", description: "Suchbegriff" },
                                                location_code: { type: "integer", description: "Standort-Code" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/tripadvisor/reviews/live": {
                    post: {
                        summary: "TripAdvisor Reviews Live",
                        description: "TripAdvisor-Bewertungen für Hotels und Restaurants",
                        operationId: "tripadvisorReviewsLive",
                        tags: ["TripAdvisor - Reviews"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["business_name", "location_code"],
                                            properties: {
                                                business_name: { type: "string", description: "Name des Geschäfts" },
                                                location_code: { type: "integer", description: "Standort-Code" }
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
                        scheme: "basic"
                    }
                }
            },
            security: [{ basicAuth: [] }]
        }
    },
    // Trustpilot APIs
    {
        id: "dataforseo-trustpilot",
        name: "Trustpilot API",
        description: "Trustpilot Business Data mit APIs für Search und Reviews. Kundenbewertungen und Vertrauens-Scores.",
        category: "Trustpilot",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Trustpilot API",
                description: "Trustpilot Business Data mit APIs für Search und Reviews. Kundenbewertungen und Vertrauens-Scores.",
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
                "/v3/business_data/trustpilot/search/live": {
                    post: {
                        summary: "Trustpilot Search Live",
                        description: "Live-Suche nach Business-Profilen auf Trustpilot",
                        operationId: "trustpilotSearchLive",
                        tags: ["Trustpilot - Search"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["keyword"],
                                            properties: {
                                                keyword: { type: "string", description: "Suchbegriff" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/business_data/trustpilot/reviews/live": {
                    post: {
                        summary: "Trustpilot Reviews Live",
                        description: "Trustpilot-Bewertungen und Vertrauens-Scores für Businesses",
                        operationId: "trustpilotReviewsLive",
                        tags: ["Trustpilot - Reviews"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["business_name"],
                                            properties: {
                                                business_name: { type: "string", description: "Name des Geschäfts" }
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
                        scheme: "basic"
                    }
                }
            },
            security: [{ basicAuth: [] }]
        }
    }
];
// Export aller Business Data APIs
export const BusinessDataApis = AllBusinessDataApis;
// Export nach Kategorien gruppiert
export const BusinessDataApisByCategory = {
    "Business Data Core": AllBusinessDataApis.filter(api => api.category === "Business Data Core"),
    "Business Listings": AllBusinessDataApis.filter(api => api.category === "Business Listings"),
    "Google Business": AllBusinessDataApis.filter(api => api.category === "Google Business"),
    "Social Media": AllBusinessDataApis.filter(api => api.category === "Social Media"),
    "TripAdvisor": AllBusinessDataApis.filter(api => api.category === "TripAdvisor"),
    "Trustpilot": AllBusinessDataApis.filter(api => api.category === "Trustpilot")
};
// Export der Gesamtübersicht
export const BusinessDataOverview = {
    totalApis: AllBusinessDataApis.length,
    categories: Object.keys(BusinessDataApisByCategory),
    description: "Umfassende Business Data APIs für lokale SEO, Social Media Analytics, Business Reviews und lokale Business-Informationen mit korrekten v3 API-Endpunkten",
    version: "v1.0.0",
    totalEndpoints: 25,
    apiVersion: "v3"
};
