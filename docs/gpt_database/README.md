# 🚀 DataForSEO MCP Server - ChatGPT Prompt Engineer Database

## 🎯 **Ziel dieser Hauptdatenbank**
Diese **zentrale Wissensdatenbank** dient als **vollständige Referenz** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für alle **11 DataForSEO API Schemas** zu erstellen. Hier findest du alle verfügbaren APIs, ihre Verwendungszwecke und intelligente Auswahl-Logik.

---

## 📚 **Verfügbare API Schemas & Guides (11 Gesamt)**

### **1. 📱 App Data API** 
- **Zweck**: App Store & Google Play Analyse
- **Hauptfunktionen**: App-Daten, Bewertungen, Downloads, Rankings
- **Best Use Cases**: App-Marketing, Competitor-Analyse, App-Store-Optimierung
- **Verfügbare APIs**: 13 APIs (Core, Apple Store, Google Play)
- **Guide**: `App-Data-PROMPT-ENGINEER-GUIDE.md`

### **2. 🔗 Backlinks API**
- **Zweck**: Backlink-Analyse & Domain-Research
- **Hauptfunktionen**: Backlink-Daten, Referring Domains, Anchor-Text-Analyse
- **Best Use Cases**: SEO-Backlink-Strategie, Domain-Autorität, Competitor-Analyse
- **Verfügbare APIs**: 25 APIs (Core, Domain, Competitors, Timeseries)
- **Guide**: `BACKLINKS-PROMPT-ENGINEER-GUIDE.md`

### **3. 🏢 Business Data API**
- **Zweck**: Business & Local SEO Analyse
- **Hauptfunktionen**: Google Business Profile, Local Listings, Social Media
- **Best Use Cases**: Local SEO, Business-Reputation, Social Media Marketing
- **Verfügbare APIs**: 24 APIs (Core, Google Business, Social Media, Reviews)
- **Guide**: `BUSINESS-DATA-PROMPT-ENGINEER-GUIDE.md`

### **4. 📊 Content Analysis API**
- **Zweck**: Content & Sentiment-Analyse
- **Hauptfunktionen**: Content-Qualität, Sentiment, Trends, Kategorien
- **Best Use Cases**: Content-Marketing, Sentiment-Analyse, Trend-Research
- **Verfügbare APIs**: 12 APIs (Core, Categories, Search, Sentiment, Trends)
- **Guide**: `CONTENT-ANALYSIS-PROMPT-ENGINEER-GUIDE.md`

### **5. ✍️ Content Generation API**
- **Zweck**: AI Content Generation & Text-Analyse
- **Hauptfunktionen**: SEO Meta Tags, Text-Generierung, Grammar Check
- **Best Use Cases**: Content-Erstellung, SEO-Optimierung, Text-Qualität
- **Verfügbare APIs**: 10 APIs (Content Optimization, Text Analysis, Generation)
- **Guide**: `CONTENT-GENERATION-PROMPT-ENGINEER-GUIDE.md`

### **6. 🌐 Domain Analytics API**
- **Zweck**: Domain & Technology-Analyse
- **Hauptfunktionen**: Domain-Technologien, WHOIS, Technology-Stats
- **Best Use Cases**: Domain-Research, Technology-Stack-Analyse, Competitor-Research
- **Verfügbare APIs**: 18 APIs (Core, Technologies, WHOIS)
- **Guide**: `DOMAIN-ANALYTICS-PROMPT-ENGINEER-GUIDE.md`

### **7. 🔍 Keywords Data API**
- **Zweck**: Keyword Research & Analysis
- **Hauptfunktionen**: Google Ads Keywords, Bing Keywords, Clickstream
- **Best Use Cases**: SEO-Keyword-Research, PPC-Strategie, Content-Planung
- **Verfügbare APIs**: 6 APIs (Google Ads, Bing, Clickstream)
- **Guide**: `KEYWORDS-DATA-PROMPT-ENGINEER-GUIDE.md`

### **8. 🧪 DataForSEO Labs API**
- **Zweck**: Experimental & Advanced APIs
- **Hauptfunktionen**: Competitors, Keyword Ideas, Traffic Analytics
- **Best Use Cases**: Advanced Research, Experimental Features, Innovation
- **Verfügbare APIs**: 20 APIs (Google Labs, Bing Labs, Amazon, Apple)
- **Guide**: `DATAFORSEO-LABS-PROMPT-ENGINEER-GUIDE.md`

### **9. 🛒 Merchant API**
- **Zweck**: E-commerce & Amazon-Analyse
- **Hauptfunktionen**: Amazon Products, Sellers, Reviews, Pricing
- **Best Use Cases**: E-commerce-Strategie, Amazon-Marketing, Competitor-Analyse
- **Verfügbare APIs**: 3 APIs (Amazon Merchant)
- **Guide**: `MERCHANT-PROMPT-ENGINEER-GUIDE.md`

### **10. 📄 OnPage API**
- **Zweck**: OnPage & Performance-Analyse
- **Hauptfunktionen**: Lighthouse, Links, Content, Duplicates
- **Best Use Cases**: Website-Optimierung, Performance, Technical SEO
- **Verfügbare APIs**: 30 APIs (Core, Analysis, Lighthouse, Links, Content)
- **Guide**: `ONPAGE-PROMPT-ENGINEER-GUIDE.md`

### **11. 🔍 SERP API**
- **Zweck**: Search Engine Results Analysis
- **Hauptfunktionen**: Google, Bing, YouTube SERP, Local Pack
- **Best Use Cases**: SERP-Monitoring, Competitor-Analyse, SEO-Strategie
- **Verfügbare APIs**: 50+ APIs (Google, Bing, YouTube, Competitors)
- **Guide**: `SERP-PROMPT-ENGINEER-GUIDE.md`

---

## 🧠 **Intelligente API-Auswahl-Algorithmen**

### **🎯 Hauptkategorien-basierte Auswahl**
```javascript
"main_categories": {
  "content_marketing": ["content_analysis", "content_generation", "keywords_data"],
  "seo_analysis": ["backlinks", "onpage", "serp", "domain_analytics"],
  "business_intelligence": ["business_data", "merchant", "app_data"],
  "research_tools": ["labs", "content_analysis", "keywords_data"],
  "performance_monitoring": ["onpage", "serp", "domain_analytics"],
  "competitive_analysis": ["backlinks", "serp", "labs", "business_data"]
}
```

### **🔍 Keyword-basierte Auswahl**
```javascript
"keyword_selection": {
  "app_keywords": ["app", "mobile", "app store", "google play", "downloads"],
  "backlink_keywords": ["backlinks", "links", "domain authority", "referring domains"],
  "business_keywords": ["business", "local", "google business", "reviews", "reputation"],
  "content_keywords": ["content", "text", "sentiment", "analysis", "generation"],
  "domain_keywords": ["domain", "technology", "whois", "tech stack"],
  "keyword_keywords": ["keywords", "search volume", "keyword research", "ppc"],
  "labs_keywords": ["labs", "experimental", "competitors", "traffic analytics"],
  "merchant_keywords": ["amazon", "e-commerce", "products", "sellers", "pricing"],
  "onpage_keywords": ["onpage", "lighthouse", "performance", "links", "content"],
  "serp_keywords": ["serp", "search results", "google", "bing", "youtube"]
}
```

### **🎯 Use Case-basierte Auswahl**
```javascript
"use_case_selection": {
  "seo_audit": ["onpage", "backlinks", "serp", "domain_analytics"],
  "content_strategy": ["content_analysis", "content_generation", "keywords_data"],
  "competitive_research": ["backlinks", "serp", "labs", "business_data"],
  "local_seo": ["business_data", "serp", "onpage"],
  "app_marketing": ["app_data", "labs", "serp"],
  "ecommerce_analysis": ["merchant", "serp", "business_data"],
  "performance_optimization": ["onpage", "domain_analytics", "serp"],
  "keyword_research": ["keywords_data", "labs", "content_analysis"]
}
```

---

## 📝 **Prompt Engineering Master-Strategien**

### **🎯 Einheitliche Prompt-Struktur für alle APIs**
```javascript
"master_prompt_structure": {
  "1_role_definition": "Du bist ein [API-NAME] API-Analyse-Experte...",
  "2_api_selection": "Verwende die [spezifische API] für...",
  "3_requirements": "Analysiere folgende Aspekte...",
  "4_output_format": "Formatiere die Antwort mit...",
  "5_recommendations": "Gib konkrete Verbesserungsvorschläge..."
}
```

### **🔧 API-Auswahl-Logik für alle Schemas**
```javascript
"universal_api_logic": {
  "live_apis": "*_live - Für Echtzeit-Analyse",
  "task_apis": "*_task_* - Für asynchrone Verarbeitung",
  "core_apis": "*_id_list, *_errors, *_filters - Für Management",
  "specific_apis": "Spezifische Funktionalität je nach Schema",
  "utility_apis": "Hilfsfunktionen und Tools"
}
```

### **📊 Einheitliche Ausgabe-Formate**
```json
{
  "analysis_type": "[schema_name]_analysis",
  "target": "[target_url/keyword/domain]",
  "selected_apis": ["api1", "api2"],
  "summary": {
    "overview": "...",
    "key_metrics": {...},
    "insights": [...]
  },
  "detailed_results": {
    "api1_results": {...},
    "api2_results": {...}
  },
  "recommendations": [...],
  "next_steps": [...]
}
```

---

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🔍 SEO-Audit Prompt (Multi-API)**
```
Du bist ein SEO-Audit-Experte mit Zugriff auf alle DataForSEO APIs.
Führe einen vollständigen SEO-Audit für "{url}" durch.

Verwende folgende APIs:
- onpage_* für technische Analyse
- backlinks_* für Backlink-Analyse
- serp_* für SERP-Analyse
- domain_analytics_* für Domain-Insights

Gib eine umfassende SEO-Analyse mit konkreten Optimierungsempfehlungen.
```

### **📊 Content-Strategie Prompt (Multi-API)**
```
Du bist ein Content-Strategie-Experte mit Zugriff auf alle DataForSEO APIs.
Entwickle eine Content-Strategie für "{domain}".

Verwende folgende APIs:
- keywords_data_* für Keyword-Research
- content_analysis_* für Content-Analyse
- content_generation_* für Content-Erstellung
- serp_* für SERP-Research

Erstelle eine detaillierte Content-Strategie mit Keyword-Empfehlungen.
```

### **🏢 Business-Intelligence Prompt (Multi-API)**
```
Du bist ein Business-Intelligence-Experte mit Zugriff auf alle DataForSEO APIs.
Analysiere die Business-Performance für "{business}".

Verwende folgende APIs:
- business_data_* für Business-Insights
- merchant_* für E-commerce-Analyse
- serp_* für Marktpositionierung
- app_data_* für Mobile-Performance

Erstelle eine umfassende Business-Analyse mit strategischen Empfehlungen.
```

---

## 🎯 **Prompt Engineering Best Practices**

### **✅ Universelle Best Practices für alle APIs**
1. **Klare Rollendefinition** - Definiere immer die Expertenrolle
2. **Spezifische API-Auswahl** - Wähle die passende API basierend auf der Anfrage
3. **Detaillierte Anforderungen** - Definiere klar, was analysiert werden soll
4. **Strukturierte Ausgabe** - Verwende einheitliche Ausgabe-Formate
5. **Actionable Empfehlungen** - Gib konkrete, umsetzbare Empfehlungen

### **✅ Schema-spezifische Best Practices**
- **App Data**: Fokus auf App-Store-Performance und Mobile-Marketing
- **Backlinks**: Fokus auf Domain-Autorität und Link-Qualität
- **Business Data**: Fokus auf Local SEO und Business-Reputation
- **Content**: Fokus auf Content-Qualität und SEO-Optimierung
- **Domain Analytics**: Fokus auf Technology-Stack und Domain-Insights
- **Keywords**: Fokus auf Search Volume und Keyword-Opportunities
- **Labs**: Fokus auf Innovation und Experimentelle Features
- **Merchant**: Fokus auf E-commerce-Performance und Pricing
- **OnPage**: Fokus auf Website-Performance und Technical SEO
- **SERP**: Fokus auf Search-Results und Competitor-Analyse

---

## 🔗 **Verlinkung zu allen Guides**

### **📚 Alle verfügbaren Prompt Engineer Guides:**
- [📱 App Data Guide](App-Data-PROMPT-ENGINEER-GUIDE.md)
- [🔗 Backlinks Guide](BACKLINKS-PROMPT-ENGINEER-GUIDE.md)
- [🏢 Business Data Guide](BUSINESS-DATA-PROMPT-ENGINEER-GUIDE.md)
- [📊 Content Analysis Guide](CONTENT-ANALYSIS-PROMPT-ENGINEER-GUIDE.md)
- [✍️ Content Generation Guide](CONTENT-GENERATION-PROMPT-ENGINEER-GUIDE.md)
- [🌐 Domain Analytics Guide](DOMAIN-ANALYTICS-PROMPT-ENGINEER-GUIDE.md)
- [🔍 Keywords Data Guide](KEYWORDS-DATA-PROMPT-ENGINEER-GUIDE.md)
- [🧪 DataForSEO Labs Guide](DATAFORSEO-LABS-PROMPT-ENGINEER-GUIDE.md)
- [🛒 Merchant Guide](MERCHANT-PROMPT-ENGINEER-GUIDE.md)
- [📄 OnPage Guide](ONPAGE-PROMPT-ENGINEER-GUIDE.md)
- [🔍 SERP Guide](SERP-PROMPT-ENGINEER-GUIDE.md)

---

## 🎉 **Fazit & Nächste Schritte**

### **✅ Diese Hauptdatenbank ermöglicht:**
1. **Zentrale Übersicht** über alle verfügbaren DataForSEO APIs
2. **Intelligente API-Auswahl** basierend auf Benutzeranfragen
3. **Einheitliche Prompt-Strukturen** für alle Schemas
4. **Schema-spezifische Best Practices** für optimale Ergebnisse
5. **Vollständige Integration** aller 11 API-Schemas

### **🚀 Nächste Schritte:**
1. **Studiere die einzelnen Guides** für spezifische APIs
2. **Verwende die Hauptdatenbank** als zentrale Referenz
3. **Kombiniere verschiedene APIs** für umfassende Analysen
4. **Passe Prompts an** spezifische Benutzeranfragen an
5. **Erweitere die Keyword-Logik** bei Bedarf

### **🎯 Verwendung für Custom GPTs:**
- **Lade alle Guides** in dein Custom GPT
- **Verwende diese README** als Hauptreferenz
- **Kombiniere verschiedene APIs** für komplexe Analysen
- **Erstelle strukturierte Prompts** basierend auf den Guidelines

---

**🎯 Diese Hauptdatenbank dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für alle DataForSEO APIs! 🚀**

**📊 Gesamtübersicht: 11 API Schemas, 200+ APIs, Vollständige Integration für Custom GPTs! 🎉**
