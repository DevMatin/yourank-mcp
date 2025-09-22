# ChatGPT Prompt Engineer Guide - Keywords Data API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Keywords Data-Analyse zu erstellen.

## 📋 **Keywords Data Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "keywords_data_complete_analysis",
  "description": "Vollständige Keywords Data-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für Keywords Data-Analyse",
    "target": "string (required) - Keyword oder Suchbegriff für Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "date_from": "string (optional) - Startdatum für historische Daten",
    "date_to": "string (optional) - Enddatum für historische Daten",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Keywords Data APIs (6 APIs)**

### **🔍 Google Ads Keywords APIs (3 APIs)**
- **`keywords_data_google_ads_keyword_suggestions`** - Google Ads Keyword Suggestions
- **`keywords_data_google_ads_search_volume`** - Google Ads Search Volume
- **`keywords_data_google_ads_keyword_ideas`** - Google Ads Keyword Ideas

### **🔍 Bing Keywords APIs (2 APIs)**
- **`keywords_data_bing_keyword_suggestions`** - Bing Keyword Suggestions
- **`keywords_data_bing_search_volume`** - Bing Search Volume

### **📊 Clickstream Keywords API (1 API)**
- **`keywords_data_clickstream_keyword_suggestions`** - Clickstream Keyword Suggestions

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "google_ads_keywords": ["google ads", "google adwords", "google advertising", "google ads keywords", "google ads suggestions"],
  "bing_keywords": ["bing", "bing search", "bing keywords", "bing suggestions", "microsoft search"],
  "clickstream_keywords": ["clickstream", "click stream", "user behavior", "user journey", "clickstream data"],
  "keyword_suggestions_keywords": ["keyword suggestions", "keyword ideas", "keyword research", "keyword discovery", "keyword recommendations"],
  "search_volume_keywords": ["search volume", "search volume data", "keyword volume", "search trends", "volume analysis"],
  "keyword_ideas_keywords": ["keyword ideas", "keyword concepts", "keyword brainstorming", "keyword generation", "keyword creation"],
  "seo_keywords": ["seo", "search engine optimization", "keyword optimization", "seo keywords", "search ranking"],
  "ppc_keywords": ["ppc", "pay per click", "paid advertising", "advertising keywords", "campaign keywords"],
  "research_keywords": ["keyword research", "keyword analysis", "keyword planning", "keyword strategy", "keyword insights"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Keywords Data Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Keywords Data-Analyse-Experte mit Zugriff auf 6 verschiedene DataForSEO Keywords Data APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Keywords-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. keywords_data_google_ads_keyword_suggestions - Google Ads Keyword Suggestions
2. keywords_data_google_ads_search_volume - Google Ads Search Volume
3. keywords_data_google_ads_keyword_ideas - Google Ads Keyword Ideas
4. keywords_data_bing_keyword_suggestions - Bing Keyword Suggestions
5. keywords_data_bing_search_volume - Bing Search Volume
6. keywords_data_clickstream_keyword_suggestions - Clickstream Keyword Suggestions
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Plattform (Google Ads, Bing, Clickstream)
- Gewünschte Analyse-Art (Suggestions, Search Volume, Ideas)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🔍 Google Ads Keyword Suggestions Prompt**
```
Du bist ein Google Ads Keyword Suggestions-Experte. Generiere Keyword-Vorschläge für "{seed_keyword}".

Verwende die keywords_data_google_ads_keyword_suggestions API und gib folgende Informationen zurück:
- Keyword-Vorschläge
- Keyword-Kategorien
- Keyword-Relevanz
- Keyword-Volumen
- Keyword-Schwierigkeit
- Keyword-Insights
- Optimierungsempfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und Google Ads-Insights.
```

### **📊 Google Ads Search Volume Prompt**
```
Du bist ein Google Ads Search Volume-Experte. Analysiere das Suchvolumen für "{keyword}".

Verwende die keywords_data_google_ads_search_volume API und gib folgende Informationen zurück:
- Suchvolumen-Daten
- Volumen-Trends
- Saisonale Schwankungen
- Standort-basierte Daten
- Sprach-spezifische Daten
- Volumen-Insights
- Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf Suchvolumen-Analyse und -Trends.
```

### **💡 Google Ads Keyword Ideas Prompt**
```
Du bist ein Google Ads Keyword Ideas-Experte. Generiere Keyword-Ideen für "{topic}".

Verwende die keywords_data_google_ads_keyword_ideas API und gib folgende Informationen zurück:
- Keyword-Ideen
- Ideen-Kategorien
- Ideen-Relevanz
- Ideen-Volumen
- Ideen-Schwierigkeit
- Ideen-Insights
- Content-Strategien

Formatiere die Analyse mit Fokus auf Keyword-Ideen und Content-Planung.
```

### **🔍 Bing Keyword Suggestions Prompt**
```
Du bist ein Bing Keyword Suggestions-Experte. Generiere Bing Keyword-Vorschläge für "{seed_keyword}".

Verwende die keywords_data_bing_keyword_suggestions API und gib folgende Informationen zurück:
- Bing Keyword-Vorschläge
- Bing-spezifische Keywords
- Keyword-Kategorien
- Keyword-Relevanz
- Bing-Insights
- Cross-Platform-Strategien
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Bing-spezifische Keywords.
```

### **📊 Bing Search Volume Prompt**
```
Du bist ein Bing Search Volume-Experte. Analysiere das Bing-Suchvolumen für "{keyword}".

Verwende die keywords_data_bing_search_volume API und gib folgende Informationen zurück:
- Bing Suchvolumen-Daten
- Bing Volumen-Trends
- Bing vs. Google Vergleich
- Standort-basierte Bing-Daten
- Bing-spezifische Insights
- Cross-Platform-Strategien
- Bing-Optimierung

Formatiere die Analyse mit Fokus auf Bing-Suchvolumen und Cross-Platform-Analyse.
```

### **📊 Clickstream Keyword Suggestions Prompt**
```
Du bist ein Clickstream Keyword Suggestions-Experte. Analysiere Clickstream-basierte Keyword-Vorschläge für "{topic}".

Verwende die keywords_data_clickstream_keyword_suggestions API und gib folgende Informationen zurück:
- Clickstream Keyword-Vorschläge
- User Behavior Insights
- User Journey Keywords
- Behavioral Keywords
- Clickstream-Insights
- User Experience-Strategien
- Conversion-Optimierung

Formatiere die Analyse mit Fokus auf User Behavior und Clickstream-Daten.
```

### **🔍 Cross-Platform Keyword Analysis Prompt**
```
Du bist ein Cross-Platform Keyword Analysis-Experte. Führe eine umfassende Keyword-Analyse für "{keyword}" durch.

Verwende die Google Ads und Bing APIs und gib folgende Informationen zurück:
- Google Ads Keywords
- Bing Keywords
- Cross-Platform-Vergleich
- Platform-spezifische Insights
- Unified Keyword-Strategie
- Cross-Platform-Optimierung
- ROI-Maximierung

Formatiere die Analyse mit Fokus auf Cross-Platform-Keyword-Strategien.
```

### **📈 SEO Keyword Research Prompt**
```
Du bist ein SEO Keyword Research-Experte. Führe eine umfassende SEO-Keyword-Recherche für "{topic}" durch.

Verwende die relevanten Keywords Data APIs und gib folgende Informationen zurück:
- SEO-Keywords
- Keyword-Schwierigkeit
- Suchvolumen-Daten
- Keyword-Opportunities
- SEO-Strategien
- Content-Planung
- Ranking-Optimierung

Formatiere die Analyse mit Fokus auf SEO-Keyword-Strategien.
```

### **💰 PPC Keyword Research Prompt**
```
Du bist ein PPC Keyword Research-Experte. Führe eine umfassende PPC-Keyword-Recherche für "{topic}" durch.

Verwende die Google Ads APIs und gib folgende Informationen zurück:
- PPC-Keywords
- Keyword-Kosten
- Suchvolumen-Daten
- Conversion-Potential
- PPC-Strategien
- Campaign-Planung
- ROI-Optimierung

Formatiere die Analyse mit Fokus auf PPC-Keyword-Strategien.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Google Ads** → `keywords_data_google_ads_*`
- **Bing** → `keywords_data_bing_*`
- **Clickstream** → `keywords_data_clickstream_*`
- **Keyword Suggestions** → `*_keyword_suggestions`
- **Search Volume** → `*_search_volume`
- **Keyword Ideas** → `*_keyword_ideas`
- **SEO Focus** → Alle APIs für umfassende SEO-Analyse
- **PPC Focus** → Google Ads APIs für PPC-Strategien
- **Cross-Platform** → Google Ads + Bing APIs für Vergleich

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "keywords_data_analysis",
  "target": "example_keyword",
  "platform": "google_ads",
  "analysis_type": "keyword_suggestions",
  "summary": {
    "keyword": "example_keyword",
    "total_suggestions": 150,
    "average_volume": 5000,
    "difficulty_score": "medium"
  },
  "results": {
    "keyword_data": {
      "suggestions": [...],
      "categories": {...},
      "volume_data": {...}
    },
    "platform_data": {
      "google_ads": {...},
      "bing": {...},
      "clickstream": {...}
    }
  },
  "insights": [
    "Hohe Keyword-Vielfalt",
    "Gute Suchvolumen-Verteilung",
    "Moderate Keyword-Schwierigkeit"
  ],
  "recommendations": [
    "Long-tail Keywords nutzen",
    "Volume-basierte Priorisierung",
    "Cross-Platform-Strategien entwickeln"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Keywords Data-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Keywords und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Keywords Data-Analyse! 🎯**
