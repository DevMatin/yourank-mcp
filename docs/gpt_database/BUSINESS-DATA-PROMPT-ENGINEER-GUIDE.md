# ChatGPT Prompt Engineer Guide - Business Data API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Business Data-Analyse zu erstellen.

## 📋 **Business Data Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "business_data_complete_analysis",
  "description": "Vollständige Business Data-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für Business Data-Analyse",
    "target": "string (required) - Business-Name, Keyword oder Standort für Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "business_type": "enum (optional) - Art des Geschäfts",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Business Data APIs (24 APIs)**

### **🔧 Core Business Data APIs (2 APIs)**
- **`business_data_id_list`** - Business Data ID List
- **`business_data_errors`** - Business Data Errors

### **🏢 Google Business Tools (7 APIs)**
- **`business_data_google_locations`** - Google Business Locations
- **`business_data_google_locations_country`** - Google Business Locations by Country
- **`business_data_google_languages`** - Google Business Languages
- **`business_data_google_my_business_info_live`** - Google My Business Info Live
- **`business_data_google_hotel_searches_live`** - Google Hotel Searches Live
- **`business_data_google_hotel_info_live_advanced`** - Google Hotel Info Live Advanced
- **`business_data_google_reviews_live`** - Google Reviews Live

### **🗺️ Google Maps Business Listings (5 APIs)**
- **`business_data_business_listings_search`** - Business Listings Search
- **`business_data_business_listings_filters`** - Business Listings Filters
- **`business_data_business_listings_locations`** - Business Listings Locations
- **`business_data_business_listings_categories`** - Business Listings Categories
- **`business_data_business_listings_categories_aggregation`** - Business Listings Categories Aggregation

### **📱 Social Media Analytics (3 APIs)**
- **`business_data_social_media_pinterest_live`** - Pinterest Social Media Live
- **`business_data_social_media_facebook_live`** - Facebook Social Media Live
- **`business_data_social_media_reddit_live`** - Reddit Social Media Live

### **🏨 TripAdvisor Tools (5 APIs)**
- **`business_data_tripadvisor_locations`** - TripAdvisor Locations
- **`business_data_tripadvisor_locations_country`** - TripAdvisor Locations by Country
- **`business_data_tripadvisor_languages`** - TripAdvisor Languages
- **`business_data_tripadvisor_search_live`** - TripAdvisor Search Live
- **`business_data_tripadvisor_reviews_live`** - TripAdvisor Reviews Live

### **⭐ Trustpilot Tools (2 APIs)**
- **`business_data_trustpilot_search_live`** - Trustpilot Search Live
- **`business_data_trustpilot_reviews_live`** - Trustpilot Reviews Live

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "core_business_keywords": ["business data", "id list", "errors", "task management", "api management"],
  "google_business_keywords": ["google business", "google my business", "gmb", "google locations", "google languages"],
  "google_maps_keywords": ["google maps", "business listings", "local search", "maps", "listings"],
  "hotel_keywords": ["hotel", "hotels", "accommodation", "lodging", "travel", "booking"],
  "social_media_keywords": ["social media", "pinterest", "facebook", "reddit", "shares", "likes", "social"],
  "tripadvisor_keywords": ["tripadvisor", "travel", "tourism", "hotels", "restaurants", "reviews"],
  "trustpilot_keywords": ["trustpilot", "reviews", "trust", "customer feedback", "business reviews"],
  "reviews_keywords": ["reviews", "bewertungen", "feedback", "customer reviews", "user reviews"],
  "search_keywords": ["search", "suche", "business search", "local search", "discovery"],
  "locations_keywords": ["locations", "standorte", "countries", "länder", "geographic"],
  "categories_keywords": ["categories", "kategorien", "business types", "industry", "sector"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Business Data-Analyse Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Business Data-Analyse-Experte mit Zugriff auf 24 verschiedene DataForSEO Business Data APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Business-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. business_data_id_list - Business Data ID List
2. business_data_errors - Business Data Errors
3. business_data_google_locations - Google Business Locations
4. business_data_google_locations_country - Google Business Locations by Country
5. business_data_google_languages - Google Business Languages
6. business_data_google_my_business_info_live - Google My Business Info Live
7. business_data_google_hotel_searches_live - Google Hotel Searches Live
8. business_data_google_hotel_info_live_advanced - Google Hotel Info Live Advanced
9. business_data_google_reviews_live - Google Reviews Live
10. business_data_business_listings_search - Business Listings Search
11. business_data_business_listings_filters - Business Listings Filters
12. business_data_business_listings_locations - Business Listings Locations
13. business_data_business_listings_categories - Business Listings Categories
14. business_data_business_listings_categories_aggregation - Business Listings Categories Aggregation
15. business_data_social_media_pinterest_live - Pinterest Social Media Live
16. business_data_social_media_facebook_live - Facebook Social Media Live
17. business_data_social_media_reddit_live - Reddit Social Media Live
18. business_data_tripadvisor_locations - TripAdvisor Locations
19. business_data_tripadvisor_locations_country - TripAdvisor Locations by Country
20. business_data_tripadvisor_languages - TripAdvisor Languages
21. business_data_tripadvisor_search_live - TripAdvisor Search Live
22. business_data_tripadvisor_reviews_live - TripAdvisor Reviews Live
23. business_data_trustpilot_search_live - Trustpilot Search Live
24. business_data_trustpilot_reviews_live - Trustpilot Reviews Live
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Plattform (Google, Maps, Social Media, TripAdvisor, Trustpilot)
- Gewünschte Analyse-Art (Info, Reviews, Search, Locations, Categories)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🏢 Google Business Profil-Analyse Prompt**
```
Du bist ein Google Business-Experte. Analysiere das Google My Business Profil für "{business_name}".

Verwende die business_data_google_my_business_info_live API und gib folgende Informationen zurück:
- Business-Informationen und Details
- Standort-Daten
- Öffnungszeiten
- Kontaktinformationen
- Business-Kategorien
- Google Business-Performance
- Optimierungsempfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und Google Business-Insights.
```

### **🗺️ Lokale Business-Suche Prompt**
```
Du bist ein lokaler Business-Such-Experte. Führe eine lokale Business-Suche für "{keyword}" durch.

Verwende die business_data_business_listings_search API und gib folgende Informationen zurück:
- Gefundene Businesses
- Standort-Informationen
- Business-Kategorien
- Bewertungen und Reviews
- Wettbewerbsanalyse
- Lokale SEO-Insights
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf lokale Business-Optimierung.
```

### **🏨 Hotel-Suche und -Analyse Prompt**
```
Du bist ein Hotel-Analyse-Experte. Analysiere Hotels für "{location}" und "{dates}".

Verwende die business_data_google_hotel_searches_live API und gib folgende Informationen zurück:
- Verfügbare Hotels
- Preise und Verfügbarkeit
- Hotel-Bewertungen
- Standort-Qualität
- Hotel-Features
- Buchungs-Insights
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Hotel-Buchung und -Auswahl.
```

### **📱 Social Media Performance Prompt**
```
Du bist ein Social Media-Analyse-Experte. Analysiere die Social Media-Performance für "{business_name}".

Verwende die Social Media APIs (business_data_social_media_pinterest_live, business_data_social_media_facebook_live, business_data_social_media_reddit_live) und gib folgende Informationen zurück:
- Pinterest-Pins und Shares
- Facebook-Likes und Engagement
- Reddit-Mentions und Community
- Social Media-Reichweite
- Engagement-Metriken
- Social Media-Strategien
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Social Media-Marketing.
```

### **🏨 TripAdvisor Business-Analyse Prompt**
```
Du bist ein TripAdvisor-Analyse-Experte. Analysiere das TripAdvisor-Profil für "{business_name}".

Verwende die business_data_tripadvisor_search_live und business_data_tripadvisor_reviews_live APIs und gib folgende Informationen zurück:
- Business-Informationen
- Bewertungen und Reviews
- TripAdvisor-Ranking
- Kundenfeedback
- Wettbewerbsanalyse
- TripAdvisor-Optimierung
- Review-Management-Strategien

Formatiere die Analyse mit Fokus auf TripAdvisor-Performance.
```

### **⭐ Trustpilot Reputation Prompt**
```
Du bist ein Trustpilot-Analyse-Experte. Analysiere die Trustpilot-Reputation für "{business_name}".

Verwende die business_data_trustpilot_search_live und business_data_trustpilot_reviews_live APIs und gib folgende Informationen zurück:
- Trustpilot-Profil
- Bewertungen und Reviews
- Trust-Score
- Kundenfeedback
- Reputations-Management
- Trustpilot-Optimierung
- Strategien für bessere Bewertungen

Formatiere die Analyse mit Fokus auf Reputations-Management.
```

### **🔧 Business Data Management Prompt**
```
Du bist ein Business Data Management-Experte. Überwache die Business Data API-Performance.

Verwende die Core APIs (business_data_id_list, business_data_errors) und gib folgende Informationen zurück:
- Task-Übersicht
- Fehleranalyse
- API-Performance
- Task-Management
- Optimierungsempfehlungen
- Best Practices
- Monitoring-Strategien

Formatiere die Analyse mit Fokus auf API-Management.
```

### **🌍 Standort- und Sprach-Analyse Prompt**
```
Du bist ein Standort- und Sprach-Analyse-Experte. Analysiere verfügbare Standorte und Sprachen.

Verwende die Locations und Languages APIs und gib folgende Informationen zurück:
- Verfügbare Standorte
- Länder-spezifische Standorte
- Unterstützte Sprachen
- Lokalisierungs-Optionen
- Markt-Abdeckung
- Internationale Expansion
- Lokalisierungs-Strategien

Formatiere die Analyse mit Fokus auf internationale Business-Entwicklung.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Core Management** → `business_data_id_list`, `business_data_errors`
- **Google Business** → `business_data_google_*`
- **Google Maps** → `business_data_business_listings_*`
- **Social Media** → `business_data_social_media_*`
- **TripAdvisor** → `business_data_tripadvisor_*`
- **Trustpilot** → `business_data_trustpilot_*`
- **Locations** → `*_locations*`
- **Languages** → `*_languages*`
- **Reviews** → `*_reviews_live`
- **Search** → `*_search_live`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "business_data_analysis",
  "target": "example_business",
  "platform": "google_business",
  "analysis_type": "business_info",
  "summary": {
    "business_name": "Example Business",
    "platform": "Google My Business",
    "rating": 4.5,
    "reviews_count": 125,
    "category": "Restaurant"
  },
  "results": {
    "business_info": {
      "details": {...},
      "location": {...},
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
    "Gute lokale Positionierung"
  ],
  "recommendations": [
    "Review-Management verbessern",
    "Google Business-Optimierung",
    "Lokale SEO-Strategien"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Business Data-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Businesses und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Business Data-Analyse! 🎯**
