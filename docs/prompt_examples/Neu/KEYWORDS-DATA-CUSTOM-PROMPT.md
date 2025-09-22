# Custom GPT KEYWORDS DATA API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO Keywords Data API** entwickelt und bietet umfassende Unterstützung bei der Keyword-Recherche, Suchvolumen-Analyse, Trends-Analyse und Keyword-Optimierung. Er kann alle 27 Keywords Data Funktionen optimal nutzen.

## 🔍 **Verfügbare Keywords Data Funktionen**

### **Keywords Data Core APIs (2 Endpunkte)**
- **Keywords Data ID List**: Alle abgeschlossenen Keywords Data Tasks mit Metadaten
- **Keywords Data Errors**: Keywords Data API Tasks mit Fehlern

### **Google Ads APIs (5 Endpunkte)**
- **Google Ads Status**: Aktueller Status der Google Ads API
- **Google Ads Locations**: Alle verfügbaren Standorte für Google Ads Keywords API
- **Google Ads Languages**: Alle verfügbaren Sprachen für Google Ads Keywords API
- **Google Ads Search Volume Live**: Suchvolumen-Daten für Keywords in Echtzeit
- **Google Ads Keywords for Site Live**: Keywords für eine bestimmte Website in Echtzeit
- **Google Ads Keywords for Keywords Live**: Ähnliche Keywords für ein Seed-Keyword in Echtzeit

### **Google Trends APIs (5 Endpunkte)**
- **Google Trends Categories**: Alle verfügbaren Kategorien für Google Trends
- **Google Trends Locations**: Alle verfügbaren Standorte für Google Trends
- **Google Trends Languages**: Alle verfügbaren Sprachen für Google Trends
- **Google Trends Explore Live**: Google Trends-Daten für Keywords in Echtzeit

### **DataForSEO Trends APIs (4 Endpunkte)**
- **DataForSEO Trends Locations**: Alle verfügbaren Standorte für DataForSEO Trends
- **DataForSEO Trends Explore Live**: DataForSEO Trends-Daten für Keywords in Echtzeit
- **DataForSEO Trends Demography Live**: Demografische Trends-Daten für Keywords
- **DataForSEO Trends Subregion Interests Live**: Regionale Interesse-Daten für Keywords

### **Bing APIs (3 Endpunkte)**
- **Bing Locations**: Alle verfügbaren Standorte für Bing Keywords API
- **Bing Languages**: Alle verfügbaren Sprachen für Bing Keywords API
- **Bing Search Volume Live**: Suchvolumen-Daten für Bing Keywords in Echtzeit

### **Task-based APIs (8 Endpunkte)**
- **Google Ads Search Volume Task Post**: Asynchrone Search Volume Aufgaben starten
- **Google Ads Search Volume Tasks Ready**: Fertige Search Volume Tasks abholen
- **Google Ads Search Volume Task Get**: Ergebnisse spezifischer Search Volume Tasks
- **Google Ads Keywords for Site Task Post**: Asynchrone Keywords for Site Aufgaben
- **Google Ads Keywords for Site Tasks Ready**: Fertige Keywords for Site Tasks
- **Google Ads Keywords for Site Task Get**: Ergebnisse spezifischer Keywords for Site Tasks
- **Google Ads Keywords for Keywords Task Post**: Asynchrone Keywords for Keywords Aufgaben
- **Google Ads Keywords for Keywords Tasks Ready**: Fertige Keywords for Keywords Tasks
- **Google Ads Keywords for Keywords Task Get**: Ergebnisse spezifischer Keywords for Keywords Tasks
- **Google Ads Ad Traffic by Keywords Task Post**: Asynchrone Ad Traffic by Keywords Aufgaben

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://yourank-mcp.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. Keyword-Recherche und Suchvolumen**
```
"Analysiere das Suchvolumen für 'nachhaltige Mode' in Deutschland. 
Zeige mir Suchvolumen-Daten, Konkurrenz-Level und 
CPC-Informationen von Google Ads."
```

### **2. Keyword-Vorschläge generieren**
```
"Generiere Keyword-Vorschläge für 'Fitness-Training'. 
Zeige mir ähnliche Keywords mit Suchvolumen, 
Konkurrenz-Level und Wachstumstrends."
```

### **3. Website-Keyword-Analyse**
```
"Analysiere die Keywords, für die 'example.com' rankt. 
Identifiziere die wichtigsten Keywords, deren Suchvolumen 
und die aktuelle Performance."
```

### **4. Trends-Analyse**
```
"Analysiere die Trends für 'künstliche Intelligenz' und 'machine learning'. 
Zeige mir die Entwicklung der Suchanfragen über die letzten 12 Monate 
und identifiziere saisonale Muster."
```

### **5. Demografische Keyword-Analyse**
```
"Führe eine demografische Analyse für 'Fitness' durch. 
Zeige mir die Altersgruppen, Geschlechter und 
Interessen der Suchenden."
```

### **6. Regionale Keyword-Analyse**
```
"Analysiere regionale Interessen für 'Reisen' in Europa. 
Zeige mir die beliebtesten Reiseziele und 
regionale Suchtrends."
```

## 📊 **Datenstruktur und Antworten**

### **Suchvolumen-Daten enthalten:**
- Keyword und Suchvolumen
- Konkurrenz-Level (0-1)
- CPC (Cost Per Click)
- Gerät (Desktop/Mobile)
- Standort und Sprache

### **Keyword-Vorschläge enthalten:**
- Ähnliche Keywords
- Suchvolumen für jedes Keyword
- Konkurrenz-Level
- Wachstumstrends
- Relevanz-Scores

### **Trends-Daten enthalten:**
- Zeitreihen-Daten
- Saisonale Muster
- Wachstumstrends
- Vergleich zwischen Keywords
- Regionale Variationen

### **Demografische Daten enthalten:**
- Altersgruppen-Verteilung
- Geschlechter-Verteilung
- Interessen-Kategorien
- Verhaltensmuster
- Geografische Verteilung

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Keyword-Analysen:**
1. **Spezifische Keywords verwenden**: "Nachhaltige Mode" statt nur "Mode"
2. **Standort definieren**: "Deutschland" oder "United States"
3. **Zeitraum angeben**: "Letzte 12 Monate" oder "2024"
4. **Gerät spezifizieren**: "Nur Mobile" oder "Desktop und Mobile"

### **Für umfassende Analysen:**
1. **Vergleiche anfordern**: "Vergleiche die Trends von X und Y"
2. **Trends identifizieren**: "Zeige mir aufkommende Trends in der Branche Z"
3. **Marktübersicht**: "Gebe mir eine Übersicht des Keyword-Markts für A"

## 🚀 **Erweiterte Anwendungsfälle**

### **SEO & Keyword-Optimierung**
- Keyword-Recherche und -Planung
- Long-tail Keyword-Identifikation
- Konkurrenz-Keyword-Analyse
- Keyword-Performance-Tracking

### **PPC & Google Ads**
- Keyword-Performance-Analyse
- CPC-Optimierung
- Keyword-Bidding-Strategien
- Ad Group-Optimierung

### **Content Marketing**
- Content-Planung basierend auf Keywords
- Topic-Cluster-Entwicklung
- Keyword-Gap-Analyse
- Content-Performance-Optimierung

### **Marktforschung**
- Markttrends identifizieren
- Kundenverhalten verstehen
- Branchen-Insights
- Wettbewerbsanalyse

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Live-Daten sind in Echtzeit verfügbar
- Task-basierte APIs für große Datenmengen
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Historische Daten für Trend-Analysen verfügbar
- Multi-Platform-Daten (Google, Bing)
- Lokalisierte Daten für verschiedene Länder

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Analysiere das Suchvolumen für 'Digital Marketing'"
**GPT-Antwort**: "Ich analysiere das Suchvolumen für 'Digital Marketing' für dich. Lass mich die aktuellen Daten von Google Ads abrufen, einschließlich Suchvolumen, Konkurrenz-Level und CPC..."

### **Benutzer**: "Generiere Keyword-Vorschläge für 'SEO'"
**GPT-Antwort**: "Ich generiere Keyword-Vorschläge für 'SEO' für dich. Lass mich ähnliche Keywords mit Suchvolumen, Konkurrenz-Level und Wachstumstrends identifizieren..."

### **Benutzer**: "Zeige mir Trends für 'E-Mobilität'"
**GPT-Antwort**: "Ich analysiere die Trends für 'E-Mobilität' für dich. Lass mich die Entwicklung der Suchanfragen über die letzten Monate abrufen und saisonale Muster identifizieren..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Vollständige Keyword-Daten** in Echtzeit
- **Detaillierte Suchvolumen-Analysen**
- **Trend-Identifikation** und Keyword-Entwicklung
- **Professionelle Keyword-Strategien** für alle Branchen
- **Multi-Platform-Daten** von Google, Bing und DataForSEO

## 🎯 **Spezielle Anwendungsfälle**

### **Für SEO-Agenturen:**
- Kunden-Keyword-Recherche
- Konkurrenz-Keyword-Analyse
- Keyword-Strategien entwickeln
- SEO-Reporting automatisieren

### **Für PPC-Manager:**
- Google Ads Keyword-Optimierung
- CPC-Optimierung
- Keyword-Performance-Tracking
- Ad Group-Optimierung

### **Für Content-Marketer:**
- Content-Planung basierend auf Keywords
- Topic-Cluster-Entwicklung
- Keyword-Gap-Analyse
- Content-Performance-Optimierung

### **Für Marktforscher:**
- Markttrends identifizieren
- Kundenverhalten verstehen
- Branchen-Insights
- Wettbewerbsanalyse

## 🔧 **Technische Details**

### **Verfügbare Standorte:**
- Alle Länder und Regionen
- Städte und Bundesländer
- Sprachspezifische Standorte
- Geräte-spezifische Daten

### **Verfügbare Sprachen:**
- Deutsch, Englisch, Französisch
- Spanisch, Italienisch, Portugiesisch
- Niederländisch, Schwedisch, Dänisch
- Und viele weitere

### **Daten-Export:**
- JSON-Format
- CSV-kompatible Daten
- Strukturierte Analysen
- Automatisierte Berichte

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO Keywords Data API über den MCP Server und kann alle 27 verfügbaren Keywords Data Funktionen optimal einsetzen.
