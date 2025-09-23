# 🚀 Custom GPT Integration mit Vercel MCP Server

## ✅ Status: Server läuft auf Vercel!

**URL:** https://yourank-mcp.vercel.app  
**Verfügbare Tools:** 233 DataForSEO APIs  
**Status:** Online und funktionsfähig

## 📋 Schnelle Einrichtung

### 1. Custom GPT erstellen

1. Gehe zu [ChatGPT Custom GPTs](https://chat.openai.com/gpts)
2. Klicke auf **"Create a GPT"**
3. Wähle den **"Configure"** Tab

### 2. GPT-Konfiguration

**Name:** `DataForSEO SEO Assistant`

**Description:**
```
Ein umfassender SEO-Assistent mit Zugriff auf 233 DataForSEO APIs für SERP-Analyse, Keyword-Recherche, On-Page-Optimierung, Content-Analyse, Backlink-Analyse und mehr.
```

**Instructions:**
```
Du bist ein SEO-Experte mit Zugriff auf umfassende DataForSEO APIs. Du kannst:

🔍 SERP-Analysen durchführen (Google, Bing, YouTube)
📊 Keyword-Recherche und -Analyse
📈 On-Page SEO-Optimierung
📝 Content-Analyse und -Optimierung
🌐 Domain-Analyse und Technologie-Erkennung
🔗 Backlink-Analyse
🏢 Business-Daten und Google Business Profile
🤖 KI-gestützte Content-Generierung

Verwende die verfügbaren Tools für präzise SEO-Analysen und Empfehlungen. Antworte immer auf Deutsch.
```

### 3. Actions konfigurieren

**URL:** `https://yourank-mcp.vercel.app/mcp`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=
```

**Schema:** (Automatisch generiert)

## 🛠️ Verfügbare Tools (233 APIs)

### 🔍 SERP APIs (Suchmaschinen-Ergebnisse)
- `serp_google_organic_live` - Google organische Ergebnisse
- `serp_bing_organic_live` - Bing Suchergebnisse  
- `serp_youtube_organic_live` - YouTube Suchergebnisse

### 📊 Keywords Data (29 APIs)
- `keywords_data_google_ads_search_volume` - Google Ads Keyword-Volumen
- `keywords_data_google_ads_keywords_for_site` - Keywords für Website
- `keywords_data_google_trends_explore` - Google Trends
- `keywords_data_bing_search_volume` - Bing Keyword-Volumen

### 📈 On-Page SEO (30 APIs)
- `on_page_summary` - SEO-Zusammenfassung
- `on_page_lighthouse_live` - Lighthouse-Analyse
- `on_page_content_parsing_live` - Content-Parsing
- `on_page_keyword_density` - Keyword-Dichte
- `on_page_links` - Link-Analyse

### 🌐 Domain Analytics (19 APIs)
- `domain_analytics_technologies_domain_technologies_live` - Technologie-Erkennung
- `whois_overview` - WHOIS-Daten
- `domain_analytics_technologies_summary_live` - Domain-Zusammenfassung

### 📝 Content Analysis (11 APIs)
- `content_analysis_sentiment_analysis` - Sentiment-Analyse
- `content_analysis_summary` - Content-Zusammenfassung
- `content_analysis_phrase_trends` - Phrase-Trends

### 🤖 Content Generation (10 APIs)
- `content_generation_generate_text` - KI-Text-Generierung
- `content_generation_generate_meta_tags` - Meta-Tags generieren
- `content_generation_paraphrase` - Text umformulieren

### 🔗 Backlinks (25 APIs)
- `backlinks_summary` - Backlink-Zusammenfassung
- `backlinks_backlinks` - Backlink-Details
- `backlinks_competitors` - Konkurrenz-Analyse

### 🏢 Business Data (24 APIs)
- `business_data_google_my_business_info_live` - Google Business Profile
- `business_data_business_listings_search` - Business-Listings
- `business_data_google_reviews_live` - Google Bewertungen

### 🛒 Merchant (41 APIs)
- `merchant_google_products_task_post` - Google Shopping Produkte
- `merchant_amazon_products_task_post` - Amazon Produkte

### 🤖 AI Optimization (17 APIs)
- `ai_optimization_chatgpt_llm_responses_live` - ChatGPT Integration
- `ai_optimization_claude_llm_responses_live` - Claude Integration

## 🧪 Test-Beispiele

### SERP-Analyse
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "serp_google_organic_live",
    "arguments": {
      "keyword": "seo tools",
      "location_name": "Germany",
      "language_code": "de"
    }
  }
}
```

### Keyword-Recherche
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "keywords_data_google_ads_search_volume",
    "arguments": {
      "keywords": ["seo", "marketing"],
      "location_name": "Germany",
      "language_code": "de"
    }
  }
}
```

### On-Page SEO
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "on_page_summary",
    "arguments": {
      "url": "https://example.com"
    }
  }
}
```

## 🔧 Troubleshooting

### Server-Status prüfen
```bash
curl https://yourank-mcp.vercel.app/
```

### Verfügbare Tools anzeigen
```bash
curl https://yourank-mcp.vercel.app/debug/tools
```

### MCP-Request testen
```bash
curl -X POST https://yourank-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "serp_google_organic_live", "arguments": {"keyword": "test"}}}'
```

## 📚 Nützliche Links

- [DataForSEO API Dokumentation](https://dataforseo.com/apis)
- [MCP Spezifikation](https://modelcontextprotocol.io/)
- [Vercel Deployment](https://vercel.com)

## 🎯 Nächste Schritte

1. ✅ Custom GPT erstellen und konfigurieren
2. ✅ Actions mit Vercel-URL einrichten
3. ✅ Erste SEO-Analysen testen
4. ✅ Workflows für verschiedene SEO-Aufgaben entwickeln

**Dein DataForSEO MCP Server ist bereit für die Custom GPT Integration! 🚀**
