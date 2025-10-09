# Content Analysis API Test Prompt

## 🧪 Vollständiger API-Test für Content Analysis

Teste alle Content Analysis API Endpoints systematisch mit verschiedenen Parametern und Szenarien.

### **Test-Szenario 1: Basis-Daten abrufen**

```
Teste die Content Analysis Basis-Endpoints:

1. Rufe verfügbare Filter ab: /v3/content_analysis_base mit type="available_filters"
2. Liste alle verfügbaren Standorte auf: /v3/content_analysis_base mit type="locations"  
3. Zeige alle verfügbaren Sprachen: /v3/content_analysis_base mit type="languages"
4. Liste alle verfügbaren Kategorien auf: /v3/content_analysis_base mit type="categories"

Erwarte: Strukturierte Metadaten für alle Basis-Endpoints.
```

### **Test-Szenario 2: Content-Suche und Zusammenfassung**

```
Teste die Content Analysis Suche mit verschiedenen Keywords:

1. Suche nach "künstliche Intelligenz": /v3/content_analysis_search mit type="search_live"
   - keyword: "künstliche Intelligenz"
   - page_type: ["ecommerce", "blogs"]
   - limit: 10
   - search_mode: "one_per_domain"

2. Erstelle Zusammenfassung für "machine learning": /v3/content_analysis_search mit type="summary_live"
   - keyword: "machine learning"
   - page_type: ["news", "blogs"]
   - positive_connotation_threshold: 0.3
   - internal_list_limit: 3

3. Teste mit Filters: /v3/content_analysis_search mit type="search_live"
   - keyword: "SEO"
   - filters: ["domain_rank", ">", 500]
   - order_by: ["content_info.sentiment_connotations.anger,desc"]

Erwarte: Detaillierte Zitationsdaten, Content-Übersichten und gefilterte Ergebnisse.
```

### **Test-Szenario 3: Sentiment-Analyse**

```
Teste die Sentiment-Analyse mit verschiedenen Thresholds:

1. Sentiment-Analyse für "Produktbewertung": /v3/content_analysis_sentiment mit type="sentiment_analysis_live"
   - keyword: "Produktbewertung"
   - page_type: ["ecommerce"]
   - positive_connotation_threshold: 0.4
   - sentiments_connotation_threshold: 0.4

2. Bewertungsverteilung für "Kundenservice": /v3/content_analysis_sentiment mit type="rating_distribution_live"
   - keyword: "Kundenservice"
   - page_type: ["ecommerce", "blogs"]
   - internal_list_limit: 5

3. Teste mit verschiedenen Thresholds: /v3/content_analysis_sentiment mit type="sentiment_analysis_live"
   - keyword: "Markenimage"
   - positive_connotation_threshold: 0.6 (konservativ)
   - sentiments_connotation_threshold: 0.6

Erwarte: Detaillierte Sentiment-Daten, emotionale Connotations und Bewertungsverteilungen.
```

### **Test-Szenario 4: Trend-Analyse**

```
Teste die Trend-Analyse über verschiedene Zeiträume:

1. Phrase-Trends für "Nachhaltigkeit": /v3/content_analysis_trends mit type="phrase_trends_live"
   - keyword: "Nachhaltigkeit"
   - date_from: "2023-12-19"
   - date_to: "2024-12-19"
   - date_group: "month"
   - page_type: ["news", "blogs"]

2. Kategorie-Trends für "Digitalisierung": /v3/content_analysis_trends mit type="category_trends_live"
   - keyword: "Digitalisierung"
   - date_from: "2024-06-19"
   - date_to: "2024-12-19"
   - date_group: "week"
   - internal_list_limit: 2

3. Teste mit kurzem Zeitraum: /v3/content_analysis_trends mit type="phrase_trends_live"
   - keyword: "ChatGPT"
   - date_from: "2024-09-19"
   - date_to: "2024-12-19"
   - date_group: "day"

Erwarte: Zeitreihen-Daten, Trend-Entwicklungen und Kategorie-Performance.
```

### **Test-Szenario 5: Kernfunktionen und Fehlerbehandlung**

```
Teste die Kernfunktionen und Fehlerbehandlung:

1. Task-ID-Liste abrufen: /v3/content_analysis_core mit type="id_list"
   - date_from: "2024-11-19"
   - date_to: "2024-12-19"

2. Fehler-Analyse: /v3/content_analysis_core mit type="errors"
   - date_from: "2024-11-19"
   - date_to: "2024-12-19"

3. Teste Fehlerbehandlung mit ungültigen Parametern:
   - Keyword zu kurz: "ab"
   - Ungültiges Datum: "2024-13-45"
   - Threshold außerhalb Bereich: positive_connotation_threshold: 1.5
   - Zu viele Filter: 10 Filter (max 8)

Erwarte: Task-Verwaltung, Fehler-Logs und korrekte Fehlerbehandlung.
```

### **Test-Szenario 6: Performance und Limits**

```
Teste Performance und Limits:

1. Große Keyword-Liste: /v3/content_analysis_search mit type="search_live"
   - keyword: "Technologie"
   - limit: 1000 (maximum)
   - offset: 0

2. Viele Filter: /v3/content_analysis_search mit type="search_live"
   - keyword: "Marketing"
   - filters: 8 Filter (maximum)
   - order_by: 3 Sortierregeln (maximum)

3. Lange Zeiträume: /v3/content_analysis_trends mit type="phrase_trends_live"
   - keyword: "Innovation"
   - date_from: "2022-12-19"
   - date_to: "2024-12-19"
   - date_group: "month"

Erwarte: Korrekte Limit-Behandlung, Performance-Optimierung und große Datensätze.
```

### **Test-Szenario 7: Deutsche Keywords und Lokalisierung**

```
Teste deutsche Keywords und Lokalisierung:

1. Deutsche E-Commerce-Keywords: /v3/content_analysis_search mit type="search_live"
   - keyword: "Online-Shop"
   - page_type: ["ecommerce"]
   - search_mode: "one_per_domain"

2. Deutsche Sentiment-Analyse: /v3/content_analysis_sentiment mit type="sentiment_analysis_live"
   - keyword: "Kundenzufriedenheit"
   - page_type: ["ecommerce", "blogs"]
   - positive_connotation_threshold: 0.3

3. Deutsche Trend-Analyse: /v3/content_analysis_trends mit type="phrase_trends_live"
   - keyword: "Nachhaltigkeit"
   - date_from: "2024-01-01"
   - date_to: "2024-12-19"
   - date_group: "month"

Erwarte: Deutsche Content-Analysen, lokalisierte Ergebnisse und kulturelle Sentiment-Daten.
```

## 🎯 **Erwartete Ergebnisse**

### **Erfolgreiche Tests:**
- ✅ Alle Endpoints antworten mit Status 200
- ✅ Strukturierte JSON-Responses
- ✅ Korrekte Parameter-Validierung
- ✅ Sinnvolle Content-Analyse-Daten
- ✅ Sentiment-Thresholds funktionieren
- ✅ Trend-Daten über Zeiträume
- ✅ Filter und Sortierung funktionieren

### **Fehlerbehandlung:**
- ❌ Ungültige Parameter → 400 Bad Request
- ❌ Rate Limits → 429 Too Many Requests
- ❌ Fehlende Daten → 404 Not Found
- ❌ API-Fehler → 405 Method Not Allowed

## 📊 **Test-Reporting**

Erstelle einen detaillierten Testbericht mit:
1. **API-Status**: Welche Endpoints funktionieren
2. **Performance**: Antwortzeiten und Limits
3. **Datenqualität**: Sinnvolle Content-Analyse-Ergebnisse
4. **Fehlerbehandlung**: Korrekte Fehlerbehandlung
5. **Deutsche Lokalisierung**: Deutsche Keywords und Content

## 🔧 **Tipps für erfolgreiche Tests**

- **Beginne mit Basis-Daten** für Kontext
- **Verwende realistische Keywords** für bessere Ergebnisse
- **Teste verschiedene Page-Types** für unterschiedliche Content
- **Variiere Sentiment-Thresholds** für verschiedene Analysen
- **Verwende angemessene Zeiträume** für Trend-Analysen
- **Teste Limits und Performance** für Produktionsumgebung

**Server URL**: `https://yourank-mcp.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)
