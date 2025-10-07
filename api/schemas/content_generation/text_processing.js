import { getDataForSEOAuthHeader } from "../envs";
export const TextProcessingApis = [
    {
        id: "dataforseo-text-processing",
        name: "Text Processing API",
        description: "Spezialisierte Text-Verarbeitungs-APIs für Paraphrasierung und Grammatik-Prüfung",
        category: "Content Generation - Processing",
        icon: "",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO Content Generation API - Text Processing",
                description: "APIs für Text-Paraphrasierung und Grammatik-Prüfung mit umfassender Sprachunterstützung.",
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
];
