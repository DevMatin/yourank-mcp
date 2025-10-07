// Social Media API - Social Media Analytics
import { getDataForSEOAuthHeader } from "../envs";
export const SocialMediaApis = [
    {
        id: "dataforseo-social-media",
        name: "Social Media API",
        description: "Social Media Analytics mit 3 APIs für Pinterest, Facebook und Reddit. Analysiert Social Shares, Likes und Community-Engagement für Content-Performance.",
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
                title: "DataForSEO Social Media API - Analytics",
                description: "3 APIs für Social Media Engagement-Analyse mit Pinterest Pins, Facebook Likes und Reddit Shares für Content-Performance-Bewertung.",
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
                "/business_data_social_media_pinterest_live": {
                    post: {
                        summary: "Pinterest Analytics",
                        description: "Anzahl Pinterest-Pins und Shares für spezifische URLs",
                        operationId: "socialMediaPinterest",
                        tags: ["Social Media - Pinterest"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
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
                },
                "/business_data_social_media_facebook_live": {
                    post: {
                        summary: "Facebook Analytics",
                        description: "Anzahl Facebook-Likes für spezifische URLs über Like-Button",
                        operationId: "socialMediaFacebook",
                        tags: ["Social Media - Facebook"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
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
                },
                "/business_data_social_media_reddit_live": {
                    post: {
                        summary: "Reddit Analytics",
                        description: "Reddit-Shares mit Subreddit-Info und Community-Daten",
                        operationId: "socialMediaReddit",
                        tags: ["Social Media - Reddit"],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
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
