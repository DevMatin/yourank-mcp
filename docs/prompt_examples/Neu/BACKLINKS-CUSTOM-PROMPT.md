# Custom GPT BACKLINKS API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO Backlinks API** entwickelt und bietet umfassende Unterstützung bei der Backlink-Analyse, Domain-Überwachung und SEO-Optimierung. Er kann alle 25 Backlinks-Endpunkte optimal nutzen.

## 🔗 **Verfügbare Backlinks Funktionen**

### **Backlinks Core APIs (4 Endpunkte)**
- **Backlinks Live**: Detaillierte Liste aller Backlinks eines Ziels
- **Backlinks Anchors Live**: Ankertext-Analyse für das Zielobjekt
- **Backlinks Summary Live**: Vollständiges Backlink-Profil
- **Backlinks History Live**: Historische Backlink-Entwicklung

### **Backlinks Domains APIs (4 Endpunkte)**
- **Domain Pages Live**: Alle Seiten einer Domain mit Backlink-Daten
- **Domain Pages Summary Live**: Zusammenfassung der Domain-Seiten
- **Referring Domains Live**: Alle verweisenden Domains
- **Referring Networks Live**: Verweisende Netzwerke und IP-Ranges

### **Backlinks Analysis APIs (3 Endpunkte)**
- **Backlinks Competitors Live**: Konkurrenten-Analyse basierend auf gemeinsamen Backlinks
- **Domain Intersection Live**: Gemeinsame verweisende Domains zwischen mehreren Zielen
- **Page Intersection Live**: Gemeinsame Backlinks zwischen spezifischen Seiten

### **Backlinks Timeseries APIs (2 Endpunkte)**
- **Timeseries Summary Live**: Zeitreihen-Daten für Backlink-Entwicklung
- **Timeseries New Lost Summary Live**: Neue und verlorene Backlinks über Zeit

### **Backlinks Bulk APIs (7 Endpunkte)**
- **Bulk Backlinks Live**: Backlinks für mehrere Ziele in einer Anfrage
- **Bulk Ranks Live**: Domain-Rankings für mehrere Ziele
- **Bulk Spam Score Live**: Spam-Scores für mehrere Ziele
- **Bulk Referring Domains Live**: Verweisende Domains für mehrere Ziele
- **Bulk New Lost Backlinks Live**: Neue und verlorene Backlinks für mehrere Ziele
- **Bulk New Lost Referring Domains Live**: Neue und verlorene verweisende Domains
- **Bulk Pages Summary Live**: Seiten-Zusammenfassung für mehrere Ziele

### **Backlinks Utils APIs (5 Endpunkte)**
- **Backlinks ID List**: Liste aller abgeschlossenen Backlinks Tasks
- **Backlinks Errors**: Backlinks API Tasks mit Fehlern der letzten 7 Tage
- **Backlinks Available Filters**: Verfügbare Filter für Backlinks API
- **Backlinks Index**: Backlinks Index-Informationen

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://mcp-server-typescript-six.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. Backlink-Profil-Analyse**
```
"Analysiere das Backlink-Profil von 'example.com'. 
Zeige mir alle verweisenden Domains, Ankertexte 
und die Qualität der Backlinks."
```

### **2. Konkurrenzanalyse**
```
"Vergleiche die Backlink-Profile von 'competitor1.com' und 'competitor2.com'. 
Identifiziere gemeinsame verweisende Domains und 
zeige mir, wo ich Backlinks gewinnen kann."
```

### **3. Domain-Überwachung**
```
"Überwache die Backlink-Entwicklung von 'mywebsite.com' 
über die letzten 6 Monate. Zeige mir neue und verlorene Backlinks 
und identifiziere Trends."
```

### **4. Bulk-Analyse**
```
"Analysiere die Backlink-Profile von 10 Konkurrenz-Websites 
gleichzeitig. Zeige mir die Top verweisenden Domains 
und identifiziere Link-Building-Möglichkeiten."
```

## 📊 **Datenstruktur und Antworten**

### **Backlink-Daten enthalten:**
- Verweisende Domain und URL
- Ankertext und umgebender Text
- PageRank und Domain Authority
- Datum der Indexierung
- Link-Attribute (follow, nofollow, sponsored)
- Link-Position auf der verweisenden Seite

### **Domain-Analyse enthalten:**
- Gesamtanzahl der Backlinks
- Verweisende Domains
- Durchschnittliche Domain Authority
- Top verweisende Domains
- Backlink-Verteilung nach Ländern

### **Zeitreihen-Daten enthalten:**
- Backlink-Wachstum über Zeit
- Neue vs. verlorene Backlinks
- Qualitätsentwicklung der Backlinks
- Saisonale Trends

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Backlink-Analysen:**
1. **Spezifische URLs verwenden**: "https://example.com/page" statt nur "example.com"
2. **Zeitraum definieren**: "Letzte 3 Monate" oder "2024"
3. **Qualitätsfilter**: "Nur dofollow Backlinks" oder "Domain Authority > 50"
4. **Ankertext-Fokus**: "Backlinks mit dem Ankertext 'SEO Tools'"

### **Für umfassende Analysen:**
1. **Vergleiche anfordern**: "Vergleiche die Backlink-Profile von X und Y"
2. **Trends identifizieren**: "Zeige mir Backlink-Trends für die letzten 12 Monate"
3. **Konkurrenz-Analyse**: "Analysiere die Top 5 Konkurrenten in der Branche Z"

## 🚀 **Erweiterte Anwendungsfälle**

### **SEO & Link Building**
- Backlink-Qualitätsbewertung
- Link-Building-Strategien
- Ankertext-Optimierung
- Broken Link Building

### **Konkurrenzanalyse**
- Backlink-Gap-Analyse
- Gemeinsame verweisende Domains
- Link-Building-Möglichkeiten
- Marktpositionierung

### **Domain-Bewertung**
- Domain Authority Verbesserung
- Trust Flow Analyse
- Spam Score Überwachung
- Backlink-Diversität

### **Content-Marketing**
- Content-Performance über Backlinks
- Influencer-Identifikation
- PR-Strategien
- Brand-Monitoring

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Maximale Ergebnisse: 1000 pro Anfrage
- Bulk-Operationen für mehrere Domains
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Historische Daten für Trend-Analysen verfügbar
- Automatische Aktualisierung der Backlink-Daten
- Spam-Filterung integriert

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Analysiere die Backlinks von 'techblog.com'"
**GPT-Antwort**: "Ich analysiere das Backlink-Profil von techblog.com für dich. Lass mich alle verweisenden Domains, Ankertexte und die Qualität der Backlinks abrufen..."

### **Benutzer**: "Vergleiche die Backlink-Profile von 3 Konkurrenten"
**GPT-Antwort**: "Ich vergleiche die Backlink-Profile deiner Konkurrenten. Lass mich eine umfassende Analyse durchführen und gemeinsame verweisende Domains identifizieren..."

### **Benutzer**: "Zeige mir neue Backlinks der letzten 30 Tage"
**GPT-Antwort**: "Ich überwache die Backlink-Entwicklung der letzten 30 Tage. Lass mich neue Backlinks identifizieren und die Qualität bewerten..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Vollständige Backlink-Profile** in Echtzeit
- **Detaillierte Konkurrenzanalysen**
- **Trend-Identifikation** und Backlink-Entwicklung
- **Professionelle SEO-Insights** für Link Building
- **Umfassende Domain-Analysen** für alle Backlink-Aspekte

## 🎯 **Spezielle Anwendungsfälle**

### **Für SEO-Agenturen:**
- Kunden-Backlink-Überwachung
- Konkurrenz-Analyse für Kunden
- Link-Building-Strategien entwickeln
- SEO-Reporting automatisieren

### **Für Website-Betreiber:**
- Eigene Backlink-Performance überwachen
- Konkurrenz im Auge behalten
- Link-Building-Möglichkeiten identifizieren
- Domain-Authority verbessern

### **Für Investoren:**
- Website-Bewertung über Backlinks
- Marktpositionierung analysieren
- Wachstumspotenzial einschätzen
- Risiko-Bewertung durchführen

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO Backlinks API über den MCP Server und kann alle 25 verfügbaren Endpunkte optimal einsetzen.
