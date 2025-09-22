# Custom GPT DOMAIN ANALYTICS API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO Domain Analytics API** entwickelt und bietet umfassende Unterstützung bei der Domain-Intelligence, Technologie-Analyse, WHOIS-Daten und erweiterten Domain-Analyse-Funktionen. Er kann alle Domain Analytics Funktionen optimal nutzen.

## 🌐 **Verfügbare Domain Analytics Funktionen**

### **Domain Analytics Core APIs (2 Endpunkte)**
- **Domain Analytics ID List**: Alle abgeschlossenen Domain Analytics Tasks mit Metadaten
- **Domain Analytics Errors**: Domain Analytics API Tasks mit Fehlern der letzten 7 Tage

### **Domain Analytics Technologies APIs (10 Endpunkte)**
- **Technologies Available Filters**: Verfügbare Filter für Technologies API
- **Technologies Locations**: Alle verfügbaren Standorte für Technologies
- **Technologies Languages**: Alle verfügbaren Sprachen für Technologies
- **Technologies Technologies**: Vollständige Liste aller verfügbaren Technologien
- **Technologies Summary Live**: Zusammenfassende Statistiken und Trends für Technologie-Verwendung
- **Technology Stats Live**: Detaillierte Statistiken für spezifische Technologien
- **Aggregation Technologies Live**: Beliebte Technologien, die zusammen mit angegebenen Technologien verwendet werden
- **Technologies Summary Live**: Zusammenfassung der Technologie-Analyse für eine spezifische Domain
- **Technologies Stats Live**: Detaillierte Statistiken der Technologie-Analyse für eine spezifische Domain
- **Domains by Technology Live**: Liste von Domains, die eine spezifische Technologie verwenden
- **Domains by HTML Terms Live**: Liste von Domains basierend auf HTML-Terms und Technologie-Erkennung
- **Domain Technologies Live**: Detaillierte Technologie-Analyse für eine spezifische Domain

### **Domain Analytics WHOIS APIs (2 Endpunkte)**
- **WHOIS Available Filters**: Verfügbare Filter für WHOIS API
- **WHOIS Overview Live**: WHOIS-Daten angereichert mit Backlink-Statistiken, Ranking- und Traffic-Informationen

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://mcp-server-typescript-six.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. Technologie-Analyse einer Domain**
```
"Analysiere die Technologien, die 'example.com' verwendet. 
Zeige mir alle verwendeten Technologien, deren Versionen 
und die Konfidenz-Scores für jede Erkennung."
```

### **2. Marktanalyse für Technologien**
```
"Analysiere den Markt für 'WordPress' in Deutschland. 
Zeige mir die Anzahl der Websites, die WordPress verwenden, 
Marktanteile und verwandte Technologien."
```

### **3. Konkurrenz-Technologie-Analyse**
```
"Vergleiche die Technologie-Stacks von 'competitor1.com' und 'competitor2.com'. 
Identifiziere gemeinsame Technologien und 
zeige mir, wo technologische Vorteile liegen."
```

### **4. WHOIS-Domain-Analyse**
```
"Führe eine umfassende WHOIS-Analyse für 'targetdomain.com' durch. 
Zeige mir Domain-Informationen, Backlink-Statistiken, 
Ranking-Daten und Traffic-Informationen."
```

### **5. Technologie-Trends identifizieren**
```
"Identifiziere aufkommende Technologie-Trends im E-Commerce-Bereich. 
Zeige mir die beliebtesten Technologien und 
ihre Verbreitung über die letzten 12 Monate."
```

### **6. HTML-basierte Domain-Suche**
```
"Suche nach Domains, die 'react' und 'nodejs' in ihrem HTML verwenden. 
Zeige mir alle gefundenen Domains mit 
ihren Rankings und Traffic-Daten."
```

## 📊 **Datenstruktur und Antworten**

### **Technologie-Daten enthalten:**
- Technologie-Name und Kategorie
- Version und Konfidenz-Score
- Verwendungs-Häufigkeit
- Marktanteile und Trends
- Verwandte Technologien

### **Domain-Analyse enthalten:**
- Vollständige Technologie-Liste
- Technologie-Kategorien
- Performance-Metriken
- Technologie-Verteilung

### **WHOIS-Daten enthalten:**
- Domain-Registrierungs-Informationen
- Backlink-Statistiken
- Ranking-Informationen
- Traffic-Daten
- Domain-Authority

### **Markt-Analyse enthalten:**
- Technologie-Verbreitung
- Marktanteile
- Trends über Zeit
- Regionale Verteilung

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Technologie-Analysen:**
1. **Spezifische Domains verwenden**: "https://example.com" statt nur "example.com"
2. **Technologien definieren**: "WordPress 6.0" statt nur "WordPress"
3. **Standort angeben**: "Deutschland" oder "United States"
4. **Zeitraum definieren**: "Letzte 6 Monate" oder "2024"

### **Für umfassende Analysen:**
1. **Vergleiche anfordern**: "Vergleiche die Technologie-Stacks von X und Y"
2. **Trends identifizieren**: "Zeige mir Technologie-Trends in der Branche Z"
3. **Marktübersicht**: "Gebe mir eine Übersicht des Technologie-Markts für A"

## 🚀 **Erweiterte Anwendungsfälle**

### **Web-Entwicklung & IT**
- Technologie-Stack-Analyse
- Performance-Optimierung
- Sicherheits-Bewertung
- Technologie-Migration

### **Marktforschung & Competitive Intelligence**
- Konkurrenz-Technologie-Analyse
- Markttrends identifizieren
- Branchen-Insights
- Technologie-Strategie-Entwicklung

### **SEO & Digital Marketing**
- Technologie-basierte SEO-Strategien
- Performance-Optimierung
- Konkurrenz-Überwachung
- Technologie-basierte Targeting

### **Investitionsentscheidungen**
- Website-Technologie-Bewertung
- Marktpotenzial-Analyse
- Technologie-Risiko-Bewertung
- ROI-Prognosen

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Maximale Ergebnisse: 1000 pro Anfrage
- Live-Daten sind in Echtzeit verfügbar
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Automatische Technologie-Erkennung
- Multi-Platform-Daten
- Regelmäßige Updates der Technologie-Datenbank

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Analysiere die Technologien von 'techblog.com'"
**GPT-Antwort**: "Ich analysiere die Technologien von techblog.com für dich. Lass mich alle verwendeten Technologien, deren Versionen und Konfidenz-Scores abrufen..."

### **Benutzer**: "Vergleiche die Technologie-Stacks von 3 Konkurrenten"
**GPT-Antwort**: "Ich vergleiche die Technologie-Stacks deiner Konkurrenten. Lass mich eine umfassende Analyse durchführen und gemeinsame Technologien identifizieren..."

### **Benutzer**: "Zeige mir WordPress-Marktanteile in Europa"
**GPT-Antwort**: "Ich analysiere die WordPress-Marktanteile in Europa für dich. Lass mich die Verbreitung, Trends und verwandte Technologien abrufen..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Vollständige Technologie-Analysen** in Echtzeit
- **Detaillierte Domain-Insights**
- **Markt-Trends** und Technologie-Entwicklung
- **Professionelle Technologie-Strategien** für alle Branchen
- **Umfassende WHOIS-Daten** für Domain-Analysen

## 🎯 **Spezielle Anwendungsfälle**

### **Für Web-Entwickler:**
- Technologie-Stack-Optimierung
- Performance-Analyse
- Sicherheits-Bewertung
- Technologie-Auswahl

### **Für SEO-Experten:**
- Technologie-basierte SEO-Strategien
- Performance-Optimierung
- Konkurrenz-Überwachung
- Technologie-basierte Targeting

### **Für Marktforscher:**
- Technologie-Trends identifizieren
- Marktgröße und -wachstum
- Wettbewerbslandschaft
- Technologie-Strategien der Konkurrenz

### **Für Investoren:**
- Website-Technologie-Bewertung
- Marktpotenzial-Analyse
- Technologie-Risiko-Bewertung
- Wachstumstrends

## 🔧 **Technische Details**

### **Verfügbare Technologie-Kategorien:**
- Content Management Systeme
- E-Commerce-Plattformen
- Analytics-Tools
- Marketing-Tools
- Sicherheits-Technologien
- Hosting- und Server-Technologien

### **Erkennungs-Methoden:**
- HTML-Scanning
- JavaScript-Analyse
- Header-Analyse
- DNS-Lookup
- Port-Scanning

### **Daten-Export:**
- JSON-Format
- CSV-kompatible Daten
- Strukturierte Analysen
- Automatisierte Berichte

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO Domain Analytics API über den MCP Server und kann alle verfügbaren Domain Analytics Funktionen optimal einsetzen.
