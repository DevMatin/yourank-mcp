// SERP YouTube API Schema - Spezialisierte YouTube-Analyse
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

export const SerpYoutubeApis: ToolApi[] = [
  {
    id: "dataforseo-serp-youtube",
    name: "SERP YouTube API",
    description:
      "Spezialisierte YouTube-Analyse mit 3 verschiedenen APIs: Video Info, Video Subtitles und Video Comments. Optimiert für bessere Performance durch Trennung von der Haupt-SERP API.",
    category: "SERP YouTube", 
    icon: "🎥",
    url: "https://yourank-mcp.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO SERP API - Vollständige YouTube-Analyse",
        description: "3 APIs für YouTube: Video Info, Video Subtitles und Video Comments. Optimiert für bessere Performance durch Trennung von der Haupt-SERP API.",
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
        // Utilities
        "/v3/serp/youtube/locations": {
          post: {
            "summary": "YouTube SERP - Locations - Get Locations",
            "description": "YouTube SERP - Locations - Get Locations",
            "operationId": "v3serpyoutubelocationsPost",
            "tags": [
              "YouTube SERP - Locations"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/locations/{country}": {
          get: {
            "summary": "YouTube SERP - Locations - Get Locations",
            "description": "YouTube SERP - Locations - Get Locations",
            "operationId": "v3serpyoutubelocationsGet",
            "tags": [
              "YouTube SERP - Locations"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "parameters": [
              {
                "name": "country",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/youtube/languages": {
          post: {
            "summary": "YouTube SERP - Languages - Get Languages",
            "description": "YouTube SERP - Languages - Get Languages",
            "operationId": "v3serpyoutubelanguagesPost",
            "tags": [
              "YouTube SERP - Languages"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
        
        // Video Info
        "/v3/serp/youtube/video_info/task_post": {
          post: {
            "summary": "YouTube SERP - operation - Post Task",
            "description": "YouTube SERP - operation - Post Task",
            "operationId": "v3serpyoutubevideoinfotaskpostPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/video_info/tasks_ready": {
          post: {
            "summary": "YouTube SERP - operation - Get Ready Tasks",
            "description": "YouTube SERP - operation - Get Ready Tasks",
            "operationId": "v3serpyoutubevideoinfotasksreadyPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
        "/v3/serp/youtube/video_info/tasks_fixed": {
          post: {
            "summary": "YouTube SERP - operation - Get Fixed Tasks",
            "description": "YouTube SERP - operation - Get Fixed Tasks",
            "operationId": "v3serpyoutubevideoinfotasksfixedPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
        "/v3/serp/youtube/video_info/task_get/advanced/{id}": {
          get: {
            "summary": "YouTube SERP - operation - Get Task Results",
            "description": "YouTube SERP - operation - Get Task Results",
            "operationId": "v3serpyoutubevideoinfotaskgetadvancedGet",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/youtube/video_info/live/advanced": {
          post: {
            "summary": "YouTube SERP - operation - Live Results",
            "description": "YouTube SERP - operation - Live Results",
            "operationId": "v3serpyoutubevideoinfoliveadvancedPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },

        // Video Subtitles
        "/v3/serp/youtube/video_subtitles/task_post": {
          post: {
            "summary": "YouTube SERP - operation - Post Task",
            "description": "YouTube SERP - operation - Post Task",
            "operationId": "v3serpyoutubevideosubtitlestaskpostPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/video_subtitles/tasks_ready": {
          post: {
            "summary": "YouTube SERP - operation - Get Ready Tasks",
            "description": "YouTube SERP - operation - Get Ready Tasks",
            "operationId": "v3serpyoutubevideosubtitlestasksreadyPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
        "/v3/serp/youtube/video_subtitles/tasks_fixed": {
          post: {
            "summary": "YouTube SERP - operation - Get Fixed Tasks",
            "description": "YouTube SERP - operation - Get Fixed Tasks",
            "operationId": "v3serpyoutubevideosubtitlestasksfixedPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
        "/v3/serp/youtube/video_subtitles/task_get/advanced/{id}": {
          get: {
            "summary": "YouTube SERP - operation - Get Task Results",
            "description": "YouTube SERP - operation - Get Task Results",
            "operationId": "v3serpyoutubevideosubtitlestaskgetadvancedGet",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/youtube/video_subtitles/live/advanced": {
          post: {
            "summary": "YouTube SERP - operation - Live Results",
            "description": "YouTube SERP - operation - Live Results",
            "operationId": "v3serpyoutubevideosubtitlesliveadvancedPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },

        // Video Comments
        "/v3/serp/youtube/video_comments/task_post": {
          post: {
            "summary": "YouTube SERP - operation - Post Task",
            "description": "YouTube SERP - operation - Post Task",
            "operationId": "v3serpyoutubevideocommentstaskpostPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/video_comments/tasks_ready": {
          post: {
            "summary": "YouTube SERP - operation - Get Ready Tasks",
            "description": "YouTube SERP - operation - Get Ready Tasks",
            "operationId": "v3serpyoutubevideocommentstasksreadyPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
        "/v3/serp/youtube/video_comments/tasks_fixed": {
          post: {
            "summary": "YouTube SERP - operation - Get Fixed Tasks",
            "description": "YouTube SERP - operation - Get Fixed Tasks",
            "operationId": "v3serpyoutubevideocommentstasksfixedPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
        "/v3/serp/youtube/video_comments/task_get/advanced/{id}": {
          get: {
            "summary": "YouTube SERP - operation - Get Task Results",
            "description": "YouTube SERP - operation - Get Task Results",
            "operationId": "v3serpyoutubevideocommentstaskgetadvancedGet",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          }
        },
        "/v3/serp/youtube/video_comments/live/advanced": {
          post: {
            "summary": "YouTube SERP - operation - Live Results",
            "description": "YouTube SERP - operation - Live Results",
            "operationId": "v3serpyoutubevideocommentsliveadvancedPost",
            "tags": [
              "YouTube SERP - operation"
            ],
            "responses": {
              "200": {
                "description": "Success response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status_code": {
                          "type": "integer"
                        },
                        "status_message": {
                          "type": "string"
                        },
                        "tasks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "result": {
                                "type": "array",
                                "items": {
                                  "type": "object"
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
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {
                          "type": "string"
                        },
                        "location_code": {
                          "type": "integer"
                        },
                        "language_code": {
                          "type": "string"
                        },
                        "device": {
                          "type": "string",
                          "enum": [
                            "desktop",
                            "mobile"
                          ]
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
