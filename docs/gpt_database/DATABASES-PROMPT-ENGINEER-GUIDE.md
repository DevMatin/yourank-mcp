# 🗄️ DataForSEO Databases API - Prompt Engineer Guide

## 🎯 **Übersicht**

Die **DataForSEO Databases API** bietet Zugriff auf umfangreiche Datenbanken für tiefgehende SEO-Analysen, Keyword-Recherche, App-Markt-Analyse, E-Commerce-Insights und mehr. Diese API ist das **12. Modul** im DataForSEO MCP Server und erweitert die Funktionalität erheblich.

---

## 📊 **Verfügbare Datenbanken (9 Typen, 21 Tools)**

### **1. 🔍 Google Databases (4 Tools)**
- **Google Advanced SERP Database** - Alle SERP-Elemente mit Page Rank
- **Google Regular SERP Database** - Standard SERP-Ergebnisse
- **Google Keywords Database** - Milliarden von Keywords mit Google Ads-Daten
- **Google Unified Search Database** - Kombination aus SERP und Keywords

### **2. 📈 Google Historical Databases (3 Tools)**
- **Google Historical SERP Database** - Monatliche SERP-Snapshots ab 2021-08-01
- **Google Historical Keywords Database** - Historische Keyword-Daten seit 2019
- **Google Historical Unified Search Database** - Kombinierte historische Daten

### **3. 🔎 Bing Databases (3 Tools)**
- **Bing Advanced SERP Database** - Bing-Suchergebnisse mit erweiterten Features
- **Bing Keywords Database** - Bing-Keywords mit Bing Ads-Daten
- **Bing Unified Search Database** - Vollständige Bing-Datenbank

### **4. 🛒 Amazon Products Database (1 Tool)**
- **Amazon Products Database** - Produktdaten mit Rankings und Metriken

### **5. 📱 Google Play Databases (2 Tools)**
- **Google Play SERPs Database** - App-Suchergebnisse mit Keyword-Volumen
- **Google Play Listings Database** - Über eine Million Apps mit Metadaten

### **6. 🍎 App Store Databases (2 Tools)**
- **App Store SERPs Database** - iOS App-Suchergebnisse
- **App Store Listings Database** - Über eine Million iOS-Apps

### **7. 🔗 Backlink Summary Database (1 Tool)**
- **Backlink Summary Database** - Backlink-Profile für Millionen von Domains

### **8. 🏢 Business Listings Database (1 Tool)**
- **Business Listings Database** - Millionen von POI-Datensätzen

### **9. 🌐 Whois Domains Database (1 Tool)**
- **Whois Domains Database** - Strukturierte Whois- und Sichtbarkeits-Daten

---

## 🚀 **Schnellstart-Prompts**

### **Google SERP-Analyse**
```
Analysiere die Google Advanced SERP Database für 'seo tools' in Deutschland. 
Zeige mir die Top 100 Ergebnisse mit Page Rank und Domain Rank Metriken.
```

### **Keyword-Recherche**
```
Finde Keywords mit hohem Suchvolumen (>1000) für 'digital marketing' in der 
Google Keywords Database. Filtere nach CPC < 5€ und niedrigem Wettbewerb.
```

### **Historische Trend-Analyse**
```
Analysiere historische Trends für 'artificial intelligence' seit 2021-01-01 
in der Google Historical Keywords Database. Zeige mir Suchvolumen-Entwicklungen.
```

### **App-Markt-Analyse**
```
Führe eine App-Markt-Analyse für 'productivity apps' durch. Verwende Google Play 
Listings Database und analysiere Top-Apps mit Rating > 4.0.
```

### **E-Commerce-Analyse**
```
Analysiere Amazon-Produktrankings für 'wireless headphones' mit Rating > 4.0 
und Preis < 200€. Zeige mir die Top 100 Produkte.
```

---

## 📋 **Parameter-Referenz**

### **Grundlegende Parameter**
- `location_name` - Standort (z.B. "Germany", "United States")
- `location_code` - Numerischer Standortcode (empfohlen)
- `language_code` - Sprache (z.B. "en", "de", "fr")
- `keyword` - Suchbegriff
- `domain` - Domain für Domain-basierte Suchen
- `limit` - Anzahl Ergebnisse (1-1000, Standard: 100)
- `offset` - Pagination-Offset (Standard: 0)

### **Filter-Parameter**
- `filters` - Array von Filterbedingungen
- `order_by` - Sortierung der Ergebnisse
- `search_volume_min/max` - Suchvolumen-Filter
- `cpc_min/max` - CPC-Filter
- `rating_min/max` - Bewertungs-Filter
- `price_min/max` - Preis-Filter

### **Historische Parameter**
- `date_from` - Startdatum (YYYY-MM-DD)
- `date_to` - Enddatum (YYYY-MM-DD)

---

## 🎯 **Anwendungsfälle**

### **1. SEO-Recherche und -Analyse**
```prompt
Führe eine umfassende SEO-Analyse für 'e-commerce solutions' durch:
1. Analysiere Google Advanced SERP Database für aktuelle Rankings
2. Recherchiere Keywords in der Google Keywords Database
3. Prüfe historische Trends in der Google Historical Database
4. Identifiziere Konkurrenz-Insights und Optimierungsmöglichkeiten
```

### **2. App-Markt-Recherche**
```prompt
Führe eine App-Markt-Analyse für 'fitness apps' durch:
1. Analysiere Google Play SERPs für App-Rankings
2. Durchsuche Google Play Listings für Top-Apps
3. Vergleiche mit App Store SERPs und Listings
4. Identifiziere Markt-Trends und Erfolgsfaktoren
```

### **3. E-Commerce-Produktanalyse**
```prompt
Analysiere den E-Commerce-Markt für 'smartphone cases':
1. Durchsuche Amazon Products Database nach Top-Produkten
2. Recherchiere relevante Keywords in der Google Keywords Database
3. Analysiere Preis-Trends und Bewertungen
4. Identifiziere Markt-Opportunities
```

### **4. Konkurrenz-Analyse**
```prompt
Führe eine Konkurrenz-Analyse für 'competitor.com' durch:
1. Analysiere SERP-Positionen in der Google Advanced SERP Database
2. Prüfe Backlink-Profil in der Backlink Summary Database
3. Recherchiere Domain-Informationen in der Whois Database
4. Identifiziere Stärken und Schwächen der Konkurrenz
```

### **5. Lokale Business-Analyse**
```prompt
Analysiere lokale Businesses für 'restaurants berlin':
1. Durchsuche Business Listings Database nach Restaurants
2. Analysiere Bewertungen und Kontakt-Informationen
3. Prüfe lokale SERP-Rankings in der Google SERP Database
4. Identifiziere lokale SEO-Optimierungsmöglichkeiten
```

---

## 🔧 **Erweiterte Prompts**

### **Cross-Database-Analyse**
```prompt
Führe eine Cross-Database-Analyse für 'digital marketing' durch:
1. Google Advanced SERP Database: Aktuelle Rankings und SERP-Features
2. Google Keywords Database: Keyword-Volumen und CPC-Daten
3. Google Historical Database: Trend-Entwicklung seit 2021
4. Bing Databases: Alternative Suchmaschinen-Insights
5. Kombiniere alle Daten für umfassende SEO-Strategie
```

### **Historische Trend-Analyse**
```prompt
Analysiere langfristige Trends für 'artificial intelligence':
1. Google Historical Keywords: Suchvolumen-Entwicklung seit 2019
2. Google Historical SERP: SERP-Feature-Evolution
3. Identifiziere saisonale Muster und langfristige Trends
4. Prognostiziere zukünftige Entwicklungen
```

### **Multi-Platform-App-Analyse**
```prompt
Vergleiche App-Märkte für 'photo editing apps':
1. Google Play SERPs und Listings: Android-Markt
2. App Store SERPs und Listings: iOS-Markt
3. Identifiziere Plattform-spezifische Unterschiede
4. Analysiere Cross-Platform-Strategien
```

---

## 💡 **Best Practices**

### **Datenbank-Auswahl**
- **Google Advanced SERP** für umfassende SERP-Analysen
- **Google Keywords** für detaillierte Keyword-Recherche
- **Historical Databases** für Trend-Analysen
- **App Databases** für App-Markt-Recherche
- **Amazon Database** für E-Commerce-Analysen

### **Parameter-Optimierung**
- Verwende `location_code` statt `location_name` für bessere Performance
- Setze angemessene `limit`-Werte (100-500 für erste Analysen)
- Nutze `filters` für präzise Suchergebnisse
- Verwende `order_by` für relevante Ergebnis-Sortierung

### **Kosten-Optimierung**
- Starte mit kleineren `limit`-Werten für erste Tests
- Nutze spezifische `filters` um irrelevante Daten zu vermeiden
- Kombiniere verwandte Suchen in einem Request
- Cache häufig verwendete Datenbank-Abfragen

### **Daten-Analyse**
- Vergleiche verschiedene Datenbanken für vollständige Insights
- Analysiere historische Trends für langfristige Strategien
- Kombiniere SERP und Keyword-Daten für umfassende Analysen
- Nutze Cross-Database-Korrelationen für tiefere Einblicke

---

## 🎨 **Prompt-Templates**

### **Standard-Datenbank-Analyse**
```
Analysiere die {database_type} Database für '{keyword}' in {location_name}. 
Verwende {language_code} Sprache und analysiere {limit} Ergebnisse. 
Identifiziere die wichtigsten Insights und Trends.
```

### **Historische Trend-Analyse**
```
Analysiere historische Trends für '{keyword}' seit {date_from} in der 
{historical_database} Database. Identifiziere Entwicklungstrends, 
saisonale Muster und langfristige Veränderungen.
```

### **Cross-Database-Vergleich**
```
Vergleiche {database1} und {database2} Databases für '{keyword}'. 
Analysiere Unterschiede, Gemeinsamkeiten und Cross-Database-Insights.
```

### **App-Markt-Analyse**
```
Führe eine App-Markt-Analyse für '{app_category}' durch. Verwende 
{app_database} Database und analysiere Top-Apps, Bewertungen, 
Preise und Markt-Trends.
```

---

## 🔍 **Workflow-Beispiele**

### **Vollständiger SEO-Datenbank-Audit**
1. **Google Advanced SERP Database** - Aktuelle Rankings analysieren
2. **Google Keywords Database** - Keyword-Recherche durchführen
3. **Google Historical Database** - Trend-Entwicklung prüfen
4. **Backlink Summary Database** - Backlink-Profil analysieren
5. **Ergebnisse kombinieren** - Umfassende SEO-Strategie entwickeln

### **App-Markt-Recherche**
1. **Google Play SERPs** - Android App-Rankings analysieren
2. **Google Play Listings** - Top-Apps identifizieren
3. **App Store SERPs** - iOS App-Rankings vergleichen
4. **App Store Listings** - Cross-Platform-Insights gewinnen

### **E-Commerce-Analyse**
1. **Amazon Products Database** - Produktrankings analysieren
2. **Google Keywords Database** - E-Commerce-Keywords recherchieren
3. **Google SERP Database** - SEO-Rankings prüfen
4. **Markt-Opportunities** - Strategien entwickeln

---

## ⚠️ **Wichtige Hinweise**

### **Kosten-Informationen**
- **Premium Databases**: Google Advanced SERP, Historical, Backlinks
- **Standard Databases**: Bing, Amazon, App Stores, Business Listings, Whois
- **Credits erforderlich** für alle Database-Zugriffe
- **Pagination** für große Datensätze verwenden

### **Performance-Tipps**
- Verwende `location_code` für bessere Performance
- Setze angemessene `limit`-Werte
- Nutze `filters` für präzise Ergebnisse
- Cache häufig verwendete Abfragen

### **Datenqualität**
- **Google Databases**: Höchste Qualität, umfassendste Daten
- **Historical Databases**: Langfristige Trends und Entwicklungen
- **App Databases**: Aktuelle App-Markt-Daten
- **Cross-Database-Korrelationen** für vollständige Insights

---

## 🎯 **Zusammenfassung**

Die **DataForSEO Databases API** bietet mit **21 Tools** und **9 Datenbank-Typen** umfassende Möglichkeiten für:

- ✅ **SEO-Recherche und -Analyse**
- ✅ **App-Markt-Recherche**
- ✅ **E-Commerce-Analysen**
- ✅ **Konkurrenz-Analysen**
- ✅ **Historische Trend-Analysen**
- ✅ **Lokale Business-Analysen**
- ✅ **Domain- und Backlink-Recherche**

**Verfügbar als 12. Modul** im DataForSEO MCP Server mit vollständiger Integration und ChatGPT-Schema-Support.
