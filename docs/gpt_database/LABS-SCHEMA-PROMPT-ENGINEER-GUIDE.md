# ChatGPT Prompt Engineer Guide - Labs API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Labs API zu erstellen.

## 📋 **Labs Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "labs_complete_analysis",
  "description": "Vollständige Labs-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für Labs-Analyse",
    "target": "string (required) - Domain, Keyword oder Suchbegriff für Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "date_from": "string (optional) - Startdatum für historische Daten",
    "date_to": "string (optional) - Enddatum für historische Daten",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Labs APIs (20 APIs)**

### **🔍 Google Labs APIs (5 APIs)**
- **`labs_google_competitors_live`** - Google Competitors Live
- **`labs_google_keyword_suggestions_live`** - Google Keyword Suggestions Live
- **`labs_google_keyword_ideas_live`** - Google Keyword Ideas Live
- **`labs_google_search_volume_live`** - Google Search Volume Live
- **`labs_google_traffic_analytics_live`** - Google Traffic Analytics Live

### **🔍 Bing Labs APIs (5 APIs)**
- **`labs_bing_competitors_live`** - Bing Competitors Live
- **`labs_bing_keyword_suggestions_live`** - Bing Keyword Suggestions Live
- **`labs_bing_keyword_ideas_live`** - Bing Keyword Ideas Live
- **`labs_bing_search_volume_live`** - Bing Search Volume Live
- **`labs_bing_traffic_analytics_live`** - Bing Traffic Analytics Live

### **🔍 Amazon Labs APIs (5 APIs)**
- **`labs_amazon_competitors_live`** - Amazon Competitors Live
- **`labs_amazon_keyword_suggestions_live`** - Amazon Keyword Suggestions Live
- **`labs_amazon_keyword_ideas_live`** - Amazon Keyword Ideas Live
- **`labs_amazon_search_volume_live`** - Amazon Search Volume Live
- **`labs_amazon_traffic_analytics_live`** - Amazon Traffic Analytics Live

### **🔍 Apple App Store Labs APIs (5 APIs)**
- **`labs_apple_app_store_competitors_live`** - Apple App Store Competitors Live
- **`labs_apple_app_store_keyword_suggestions_live`** - Apple App Store Keyword Suggestions Live
- **`labs_apple_app_store_keyword_ideas_live`** - Apple App Store Keyword Ideas Live
- **`labs_apple_app_store_search_volume_live`** - Apple App Store Search Volume Live
- **`labs_apple_app_store_traffic_analytics_live`** - Apple App Store Traffic Analytics Live

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "google_labs_keywords": ["google labs", "google competitors", "google keywords", "google search volume", "google traffic"],
  "bing_labs_keywords": ["bing labs", "bing competitors", "bing keywords", "bing search volume", "bing traffic"],
  "amazon_labs_keywords": ["amazon labs", "amazon competitors", "amazon keywords", "amazon search volume", "amazon traffic"],
  "apple_labs_keywords": ["apple app store", "app store labs", "app store competitors", "app store keywords", "app store traffic"],
  "competitors_keywords": ["competitors", "konkurrenten", "wettbewerb", "competition", "rivalen"],
  "keyword_suggestions_keywords": ["keyword suggestions", "keyword ideas", "keyword research", "keyword discovery"],
  "search_volume_keywords": ["search volume", "search volume data", "keyword volume", "search trends"],
  "traffic_analytics_keywords": ["traffic analytics", "traffic analysis", "traffic data", "traffic insights"],
  "labs_keywords": ["labs", "research", "experimental", "advanced", "cutting-edge"],
  "live_keywords": ["live", "real-time", "live data", "aktuelle daten", "live analysis"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Labs Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Labs API-Analyse-Experte mit Zugriff auf 20 verschiedene DataForSEO Labs APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Labs-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. labs_google_competitors_live - Google Competitors Live
2. labs_google_keyword_suggestions_live - Google Keyword Suggestions Live
3. labs_google_keyword_ideas_live - Google Keyword Ideas Live
4. labs_google_search_volume_live - Google Search Volume Live
5. labs_google_traffic_analytics_live - Google Traffic Analytics Live
6. labs_bing_competitors_live - Bing Competitors Live
7. labs_bing_keyword_suggestions_live - Bing Keyword Suggestions Live
8. labs_bing_keyword_ideas_live - Bing Keyword Ideas Live
9. labs_bing_search_volume_live - Bing Search Volume Live
10. labs_bing_traffic_analytics_live - Bing Traffic Analytics Live
11. labs_amazon_competitors_live - Amazon Competitors Live
12. labs_amazon_keyword_suggestions_live - Amazon Keyword Suggestions Live
13. labs_amazon_keyword_ideas_live - Amazon Keyword Ideas Live
14. labs_amazon_search_volume_live - Amazon Search Volume Live
15. labs_amazon_traffic_analytics_live - Amazon Traffic Analytics Live
16. labs_apple_app_store_competitors_live - Apple App Store Competitors Live
17. labs_apple_app_store_keyword_suggestions_live - Apple App Store Keyword Suggestions Live
18. labs_apple_app_store_keyword_ideas_live - Apple App Store Keyword Ideas Live
19. labs_apple_app_store_search_volume_live - Apple App Store Search Volume Live
20. labs_apple_app_store_traffic_analytics_live - Apple App Store Traffic Analytics Live
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Plattform (Google, Bing, Amazon, Apple App Store)
- Gewünschte Analyse-Art (Competitors, Keywords, Search Volume, Traffic)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🏆 Google Competitors Analysis Prompt**
```
Du bist ein Google Competitors Analysis-Experte. Analysiere die Google-Konkurrenten für "{domain}".

Verwende die labs_google_competitors_live API und gib folgende Informationen zurück:
- Top-Konkurrenten
- Konkurrenz-Metriken
- Wettbewerbsvorteile
- Konkurrenz-Strategien
- Marktpositionierung
- Konkurrenz-Insights
- Strategische Empfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und Google-Konkurrenz-Insights.
```

### **🔍 Google Keyword Suggestions Prompt**
```
Du bist ein Google Keyword Suggestions-Experte. Generiere Google Keyword-Vorschläge für "{seed_keyword}".

Verwende die labs_google_keyword_suggestions_live API und gib folgende Informationen zurück:
- Keyword-Vorschläge
- Keyword-Kategorien
- Keyword-Relevanz
- Keyword-Volumen
- Keyword-Schwierigkeit
- Keyword-Insights
- SEO-Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Google-Keyword-Strategien.
```

### **💡 Google Keyword Ideas Prompt**
```
Du bist ein Google Keyword Ideas-Experte. Generiere Google Keyword-Ideen für "{topic}".

Verwende die labs_google_keyword_ideas_live API und gib folgende Informationen zurück:
- Keyword-Ideen
- Ideen-Kategorien
- Ideen-Relevanz
- Ideen-Volumen
- Ideen-Schwierigkeit
- Ideen-Insights
- Content-Strategien

Formatiere die Analyse mit Fokus auf Google-Keyword-Ideen und Content-Planung.
```

### **📊 Google Search Volume Prompt**
```
Du bist ein Google Search Volume-Experte. Analysiere das Google-Suchvolumen für "{keyword}".

Verwende die labs_google_search_volume_live API und gib folgende Informationen zurück:
- Suchvolumen-Daten
- Volumen-Trends
- Saisonale Schwankungen
- Standort-basierte Daten
- Sprach-spezifische Daten
- Volumen-Insights
- SEO-Strategien

Formatiere die Analyse mit Fokus auf Google-Suchvolumen und SEO-Optimierung.
```

### **📈 Google Traffic Analytics Prompt**
```
Du bist ein Google Traffic Analytics-Experte. Analysiere die Google-Traffic-Daten für "{domain}".

Verwende die labs_google_traffic_analytics_live API und gib folgende Informationen zurück:
- Traffic-Daten
- Traffic-Trends
- Traffic-Quellen
- Traffic-Verteilung
- Traffic-Insights
- Traffic-Optimierung
- Performance-Strategien

Formatiere die Analyse mit Fokus auf Google-Traffic-Analyse und Performance-Optimierung.
```

### **🏆 Bing Competitors Analysis Prompt**
```
Du bist ein Bing Competitors Analysis-Experte. Analysiere die Bing-Konkurrenten für "{domain}".

Verwende die labs_bing_competitors_live API und gib folgende Informationen zurück:
- Bing Top-Konkurrenten
- Bing Konkurrenz-Metriken
- Bing Wettbewerbsvorteile
- Bing Konkurrenz-Strategien
- Bing Marktpositionierung
- Bing Konkurrenz-Insights
- Bing Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf Bing-Konkurrenz-Analyse.
```

### **🏆 Amazon Competitors Analysis Prompt**
```
Du bist ein Amazon Competitors Analysis-Experte. Analysiere die Amazon-Konkurrenten für "{product}".

Verwende die labs_amazon_competitors_live API und gib folgende Informationen zurück:
- Amazon Top-Konkurrenten
- Amazon Konkurrenz-Metriken
- Amazon Wettbewerbsvorteile
- Amazon Konkurrenz-Strategien
- Amazon Marktpositionierung
- Amazon Konkurrenz-Insights
- Amazon Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf Amazon-Konkurrenz-Analyse.
```

### **🏆 Apple App Store Competitors Analysis Prompt**
```
Du bist ein Apple App Store Competitors Analysis-Experte. Analysiere die App Store-Konkurrenten für "{app}".

Verwende die labs_apple_app_store_competitors_live API und gib folgende Informationen zurück:
- App Store Top-Konkurrenten
- App Store Konkurrenz-Metriken
- App Store Wettbewerbsvorteile
- App Store Konkurrenz-Strategien
- App Store Marktpositionierung
- App Store Konkurrenz-Insights
- App Store Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf App Store-Konkurrenz-Analyse.
```

### **🔍 Cross-Platform Competitors Analysis Prompt**
```
Du bist ein Cross-Platform Competitors Analysis-Experte. Führe eine umfassende Konkurrenz-Analyse für "{target}" durch.

Verwende die relevanten Competitors APIs und gib folgende Informationen zurück:
- Google Konkurrenten
- Bing Konkurrenten
- Amazon Konkurrenten (falls relevant)
- App Store Konkurrenten (falls relevant)
- Cross-Platform-Vergleich
- Platform-spezifische Insights
- Unified Konkurrenz-Strategie
- Cross-Platform-Optimierung

Formatiere die Analyse mit Fokus auf Cross-Platform-Konkurrenz-Strategien.
```

### **📊 Cross-Platform Search Volume Prompt**
```
Du bist ein Cross-Platform Search Volume-Experte. Analysiere das Suchvolumen für "{keyword}" über alle Plattformen.

Verwende die relevanten Search Volume APIs und gib folgende Informationen zurück:
- Google Search Volume
- Bing Search Volume
- Amazon Search Volume (falls relevant)
- App Store Search Volume (falls relevant)
- Cross-Platform-Vergleich
- Platform-spezifische Trends
- Unified Volume-Strategie
- Cross-Platform-Optimierung

Formatiere die Analyse mit Fokus auf Cross-Platform-Suchvolumen-Strategien.
```

### **📈 Cross-Platform Traffic Analytics Prompt**
```
Du bist ein Cross-Platform Traffic Analytics-Experte. Analysiere die Traffic-Daten für "{domain}" über alle Plattformen.

Verwende die relevanten Traffic Analytics APIs und gib folgende Informationen zurück:
- Google Traffic Analytics
- Bing Traffic Analytics
- Amazon Traffic Analytics (falls relevant)
- App Store Traffic Analytics (falls relevant)
- Cross-Platform-Vergleich
- Platform-spezifische Insights
- Unified Traffic-Strategie
- Cross-Platform-Optimierung

Formatiere die Analyse mit Fokus auf Cross-Platform-Traffic-Strategien.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Google Labs** → `labs_google_*`
- **Bing Labs** → `labs_bing_*`
- **Amazon Labs** → `labs_amazon_*`
- **Apple App Store Labs** → `labs_apple_app_store_*`
- **Competitors** → `*_competitors_live`
- **Keyword Suggestions** → `*_keyword_suggestions_live`
- **Keyword Ideas** → `*_keyword_ideas_live`
- **Search Volume** → `*_search_volume_live`
- **Traffic Analytics** → `*_traffic_analytics_live`
- **Cross-Platform** → Kombination relevanter APIs für umfassende Analyse

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "labs_analysis",
  "target": "example_domain",
  "platform": "google",
  "analysis_type": "competitors_analysis",
  "summary": {
    "domain": "example_domain",
    "total_competitors": 25,
    "competition_level": "high",
    "market_position": "competitive"
  },
  "results": {
    "competitors_data": {
      "competitors": [...],
      "metrics": {...},
      "strategies": {...}
    },
    "platform_data": {
      "google": {...},
      "bing": {...},
      "amazon": {...},
      "app_store": {...}
    }
  },
  "insights": [
    "Hohe Konkurrenz-Dichte",
    "Gute Marktpositionierung",
    "Strategische Wettbewerbsvorteile"
  ],
  "recommendations": [
    "Konkurrenz-Überwachung intensivieren",
    "Differenzierungsstrategien entwickeln",
    "Cross-Platform-Strategien optimieren"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Labs-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Targets und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Labs API-Analyse! 🎯**
