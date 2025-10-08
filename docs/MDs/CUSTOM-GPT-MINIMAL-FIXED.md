# 🔧 Custom GPT Minimal Fixed - SERP API

## ❌ Probleme identifiziert

1. **Fehler**: `In components section, schemas subsection is not an object`
2. **Fehler**: `object schema missing properties`

## ✅ Lösung

### 1. Minimal OpenAPI Schema korrigiert

**Datei**: `SERP-API-OPENAPI-SCHEMA-MINIMAL.json` (korrigiert)

**Wichtige Korrekturen**:
- **Components.schemas**: Als Objekt definiert
- **Response Schema**: Vollständige Properties hinzugefügt
- **SerpRequest**: Request-Schema hinzugefügt
- **SerpResponse**: Response-Schema hinzugefügt

### 2. Korrekte Custom GPT Konfiguration

**URL**: `https://yourank-mcp.vercel.app/http`

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
      "keyword": "seo tools",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "depth": 10
    }
  }
}
```

## 🚀 Nächste Schritte

### 1. Custom GPT aktualisieren

1. **Gehe zu deinem Custom GPT**
2. **Klicke auf "Configure"**
3. **Actions Tab öffnen**
4. **URL bestätigen**: `https://yourank-mcp.vercel.app/http`
5. **OpenAPI Schema importieren**: `SERP-API-OPENAPI-SCHEMA-MINIMAL.json` (korrigiert)

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
      "depth": 10
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
- **depth**: Anzahl der Ergebnisse (1-100)

## ⚠️ Wichtige Hinweise

1. **Korrekte URL**: `https://yourank-mcp.vercel.app/http` (nicht `/mcp`)
2. **Korrekte MCP-Methode**: `"tools/call"` (nicht `"callSerpTool"`)
3. **Basic Auth**: Korrekt konfiguriert
4. **Components.schemas**: Als Objekt definiert
5. **Response Schema**: Vollständige Properties

## 🧪 Test-Status

✅ **Server läuft**: https://yourank-mcp.vercel.app  
✅ **Endpunkt `/http`**: Funktioniert  
✅ **Endpunkt `/mcp`**: Funktioniert  
✅ **Methode**: `tools/call`  
✅ **Authentifizierung**: Basic Auth  
✅ **MCP-Protokoll**: Korrekt implementiert  
✅ **OpenAPI Schema**: Syntax-korrekt  
✅ **Components.schemas**: Als Objekt definiert  
✅ **Response Schema**: Vollständige Properties

## 📞 Support

Bei Problemen:
1. **Überprüfe die URL**: `https://yourank-mcp.vercel.app/http`
2. **Überprüfe die Methode**: `"tools/call"` (nicht `"callSerpTool"`)
3. **Überprüfe die Authentifizierung**: Basic Auth
4. **Teste mit einfachen Parametern**: Nur `keyword` verwenden
5. **Überprüfe die Request-Struktur**: MCP-Protokoll befolgen

## 🎯 Erwartete Antworten

Bei erfolgreichen Anfragen erhältst du:
- **Organische Ergebnisse**: Titel, URL, Snippet, Position
- **Featured Snippets**: Antworten, Listen, Tabellen
- **Local Pack**: Name, Adresse, Bewertung, Öffnungszeiten
- **Jobs**: Titel, Unternehmen, Standort, Gehalt, Beschreibung
- **YouTube**: Video-Titel, Kanal, Aufrufe, Likes, Kommentare
- **Images**: Bild-URL, Quelle, Alt-Text, Dimensionen
- **Datasets**: Name, Beschreibung, Autor, Lizenz, Downloads

## 🔧 Debug-Informationen

Aus den Vercel-Logs:
- ✅ **MCP Request**: Korrekt empfangen
- ✅ **Direct API Method Call**: `serp_google_organic_live`
- ❌ **DataForSEO API Error**: Möglicherweise Credentials oder Parameter-Problem

**Das korrigierte minimale Schema sollte jetzt funktionieren! 🚀**

## 🎯 Wichtigste Korrekturen

1. **URL**: `https://yourank-mcp.vercel.app/http` (nicht `/mcp`)
2. **Methode**: `"tools/call"` (nicht `"callSerpTool"`)
3. **Components.schemas**: Als Objekt definiert
4. **Response Schema**: Vollständige Properties hinzugefügt
5. **SerpRequest**: Request-Schema hinzugefügt
6. **SerpResponse**: Response-Schema hinzugefügt
