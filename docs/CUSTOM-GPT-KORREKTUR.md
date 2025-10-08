# 🔧 Custom GPT Korrektur - SERP API

## ❌ Problem identifiziert

Der Custom GPT verwendet den **falschen Endpunkt**:
- **Falsch**: `/tools/call` 
- **Richtig**: `/mcp`

## ✅ Lösung

### 1. Korrigiertes OpenAPI Schema verwenden

**Datei**: `SERP-API-OPENAPI-SCHEMA-FIXED.json`

**Wichtige Änderungen**:
- **Server URL**: `https://yourank-mcp.vercel.app` (ohne `/mcp`)
- **Path**: `/mcp` (statt `/tools/call`)
- **Vereinfachte Parameter**: Nur die wichtigsten Parameter

### 2. Korrekte Custom GPT Konfiguration

**URL**: `https://yourank-mcp.vercel.app/mcp`

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=
```

### 3. Korrekte Request-Struktur

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "serp_google_organic_live",
    "arguments": {
      "keyword": "SEO trends 2025",
      "location_name": "United States",
      "language_code": "en",
      "device": "desktop",
      "depth": 3
    }
  }
}
```

## 🚀 Nächste Schritte

### 1. Custom GPT aktualisieren

1. **Gehe zu deinem Custom GPT**
2. **Klicke auf "Configure"**
3. **Actions Tab öffnen**
4. **URL ändern** zu: `https://yourank-mcp.vercel.app/mcp`
5. **OpenAPI Schema importieren**: `SERP-API-OPENAPI-SCHEMA-FIXED.json`

### 2. Test-Anfrage

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
      "language_code": "de",
      "device": "desktop",
      "depth": 3
    }
  }
}
```

### 3. Verfügbare SERP Tools

- `serp_google_organic_live` - Google organische Ergebnisse
- `serp_google_ai_mode_live_advanced` - Google AI-Mode
- `serp_bing_organic_live` - Bing Suchergebnisse
- `serp_youtube_organic_live` - YouTube Suchergebnisse
- `serp_google_images_live_advanced` - Google Bildersuche
- `serp_google_autocomplete_live_advanced` - Google Autocomplete
- `serp_google_jobs_live_advanced` - Google Jobs
- `serp_google_dataset_search_live_advanced` - Google Dataset Search
- `serp_google_dataset_info_live_advanced` - Google Dataset Info
- `serp_google_search_by_image_live_advanced` - Reverse Image Search
- `serp_bing_local_pack_live_regular` - Bing Local Pack
- `serp_youtube_video_info_live_advanced` - YouTube Video Info
- `serp_youtube_video_subtitles_live_advanced` - YouTube Untertitel
- `serp_youtube_video_comments_live_advanced` - YouTube Kommentare

## 🔍 Parameter-Erklärung

### Erforderliche Parameter
- **keyword**: Suchbegriff (erforderlich)

### Optionale Parameter
- **location_name**: Standort (z.B. "Germany", "United States")
- **language_code**: Sprachcode (z.B. "de", "en")
- **device**: Gerätetyp ("desktop", "mobile", "tablet")
- **os**: Betriebssystem ("windows", "macos", "linux", "android", "ios")
- **depth**: Anzahl der Ergebnisse (1-100)

## ⚠️ Wichtige Hinweise

1. **Nur die wichtigsten Parameter** sind im Schema enthalten
2. **Vereinfachte Struktur** für bessere Kompatibilität
3. **Korrekte MCP-Protokoll-Struktur** wird verwendet
4. **Basic Auth** ist korrekt konfiguriert

## 🧪 Test-Status

✅ **Server läuft**: https://yourank-mcp.vercel.app  
✅ **Endpunkt funktioniert**: `/mcp`  
✅ **Authentifizierung**: Basic Auth  
✅ **MCP-Protokoll**: Korrekt implementiert  

## 📞 Support

Bei Problemen:
1. **Überprüfe die URL**: `https://yourank-mcp.vercel.app/mcp`
2. **Überprüfe die Authentifizierung**: Basic Auth
3. **Teste mit einfachen Parametern**: Nur `keyword` verwenden
4. **Überprüfe die Request-Struktur**: MCP-Protokoll befolgen

**Das korrigierte Schema sollte jetzt funktionieren! 🚀**
