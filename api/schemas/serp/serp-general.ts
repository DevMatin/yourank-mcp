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

// SERP General API - Complete with all 29 endpoints
export const SerpGeneralCompleteApi: ToolApi[] = [
  {
    id: "dataforseo-serp-general-complete",
    name: "SERP General API - Alle SERP Funktionen",
    description: "Vollständige SERP API mit allen 29 Funktionen: Google (17 APIs), Bing (2 APIs), YouTube (5 APIs), Yahoo (1 API) und General Tools (4 APIs). Umfassende Suchmaschinen-Analyse für alle Plattformen.",
    category: "SERP - General Complete",
    icon: "🔍📊🌐🎥",
    url: "https://mcp-server-typescript-six.vercel.app",
    customHeaders: {
      Authorization: getDataForSEOAuthHeader(),
      "Content-Type": "application/json"
    },
    schema: {
      openapi: "3.1.0",
      info: {
        title: "DataForSEO SERP API - General Complete",
        description: "Vollständige SERP API mit allen 29 Funktionen für Google, Bing, YouTube, Yahoo und General Tools.",
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
        // ===== SERP GENERAL APIs =====
        "/v3/serp/id_list": {
          "post": {
            "tags": ["SERP General"],
            "summary": "SERP ID List",
            "description": "List of completed SERP tasks with metadata",
            "operationId": "SerpIdList",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "date_from": {"type": "string", "format": "date"},
                        "date_to": {"type": "string", "format": "date"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/errors": {
          "post": {
            "tags": ["SERP General"],
            "summary": "SERP Errors",
            "description": "SERP API tasks that returned errors within past 7 days",
            "operationId": "SerpErrors",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {"type": "object"}
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/screenshot": {
          "post": {
            "tags": ["SERP General"],
            "summary": "SERP Screenshot",
            "description": "Capture a screenshot of any SERP page",
            "operationId": "Screenshot",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string"},
                        "width": {"type": "integer"},
                        "height": {"type": "integer"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/ai_summary": {
          "post": {
            "tags": ["SERP General"],
            "summary": "SERP AI Summary",
            "description": "AI-powered summary of SERP content",
            "operationId": "AiSummary",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string"},
                        "location_code": {"type": "integer"},
                        "language_code": {"type": "string"},
                        "prompt": {"type": "string"}
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },

        // ===== GOOGLE SERP APIs =====
        "/v3/serp/google/organic/live/advanced": {
          "post": {
            "tags": ["Google Organic"],
            "summary": "Google Organic Live Advanced",
            "description": "Live Google Organic SERP provides real-time data on top 100 organic search results",
            "operationId": "GoogleOrganicLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"},
                        "device": {"type": "string", "enum": ["desktop", "mobile"], "description": "Device type"},
                        "depth": {"type": "integer", "description": "Number of results", "default": 100}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/ai_mode/live/advanced": {
          "post": {
            "tags": ["Google AI"],
            "summary": "Google AI Mode Live Advanced",
            "description": "Google AI Mode search results with AI-generated responses",
            "operationId": "GoogleAiModeLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/maps/live/advanced": {
          "post": {
            "tags": ["Google Maps"],
            "summary": "Google Maps Live Advanced",
            "description": "Google Maps search results with location data",
            "operationId": "GoogleMapsLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_coordinate": {"type": "string", "description": "Location coordinates"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/local_finder/live/advanced": {
          "post": {
            "tags": ["Google Local"],
            "summary": "Google Local Finder Live Advanced",
            "description": "Google Local Finder search results for local businesses",
            "operationId": "GoogleLocalFinderLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/news/live/advanced": {
          "post": {
            "tags": ["Google News"],
            "summary": "Google News Live Advanced",
            "description": "Google News search results",
            "operationId": "GoogleNewsLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"},
                        "time_range": {"type": "string", "description": "Time range for news"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/events/live/advanced": {
          "post": {
            "tags": ["Google Events"],
            "summary": "Google Events Live Advanced",
            "description": "Google Events search results",
            "operationId": "GoogleEventsLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/images/live/advanced": {
          "post": {
            "tags": ["Google Images"],
            "summary": "Google Images Live Advanced",
            "description": "Google Images search results",
            "operationId": "GoogleImagesLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/search_by_image/live/advanced": {
          "post": {
            "tags": ["Google Images"],
            "summary": "Google Search by Image Live Advanced",
            "description": "Reverse image search on Google",
            "operationId": "GoogleSearchByImageLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "image_url": {"type": "string", "description": "URL of the image to search"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["image_url"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/jobs/live/advanced": {
          "post": {
            "tags": ["Google Jobs"],
            "summary": "Google Jobs Live Advanced",
            "description": "Google Jobs search results",
            "operationId": "GoogleJobsLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target job keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/autocomplete/live/advanced": {
          "post": {
            "tags": ["Google Autocomplete"],
            "summary": "Google Autocomplete Live Advanced",
            "description": "Google search suggestions",
            "operationId": "GoogleAutocompleteLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Partial keyword for suggestions"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/dataset_search/live/advanced": {
          "post": {
            "tags": ["Google Dataset"],
            "summary": "Google Dataset Search Live Advanced",
            "description": "Google Dataset search results",
            "operationId": "GoogleDatasetSearchLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target dataset keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/dataset_info/live/advanced": {
          "post": {
            "tags": ["Google Dataset"],
            "summary": "Google Dataset Info Live Advanced",
            "description": "Detailed information about a specific dataset",
            "operationId": "GoogleDatasetInfoLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "dataset_id": {"type": "string", "description": "Dataset identifier"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["dataset_id"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/ads_search/live/advanced": {
          "post": {
            "tags": ["Google Ads"],
            "summary": "Google Ads Search Live Advanced",
            "description": "Google Ads search results",
            "operationId": "GoogleAdsSearchLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/ads_advertisers/live/advanced": {
          "post": {
            "tags": ["Google Ads"],
            "summary": "Google Ads Advertisers Live Advanced",
            "description": "Information about advertisers for specific keywords",
            "operationId": "GoogleAdsAdvertisersLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },

        // ===== BING SERP APIs =====
        "/v3/serp/bing/organic/live/advanced": {
          "post": {
            "tags": ["Bing Organic"],
            "summary": "Bing Organic Live Advanced",
            "description": "Live Bing Organic SERP provides real-time search results",
            "operationId": "BingOrganicLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/bing/local_pack/live/advanced": {
          "post": {
            "tags": ["Bing Local"],
            "summary": "Bing Local Pack Live Advanced", 
            "description": "Live Bing Local Pack SERP provides local search results",
            "operationId": "BingLocalPackLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },

        // ===== YOUTUBE SERP APIs =====
        "/v3/serp/youtube/organic/live/advanced": {
          "post": {
            "tags": ["YouTube Search"],
            "summary": "YouTube Organic Live Advanced",
            "description": "YouTube search results",
            "operationId": "YoutubeOrganicLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/video_info/live/advanced": {
          "post": {
            "tags": ["YouTube Video"],
            "summary": "YouTube Video Info Live Advanced",
            "description": "Live YouTube Video Info provides real-time data on video metrics",
            "operationId": "YoutubeVideoInfoLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "description": "YouTube video URL"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["url"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/video_subtitles/live/advanced": {
          "post": {
            "tags": ["YouTube Video"],
            "summary": "YouTube Video Subtitles Live Advanced",
            "description": "Live YouTube Subtitles provides real-time data on subtitles",
            "operationId": "YoutubeVideoSubtitlesLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "description": "YouTube video URL"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["url"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/video_comments/live/advanced": {
          "post": {
            "tags": ["YouTube Video"],
            "summary": "YouTube Video Comments Live Advanced",
            "description": "Live YouTube Comments provides real-time data on video comments",
            "operationId": "YoutubeVideoCommentsLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {"type": "string", "description": "YouTube video URL"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["url"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },

        // ===== YAHOO SERP APIs =====
        "/v3/serp/yahoo/organic/live/advanced": {
          "post": {
            "tags": ["Yahoo Organic"],
            "summary": "Yahoo Organic Live Advanced",
            "description": "Live Yahoo Organic SERP provides real-time search results",
            "operationId": "YahooOrganicLiveAdvanced",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "keyword": {"type": "string", "description": "Target keyword"},
                        "location_code": {"type": "integer", "description": "Location code"},
                        "language_code": {"type": "string", "description": "Language code"}
                      },
                      "required": ["keyword"]
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },

        // ===== LOCATION & LANGUAGE APIs =====
        "/v3/serp/google/locations": {
          "get": {
            "tags": ["Configuration"],
            "summary": "Google Locations",
            "description": "List of available locations for Google SERP",
            "operationId": "SerpGoogleLocations",
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/locations/{country}": {
          "get": {
            "tags": ["Configuration"],
            "summary": "Google Locations by Country",
            "description": "List of locations filtered by country",
            "operationId": "SerpGoogleLocationsCountry",
            "parameters": [{
              "name": "country",
              "in": "path",
              "required": true,
              "schema": {"type": "string"},
              "example": "us"
            }],
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/google/languages": {
          "get": {
            "tags": ["Configuration"],
            "summary": "Google Languages",
            "description": "List of available languages for Google SERP",
            "operationId": "SerpGoogleLanguages",
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
                  }
                }
              }
            }
          }
        },
        "/v3/serp/youtube/locations": {
          "get": {
            "tags": ["Configuration"],
            "summary": "YouTube Locations",
            "description": "List of available locations for YouTube SERP",
            "operationId": "SerpYoutubeLocations",
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {
                  "application/json": {
                    "schema": {"type": "object"}
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
]
