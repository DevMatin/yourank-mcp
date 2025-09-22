# Custom GPT CONTENT ANALYSIS API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO Content Analysis API** entwickelt und bietet umfassende Unterstützung bei der Content-Analyse, Zitationsdaten-Analyse, Sentiment-Analyse und Trend-Identifikation. Er kann alle Content Analysis Funktionen optimal nutzen.

## 📊 **Verfügbare Content Analysis Funktionen**

### **Content Analysis Base APIs (5 Endpunkte)**
- **Content Analysis ID List**: Alle abgeschlossenen Content Analysis Tasks mit Metadaten
- **Content Analysis Available Filters**: Verfügbare Filter für Content Analysis API
- **Content Analysis Locations**: Alle verfügbaren Standorte für Content Analysis
- **Content Analysis Languages**: Alle verfügbaren Sprachen für Content Analysis
- **Content Analysis Categories**: Alle verfügbaren Kategorien (Google Produkt- und Servicekategorien)

### **Content Analysis Search APIs (2 Endpunkte)**
- **Content Analysis Search Live**: Detaillierte Zitationsdaten für Ziel-Keywords
- **Content Analysis Summary Live**: Übersicht der verfügbaren Zitationsdaten

### **Content Analysis Sentiment APIs (2 Endpunkte)**
- **Content Analysis Sentiment Analysis Live**: Sentiment-Analyse-Daten für Zitationen
- **Content Analysis Rating Distribution Live**: Bewertungsverteilungsdaten für Keywords

### **Content Analysis Trends APIs (2 Endpunkte)**
- **Content Analysis Phrase Trends Live**: Zeitreihen-Daten für Keyword-Trends
- **Content Analysis Category Trends Live**: Zeitreihen-Daten für Kategorie-Trends

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://mcp-server-typescript-six.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. Content-Performance-Analyse**
```
"Analysiere die Content-Performance für das Keyword 'künstliche Intelligenz'. 
Zeige mir alle Zitationen, Backlinks und verweisende Domains 
für eine umfassende Content-Analyse."
```

### **2. Sentiment-Analyse**
```
"Führe eine Sentiment-Analyse für 'Nachhaltigkeit' durch. 
Zeige mir die Verteilung positiver, negativer und neutraler 
Zitationen über die letzten 6 Monate."
```

### **3. Content-Trends identifizieren**
```
"Identifiziere Content-Trends für 'E-Mobilität' in der Kategorie 
'Transport & Logistik'. Zeige mir die Entwicklung der Zitationen 
und Backlinks über Zeit."
```

### **4. Konkurrenz-Content-Analyse**
```
"Analysiere den Content der Top 10 Websites für 'Digital Marketing'. 
Vergleiche Zitationen, Backlinks und verweisende Domains 
für eine Konkurrenzanalyse."
```

## 📊 **Datenstruktur und Antworten**

### **Zitationsdaten enthalten:**
- URL und Domain der zitierten Seite
- Titel und Beschreibung
- Domain-Ranking und Backlink-Anzahl
- Verweisende Domains
- Zitations-Kontext

### **Sentiment-Daten enthalten:**
- Positive, negative und neutrale Zitationen
- Sentiment-Verteilung in Prozent
- Konnotation-Schwellenwerte
- Sentiment-Trends über Zeit

### **Trend-Daten enthalten:**
- Zitations-Entwicklung über Zeit
- Backlink-Wachstum
- Verweisende Domains-Entwicklung
- Saisonale Trends und Muster

### **Kategorie-Daten enthalten:**
- Google Produkt- und Servicekategorien
- Kategorie-spezifische Trends
- Branchenübergreifende Analysen
- Marktsegmentierung

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Content-Analysen:**
1. **Spezifische Keywords verwenden**: "Machine Learning" statt nur "KI"
2. **Zeitraum definieren**: "Letzte 12 Monate" oder "2024"
3. **Kategorien einschränken**: "Nur Technologie-Blogs" oder "E-Commerce-Websites"
4. **Standort angeben**: "Deutschland" oder "Global"

### **Für umfassende Analysen:**
1. **Vergleiche anfordern**: "Vergleiche die Content-Performance von X und Y"
2. **Trends identifizieren**: "Zeige mir Content-Trends für die Branche Z"
3. **Marktübersicht**: "Gebe mir eine Übersicht des Content-Markts für A"

## 🚀 **Erweiterte Anwendungsfälle**

### **Content Marketing & SEO**
- Content-Performance-Optimierung
- Keyword-Content-Strategien
- Backlink-Optimierung
- Content-Gap-Analyse

### **Marktforschung & Competitive Intelligence**
- Konkurrenz-Content-Analyse
- Markttrends identifizieren
- Branchen-Insights
- Content-Strategie-Entwicklung

### **PR & Brand Monitoring**
- Brand-Erwähnungen verfolgen
- Sentiment-Überwachung
- Influencer-Identifikation
- Reputationsmanagement

### **Content-Strategie**
- Content-Planung basierend auf Trends
- Keyword-Optimierung
- Content-Format-Optimierung
- Zielgruppen-Analyse

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Maximale Ergebnisse: 1000 pro Anfrage
- Live-Daten sind in Echtzeit verfügbar
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Historische Daten für Trend-Analysen verfügbar
- Automatische Sentiment-Erkennung
- Multi-Sprach-Unterstützung

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Analysiere Content für 'Nachhaltigkeit'"
**GPT-Antwort**: "Ich analysiere den Content für 'Nachhaltigkeit' für dich. Lass mich alle Zitationen, Backlinks und verweisende Domains abrufen, um dir eine umfassende Content-Analyse zu geben..."

### **Benutzer**: "Zeige mir Sentiment-Trends für 'Kryptowährungen'"
**GPT-Antwort**: "Ich analysiere die Sentiment-Trends für 'Kryptowährungen'. Lass mich die Verteilung positiver, negativer und neutraler Zitationen über die letzten Monate abrufen..."

### **Benutzer**: "Identifiziere Content-Trends in der Technologie-Branche"
**GPT-Antwort**: "Ich identifiziere Content-Trends in der Technologie-Branche für dich. Lass mich die Entwicklung der Zitationen und Backlinks für relevante Keywords analysieren..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Vollständige Content-Analysen** in Echtzeit
- **Detaillierte Sentiment-Insights**
- **Trend-Identifikation** und Content-Entwicklung
- **Professionelle Content-Strategien** für alle Branchen
- **Umfassende Zitationsdaten** für SEO und Content Marketing

## 🎯 **Spezielle Anwendungsfälle**

### **Für Content-Marketing-Agenturen:**
- Kunden-Content-Performance
- Content-Strategie-Entwicklung
- Keyword-Optimierung
- Konkurrenz-Analyse

### **Für SEO-Experten:**
- Content-Performance-Optimierung
- Backlink-Strategien
- Keyword-Content-Planung
- Domain-Authority-Verbesserung

### **Für Marktforscher:**
- Branchentrends identifizieren
- Marktgröße und -wachstum
- Wettbewerbslandschaft
- Content-Strategien der Konkurrenz

### **Für PR-Profis:**
- Brand-Monitoring
- Sentiment-Überwachung
- Influencer-Identifikation
- Reputationsmanagement

## 🔧 **Technische Details**

### **Verfügbare Filter:**
- Zeitraum-Filterung
- Standort-Filterung
- Sprach-Filterung
- Kategorie-Filterung
- Sentiment-Schwellenwerte

### **Daten-Export:**
- JSON-Format
- CSV-kompatible Daten
- Strukturierte Analysen
- Automatisierte Berichte

### **Integration:**
- REST API
- Webhook-Unterstützung
- Batch-Processing
- Echtzeit-Updates

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO Content Analysis API über den MCP Server und kann alle verfügbaren Content Analysis Funktionen optimal einsetzen.
