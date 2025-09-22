# ChatGPT Prompt Engineer Guide - OnPage API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die OnPage API zu erstellen.

## 📋 **OnPage Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "onpage_complete_analysis",
  "description": "Vollständige OnPage-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für OnPage-Analyse",
    "target": "string (required) - URL oder Domain für OnPage-Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare OnPage APIs (30 APIs)**

### **🔧 Core OnPage APIs (4 APIs)**
- **`onpage_id_list`** - OnPage ID List
- **`onpage_errors`** - OnPage Errors
- **`onpage_available_filters`** - OnPage Available Filters
- **`onpage_tasks_ready`** - OnPage Tasks Ready

### **📊 OnPage Analysis APIs (8 APIs)**
- **`onpage_instant_pages`** - Instant Pages
- **`onpage_page_content`** - Page Content
- **`onpage_links`** - OnPage Links
- **`onpage_redirect_chains`** - Redirect Chains
- **`onpage_duplicate_content`** - Duplicate Content
- **`onpage_duplicate_tags`** - Duplicate Tags
- **`onpage_duplicate_meta`** - Duplicate Meta
- **`onpage_duplicate_title`** - Duplicate Title

### **🔍 OnPage Search APIs (4 APIs)**
- **`onpage_search`** - OnPage Search
- **`onpage_search_live`** - OnPage Search Live
- **`onpage_search_by_id`** - OnPage Search by ID
- **`onpage_search_by_id_live`** - OnPage Search by ID Live

### **📈 OnPage Lighthouse APIs (4 APIs)**
- **`onpage_lighthouse_live`** - Lighthouse Live
- **`onpage_lighthouse_task_post`** - Lighthouse Task Post
- **`onpage_lighthouse_task_get`** - Lighthouse Task Get
- **`onpage_lighthouse_tasks_ready`** - Lighthouse Tasks Ready

### **🔗 OnPage Links APIs (4 APIs)**
- **`onpage_links_live`** - Links Live
- **`onpage_links_task_post`** - Links Task Post
- **`onpage_links_task_get`** - Links Task Get
- **`onpage_links_tasks_ready`** - Links Tasks Ready

### **📄 OnPage Content APIs (4 APIs)**
- **`onpage_content_parsing_live`** - Content Parsing Live
- **`onpage_content_parsing_task_post`** - Content Parsing Task Post
- **`onpage_content_parsing_task_get`** - Content Parsing Task Get
- **`onpage_content_parsing_tasks_ready`** - Content Parsing Tasks Ready

### **📊 OnPage Summary APIs (2 APIs)**
- **`onpage_summary`** - OnPage Summary
- **`onpage_summary_live`** - OnPage Summary Live

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "core_onpage_keywords": ["onpage", "on page", "on-page", "id list", "errors", "filters", "tasks"],
  "analysis_keywords": ["analysis", "analyse", "instant pages", "page content", "links", "redirects"],
  "duplicate_keywords": ["duplicate", "duplikate", "duplicate content", "duplicate tags", "duplicate meta", "duplicate title"],
  "search_keywords": ["search", "suche", "onpage search", "search by id", "search live"],
  "lighthouse_keywords": ["lighthouse", "performance", "core web vitals", "page speed", "performance audit"],
  "links_keywords": ["links", "verlinkungen", "onpage links", "internal links", "link analysis"],
  "content_keywords": ["content", "inhalt", "content parsing", "content analysis", "text analysis"],
  "summary_keywords": ["summary", "zusammenfassung", "onpage summary", "overview", "übersicht"],
  "instant_keywords": ["instant", "sofort", "instant pages", "real-time", "live"],
  "task_keywords": ["task", "aufgabe", "task post", "task get", "tasks ready"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für OnPage Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein OnPage API-Analyse-Experte mit Zugriff auf 30 verschiedene DataForSEO OnPage APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte OnPage-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. onpage_id_list - OnPage ID List
2. onpage_errors - OnPage Errors
3. onpage_available_filters - OnPage Available Filters
4. onpage_tasks_ready - OnPage Tasks Ready
5. onpage_instant_pages - Instant Pages
6. onpage_page_content - Page Content
7. onpage_links - OnPage Links
8. onpage_redirect_chains - Redirect Chains
9. onpage_duplicate_content - Duplicate Content
10. onpage_duplicate_tags - Duplicate Tags
11. onpage_duplicate_meta - Duplicate Meta
12. onpage_duplicate_title - Duplicate Title
13. onpage_search - OnPage Search
14. onpage_search_live - OnPage Search Live
15. onpage_search_by_id - OnPage Search by ID
16. onpage_search_by_id_live - OnPage Search by ID Live
17. onpage_lighthouse_live - Lighthouse Live
18. onpage_lighthouse_task_post - Lighthouse Task Post
19. onpage_lighthouse_task_get - Lighthouse Task Get
20. onpage_lighthouse_tasks_ready - Lighthouse Tasks Ready
21. onpage_links_live - Links Live
22. onpage_links_task_post - Links Task Post
23. onpage_links_task_get - Links Task Get
24. onpage_links_tasks_ready - Links Tasks Ready
25. onpage_content_parsing_live - Content Parsing Live
26. onpage_content_parsing_task_post - Content Parsing Task Post
27. onpage_content_parsing_task_get - Content Parsing Task Get
28. onpage_content_parsing_tasks_ready - Content Parsing Tasks Ready
29. onpage_summary - OnPage Summary
30. onpage_summary_live - OnPage Summary Live
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Analyse-Art (Analysis, Search, Lighthouse, Links, Content, Summary)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **📊 OnPage Summary Analysis Prompt**
```
Du bist ein OnPage Summary Analysis-Experte. Erstelle eine OnPage-Zusammenfassung für "{url}".

Verwende die onpage_summary_live API und gib folgende Informationen zurück:
- OnPage-Übersicht
- Seiten-Performance
- Technische Metriken
- SEO-Insights
- Performance-Übersicht
- Zusammenfassungs-Insights
- Optimierungsempfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und OnPage-Insights.
```

### **🔍 OnPage Search Analysis Prompt**
```
Du bist ein OnPage Search Analysis-Experte. Führe eine OnPage-Suche für "{url}" durch.

Verwende die onpage_search_live API und gib folgende Informationen zurück:
- OnPage-Suchergebnisse
- Seiten-Informationen
- Technische Details
- SEO-Metriken
- Performance-Daten
- Such-Insights
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf OnPage-Suchanalyse.
```

### **📈 Lighthouse Performance Analysis Prompt**
```
Du bist ein Lighthouse Performance Analysis-Experte. Analysiere die Performance für "{url}".

Verwende die onpage_lighthouse_live API und gib folgende Informationen zurück:
- Lighthouse-Scores
- Core Web Vitals
- Performance-Metriken
- Accessibility-Scores
- Best Practices
- SEO-Scores
- Performance-Optimierung

Formatiere die Analyse mit Fokus auf Lighthouse-Performance-Analyse.
```

### **🔗 OnPage Links Analysis Prompt**
```
Du bist ein OnPage Links Analysis-Experte. Analysiere die Links für "{url}".

Verwende die onpage_links_live API und gib folgende Informationen zurück:
- Link-Übersicht
- Interne Links
- Externe Links
- Link-Qualität
- Link-Struktur
- Link-Insights
- Link-Optimierung

Formatiere die Analyse mit Fokus auf OnPage-Link-Analyse.
```

### **📄 Content Parsing Analysis Prompt**
```
Du bist ein Content Parsing Analysis-Experte. Analysiere den Content für "{url}".

Verwende die onpage_content_parsing_live API und gib folgende Informationen zurück:
- Content-Übersicht
- Text-Analyse
- Content-Struktur
- Content-Qualität
- Content-Insights
- Content-Optimierung
- SEO-Content-Strategien

Formatiere die Analyse mit Fokus auf Content-Parsing-Analyse.
```

### **🔄 Redirect Chains Analysis Prompt**
```
Du bist ein Redirect Chains Analysis-Experte. Analysiere die Redirect-Ketten für "{url}".

Verwende die onpage_redirect_chains API und gib folgende Informationen zurück:
- Redirect-Übersicht
- Redirect-Ketten
- Redirect-Status
- Redirect-Performance
- Redirect-Insights
- Redirect-Optimierung
- SEO-Redirect-Strategien

Formatiere die Analyse mit Fokus auf Redirect-Ketten-Analyse.
```

### **📋 Duplicate Content Analysis Prompt**
```
Du bist ein Duplicate Content Analysis-Experte. Analysiere Duplikate für "{url}".

Verwende die relevanten Duplicate APIs und gib folgende Informationen zurück:
- Duplicate Content
- Duplicate Tags
- Duplicate Meta
- Duplicate Title
- Duplicate-Insights
- Duplicate-Optimierung
- SEO-Duplicate-Strategien

Formatiere die Analyse mit Fokus auf Duplicate-Content-Analyse.
```

### **⚡ Instant Pages Analysis Prompt**
```
Du bist ein Instant Pages Analysis-Experte. Analysiere die Instant Pages für "{url}".

Verwende die onpage_instant_pages API und gib folgende Informationen zurück:
- Instant Pages-Übersicht
- Seiten-Performance
- Technische Metriken
- Instant-Insights
- Performance-Optimierung
- Instant-Strategien
- SEO-Instant-Optimierung

Formatiere die Analyse mit Fokus auf Instant Pages-Analyse.
```

### **🔧 OnPage Management Prompt**
```
Du bist ein OnPage Management-Experte. Überwache die OnPage API-Performance.

Verwende die Core APIs (onpage_id_list, onpage_errors, onpage_available_filters, onpage_tasks_ready) und gib folgende Informationen zurück:
- Task-Übersicht
- Fehleranalyse
- Verfügbare Filter
- Task-Management
- API-Performance
- Optimierungsempfehlungen
- Monitoring-Strategien

Formatiere die Analyse mit Fokus auf OnPage API-Management.
```

### **📊 Comprehensive OnPage Analysis Prompt**
```
Du bist ein Comprehensive OnPage Analysis-Experte. Führe eine umfassende OnPage-Analyse für "{url}" durch.

Verwende alle relevanten OnPage APIs und gib folgende Informationen zurück:
- OnPage-Zusammenfassung
- Performance-Analyse
- Link-Analyse
- Content-Analyse
- SEO-Insights
- Technische Metriken
- Umfassende Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf umfassende OnPage-Analyse.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Core Management** → `onpage_id_list`, `onpage_errors`, `onpage_available_filters`, `onpage_tasks_ready`
- **Summary** → `onpage_summary`, `onpage_summary_live`
- **Search** → `onpage_search*`, `onpage_search_by_id*`
- **Lighthouse** → `onpage_lighthouse*`
- **Links** → `onpage_links*`
- **Content** → `onpage_content_parsing*`
- **Analysis** → `onpage_instant_pages`, `onpage_page_content`, `onpage_redirect_chains`
- **Duplicates** → `onpage_duplicate*`
- **Live Data** → `*_live`
- **Task Management** → `*_task_*`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "onpage_analysis",
  "target": "example.com",
  "analysis_type": "comprehensive",
  "summary": {
    "url": "example.com",
    "lighthouse_score": 85,
    "core_web_vitals": "good",
    "seo_score": 92
  },
  "results": {
    "summary_data": {
      "overview": {...},
      "performance": {...},
      "seo": {...}
    },
    "lighthouse_data": {
      "scores": {...},
      "metrics": {...},
      "recommendations": [...]
    },
    "links_data": {
      "links": [...],
      "structure": {...},
      "quality": {...}
    }
  },
  "insights": [
    "Gute Lighthouse-Performance",
    "Optimale Core Web Vitals",
    "Strukturierte Link-Architektur"
  ],
  "recommendations": [
    "Performance weiter optimieren",
    "Link-Struktur verbessern",
    "Content-Qualität erhöhen"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene OnPage-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen URLs und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für OnPage API-Analyse! 🎯**
