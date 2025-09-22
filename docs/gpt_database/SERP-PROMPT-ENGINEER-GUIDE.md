# ChatGPT Prompt Engineer Guide - SERP API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die SERP API zu erstellen.

## 📋 **SERP Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "serp_complete_analysis",
  "description": "Vollständige SERP-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für SERP-Analyse",
    "target": "string (required) - Suchbegriff oder Domain für SERP-Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Suche",
    "language_code": "string (default: en) - Sprachcode",
    "search_engine": "enum (optional) - Suchmaschine (Google, Bing, YouTube)",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare SERP APIs (50+ APIs)**

### **🔍 Google SERP APIs (15+ APIs)**
- **`serp_google`** - Google SERP
- **`serp_google_live`** - Google SERP Live
- **`serp_google_task_post`** - Google SERP Task Post
- **`serp_google_task_get`** - Google SERP Task Get
- **`serp_google_tasks_ready`** - Google SERP Tasks Ready
- **`serp_google_organic`** - Google Organic SERP
- **`serp_google_organic_live`** - Google Organic SERP Live
- **`serp_google_organic_task_post`** - Google Organic SERP Task Post
- **`serp_google_organic_task_get`** - Google Organic SERP Task Get
- **`serp_google_organic_tasks_ready`** - Google Organic SERP Tasks Ready
- **`serp_google_local_pack`** - Google Local Pack SERP
- **`serp_google_local_pack_live`** - Google Local Pack SERP Live
- **`serp_google_local_pack_task_post`** - Google Local Pack SERP Task Post
- **`serp_google_local_pack_task_get`** - Google Local Pack SERP Task Get
- **`serp_google_local_pack_tasks_ready`** - Google Local Pack SERP Tasks Ready

### **🔍 Bing SERP APIs (15+ APIs)**
- **`serp_bing`** - Bing SERP
- **`serp_bing_live`** - Bing SERP Live
- **`serp_bing_task_post`** - Bing SERP Task Post
- **`serp_bing_task_get`** - Bing SERP Task Get
- **`serp_bing_tasks_ready`** - Bing SERP Tasks Ready
- **`serp_bing_organic`** - Bing Organic SERP
- **`serp_bing_organic_live`** - Bing Organic SERP Live
- **`serp_bing_organic_task_post`** - Bing Organic SERP Task Post
- **`serp_bing_organic_task_get`** - Bing Organic SERP Task Get
- **`serp_bing_organic_tasks_ready`** - Bing Organic SERP Tasks Ready
- **`serp_bing_local_pack`** - Bing Local Pack SERP
- **`serp_bing_local_pack_live`** - Bing Local Pack SERP Live
- **`serp_bing_local_pack_task_post`** - Bing Local Pack SERP Task Post
- **`serp_bing_local_pack_task_get`** - Bing Local Pack SERP Task Get
- **`serp_bing_local_pack_tasks_ready`** - Bing Local Pack SERP Tasks Ready

### **📺 YouTube SERP APIs (10+ APIs)**
- **`serp_youtube`** - YouTube SERP
- **`serp_youtube_live`** - YouTube SERP Live
- **`serp_youtube_task_post`** - YouTube SERP Task Post
- **`serp_youtube_task_get`** - YouTube SERP Task Get
- **`serp_youtube_tasks_ready`** - YouTube SERP Tasks Ready
- **`serp_youtube_organic`** - YouTube Organic SERP
- **`serp_youtube_organic_live`** - YouTube Organic SERP Live
- **`serp_youtube_organic_task_post`** - YouTube Organic SERP Task Post
- **`serp_youtube_organic_task_get`** - YouTube Organic SERP Task Get
- **`serp_youtube_organic_tasks_ready`** - YouTube Organic SERP Tasks Ready

### **🔧 SERP Utility APIs (10+ APIs)**
- **`serp_available_filters`** - SERP Available Filters
- **`serp_errors`** - SERP Errors
- **`serp_id_list`** - SERP ID List
- **`serp_tasks_ready`** - SERP Tasks Ready
- **`serp_competitors`** - SERP Competitors
- **`serp_competitors_live`** - SERP Competitors Live
- **`serp_competitors_task_post`** - SERP Competitors Task Post
- **`serp_competitors_task_get`** - SERP Competitors Task Get
- **`serp_competitors_tasks_ready`** - SERP Competitors Tasks Ready

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "google_keywords": ["google", "google serp", "google search", "google organic", "google local"],
  "bing_keywords": ["bing", "bing serp", "bing search", "bing organic", "bing local"],
  "youtube_keywords": ["youtube", "youtube serp", "youtube search", "youtube organic", "video search"],
  "organic_keywords": ["organic", "organic serp", "organic search", "natural search", "organic results"],
  "local_keywords": ["local", "local pack", "local search", "local business", "near me"],
  "live_keywords": ["live", "real-time", "instant", "live serp", "live search"],
  "task_keywords": ["task", "aufgabe", "task post", "task get", "tasks ready"],
  "competitors_keywords": ["competitors", "wettbewerber", "competition", "competitive analysis"],
  "serp_general_keywords": ["serp", "search engine results", "search results", "serp analysis"],
  "utility_keywords": ["filters", "errors", "id list", "available filters", "utility"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für SERP Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein SERP API-Analyse-Experte mit Zugriff auf 50+ verschiedene DataForSEO SERP APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte SERP-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. serp_google - Google SERP
2. serp_google_live - Google SERP Live
3. serp_google_organic - Google Organic SERP
4. serp_google_local_pack - Google Local Pack SERP
5. serp_bing - Bing SERP
6. serp_bing_live - Bing SERP Live
7. serp_bing_organic - Bing Organic SERP
8. serp_bing_local_pack - Bing Local Pack SERP
9. serp_youtube - YouTube SERP
10. serp_youtube_live - YouTube SERP Live
11. serp_youtube_organic - YouTube Organic SERP
12. serp_competitors - SERP Competitors
13. serp_available_filters - SERP Available Filters
14. serp_errors - SERP Errors
15. serp_id_list - SERP ID List
16. serp_tasks_ready - SERP Tasks Ready
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Suchmaschine (Google, Bing, YouTube)
- Art der Suche (Organic, Local, General)
- Live vs. Task-basierte Analyse
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🔍 Google SERP Analysis Prompt**
```
Du bist ein Google SERP Analysis-Experte. Analysiere die Google-Suchergebnisse für "{keyword}".

Verwende die serp_google_live API und gib folgende Informationen zurück:
- Google SERP-Übersicht
- Organische Suchergebnisse
- Featured Snippets
- Local Pack Ergebnisse
- Paid Ads
- SERP-Features
- Google-Insights
- SEO-Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Google SERP-Analyse.
```

### **🔍 Bing SERP Analysis Prompt**
```
Du bist ein Bing SERP Analysis-Experte. Analysiere die Bing-Suchergebnisse für "{keyword}".

Verwende die serp_bing_live API und gib folgende Informationen zurück:
- Bing SERP-Übersicht
- Organische Suchergebnisse
- Bing-Features
- Local Pack Ergebnisse
- Paid Ads
- SERP-Struktur
- Bing-Insights
- SEO-Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Bing SERP-Analyse.
```

### **📺 YouTube SERP Analysis Prompt**
```
Du bist ein YouTube SERP Analysis-Experte. Analysiere die YouTube-Suchergebnisse für "{keyword}".

Verwende die serp_youtube_live API und gib folgende Informationen zurück:
- YouTube SERP-Übersicht
- Video-Suchergebnisse
- Channel-Ergebnisse
- Playlist-Ergebnisse
- Video-Metriken
- YouTube-Features
- Video-Insights
- YouTube-Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf YouTube SERP-Analyse.
```

### **🏢 Local Pack SERP Analysis Prompt**
```
Du bist ein Local Pack SERP Analysis-Experte. Analysiere die Local Pack-Suchergebnisse für "{keyword}".

Verwende die serp_google_local_pack_live API und gib folgende Informationen zurück:
- Local Pack-Übersicht
- Lokale Geschäfte
- Bewertungen
- Öffnungszeiten
- Kontaktinformationen
- Local SEO-Insights
- Local-Optimierungsempfehlungen
- Google My Business-Strategien

Formatiere die Analyse mit Fokus auf Local Pack SERP-Analyse.
```

### **🌱 Organic SERP Analysis Prompt**
```
Du bist ein Organic SERP Analysis-Experte. Analysiere die organischen Suchergebnisse für "{keyword}".

Verwende die serp_google_organic_live API und gib folgende Informationen zurück:
- Organische SERP-Übersicht
- Top-Suchergebnisse
- Featured Snippets
- Knowledge Graph
- People Also Ask
- Related Searches
- Organic SEO-Insights
- Content-Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Organic SERP-Analyse.
```

### **🏆 Competitors SERP Analysis Prompt**
```
Du bist ein Competitors SERP Analysis-Experte. Analysiere die Wettbewerber für "{keyword}".

Verwende die serp_competitors_live API und gib folgende Informationen zurück:
- Wettbewerber-Übersicht
- Top-Konkurrenten
- Wettbewerbsanalyse
- Marktpositionierung
- Competitive Insights
- Wettbewerbsstrategien
- Marktanalyse
- Competitive Intelligence

Formatiere die Analyse mit Fokus auf Competitors SERP-Analyse.
```

### **📊 Cross-Platform SERP Analysis Prompt**
```
Du bist ein Cross-Platform SERP Analysis-Experte. Vergleiche die Suchergebnisse zwischen Google, Bing und YouTube für "{keyword}".

Verwende die relevanten SERP APIs und gib folgende Informationen zurück:
- Google vs. Bing vs. YouTube Vergleich
- Plattform-spezifische Unterschiede
- Cross-Platform Insights
- Multi-Platform Strategien
- Plattform-Optimierung
- Cross-Platform SEO
- Integrierte Marketing-Strategien
- Plattform-spezifische Empfehlungen

Formatiere die Analyse mit Fokus auf Cross-Platform SERP-Analyse.
```

### **⚡ Live SERP Analysis Prompt**
```
Du bist ein Live SERP Analysis-Experte. Führe eine Live-SERP-Analyse für "{keyword}" durch.

Verwende die Live SERP APIs und gib folgende Informationen zurück:
- Live SERP-Übersicht
- Echtzeit-Suchergebnisse
- Live-Insights
- Aktuelle Trends
- Live-Performance
- Real-time Optimierung
- Live-Monitoring
- Sofortige Empfehlungen

Formatiere die Analyse mit Fokus auf Live SERP-Analyse.
```

### **🔧 SERP Management Prompt**
```
Du bist ein SERP Management-Experte. Überwache die SERP API-Performance.

Verwende die Utility APIs (serp_available_filters, serp_errors, serp_id_list, serp_tasks_ready) und gib folgende Informationen zurück:
- SERP API-Übersicht
- Verfügbare Filter
- Fehleranalyse
- Task-Management
- API-Performance
- Optimierungsempfehlungen
- Monitoring-Strategien
- SERP API-Best Practices

Formatiere die Analyse mit Fokus auf SERP API-Management.
```

### **📊 Comprehensive SERP Analysis Prompt**
```
Du bist ein Comprehensive SERP Analysis-Experte. Führe eine umfassende SERP-Analyse für "{keyword}" durch.

Verwende alle relevanten SERP APIs und gib folgende Informationen zurück:
- Multi-Platform SERP-Übersicht
- Google SERP-Analyse
- Bing SERP-Analyse
- YouTube SERP-Analyse
- Local Pack-Analyse
- Organic SERP-Analyse
- Wettbewerbsanalyse
- Umfassende SERP-Insights
- Cross-Platform Strategien
- Integrierte Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf umfassende SERP-Analyse.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Google SERP** → `serp_google*`, `serp_google_organic*`, `serp_google_local_pack*`
- **Bing SERP** → `serp_bing*`, `serp_bing_organic*`, `serp_bing_local_pack*`
- **YouTube SERP** → `serp_youtube*`, `serp_youtube_organic*`
- **Organic Search** → `*_organic*`
- **Local Search** → `*_local_pack*`
- **Live Data** → `*_live`
- **Task Management** → `*_task_*`
- **Competitors** → `serp_competitors*`
- **Utility** → `serp_available_filters`, `serp_errors`, `serp_id_list`, `serp_tasks_ready`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "serp_analysis",
  "target": "example keyword",
  "search_engine": "google",
  "serp_type": "organic",
  "summary": {
    "keyword": "example keyword",
    "total_results": 1000000,
    "serp_features": ["featured snippet", "local pack", "people also ask"],
    "platform": "google"
  },
  "results": {
    "google_serp_data": {
      "organic_results": [...],
      "featured_snippet": {...},
      "local_pack": [...],
      "paid_ads": [...]
    },
    "bing_serp_data": {
      "organic_results": [...],
      "bing_features": [...],
      "local_results": [...]
    },
    "youtube_serp_data": {
      "video_results": [...],
      "channel_results": [...],
      "playlist_results": [...]
    }
  },
  "insights": [
    "Google dominiert die organischen Ergebnisse",
    "Local Pack ist prominent platziert",
    "Featured Snippet bietet hohe Sichtbarkeit"
  ],
  "recommendations": [
    "Featured Snippet optimieren",
    "Local SEO verstärken",
    "Video-Content für YouTube erstellen"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene SERP-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Keywords und Suchmaschinen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für SERP API-Analyse! 🎯**
