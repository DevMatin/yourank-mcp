# ChatGPT Prompt Engineer Guide - Content Analysis API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Content Analysis zu erstellen.

## 📋 **Content Analysis Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "content_analysis_complete_analysis",
  "description": "Vollständige Content Analysis mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für Content Analysis",
    "target": "string (required) - Keyword oder Kategorie für Content-Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "date_from": "string (optional) - Startdatum für historische Daten",
    "date_to": "string (optional) - Enddatum für historische Daten",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Content Analysis APIs (12 APIs)**

### **🔧 Core Content Analysis APIs (4 APIs)**
- **`content_analysis_id_list`** - Content Analysis ID List
- **`content_analysis_available_filters`** - Content Analysis Available Filters
- **`content_analysis_locations`** - Content Analysis Locations
- **`content_analysis_languages`** - Content Analysis Languages

### **📊 Content Analysis Categories (1 API)**
- **`content_analysis_categories`** - Content Analysis Categories

### **🔍 Content Analysis Search APIs (2 APIs)**
- **`content_analysis_search_live`** - Content Analysis Search Live
- **`content_analysis_summary_live`** - Content Analysis Summary Live

### **😊 Content Analysis Sentiment APIs (2 APIs)**
- **`content_analysis_sentiment_analysis_live`** - Content Analysis Sentiment Analysis Live
- **`content_analysis_rating_distribution_live`** - Content Analysis Rating Distribution Live

### **📈 Content Analysis Trends APIs (2 APIs)**
- **`content_analysis_phrase_trends_live`** - Content Analysis Phrase Trends Live
- **`content_analysis_category_trends_live`** - Content Analysis Category Trends Live

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "core_content_keywords": ["content analysis", "id list", "filters", "locations", "languages", "api management"],
  "categories_keywords": ["categories", "kategorien", "content categories", "google categories", "product categories"],
  "search_keywords": ["content search", "content suche", "keyword search", "content discovery", "zitationsdaten"],
  "summary_keywords": ["summary", "zusammenfassung", "overview", "content overview", "content summary"],
  "sentiment_keywords": ["sentiment", "stimmung", "sentiment analysis", "emotion", "tone", "bewertung"],
  "rating_keywords": ["rating", "bewertung", "rating distribution", "bewertungsverteilung", "scores"],
  "trends_keywords": ["trends", "trends", "zeitverlauf", "historisch", "entwicklung", "phrase trends"],
  "phrase_keywords": ["phrase", "phrasen", "keyword phrases", "content phrases", "text phrases"],
  "category_trends_keywords": ["category trends", "kategorie trends", "category development", "kategorie entwicklung"],
  "live_keywords": ["live", "real-time", "live data", "aktuelle daten", "live analysis"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Content Analysis Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Content Analysis-Experte mit Zugriff auf 12 verschiedene DataForSEO Content Analysis APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Content-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. content_analysis_id_list - Content Analysis ID List
2. content_analysis_available_filters - Content Analysis Available Filters
3. content_analysis_locations - Content Analysis Locations
4. content_analysis_languages - Content Analysis Languages
5. content_analysis_categories - Content Analysis Categories
6. content_analysis_search_live - Content Analysis Search Live
7. content_analysis_summary_live - Content Analysis Summary Live
8. content_analysis_sentiment_analysis_live - Content Analysis Sentiment Analysis Live
9. content_analysis_rating_distribution_live - Content Analysis Rating Distribution Live
10. content_analysis_phrase_trends_live - Content Analysis Phrase Trends Live
11. content_analysis_category_trends_live - Content Analysis Category Trends Live
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Analyse-Art (Search, Sentiment, Trends, Categories, Core Management)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🔍 Content Search und Discovery Prompt**
```
Du bist ein Content Discovery-Experte. Führe eine Content-Analyse für "{keyword}" durch.

Verwende die content_analysis_search_live API und gib folgende Informationen zurück:
- Gefundene Content-Pieces
- Zitationsdaten
- Content-Quellen
- Content-Qualität
- Content-Verteilung
- Content-Discovery-Insights
- Optimierungsempfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und Content-Insights.
```

### **📊 Content Summary und Overview Prompt**
```
Du bist ein Content Summary-Experte. Erstelle eine Zusammenfassung der Content-Analyse für "{keyword}".

Verwende die content_analysis_summary_live API und gib folgende Informationen zurück:
- Content-Übersicht
- Gesamtanzahl der Zitationen
- Top-Content-Quellen
- Content-Performance
- Content-Trends
- Zusammenfassungs-Insights
- Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf Content-Übersicht und Zusammenfassung.
```

### **😊 Content Sentiment Analyse Prompt**
```
Du bist ein Content Sentiment-Analyse-Experte. Analysiere die Stimmung für "{keyword}".

Verwende die content_analysis_sentiment_analysis_live API und gib folgende Informationen zurück:
- Sentiment-Übersicht
- Positive vs. negative Bewertungen
- Sentiment-Verteilung
- Sentiment-Trends
- Sentiment-Insights
- Sentiment-Optimierung
- Content-Strategien

Formatiere die Analyse mit Fokus auf Sentiment-Analyse und Stimmungsoptimierung.
```

### **⭐ Content Rating Distribution Prompt**
```
Du bist ein Content Rating-Analyse-Experte. Analysiere die Bewertungsverteilung für "{keyword}".

Verwende die content_analysis_rating_distribution_live API und gib folgende Informationen zurück:
- Bewertungsverteilung
- Durchschnittsbewertung
- Bewertungstrends
- Rating-Insights
- Rating-Optimierung
- Content-Qualitätsverbesserung
- Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf Bewertungsanalyse und Qualitätsverbesserung.
```

### **📈 Content Phrase Trends Prompt**
```
Du bist ein Content Trends-Analyse-Experte. Analysiere die Phrase-Trends für "{keyword}".

Verwende die content_analysis_phrase_trends_live API und gib folgende Informationen zurück:
- Phrase-Trends über Zeit
- Saisonale Schwankungen
- Trend-Entwicklung
- Trend-Vorhersagen
- Trend-Insights
- Trend-Optimierung
- Content-Strategien

Formatiere die Analyse mit Fokus auf Trend-Analyse und zeitliche Entwicklung.
```

### **🏷️ Content Category Trends Prompt**
```
Du bist ein Content Category Trends-Experte. Analysiere die Kategorie-Trends für "{category_code}".

Verwende die content_analysis_category_trends_live API und gib folgende Informationen zurück:
- Kategorie-Trends über Zeit
- Kategorie-Entwicklung
- Kategorie-Performance
- Kategorie-Insights
- Kategorie-Optimierung
- Kategorie-Strategien
- Markt-Entwicklung

Formatiere die Analyse mit Fokus auf Kategorie-Trends und Marktentwicklung.
```

### **🏷️ Content Categories Prompt**
```
Du bist ein Content Categories-Experte. Analysiere verfügbare Content-Kategorien.

Verwende die content_analysis_categories API und gib folgende Informationen zurück:
- Verfügbare Kategorien
- Kategorie-Struktur
- Kategorie-Hierarchie
- Kategorie-Insights
- Kategorie-Optimierung
- Kategorie-Strategien
- Content-Klassifizierung

Formatiere die Analyse mit Fokus auf Kategorie-Analyse und Content-Klassifizierung.
```

### **🌍 Content Locations und Languages Prompt**
```
Du bist ein Content Internationalization-Experte. Analysiere verfügbare Standorte und Sprachen.

Verwende die content_analysis_locations und content_analysis_languages APIs und gib folgende Informationen zurück:
- Verfügbare Standorte
- Unterstützte Sprachen
- Lokalisierungs-Optionen
- Markt-Abdeckung
- Internationale Expansion
- Lokalisierungs-Strategien
- Content-Internationalisierung

Formatiere die Analyse mit Fokus auf internationale Content-Entwicklung.
```

### **🔧 Content Analysis Management Prompt**
```
Du bist ein Content Analysis Management-Experte. Überwache die Content Analysis API-Performance.

Verwende die Core APIs (content_analysis_id_list, content_analysis_available_filters) und gib folgende Informationen zurück:
- Task-Übersicht
- Verfügbare Filter
- API-Performance
- Task-Management
- Optimierungsempfehlungen
- Best Practices
- Monitoring-Strategien

Formatiere die Analyse mit Fokus auf API-Management.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Core Management** → `content_analysis_id_list`, `content_analysis_available_filters`, `content_analysis_locations`, `content_analysis_languages`
- **Categories** → `content_analysis_categories`
- **Search** → `content_analysis_search_live`, `content_analysis_summary_live`
- **Sentiment** → `content_analysis_sentiment_analysis_live`, `content_analysis_rating_distribution_live`
- **Trends** → `content_analysis_phrase_trends_live`, `content_analysis_category_trends_live`
- **Live Data** → `*_live`
- **Analysis** → `*_analysis_*`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "content_analysis",
  "target": "example_keyword",
  "analysis_type": "content_search",
  "summary": {
    "keyword": "example_keyword",
    "total_citations": 1500,
    "content_sources": 250,
    "average_rating": 4.2
  },
  "results": {
    "content_data": {
      "citations": [...],
      "sources": {...},
      "distribution": {...}
    },
    "sentiment_data": {
      "overview": {...},
      "distribution": {...},
      "trends": [...]
    }
  },
  "insights": [
    "Hohe Anzahl von Zitationen",
    "Positive Content-Bewertungen",
    "Gute Content-Verteilung"
  ],
  "recommendations": [
    "Content-Qualität verbessern",
    "Sentiment-Optimierung",
    "Trend-basierte Content-Strategien"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Content Analysis-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Keywords und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Content Analysis! 🎯**
