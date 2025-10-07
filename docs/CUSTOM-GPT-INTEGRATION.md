# Custom GPT Integration - DataForSEO MCP Server

## 🚀 Schnellstart

### 1. MCP Server Status

✅ **Server läuft bereits auf Vercel!**
- **URL:** https://yourank-mcp.vercel.app
- **Status:** Online und funktionsfähig
- **Verfügbare APIs:** 233 DataForSEO APIs
- **Version:** 2.7.2

**Verfügbare Module:**
- 30 On-Page SEO APIs
- 25 Backlinks APIs  
- 19 Domain Analytics APIs
- 29 Keywords Data APIs
- 11 Content Analysis APIs
- 10 Content Generation APIs
- 41 Merchant APIs
- 24 Business Data APIs
- 17 AI Optimization APIs

### 2. Custom GPT konfigurieren

#### Option A: Über ChatGPT Custom GPT Builder

1. Gehe zu [ChatGPT Custom GPTs](https://chat.openai.com/gpts)
2. Klicke auf "Create a GPT"
3. Wähle "Configure" Tab
4. Füge folgende Konfiguration hinzu:

**Name:** DataForSEO SEO Assistant

**Description:** 
Ein umfassender SEO-Assistent mit Zugriff auf DataForSEO APIs für SERP-Analyse, Keyword-Recherche, On-Page-Optimierung, Content-Analyse und mehr.

**Instructions:**
```
Du bist ein SEO-Experte mit Zugriff auf umfassende DataForSEO APIs. Du kannst:

1. SERP-Analysen durchführen (Google, Bing, YouTube)
2. Keyword-Recherche und -Analyse
3. On-Page SEO-Optimierung
4. Content-Analyse und -Optimierung
5. Domain-Analyse und Technologie-Erkennung
6. Backlink-Analyse
7. Business-Daten und Google Business Profile
8. KI-gestützte Content-Generierung

Verwende die verfügbaren Tools für präzise SEO-Analysen und Empfehlungen.
```

**Actions:**
- **URL:** `https://yourank-mcp.vercel.app/mcp`
- **Method:** POST
- **Headers:** 
  ```
  Content-Type: application/json
  Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=
  ```

#### Option B: Über OpenAI API

```json
{
  "model": "gpt-4",
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "mcp_call",
        "description": "Rufe DataForSEO MCP Server auf",
        "parameters": {
          "type": "object",
          "properties": {
            "method": {
              "type": "string",
              "description": "MCP Method (z.B. tools/call)"
            },
            "params": {
              "type": "object",
              "description": "Method parameters"
            }
          },
          "required": ["method", "params"]
        }
      }
    }
  ]
}
```

### 3. Verfügbare Tools

#### SERP APIs
- `serp_google_organic` - Google organische Ergebnisse
- `serp_google_ai` - Google AI-Mode Ergebnisse
- `serp_bing_organic` - Bing Suchergebnisse
- `serp_youtube` - YouTube Suchergebnisse

#### Keyword Data
- `keywords_data_google_ads` - Google Ads Keywords
- `keywords_data_clickstream` - Clickstream-Daten
- `keywords_data_trends` - Keyword-Trends

#### On-Page SEO
- `onpage_summary` - SEO-Zusammenfassung
- `onpage_lighthouse` - Lighthouse-Analyse
- `onpage_content_parsing` - Content-Parsing

#### Domain Analytics
- `domain_analytics_technologies` - Technologie-Erkennung
- `domain_analytics_whois` - WHOIS-Daten

#### Content Analysis
- `content_analysis_sentiment` - Sentiment-Analyse
- `content_analysis_trends` - Content-Trends

#### Content Generation
- `content_generation_text` - KI-Text-Generierung
- `content_generation_meta` - Meta-Tags generieren

#### Business Data
- `business_data_google_business` - Google Business Profile
- `business_data_components` - Business-Komponenten

#### Backlinks
- `backlinks_summary` - Backlink-Zusammenfassung
- `backlinks_analysis` - Backlink-Analyse

### 4. Beispiel-Anfragen

#### SERP-Analyse
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "serp_google_organic",
    "arguments": {
      "keyword": "seo tools",
      "location_name": "Germany",
      "language_code": "de"
    }
  }
}
```

#### Keyword-Recherche
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "keywords_data_google_ads",
    "arguments": {
      "keywords": ["seo", "marketing"],
      "location_name": "Germany",
      "language_code": "de"
    }
  }
}
```

### 5. Server-Status prüfen

```bash
# Server-Status testen (Vercel)
curl -X POST https://yourank-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}'

# Oder einfach die Health-Check URL aufrufen
curl https://yourank-mcp.vercel.app/
```

### 6. Troubleshooting

#### Server startet nicht
```bash
# Dependencies installieren
npm install

# Projekt kompilieren
npm run build

# Server starten
npm run http
```

#### Authentifizierung fehlgeschlagen
- Überprüfe `env.local` Datei
- Stelle sicher, dass DataForSEO-Credentials korrekt sind

#### Port bereits belegt
```bash
# Anderen Port verwenden
PORT=3001 npm run http
```

### 7. Erweiterte Konfiguration

#### Umgebungsvariablen
```bash
# In env.local
DATAFORSEO_USERNAME=your_username
DATAFORSEO_PASSWORD=your_password
ENABLED_MODULES=SERP,KEYWORDS_DATA,ONPAGE,DOMAIN_ANALYTICS,CONTENT_ANALYSIS,CONTENT_GENERATION,BUSINESS_DATA,BACKLINKS
```

#### Module aktivieren/deaktivieren
```bash
# Nur bestimmte Module aktivieren
ENABLED_MODULES=SERP,KEYWORDS_DATA npm run http
```

### 8. Deployment-Optionen

#### Lokal (für Entwicklung)
```bash
npm run http
```

#### Cloudflare Workers (für Produktion)
```bash
npm run worker:deploy
```

#### Vercel (für Produktion)
```bash
vercel --prod
```

## 📞 Support

Bei Problemen:
1. Überprüfe die Server-Logs
2. Teste die API-Endpunkte
3. Überprüfe die Umgebungsvariablen
4. Konsultiere die Dokumentation in `docs/`
