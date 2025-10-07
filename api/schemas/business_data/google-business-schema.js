// Google Business API - Google Business Data
import { getDataForSEOAuthHeader } from "../envs";
export const GoogleBusinessApis = [
    {
        id: "dataforseo-google-business",
        name: "Google Business API",
        description: "Google Business Data mit 4 APIs für Locations, Languages und My Business Info. Spezialisiert für Google Business Profile und Standort-bezogene Geschäftsdaten.",
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
                title: "DataForSEO Google Business API - Google Business Data",
                description: "4 APIs für Google Business Profile mit Standorten, Sprachen und detaillierten Geschäftsinformationen für lokale SEO-Analyse.",
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
                "/business_data_google_locations": {
                    get: {
                        summary: "Google Business Locations",
                        description: "Liste aller verfügbaren Google Business Standorte",
                        operationId: "googleBusinessLocations",
                        tags: ["Google Business - Locations"]
                    }
                },
                "/business_data_google_locations_country": {
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
                "/business_data_google_my_business_info_live": {
                    post: {
                        summary: "Google My Business Info",
                        description: "Detaillierte Informationen zu einem Google Business Profil",
                        operationId: "googleMyBusinessInfo",
                        tags: ["Google Business - Data"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
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
