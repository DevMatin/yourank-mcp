import { getDataForSEOAuthHeader } from "../envs";
// OnPage Complete API - All 30+ implemented OnPage endpoints
export const OnPageCompleteApi = [
    {
        id: "dataforseo-onpage-complete",
        name: "OnPage Complete API - Alle 30 OnPage Tools",
        description: "Vollständige OnPage API mit allen 30+ implementierten Funktionen: General, Content Analysis, SEO Performance, Lighthouse, Pages & Resources.",
        category: "OnPage - Complete",
        icon: "🌐🔍📊📈🔗",
        url: "https://yourank-mcp.vercel.app",
        customHeaders: {
            Authorization: getDataForSEOAuthHeader(),
            "Content-Type": "application/json"
        },
        schema: {
            openapi: "3.1.0",
            info: {
                title: "DataForSEO OnPage API - Complete",
                description: "Vollständige OnPage API mit allen implementierten Funktionen für umfassende Website-Analyse, Crawling, Content-Qualität und Performance-Tests.",
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
            tags: [
                {
                    name: "General",
                    description: "General OnPage API functions - task management, errors, filters"
                },
                {
                    name: "Content Analysis",
                    description: "Content analysis tools - parsing, HTML, screenshots, microdata"
                },
                {
                    name: "SEO Performance",
                    description: "SEO performance analysis - keyword density, duplicate content, indexing"
                },
                {
                    name: "Lighthouse",
                    description: "Lighthouse performance and quality tests"
                },
                {
                    name: "Pages & Resources",
                    description: "Page analysis, links, resources, redirects, waterfall"
                }
            ],
            paths: {
                // GENERAL APIs
                "/v3/on_page/id_list": {
                    "post": {
                        "tags": ["General"],
                        "summary": "OnPage ID List",
                        "description": "Retrieve the list of completed OnPage tasks with metadata",
                        "operationId": "OnPageIdList",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "date_from": { "type": "string", "format": "date" },
                                                "date_to": { "type": "string", "format": "date" }
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/errors": {
                    "post": {
                        "tags": ["General"],
                        "summary": "OnPage Errors",
                        "description": "Retrieve OnPage API tasks that returned errors within the past 7 days",
                        "operationId": "OnPageErrors",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": { "type": "object" }
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "Successful operation",
                                "content": {
                                    "application/json": {
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/force_stop": {
                    "post": {
                        "tags": ["General"],
                        "summary": "Force Stop Crawling",
                        "description": "Force stop the crawl process of specified websites",
                        "operationId": "ForceStop",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string", "description": "Task ID to stop" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/available_filters": {
                    "get": {
                        "tags": ["General"],
                        "summary": "Available Filters",
                        "description": "Retrieve available filters and thresholds for OnPage API",
                        "operationId": "OnPageAvailableFilters",
                        "responses": {
                            "200": {
                                "description": "Successful operation",
                                "content": {
                                    "application/json": {
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/task_post": {
                    "post": {
                        "tags": ["General"],
                        "summary": "Task Post",
                        "description": "Create new OnPage crawling tasks",
                        "operationId": "TaskPost",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "url": { "type": "string", "format": "uri" },
                                                "enable_javascript": { "type": "boolean" },
                                                "enable_browser_rendering": { "type": "boolean" },
                                                "custom_js": { "type": "string" },
                                                "tag": { "type": "string" }
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/tasks_ready": {
                    "post": {
                        "tags": ["General"],
                        "summary": "Tasks Ready",
                        "description": "Check if OnPage tasks are ready for data retrieval",
                        "operationId": "TasksReady",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                // CONTENT ANALYSIS APIs
                "/v3/on_page/instant_pages": {
                    "post": {
                        "tags": ["Content Analysis"],
                        "summary": "Instant Pages",
                        "description": "Get instant page analysis without crawling - immediate results for single pages",
                        "operationId": "InstantPages",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "url": { "type": "string", "format": "uri" },
                                                "enable_javascript": { "type": "boolean" },
                                                "enable_browser_rendering": { "type": "boolean" },
                                                "enable_content_parsing": { "type": "boolean" },
                                                "tag": { "type": "string" }
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/content_parsing": {
                    "post": {
                        "tags": ["Content Analysis"],
                        "summary": "Content Parsing",
                        "description": "Parse and analyze page content structure, text, and elements",
                        "operationId": "ContentParsing",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "url": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/content_parsing_live": {
                    "post": {
                        "tags": ["Content Analysis"],
                        "summary": "Content Parsing Live",
                        "description": "Live content parsing with immediate results",
                        "operationId": "ContentParsingLive",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "url": { "type": "string", "format": "uri" },
                                                "enable_javascript": { "type": "boolean" },
                                                "enable_browser_rendering": { "type": "boolean" },
                                                "tag": { "type": "string" }
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/page_screenshot": {
                    "post": {
                        "tags": ["Content Analysis"],
                        "summary": "Page Screenshot",
                        "description": "Capture screenshots of web pages",
                        "operationId": "PageScreenshot",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "url": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/raw_html": {
                    "post": {
                        "tags": ["Content Analysis"],
                        "summary": "Raw HTML",
                        "description": "Retrieve raw HTML content of pages",
                        "operationId": "RawHtml",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "url": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/microdata": {
                    "post": {
                        "tags": ["Content Analysis"],
                        "summary": "Microdata",
                        "description": "Extract structured data and microdata from pages",
                        "operationId": "Microdata",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "url": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                // SEO PERFORMANCE APIs
                "/v3/on_page/keyword_density": {
                    "post": {
                        "tags": ["SEO Performance"],
                        "summary": "Keyword Density",
                        "description": "Analyze keyword density and distribution on pages",
                        "operationId": "KeywordDensity",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "url": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/duplicate_content": {
                    "post": {
                        "tags": ["SEO Performance"],
                        "summary": "Duplicate Content",
                        "description": "Identify pages with duplicate content",
                        "operationId": "DuplicateContent",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/duplicate_tags": {
                    "post": {
                        "tags": ["SEO Performance"],
                        "summary": "Duplicate Tags",
                        "description": "Find pages with duplicate meta tags (title, description, etc.)",
                        "operationId": "DuplicateTags",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/non_indexable": {
                    "post": {
                        "tags": ["SEO Performance"],
                        "summary": "Non-Indexable Pages",
                        "description": "Identify pages that are not indexable by search engines",
                        "operationId": "NonIndexable",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                // LIGHTHOUSE APIs
                "/v3/on_page/lighthouse/languages": {
                    "get": {
                        "tags": ["Lighthouse"],
                        "summary": "Lighthouse Languages",
                        "description": "Get available languages for Lighthouse audits",
                        "operationId": "LighthouseLanguages",
                        "responses": {
                            "200": {
                                "description": "Successful operation",
                                "content": {
                                    "application/json": {
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/lighthouse/audits": {
                    "get": {
                        "tags": ["Lighthouse"],
                        "summary": "Lighthouse Audits",
                        "description": "Get available Lighthouse audit types and descriptions",
                        "operationId": "LighthouseAudits",
                        "responses": {
                            "200": {
                                "description": "Successful operation",
                                "content": {
                                    "application/json": {
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/lighthouse/versions": {
                    "get": {
                        "tags": ["Lighthouse"],
                        "summary": "Lighthouse Versions",
                        "description": "Get available Lighthouse versions",
                        "operationId": "LighthouseVersions",
                        "responses": {
                            "200": {
                                "description": "Successful operation",
                                "content": {
                                    "application/json": {
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/lighthouse/task_post": {
                    "post": {
                        "tags": ["Lighthouse"],
                        "summary": "Lighthouse Task Post",
                        "description": "Create new Lighthouse performance test tasks",
                        "operationId": "LighthouseTaskPost",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "url": { "type": "string", "format": "uri" },
                                                "enable_javascript": { "type": "boolean" },
                                                "audits": { "type": "array", "items": { "type": "string" } },
                                                "categories": { "type": "array", "items": { "type": "string" } },
                                                "tag": { "type": "string" }
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/lighthouse/tasks_ready": {
                    "post": {
                        "tags": ["Lighthouse"],
                        "summary": "Lighthouse Tasks Ready",
                        "description": "Check if Lighthouse tasks are ready",
                        "operationId": "LighthouseTasksReady",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/lighthouse/task_get": {
                    "post": {
                        "tags": ["Lighthouse"],
                        "summary": "Lighthouse Task Get",
                        "description": "Retrieve Lighthouse test results",
                        "operationId": "LighthouseTaskGet",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/lighthouse/live": {
                    "post": {
                        "tags": ["Lighthouse"],
                        "summary": "Lighthouse Live",
                        "description": "Run Lighthouse tests with immediate results",
                        "operationId": "LighthouseLive",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "url": { "type": "string", "format": "uri" },
                                                "enable_javascript": { "type": "boolean" },
                                                "audits": { "type": "array", "items": { "type": "string" } },
                                                "categories": { "type": "array", "items": { "type": "string" } },
                                                "tag": { "type": "string" }
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                // PAGES & RESOURCES APIs
                "/v3/on_page/waterfall": {
                    "post": {
                        "tags": ["Pages & Resources"],
                        "summary": "Waterfall",
                        "description": "Get detailed loading waterfall information for pages",
                        "operationId": "Waterfall",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "url": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/links": {
                    "post": {
                        "tags": ["Pages & Resources"],
                        "summary": "Links",
                        "description": "Analyze internal and external links on pages",
                        "operationId": "Links",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "filters": { "type": "array", "items": { "type": "object", "additionalProperties": true } }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/redirect_chains": {
                    "post": {
                        "tags": ["Pages & Resources"],
                        "summary": "Redirect Chains",
                        "description": "Analyze redirect chains and identify redirect issues",
                        "operationId": "RedirectChains",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/resources": {
                    "post": {
                        "tags": ["Pages & Resources"],
                        "summary": "Resources",
                        "description": "Analyze page resources (images, CSS, JS, etc.)",
                        "operationId": "Resources",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "filters": { "type": "array", "items": { "type": "object", "additionalProperties": true } }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/pages_by_resource": {
                    "post": {
                        "tags": ["Pages & Resources"],
                        "summary": "Pages by Resource",
                        "description": "Find pages that use specific resources",
                        "operationId": "PagesByResource",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "filters": { "type": "array", "items": { "type": "object", "additionalProperties": true } }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/pages": {
                    "post": {
                        "tags": ["Pages & Resources"],
                        "summary": "Pages",
                        "description": "Retrieve detailed information about crawled pages",
                        "operationId": "Pages",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "string" },
                                                "filters": { "type": "array", "items": { "type": "object", "additionalProperties": true } },
                                                "limit": { "type": "integer" },
                                                "offset": { "type": "integer" }
                                            },
                                            "required": ["id"]
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
                                        "schema": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "/v3/on_page/summary/{id}": {
                    "get": {
                        "tags": ["Pages & Resources"],
                        "summary": "Summary",
                        "description": "Get comprehensive summary of crawled website",
                        "operationId": "Summary",
                        "parameters": [
                            {
                                "name": "id",
                                "in": "path",
                                "required": true,
                                "description": "Task ID",
                                "schema": {
                                    "type": "string"
                                }
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "Successful operation",
                                "content": {
                                    "application/json": {
                                        "schema": { "type": "object" }
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
