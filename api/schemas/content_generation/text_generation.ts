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

export const TextGenerationApis: ToolApi[] = [
  {
    id: "dataforseo-text-generation",
    name: "Text Generation API",
    description:
      "Spezialisierte Text-Generierungs-APIs mit 2 verschiedenen Endpoints für text-basierte und topic-basierte Content-Erstellung. Optimiert für bessere Performance durch Trennung von der Haupt-Content-Generation API.",
    category: "Content Generation - Text",
    icon: "",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Content Generation API - Text Generation",
        description:
          "2 APIs für Text-basierte und Topic-basierte Content-Generierung. Optimiert für bessere Performance durch Trennung von der Haupt-Content-Generation API.",
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
        "/v3/content_generation/generate/live": {
          post: {
            tags: ["TextGeneration"],
            description: "This endpoint will provide you with a text generated based on the part of the text you define and other available parameters.",
            operationId: "GenerateLive",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: {
                          type: "string",
                          description: "initial target text (1-500 tokens)",
                          example: "SEO is"
                        },
                        max_new_tokens: {
                          type: "integer",
                          description: "generation limit for new tokens (max: 300)",
                          example: 100
                        },
                        max_tokens: {
                          type: "integer",
                          description: "generation limit for all tokens (max: 1024)"
                        },
                        creativity_index: {
                          type: "number",
                          description: "creativity of content generation (0-1, default: 0.8)",
                          example: 1
                        },
                        token_repetition_penalty: {
                          type: "number",
                          description: "token repetition penalty (0.5-2, default: 1)"
                        },
                        avoid_words: {
                          type: "array",
                          items: { type: "string" },
                          description: "words to avoid (up to 50 terms)"
                        },
                        avoid_starting_words: {
                          type: "array", 
                          items: { type: "string" },
                          description: "words to avoid at start (up to 50 terms)"
                        },
                        stop_words: {
                          type: "array",
                          items: { type: "string" },
                          description: "words to end the text (up to 50 terms)"
                        },
                        supplement_token: {
                          type: "string",
                          description: "token for continuing generation"
                        },
                        tag: {
                          type: "string",
                          description: "user-defined task identifier (max 255 chars)"
                        }
                      },
                      required: ["text"]
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
                                    input_tokens: { type: "integer" },
                                    output_tokens: { type: "integer" },
                                    new_tokens: { type: "integer" },
                                    generated_text: { type: "string" },
                                    supplement_token: { type: "string" }
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
        "/v3/content_generation/generate_text/live": {
          post: {
            tags: ["TextGeneration"],
            description: "This endpoint will provide you with a text generated based on the topic and other parameters you specify.",
            operationId: "GenerateTextLive",
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
                          description: "main topic for content generation (1-50 tokens)",
                          example: "Steve Jobs"
                        },
                        word_count: {
                          type: "integer",
                          description: "number of words in content (1-1000)",
                          example: 50
                        },
                        sub_topics: {
                          type: "array",
                          items: { type: "string" },
                          description: "secondary topics (up to 10 terms)",
                          example: ["Apple", "Pixar", "Amazing Products"]
                        },
                        description: {
                          type: "string",
                          description: "meta description (1-1000 tokens)",
                          example: "Take a closer look at Steve Jobs' life and his incredible impact on the tech industry."
                        },
                        meta_keywords: {
                          type: "array",
                          items: { type: "string" },
                          description: "keywords for content (up to 10 terms)",
                          example: ["iPhone", "sell", "CEO"]
                        },
                        creativity_index: {
                          type: "number",
                          description: "creativity of content generation (0-1, default: 0.8)",
                          example: 0.8
                        },
                        include_conclusion: {
                          type: "boolean",
                          description: "include conclusion in generated text",
                          example: true
                        },
                        supplement_token: {
                          type: "string",
                          description: "token for continuing generation"
                        },
                        tag: {
                          type: "string",
                          description: "user-defined task identifier (max 255 chars)"
                        }
                      },
                      required: ["topic", "word_count"]
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
                                    input_tokens: { type: "integer" },
                                    output_tokens: { type: "integer" },
                                    new_tokens: { type: "integer" },
                                    generated_text: { type: "string" },
                                    supplement_token: { type: "string" }
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
