# ChatGPT Prompt Engineer Guide - Domain Analytics API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Domain Analytics zu erstellen.

## 📋 **Domain Analytics Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "domain_analytics_complete_analysis",
  "description": "Vollständige Domain Analytics mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für Domain Analytics",
    "target": "string (required) - Domain oder Technologie für Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Domain Analytics APIs (18 APIs)**

### **🔧 Core Domain Analytics APIs (2 APIs)**
- **`domain_analytics_id_list`** - Domain Analytics ID List
- **`domain_analytics_errors`** - Domain Analytics Errors

### **🔧 Technologies APIs (12 APIs)**
- **`domain_analytics_technologies_available_filters`** - Technologies Available Filters
- **`domain_analytics_technologies_locations`** - Technologies Locations
- **`domain_analytics_technologies_languages`** - Technologies Languages
- **`domain_analytics_technologies_technologies`** - Technologies List
- **`domain_analytics_technologies_technologies_summary_live`** - Technologies Summary Live
- **`domain_analytics_technologies_technology_stats_live`** - Technology Stats Live
- **`domain_analytics_technologies_aggregation_technologies_live`** - Technologies Aggregation Live
- **`domain_analytics_technologies_summary_live`** - Technologies Summary Live
- **`domain_analytics_technologies_stats_live`** - Technologies Stats Live
- **`domain_analytics_technologies_domains_by_technology_live`** - Domains by Technology Live
- **`domain_analytics_technologies_domains_by_html_terms_live`** - Domains by HTML Terms Live
- **`domain_analytics_technologies_domain_technologies_live`** - Domain Technologies Live

### **🌐 WHOIS APIs (2 APIs)**
- **`domain_analytics_whois_available_filters`** - WHOIS Available Filters
- **`domain_analytics_whois_overview_live`** - WHOIS Overview Live

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "core_domain_keywords": ["domain analytics", "id list", "errors", "api management", "task management"],
  "technologies_keywords": ["technologies", "technologien", "tech stack", "technology stack", "web technologies", "website technologies"],
  "whois_keywords": ["whois", "domain info", "domain information", "domain details", "domain registration", "domain ownership"],
  "technology_analysis_keywords": ["technology analysis", "tech analysis", "technology detection", "tech detection", "technology identification"],
  "technology_stats_keywords": ["technology stats", "tech stats", "technology statistics", "tech statistics", "technology metrics"],
  "technology_summary_keywords": ["technology summary", "tech summary", "technology overview", "tech overview", "technology summary"],
  "domains_by_tech_keywords": ["domains by technology", "domains by tech", "websites using", "sites using", "domains with technology"],
  "html_terms_keywords": ["html terms", "html keywords", "html detection", "html identification", "html analysis"],
  "aggregation_keywords": ["aggregation", "aggregierung", "technology aggregation", "tech aggregation", "technology combination"],
  "filters_keywords": ["filters", "filter", "available filters", "verfügbare filter", "filter options"],
  "locations_keywords": ["locations", "standorte", "countries", "länder", "geographic", "geografisch"],
  "languages_keywords": ["languages", "sprachen", "language support", "sprachunterstützung", "multilingual"],
  "live_keywords": ["live", "real-time", "live data", "aktuelle daten", "live analysis", "live detection"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Domain Analytics Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Domain Analytics-Experte mit Zugriff auf 18 verschiedene DataForSEO Domain Analytics APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Domain-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. domain_analytics_id_list - Domain Analytics ID List
2. domain_analytics_errors - Domain Analytics Errors
3. domain_analytics_technologies_available_filters - Technologies Available Filters
4. domain_analytics_technologies_locations - Technologies Locations
5. domain_analytics_technologies_languages - Technologies Languages
6. domain_analytics_technologies_technologies - Technologies List
7. domain_analytics_technologies_technologies_summary_live - Technologies Summary Live
8. domain_analytics_technologies_technology_stats_live - Technology Stats Live
9. domain_analytics_technologies_aggregation_technologies_live - Technologies Aggregation Live
10. domain_analytics_technologies_summary_live - Technologies Summary Live
11. domain_analytics_technologies_stats_live - Technologies Stats Live
12. domain_analytics_technologies_domains_by_technology_live - Domains by Technology Live
13. domain_analytics_technologies_domains_by_html_terms_live - Domains by HTML Terms Live
14. domain_analytics_technologies_domain_technologies_live - Domain Technologies Live
15. domain_analytics_whois_available_filters - WHOIS Available Filters
16. domain_analytics_whois_overview_live - WHOIS Overview Live
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Analyse-Art (Technologies, WHOIS, Core Management)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🔧 Domain Technologies Analysis Prompt**
```
Du bist ein Domain Technologies-Analyse-Experte. Analysiere die Technologien für "{domain}".

Verwende die domain_analytics_technologies_domain_technologies_live API und gib folgende Informationen zurück:
- Erkannte Technologien
- Technologie-Kategorien
- Technologie-Versionen
- Technologie-Konfidenz
- Technologie-Stack
- Technologie-Insights
- Optimierungsempfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und Technologie-Insights.
```

### **📊 Technology Statistics Prompt**
```
Du bist ein Technology Statistics-Experte. Analysiere die Statistiken für "{technology}".

Verwende die domain_analytics_technologies_technology_stats_live API und gib folgende Informationen zurück:
- Technologie-Statistiken
- Nutzungszahlen
- Marktanteil
- Technologie-Trends
- Verwandte Technologien
- Technologie-Insights
- Markt-Strategien

Formatiere die Analyse mit Fokus auf Technologie-Statistiken und Marktanalyse.
```

### **🌐 Domains by Technology Prompt**
```
Du bist ein Domains by Technology-Experte. Finde Domains, die "{technology}" verwenden.

Verwende die domain_analytics_technologies_domains_by_technology_live API und gib folgende Informationen zurück:
- Gefundene Domains
- Domain-Rankings
- Traffic-Informationen
- Technologie-Nutzung
- Wettbewerbsanalyse
- Markt-Insights
- Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf Technologie-basierte Domain-Recherche.
```

### **🔍 HTML Terms Technology Detection Prompt**
```
Du bist ein HTML Terms Technology Detection-Experte. Analysiere Domains basierend auf HTML-Terms.

Verwende die domain_analytics_technologies_domains_by_html_terms_live API und gib folgende Informationen zurück:
- Gefundene Domains
- HTML-Terms-Analyse
- Technologie-Erkennung
- Detection-Qualität
- HTML-Insights
- Technologie-Identifikation
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf HTML-basierte Technologie-Erkennung.
```

### **📈 Technology Aggregation Prompt**
```
Du bist ein Technology Aggregation-Experte. Analysiere Technologie-Kombinationen für "{domain}".

Verwende die domain_analytics_technologies_aggregation_technologies_live API und gib folgende Informationen zurück:
- Technologie-Kombinationen
- Aggregations-Daten
- Technologie-Patterns
- Kombinations-Insights
- Technologie-Strategien
- Optimierungsempfehlungen
- Best Practices

Formatiere die Analyse mit Fokus auf Technologie-Aggregation und -Kombinationen.
```

### **📊 Technology Summary Prompt**
```
Du bist ein Technology Summary-Experte. Erstelle eine Zusammenfassung der Technologie-Analyse für "{domain}".

Verwende die domain_analytics_technologies_summary_live API und gib folgende Informationen zurück:
- Technologie-Übersicht
- Gesamtanzahl der Technologien
- Technologie-Kategorien
- Top-Technologien
- Technologie-Performance
- Zusammenfassungs-Insights
- Strategische Empfehlungen

Formatiere die Analyse mit Fokus auf Technologie-Zusammenfassung und -Übersicht.
```

### **📈 Technology Stats Live Prompt**
```
Du bist ein Technology Stats Live-Experte. Analysiere die Live-Technologie-Statistiken für "{domain}".

Verwende die domain_analytics_technologies_stats_live API und gib folgende Informationen zurück:
- Live-Technologie-Statistiken
- Technologie-Verteilung
- Kategorie-Aufschlüsselung
- Performance-Metriken
- Live-Insights
- Performance-Optimierung
- Monitoring-Strategien

Formatiere die Analyse mit Fokus auf Live-Technologie-Statistiken.
```

### **🌐 WHOIS Domain Analysis Prompt**
```
Du bist ein WHOIS Domain Analysis-Experte. Analysiere die WHOIS-Daten für "{domain}".

Verwende die domain_analytics_whois_overview_live API und gib folgende Informationen zurück:
- WHOIS-Informationen
- Domain-Registrierung
- Domain-Besitzer
- Domain-Status
- Domain-Historie
- WHOIS-Insights
- Domain-Management

Formatiere die Analyse mit Fokus auf WHOIS-Daten und Domain-Informationen.
```

### **🔧 Technology Filters und Locations Prompt**
```
Du bist ein Technology Filters und Locations-Experte. Analysiere verfügbare Filter und Standorte.

Verwende die domain_analytics_technologies_available_filters, domain_analytics_technologies_locations und domain_analytics_technologies_languages APIs und gib folgende Informationen zurück:
- Verfügbare Filter
- Unterstützte Standorte
- Unterstützte Sprachen
- Filter-Optionen
- Lokalisierungs-Optionen
- Internationale Expansion
- Lokalisierungs-Strategien

Formatiere die Analyse mit Fokus auf Technologie-Filter und -Lokalisierung.
```

### **📋 Technology List Prompt**
```
Du bist ein Technology List-Experte. Analysiere verfügbare Technologien.

Verwende die domain_analytics_technologies_technologies API und gib folgende Informationen zurück:
- Verfügbare Technologien
- Technologie-Gruppen
- Technologie-Kategorien
- Technologie-Hierarchie
- Technologie-Insights
- Technologie-Klassifizierung
- Technologie-Strategien

Formatiere die Analyse mit Fokus auf Technologie-Liste und -Klassifizierung.
```

### **🔧 Domain Analytics Management Prompt**
```
Du bist ein Domain Analytics Management-Experte. Überwache die Domain Analytics API-Performance.

Verwende die Core APIs (domain_analytics_id_list, domain_analytics_errors) und gib folgende Informationen zurück:
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
- **Core Management** → `domain_analytics_id_list`, `domain_analytics_errors`
- **Technologies** → `domain_analytics_technologies_*`
- **WHOIS** → `domain_analytics_whois_*`
- **Technology Analysis** → `*_domain_technologies_live`, `*_technology_stats_live`
- **Technology Search** → `*_domains_by_technology_live`, `*_domains_by_html_terms_live`
- **Technology Summary** → `*_summary_live`, `*_stats_live`
- **Technology Aggregation** → `*_aggregation_technologies_live`
- **Technology List** → `*_technologies`
- **Filters & Locations** → `*_available_filters`, `*_locations`, `*_languages`
- **Live Data** → `*_live`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "domain_analytics",
  "target": "example.com",
  "analysis_type": "technology_analysis",
  "summary": {
    "domain": "example.com",
    "total_technologies": 25,
    "technology_categories": 8,
    "detection_confidence": "high"
  },
  "results": {
    "technology_data": {
      "technologies": [...],
      "categories": {...},
      "performance": {...}
    },
    "whois_data": {
      "domain_info": {...},
      "registration": {...},
      "ownership": {...}
    }
  },
  "insights": [
    "Moderne Technologie-Stack",
    "Gute Technologie-Diversität",
    "Hohe Detection-Konfidenz"
  ],
  "recommendations": [
    "Technologie-Stack optimieren",
    "Performance überwachen",
    "Neue Technologien evaluieren"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Domain Analytics-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Domains und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Domain Analytics! 🎯**
