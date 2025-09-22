import { getDataForSEOAuthHeader } from "../envs"

export interface ToolApi {
  id: string
  name: string
  description: string
  category: string
  icon: string
  url?: string
  customHeaders?: object
  schema: object
}

export const ContentOptimizationApis: ToolApi[] = [
  {
    id: "dataforseo-content-optimization",
    name: "Content Optimization API",
    description:
      "Spezialisierte Content-Optimierungs-APIs für SEO Meta Tags und Subtopic-Generierung",
    category: "Content Generation - Optimization",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Content Generation API - Content Optimization",
        description:
          "2 APIs für Content-Optimierung: Meta Tags Generierung und Subtopic-Generierung für bessere SEO-Performance.",
        version: "v1.0.0",
        contact: {
          name: "DataForSEO",
          url: "https://dataforseo.com"
        }
      },
      servers: [
        {
          url: "https://mcp-server-typescript-six.vercel.app",
          description: "Vercel MCP Server"
        }
      ],
      paths: {
        "/v3/content_generation/generate_meta_tags/live": {
          post: {
            tags: ["ContentOptimization"],
            description: "This endpoint will generate SEO-optimized meta tags including title, description, and keywords based on your content topic.",
            operationId: "GenerateMetaTagsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        topic: {
                          type: "string",
                          description: "main topic for meta tag generation (1-100 tokens)",
                          example: "Best SEO Practices for 2024"
                        },
                        description: {
                          type: "string",
                          description: "additional content description (1-500 tokens)",
                          example: "Complete guide covering modern SEO techniques and strategies"
                        },
                        target_keywords: {
                          type: "array",
                          items: { type: "string" },
                          description: "target keywords for optimization (up to 10 terms)",
                          example: ["SEO", "search optimization", "ranking"]
                        },
                        meta_title_length: {
                          type: "integer",
                          description: "desired meta title length in characters (30-60, default: 55)",
                          example: 55
                        },
                        meta_description_length: {
                          type: "integer",
                          description: "desired meta description length in characters (120-160, default: 155)",
                          example: 155
                        },
                        language: {
                          type: "string",
                          description: "language for meta tags generation (default: en)",
                          example: "en"
                        },
                        tag: {
                          type: "string",
                          description: "user-defined task identifier (max 255 chars)"
                        }
                      },
                      required: ["topic"]
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
                                    meta_title: { 
                                      type: "string",
                                      description: "Generated SEO-optimized title tag"
                                    },
                                    meta_description: { 
                                      type: "string",
                                      description: "Generated SEO-optimized meta description"
                                    },
                                    meta_keywords: { 
                                      type: "array",
                                      items: { type: "string" },
                                      description: "Generated meta keywords"
                                    },
                                    input_tokens: { type: "integer" },
                                    output_tokens: { type: "integer" }
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
        "/v3/content_generation/generate_sub_topics/live": {
          post: {
            tags: ["ContentOptimization"],
            description: "This endpoint will generate relevant subtopics for your main topic to create comprehensive content structure.",
            operationId: "GenerateSubTopicsLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        topic: {
                          type: "string",
                          description: "main topic for subtopic generation (1-100 tokens)",
                          example: "Digital Marketing Strategies"
                        },
                        sub_topics_count: {
                          type: "integer",
                          description: "number of subtopics to generate (1-20, default: 10)",
                          example: 10
                        },
                        content_type: {
                          type: "string",
                          enum: ["blog_post", "article", "guide", "tutorial", "review"],
                          description: "type of content for subtopic optimization",
                          example: "guide"
                        },
                        target_keywords: {
                          type: "array",
                          items: { type: "string" },
                          description: "keywords to consider for subtopic generation (up to 15 terms)",
                          example: ["SEO", "social media", "content marketing"]
                        },
                        difficulty_level: {
                          type: "string",
                          enum: ["beginner", "intermediate", "advanced"],
                          description: "target audience difficulty level (default: intermediate)",
                          example: "intermediate"
                        },
                        creativity_index: {
                          type: "number",
                          description: "creativity of subtopic generation (0-1, default: 0.7)",
                          example: 0.7
                        },
                        language: {
                          type: "string",
                          description: "language for subtopic generation (default: en)",
                          example: "en"
                        },
                        tag: {
                          type: "string",
                          description: "user-defined task identifier (max 255 chars)"
                        }
                      },
                      required: ["topic"]
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
                                    sub_topics: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          title: { 
                                            type: "string",
                                            description: "Subtopic title"
                                          },
                                          description: { 
                                            type: "string",
                                            description: "Brief description of the subtopic"
                                          },
                                          relevance_score: { 
                                            type: "number",
                                            description: "Relevance score to main topic (0-1)"
                                          }
                                        }
                                      }
                                    },
                                    input_tokens: { type: "integer" },
                                    output_tokens: { type: "integer" }
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
]
