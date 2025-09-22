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

export const ContentGenerationGeneralApis: ToolApi[] = [
  {
    id: "dataforseo-content-generation-general",
    name: "Content Generation General API",
    description:
      "Umfassende Content-Generation-APIs für Text-Generierung, -Analyse, -Optimierung und -Verarbeitung. Kombiniert alle Content-Generation-Funktionalitäten in einer einheitlichen API.",
    category: "Content Generation - General",
    icon: "",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO Content Generation API - General",
        description:
          "Vollständige Content-Generation-API mit allen Funktionen: Text-Generierung, Text-Analyse, Content-Optimierung und Text-Verarbeitung. Optimiert für umfassende Content-Erstellung und -Optimierung.",
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
        // Content Optimization APIs
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
        },

        // Text Analysis APIs
        "/v3/content_generation/text_summary/live": {
          post: {
            tags: ["TextAnalysis"],
            description: "This endpoint will provide you with detailed text statistics, readability metrics, and content analysis for the specified text.",
            operationId: "TextSummaryLive",
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
                          description: "text for analysis (up to 10000 characters)",
                          example: "This is a sample text for analysis. It contains multiple sentences and paragraphs to demonstrate readability analysis."
                        },
                        language_name: {
                          type: "string",
                          description: "language name for analysis (e.g., English, German, Spanish)",
                          example: "English"
                        },
                        language_code: {
                          type: "string",
                          description: "ISO 639-1 language code (e.g., en, de, es)",
                          example: "en"
                        },
                        include_readability: {
                          type: "boolean",
                          description: "include readability scores in analysis",
                          example: true
                        },
                        include_keywords: {
                          type: "boolean",
                          description: "include keyword analysis",
                          example: true
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
                                    text_statistics: {
                                      type: "object",
                                      properties: {
                                        characters_count: { type: "integer" },
                                        characters_count_without_spaces: { type: "integer" },
                                        words_count: { type: "integer" },
                                        sentences_count: { type: "integer" },
                                        paragraphs_count: { type: "integer" },
                                        average_words_per_sentence: { type: "number" },
                                        average_characters_per_word: { type: "number" }
                                      }
                                    },
                                    readability_scores: {
                                      type: "object",
                                      properties: {
                                        flesch_reading_ease: { type: "number" },
                                        flesch_kincaid_grade_level: { type: "number" },
                                        automated_readability_index: { type: "number" },
                                        coleman_liau_index: { type: "number" },
                                        gunning_fog_index: { type: "number" },
                                        smog_index: { type: "number" }
                                      }
                                    },
                                    keyword_analysis: {
                                      type: "object",
                                      properties: {
                                        top_keywords: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              keyword: { type: "string" },
                                              frequency: { type: "integer" },
                                              density_percentage: { type: "number" }
                                            }
                                          }
                                        },
                                        keyword_density: { type: "number" }
                                      }
                                    },
                                    language_detection: {
                                      type: "object",
                                      properties: {
                                        detected_language: { type: "string" },
                                        confidence_score: { type: "number" }
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
        "/v3/content_generation/text_summary/languages": {
          get: {
            tags: ["TextAnalysis"],
            description: "This endpoint will provide you with a list of supported languages for text analysis and their language codes.",
            operationId: "TextSummaryLanguages",
            parameters: [
              {
                name: "language_name",
                in: "query",
                description: "filter by language name",
                required: false,
                schema: {
                  type: "string",
                  example: "English"
                }
              },
              {
                name: "language_code",
                in: "query",
                description: "filter by ISO 639-1 language code",
                required: false,
                schema: {
                  type: "string",
                  example: "en"
                }
              }
            ],
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
                                    language_name: { 
                                      type: "string",
                                      example: "English"
                                    },
                                    language_code: { 
                                      type: "string",
                                      example: "en" 
                                    },
                                    supported_features: {
                                      type: "array",
                                      items: { type: "string" },
                                      example: ["readability_analysis", "keyword_analysis", "language_detection"]
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

        // Text Generation APIs
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
        },

        // Text Processing APIs
        "/v3/content_generation/paraphrase/live": {
          post: {
            tags: ["TextProcessing"],
            description: "This endpoint will provide you with paraphrased text based on the input text and specified parameters.",
            operationId: "ParaphraseLive",
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
                          description: "text to be paraphrased (1-500 tokens)",
                          example: "Search engine optimization is crucial for online business success."
                        },
                        language_name: {
                          type: "string",
                          description: "target language for paraphrasing",
                          example: "English"
                        },
                        language_code: {
                          type: "string",
                          description: "target language code",
                          example: "en"
                        },
                        creativity_index: {
                          type: "number",
                          description: "creativity level for paraphrasing (0-1, default: 0.8)",
                          example: 0.8
                        },
                        avoid_words: {
                          type: "array",
                          items: { type: "string" },
                          description: "words to avoid in paraphrased text (up to 50 terms)"
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
                                    paraphrased_text: { type: "string" },
                                    language_name: { type: "string" },
                                    language_code: { type: "string" }
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
        "/v3/content_generation/check_grammar/live": {
          post: {
            tags: ["TextProcessing"],
            description: "This endpoint will provide you with grammar check results including corrections and suggestions for the input text.",
            operationId: "CheckGrammarLive",
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
                          description: "text to be checked for grammar (1-1000 tokens)",
                          example: "This are an example sentence with grammar mistake."
                        },
                        language_name: {
                          type: "string",
                          description: "language for grammar check",
                          example: "English"
                        },
                        language_code: {
                          type: "string",
                          description: "language code for grammar check",
                          example: "en"
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
                                    original_text: { type: "string" },
                                    corrected_text: { type: "string" },
                                    grammar_errors: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          error_type: { type: "string" },
                                          position: { type: "integer" },
                                          length: { type: "integer" },
                                          original: { type: "string" },
                                          suggested: { type: "string" },
                                          description: { type: "string" }
                                        }
                                      }
                                    },
                                    language_name: { type: "string" },
                                    language_code: { type: "string" }
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
        "/v3/content_generation/check_grammar/languages": {
          get: {
            tags: ["TextProcessing"],
            description: "This endpoint will provide you with the list of supported languages for grammar checking.",
            operationId: "GetGrammarLanguages",
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
                                    language_name: { type: "string" },
                                    language_code: { type: "string" },
                                    supported_features: {
                                      type: "array",
                                      items: { type: "string" }
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
        "/v3/content_generation/grammar_rules": {
          get: {
            tags: ["TextProcessing"],
            description: "This endpoint will provide you with the list of grammar rules and their descriptions that are used for grammar checking.",
            operationId: "GetGrammarRules",
            parameters: [
              {
                name: "language_code",
                in: "query",
                description: "language code to get specific rules for",
                schema: {
                  type: "string",
                  example: "en"
                }
              }
            ],
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
                                    rule_id: { type: "string" },
                                    rule_name: { type: "string" },
                                    rule_description: { type: "string" },
                                    rule_category: { type: "string" },
                                    language_code: { type: "string" },
                                    examples: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          incorrect: { type: "string" },
                                          correct: { type: "string" }
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
  }
]
