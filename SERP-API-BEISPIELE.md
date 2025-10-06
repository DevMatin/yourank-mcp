# 🔍 SERP API Beispiele für Custom GPT

## 📋 Verfügbare SERP API Tools

### 🔍 Google SERP APIs
- `serp_google_organic_live` - Google organische Suchergebnisse
- `serp_google_ai_mode_live_advanced` - Google AI-Mode Suchergebnisse
- `serp_google_images_live_advanced` - Google Bildersuche
- `serp_google_autocomplete_live_advanced` - Google Autocomplete
- `serp_google_jobs_live_advanced` - Google Jobs
- `serp_google_dataset_search_live_advanced` - Google Dataset Search
- `serp_google_dataset_info_live_advanced` - Google Dataset Info
- `serp_google_search_by_image_live_advanced` - Reverse Image Search

### 🔍 Bing SERP APIs
- `serp_bing_organic_live` - Bing Suchergebnisse
- `serp_bing_local_pack_live_regular` - Bing Local Pack

### 🎥 YouTube SERP APIs
- `serp_youtube_organic_live` - YouTube Suchergebnisse
- `serp_youtube_video_info_live_advanced` - YouTube Video Info
- `serp_youtube_video_subtitles_live_advanced` - YouTube Untertitel
- `serp_youtube_video_comments_live_advanced` - YouTube Kommentare

## 🚀 Beispiel-Anfragen

### 1. Google Organische Suchergebnisse

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

### 2. Google AI-Mode Suchergebnisse

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "serp_google_ai_mode_live_advanced",
    "arguments": {
      "keyword": "best seo practices 2024",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "depth": 20
    }
  }
}
```

### 3. Google Bildersuche

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "serp_google_images_live_advanced",
    "arguments": {
      "keyword": "seo dashboard",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "depth": 15
    }
  }
}
```

### 4. Google Autocomplete

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "serp_google_autocomplete_live_advanced",
    "arguments": {
      "keyword": "seo",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "depth": 10
    }
  }
}
```

### 5. Google Jobs

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "serp_google_jobs_live_advanced",
    "arguments": {
      "keyword": "seo specialist",
      "location_name": "Berlin, Germany",
      "language_code": "de",
      "device": "desktop",
      "job_type": "full_time",
      "experience_level": "mid_level",
      "salary_min": 40000,
      "salary_max": 80000,
      "remote": true,
      "date_posted": "week"
    }
  }
}
```

### 6. Reverse Image Search

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "serp_google_search_by_image_live_advanced",
    "arguments": {
      "image_url": "https://example.com/image.jpg",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop"
    }
  }
}
```

### 7. Bing Suchergebnisse

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "serp_bing_organic_live",
    "arguments": {
      "keyword": "seo optimization",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "depth": 10
    }
  }
}
```

### 8. Bing Local Pack

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "method": "tools/call",
  "params": {
    "name": "serp_bing_local_pack_live_regular",
    "arguments": {
      "keyword": "restaurants",
      "location_name": "Berlin, Germany",
      "language_code": "de",
      "device": "desktop",
      "radius": 25,
      "category": "restaurants",
      "rating_min": 4.0,
      "open_now": true
    }
  }
}
```

### 9. YouTube Suchergebnisse

```json
{
  "jsonrpc": "2.0",
  "id": 9,
  "method": "tools/call",
  "params": {
    "name": "serp_youtube_organic_live",
    "arguments": {
      "keyword": "seo tutorial",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "depth": 20
    }
  }
}
```

### 10. YouTube Video Info

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "method": "tools/call",
  "params": {
    "name": "serp_youtube_video_info_live_advanced",
    "arguments": {
      "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop"
    }
  }
}
```

### 11. YouTube Video Kommentare

```json
{
  "jsonrpc": "2.0",
  "id": 11,
  "method": "tools/call",
  "params": {
    "name": "serp_youtube_video_comments_live_advanced",
    "arguments": {
      "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "comment_count": 20,
      "comment_sort": "top"
    }
  }
}
```

### 12. YouTube Video Untertitel

```json
{
  "jsonrpc": "2.0",
  "id": 12,
  "method": "tools/call",
  "params": {
    "name": "serp_youtube_video_subtitles_live_advanced",
    "arguments": {
      "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop",
      "subtitle_language": "de"
    }
  }
}
```

### 13. Google Dataset Search

```json
{
  "jsonrpc": "2.0",
  "id": 13,
  "method": "tools/call",
  "params": {
    "name": "serp_google_dataset_search_live_advanced",
    "arguments": {
      "keyword": "machine learning datasets",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop"
    }
  }
}
```

### 14. Google Dataset Info

```json
{
  "jsonrpc": "2.0",
  "id": 14,
  "method": "tools/call",
  "params": {
    "name": "serp_google_dataset_info_live_advanced",
    "arguments": {
      "dataset_url": "https://www.kaggle.com/datasets/example",
      "location_name": "Germany",
      "language_code": "de",
      "device": "desktop"
    }
  }
}
```

## 🔧 Parameter-Erklärungen

### Allgemeine Parameter
- **keyword**: Suchbegriff (erforderlich)
- **location_name**: Standort (z.B. "Germany", "Berlin, Germany")
- **language_code**: Sprachcode (z.B. "de", "en", "fr")
- **device**: Gerätetyp ("desktop", "mobile", "tablet")
- **depth**: Anzahl der Ergebnisse (1-100)

### Job-spezifische Parameter
- **job_type**: Job-Typ (z.B. "software engineer", "marketing manager")
- **company**: Unternehmen (z.B. "Google", "Microsoft")
- **location**: Standort für Job-Suche
- **salary_min/max**: Gehaltsspanne
- **date_posted**: Veröffentlichungsdatum ("any", "today", "3days", "week", "month")
- **employment_type**: Beschäftigungsart ("full_time", "part_time", "contract", "temporary", "internship")
- **experience_level**: Erfahrungslevel ("entry_level", "mid_level", "senior_level", "executive")
- **education**: Bildungsabschluss ("high_school", "associate", "bachelor", "master", "doctorate")
- **remote**: Remote-Arbeit möglich (true/false)
- **sort_by**: Sortierung ("relevance", "date", "salary")

### Local Pack Parameter
- **radius**: Suchradius in km (1-500)
- **category**: Kategorie (z.B. "restaurants", "hotels", "shops")
- **price_level**: Preisniveau (1-4)
- **rating_min**: Mindestbewertung (1-5)
- **open_now**: Nur geöffnete Orte (true/false)

### YouTube-spezifische Parameter
- **video_url**: YouTube Video URL
- **video_id**: YouTube Video ID
- **subtitle_language**: Untertitel-Sprache
- **comment_count**: Anzahl der Kommentare (1-100)
- **comment_sort**: Kommentar-Sortierung ("top", "newest", "oldest")

### Image Search Parameter
- **image_url**: Bild-URL für Reverse Image Search

### Dataset Parameter
- **dataset_url**: Dataset URL für Dataset Info

## 🎯 Verwendung in Custom GPT

1. **OpenAPI Schema importieren**: `SERP-API-OPENAPI-SCHEMA.json`
2. **Authentifizierung konfigurieren**: Basic Auth mit DataForSEO Credentials
3. **Beispiele verwenden**: Diese JSON-Beispiele als Vorlage nutzen
4. **Parameter anpassen**: Je nach Anwendungsfall modifizieren

## 📊 Erwartete Antworten

Alle API-Aufrufe geben strukturierte JSON-Antworten zurück mit:
- **Organische Ergebnisse**: Titel, URL, Snippet, Position
- **Featured Snippets**: Antworten, Listen, Tabellen
- **Local Pack**: Name, Adresse, Bewertung, Öffnungszeiten
- **Jobs**: Titel, Unternehmen, Standort, Gehalt, Beschreibung
- **YouTube**: Video-Titel, Kanal, Aufrufe, Likes, Kommentare
- **Images**: Bild-URL, Quelle, Alt-Text, Dimensionen
- **Datasets**: Name, Beschreibung, Autor, Lizenz, Downloads

## 🚀 Nächste Schritte

1. **Custom GPT konfigurieren** mit dem OpenAPI Schema
2. **Erste Tests durchführen** mit den Beispiel-Anfragen
3. **Workflows entwickeln** für verschiedene SEO-Aufgaben
4. **Ergebnisse analysieren** und optimieren
