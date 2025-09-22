# ChatGPT Prompt Engineer Guide - App Data API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die App Data-Analyse zu erstellen.

## 📋 **App Data Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "app_data_complete_analysis",
  "description": "Vollständige App Data-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für App Data-Analyse",
    "target": "string (required) - App-ID oder Suchbegriff für App-Analyse",
    "platform": "enum (required) - iOS (Apple Store) oder Android (Google Play)",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare App Data APIs (13 APIs)**

### **🔧 Core App Data APIs (3 APIs)**
- **`app_data_id_list`** - App Data Task IDs abrufen
- **`app_data_errors`** - App Data API Fehler abrufen
- **`app_data_tasks_ready`** - Bereite App Data Tasks abrufen

### **🍎 Apple Store Data APIs (5 APIs)**
- **`apple_store_data_info_live_advanced`** - Apple App Store App-Informationen (Live Advanced)
- **`apple_store_data_app_info_live_advanced`** - Apple App Store App-Informationen (Advanced)
- **`apple_store_data_reviews_live_advanced`** - Apple App Store Bewertungen (Live Advanced)
- **`apple_store_data_app_searches_live_advanced`** - Apple Store App-Suchen (Advanced)

### **🔍 Apple Store Search APIs (1 API)**
- **`apple_store_search_live_advanced`** - Apple Store App-Suche (Live Advanced)

### **🤖 Google Play Data APIs (5 APIs)**
- **`google_play_data_info_live_advanced`** - Google Play App-Informationen (Live Advanced)
- **`google_play_data_app_info_live_advanced`** - Google Play App-Informationen (Advanced)
- **`google_play_data_reviews_live_advanced`** - Google Play App-Bewertungen (Live Advanced)
- **`google_play_data_app_searches_live_advanced`** - Google Play App-Suchen (Advanced)

### **🔍 Google Play Search APIs (1 API)**
- **`google_play_search_live_advanced`** - Google Play App-Suche (Live Advanced)

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "core_app_data_keywords": ["app data", "tasks", "errors", "id list", "task management"],
  "apple_store_keywords": ["apple", "ios", "app store", "iphone", "ipad", "macos"],
  "google_play_keywords": ["google play", "android", "play store", "google"],
  "app_info_keywords": ["app information", "app details", "app metadata", "app info"],
  "reviews_keywords": ["reviews", "bewertungen", "ratings", "user feedback", "app reviews"],
  "search_keywords": ["app search", "app suche", "keyword search", "app discovery"],
  "app_searches_keywords": ["app searches", "app suchen", "search history", "search data"],
  "live_advanced_keywords": ["live", "advanced", "real-time", "live data"],
  "platform_specific_keywords": ["ios", "android", "cross-platform", "mobile apps"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für App Data-Analyse Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein App Data-Analyse-Experte mit Zugriff auf 13 verschiedene DataForSEO App Data APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte App-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. app_data_id_list - App Data Task IDs abrufen
2. app_data_errors - App Data API Fehler abrufen
3. app_data_tasks_ready - Bereite App Data Tasks abrufen
4. apple_store_data_info_live_advanced - Apple App Store App-Informationen (Live Advanced)
5. apple_store_data_app_info_live_advanced - Apple App Store App-Informationen (Advanced)
6. apple_store_data_reviews_live_advanced - Apple App Store Bewertungen (Live Advanced)
7. apple_store_data_app_searches_live_advanced - Apple Store App-Suchen (Advanced)
8. apple_store_search_live_advanced - Apple Store App-Suche (Live Advanced)
9. google_play_data_info_live_advanced - Google Play App-Informationen (Live Advanced)
10. google_play_data_app_info_live_advanced - Google Play App-Informationen (Advanced)
11. google_play_data_reviews_live_advanced - Google Play App-Bewertungen (Live Advanced)
12. google_play_data_app_searches_live_advanced - Google Play App-Suchen (Advanced)
13. google_play_search_live_advanced - Google Play App-Suche (Live Advanced)
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Plattform (iOS/Android/Cross-Platform)
- Gewünschte Analyse-Art (Info, Reviews, Search, Core Management)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🍎 Apple Store App-Analyse Prompt**
```
Du bist ein Apple Store App-Analyse-Experte. Analysiere die App "{app_name}" im Apple App Store.

Verwende die apple_store_data_info_live_advanced API und gib folgende Informationen zurück:
- App-Beschreibung und Metadaten
- Bewertungen und Reviews
- Kategorie und Genre
- Entwickler-Informationen
- Preis und Verfügbarkeit
- App-Store-Performance
- Optimierungsempfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und App Store-Insights.
```

### **🤖 Google Play App-Analyse Prompt**
```
Du bist ein Google Play App-Analyse-Experte. Analysiere die App "{app_name}" im Google Play Store.

Verwende die google_play_data_info_live_advanced API und gib folgende Informationen zurück:
- App-Beschreibung und Metadaten
- Bewertungen und Reviews
- Kategorie und Genre
- Entwickler-Informationen
- Preis und Verfügbarkeit
- Play Store-Performance
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Google Play Store-Optimierung.
```

### **🔍 App-Suche und Discovery Prompt**
```
Du bist ein App-Discovery-Experte. Führe eine App-Suche für "{keyword}" durch.

Verwende die apple_store_search_live_advanced API für iOS und google_play_search_live_advanced API für Android und gib folgende Informationen zurück:
- Gefundene Apps
- Ranking-Positionen
- App-Kategorien
- Bewertungen und Downloads
- Wettbewerbsanalyse
- Keyword-Optimierung
- Discovery-Strategien

Formatiere die Analyse mit Fokus auf App-Discovery-Optimierung.
```

### **📊 App-Reviews und Feedback Prompt**
```
Du bist ein App-Reviews-Analyse-Experte. Analysiere die Bewertungen für "{app_name}".

Verwende die entsprechende Reviews-API (apple_store_data_reviews_live_advanced oder google_play_data_reviews_live_advanced) und gib folgende Informationen zurück:
- Bewertungsübersicht
- Sentiment-Analyse
- Häufige Feedback-Themen
- Verbesserungsvorschläge
- Review-Management-Strategien
- Kundenbindung
- App-Optimierung

Formatiere die Analyse mit Fokus auf Review-Management.
```

### **🔧 App Data Management Prompt**
```
Du bist ein App Data Management-Experte. Überwache die App Data API-Performance.

Verwende die Core APIs (app_data_id_list, app_data_errors, app_data_tasks_ready) und gib folgende Informationen zurück:
- Task-Übersicht
- Fehleranalyse
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
- **Core Management** → `app_data_id_list`, `app_data_errors`, `app_data_tasks_ready`
- **Apple Store** → `apple_store_data_*`, `apple_store_search_*`
- **Google Play** → `google_play_data_*`, `google_play_search_*`
- **App Information** → `*_info_live_advanced`
- **Reviews** → `*_reviews_live_advanced`
- **Search** → `*_search_live_advanced`
- **App Searches** → `*_app_searches_live_advanced`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "app_data_analysis",
  "target": "example_app",
  "platform": "ios/android",
  "analysis_type": "app_info",
  "summary": {
    "app_name": "Example App",
    "platform": "iOS",
    "rating": 4.5,
    "reviews_count": 1250,
    "category": "Productivity"
  },
  "results": {
    "app_info": {
      "description": "...",
      "metadata": {...},
      "performance": {...}
    },
    "reviews_data": {
      "overview": {...},
      "sentiment": {...},
      "feedback": [...]
    }
  },
  "insights": [
    "Hohe Bewertungen",
    "Positive Kundenbewertungen",
    "Gute Kategorie-Positionierung"
  ],
  "recommendations": [
    "Review-Management verbessern",
    "App-Store-Optimierung",
    "Kundenfeedback integrieren"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene App Data-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Apps und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für App Data-Analyse! 🎯**
