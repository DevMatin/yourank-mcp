# ChatGPT Prompt Engineer Guide - Backlinks API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Backlinks-Analyse zu erstellen.

## 📋 **Backlinks Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "backlinks_complete_analysis",
  "description": "Vollständige Backlinks-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für Backlinks-Analyse",
    "target": "string (required) - Domain oder URL für Backlinks-Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: de) - Sprachcode",
    "date_from": "string (optional) - Startdatum für historische Daten",
    "date_to": "string (optional) - Enddatum für historische Daten",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Backlinks APIs (25 APIs)**

### **🔗 Core Backlinks APIs (4 APIs)**
- **`backlinks_backlinks_live`** - Detaillierte Backlinks-Analyse
- **`backlinks_anchors_live`** - Anchor-Text-Analyse
- **`backlinks_summary_live`** - Backlinks-Zusammenfassung
- **`backlinks_history_live`** - Historische Backlink-Entwicklung

### **🌐 Domain & Pages APIs (4 APIs)**
- **`backlinks_domain_pages_live`** - Domain Pages-Analyse
- **`backlinks_domain_pages_summary_live`** - Domain Pages Summary
- **`backlinks_domain_intersection_live`** - Domain Intersection-Analyse
- **`backlinks_page_intersection_live`** - Page Intersection-Analyse

### **🔍 Referring Domains & Networks APIs (2 APIs)**
- **`backlinks_referring_domains_live`** - Referring Domains-Analyse
- **`backlinks_referring_networks_live`** - Referring Networks-Analyse

### **🏆 Competitors & Analysis APIs (2 APIs)**
- **`backlinks_competitors_live`** - Backlinks-Konkurrenten-Analyse
- **`backlinks_domain_intersection_live`** - Domain Intersection-Analyse

### **📈 Timeseries APIs (2 APIs)**
- **`backlinks_timeseries_summary_live`** - Timeseries Summary
- **`backlinks_timeseries_new_lost_summary_live`** - Neue und verlorene Backlinks Timeseries

### **📊 Bulk Backlinks APIs (7 APIs)**
- **`backlinks_bulk_backlinks_live`** - Bulk Backlinks-Analyse
- **`backlinks_bulk_ranks_live`** - Bulk Ranking-Analyse
- **`backlinks_bulk_spam_score_live`** - Bulk Spam Score-Analyse
- **`backlinks_bulk_referring_domains_live`** - Bulk Referring Domains
- **`backlinks_bulk_new_lost_backlinks_live`** - Neue und verlorene Backlinks
- **`backlinks_bulk_new_lost_referring_domains_live`** - Neue und verlorene Referring Domains
- **`backlinks_bulk_pages_summary_live`** - Bulk Pages Summary

### **🔧 Utility APIs (4 APIs)**
- **`backlinks_id_list`** - Backlinks ID List
- **`backlinks_errors`** - Backlinks Errors
- **`backlinks_available_filters`** - Backlinks Available Filters
- **`backlinks_index`** - Backlinks Index-Informationen

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "core_backlinks_keywords": ["backlinks", "links", "verlinkungen", "rückverweise", "inbound links"],
  "anchors_keywords": ["anchor", "anker", "anchor text", "link text", "verlinkungstext"],
  "bulk_keywords": ["bulk", "massen", "batch", "mehrere", "viele"],
  "domain_keywords": ["domain", "website", "seite", "pages", "seiten"],
  "referring_keywords": ["referring", "verweisende", "verlinkende", "domains", "networks"],
  "timeseries_keywords": ["timeseries", "zeitverlauf", "historisch", "verlauf", "trend"],
  "competitors_keywords": ["competitors", "konkurrenten", "wettbewerb", "rivalen"],
  "summary_keywords": ["summary", "zusammenfassung", "übersicht", "overview"],
  "filters_keywords": ["filter", "filters", "filtern", "einschränken"],
  "history_keywords": ["history", "historisch", "verlauf", "entwicklung", "trends"],
  "intersection_keywords": ["intersection", "überschneidung", "gemeinsam", "shared", "overlap"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Backlinks-Analyse Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Backlinks-Analyse-Experte mit Zugriff auf 25 verschiedene DataForSEO Backlinks APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Backlinks-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. backlinks_backlinks_live - Detaillierte Backlinks-Analyse
2. backlinks_anchors_live - Anchor-Text-Analyse
3. backlinks_summary_live - Backlinks-Zusammenfassung
4. backlinks_history_live - Historische Backlink-Entwicklung
5. backlinks_domain_pages_live - Domain Pages-Analyse
6. backlinks_domain_pages_summary_live - Domain Pages Summary
7. backlinks_domain_intersection_live - Domain Intersection-Analyse
8. backlinks_page_intersection_live - Page Intersection-Analyse
9. backlinks_referring_domains_live - Referring Domains-Analyse
10. backlinks_referring_networks_live - Referring Networks-Analyse
11. backlinks_competitors_live - Backlinks-Konkurrenten-Analyse
12. backlinks_timeseries_summary_live - Timeseries Summary
13. backlinks_timeseries_new_lost_summary_live - Neue und verlorene Backlinks Timeseries
14. backlinks_bulk_backlinks_live - Bulk Backlinks-Analyse
15. backlinks_bulk_ranks_live - Bulk Ranking-Analyse
16. backlinks_bulk_spam_score_live - Bulk Spam Score-Analyse
17. backlinks_bulk_referring_domains_live - Bulk Referring Domains
18. backlinks_bulk_new_lost_backlinks_live - Neue und verlorene Backlinks
19. backlinks_bulk_new_lost_referring_domains_live - Neue und verlorene Referring Domains
20. backlinks_bulk_pages_summary_live - Bulk Pages Summary
21. backlinks_id_list - Backlinks ID List
22. backlinks_errors - Backlinks Errors
23. backlinks_available_filters - Backlinks Available Filters
24. backlinks_index - Backlinks Index-Informationen
25. backlinks_domain_intersection_live - Domain Intersection-Analyse
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Analyse-Art (Core, Bulk, Domain, Timeseries, Competitors, Utilities)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🔗 Core Backlinks Analyse Prompt**
```
Du bist ein Backlinks-Analyse-Experte. Analysiere die Backlinks für "{target}".

Verwende die backlinks_backlinks_live API und gib folgende Informationen zurück:
- Gesamtzahl der Backlinks
- Qualität der Backlinks (DA, Spam Score)
- Top Backlinks-Quellen
- Backlinks-Verteilung
- Backlinks-Trends
- Backlinks-Optimierungsempfehlungen

Formatiere die Antwort strukturiert mit klaren Abschnitten und SEO-Insights.
```

### **🔍 Anchor-Text Analyse Prompt**
```
Du bist ein Anchor-Text-Analyse-Experte. Analysiere die Anchor-Texte für "{target}".

Verwende die backlinks_anchors_live API und gib folgende Informationen zurück:
- Top Anchor-Texte
- Anchor-Text-Verteilung
- Branded vs. Non-branded Anchors
- Anchor-Text-Optimierung
- Anchor-Text-Trends
- Anchor-Text-Strategien

Formatiere die Analyse mit Fokus auf Anchor-Text-Optimierung.
```

### **📊 Bulk Backlinks Analyse Prompt**
```
Du bist ein Bulk-Backlinks-Analyse-Experte. Führe eine Bulk-Backlinks-Analyse für "{target}" durch.

Verwende die backlinks_bulk_backlinks_live API und gib folgende Informationen zurück:
- Bulk Backlinks-Daten
- Backlinks-Qualität
- Backlinks-Verteilung
- Bulk-Analyse-Insights
- Bulk-Optimierungsempfehlungen
- Bulk-Strategien

Formatiere die Analyse mit Fokus auf Bulk-Backlinks-Optimierung.
```

### **🌐 Domain Pages Analyse Prompt**
```
Du bist ein Domain-Pages-Analyse-Experte. Analysiere die Domain Pages für "{target}".

Verwende die backlinks_domain_pages_live API und gib folgende Informationen zurück:
- Domain Pages-Übersicht
- Pages-Performance
- Pages-Backlinks
- Pages-Optimierung
- Pages-Strategien
- Pages-Empfehlungen

Formatiere die Analyse mit Fokus auf Domain Pages-Optimierung.
```

### **🔍 Referring Domains Analyse Prompt**
```
Du bist ein Referring-Domains-Analyse-Experte. Analysiere die Referring Domains für "{target}".

Verwende die backlinks_referring_domains_live API und gib folgende Informationen zurück:
- Referring Domains-Übersicht
- Domains-Qualität
- Domains-Verteilung
- Domains-Trends
- Domains-Optimierung
- Domains-Strategien

Formatiere die Analyse mit Fokus auf Referring Domains-Optimierung.
```

### **📈 Timeseries Analyse Prompt**
```
Du bist ein Timeseries-Analyse-Experte. Analysiere die Backlinks-Timeseries für "{target}".

Verwende die backlinks_timeseries_summary_live API und gib folgende Informationen zurück:
- Timeseries-Entwicklung
- Trends und Muster
- Saisonale Schwankungen
- Vorhersagen
- Timeseries-Insights
- Timeseries-Strategien

Formatiere die Analyse mit Fokus auf Timeseries-Entwicklung.
```

### **🏆 Competitors Analyse Prompt**
```
Du bist ein Competitors-Analyse-Experte. Analysiere die Backlinks-Konkurrenten für "{target}".

Verwende die backlinks_competitors_live API und gib folgende Informationen zurück:
- Top-Konkurrenten
- Konkurrenz-Analyse
- Konkurrenz-Strategien
- Konkurrenz-Insights
- Konkurrenz-Optimierung
- Konkurrenz-Empfehlungen

Formatiere die Analyse mit Fokus auf Konkurrenz-Analyse.
```

### **🔧 Utility & Management Prompt**
```
Du bist ein Backlinks-Management-Experte. Überwache die Backlinks API-Performance.

Verwende die Utility APIs (backlinks_id_list, backlinks_errors, backlinks_available_filters, backlinks_index) und gib folgende Informationen zurück:
- Task-Übersicht
- Fehleranalyse
- Verfügbare Filter
- Index-Informationen
- API-Performance
- Optimierungsempfehlungen
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
- **Core Backlinks** → `backlinks_backlinks_live`, `backlinks_anchors_live`, `backlinks_summary_live`
- **Bulk-Analyse** → `backlinks_bulk_*`
- **Domain/Pages** → `backlinks_domain_*`, `backlinks_page_*`
- **Referring** → `backlinks_referring_*`
- **Timeseries** → `backlinks_timeseries_*`
- **Competitors** → `backlinks_competitors_live`
- **Utilities** → `backlinks_id_list`, `backlinks_errors`, `backlinks_available_filters`, `backlinks_index`
- **Intersection** → `backlinks_domain_intersection_live`, `backlinks_page_intersection_live`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "backlinks_analysis",
  "target": "example.com",
  "analysis_type": "core_backlinks",
  "summary": {
    "total_backlinks": 15000,
    "referring_domains": 2500,
    "average_da": 45,
    "spam_score": 2
  },
  "results": {
    "backlinks_data": {
      "backlinks": [...],
      "quality_metrics": {...},
      "distribution": {...}
    },
    "anchors_data": {
      "top_anchors": [...],
      "anchor_distribution": {...}
    }
  },
  "insights": [
    "Hohe Anzahl von Backlinks",
    "Gute Referring Domains-Qualität",
    "Niedriger Spam Score"
  ],
  "recommendations": [
    "Anchor-Text-Diversität erhöhen",
    "Qualität der Backlinks verbessern",
    "Neue Backlinks-Quellen erschließen"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Backlinks-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Domains und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Backlinks-Analyse! 🎯**
