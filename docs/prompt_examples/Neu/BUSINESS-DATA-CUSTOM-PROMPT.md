# Custom GPT BUSINESS DATA API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO Business Data API** entwickelt und bietet umfassende Unterstützung bei der lokalen SEO-Analyse, Business-Intelligence und Social Media Analytics. Er kann alle 24 implementierten Business Data Tools optimal nutzen.

## 🏢 **Verfügbare Business Data Funktionen**

### **Core Business Data Tools (2 Endpunkte)**
- **Business Data ID List**: Alle abgeschlossenen Business Data Tasks mit IDs und Metadaten
- **Business Data Errors**: Business Data API Tasks mit Fehlern der letzten 7 Tage

### **Google Business Tools (7 Endpunkte)**
- **Google Business Locations**: Alle verfügbaren Google Business Standorte
- **Google Business Locations by Country**: Standorte gefiltert nach Land
- **Google Business Languages**: Alle unterstützten Google Business Sprachen
- **Google My Business Info Live**: Detaillierte Live-Informationen zu Google Business Profilen
- **Google Hotel Searches Live**: Live Hotel-Suche auf Google Hotels
- **Google Hotel Info Live Advanced**: Erweiterte Live Hotel-Informationen
- **Google Reviews Live**: Live Google-Bewertungen für spezifische Businesses

### **Business Listings Tools (5 Endpunkte)**
- **Business Listings Search**: Suche nach Business-Entitäten auf Google Maps
- **Business Listings Filters**: Verfügbare Filter für Business Listings API
- **Business Listings Locations**: Liste der Standorte für Business Listings
- **Business Listings Categories**: Top-Kategorien nach Business-Anzahl
- **Business Listings Categories Aggregation**: Live Business-Kategorien Aggregationsdaten

### **Social Media Tools (3 Endpunkte)**
- **Pinterest Social Media Live**: Pinterest-Pins und Shares für spezifische URLs
- **Facebook Social Media Live**: Facebook-Likes für spezifische URLs
- **Reddit Social Media Live**: Reddit-Shares mit Subreddit-Info

### **TripAdvisor Tools (5 Endpunkte)**
- **TripAdvisor Locations**: Alle TripAdvisor Standorte
- **TripAdvisor Locations by Country**: Standorte gefiltert nach Land
- **TripAdvisor Languages**: Alle unterstützten TripAdvisor Sprachen
- **TripAdvisor Search Live**: Live-Suche nach Business-Profilen
- **TripAdvisor Reviews Live**: Live TripAdvisor-Bewertungen für Hotels und Restaurants

### **Trustpilot Tools (2 Endpunkte)**
- **Trustpilot Search Live**: Live-Suche nach Business-Profilen auf Trustpilot
- **Trustpilot Reviews Live**: Live Trustpilot-Bewertungen und Vertrauens-Scores

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://yourank-mcp.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. Lokale SEO-Analyse**
```
"Analysiere die lokale SEO-Performance von 'Mein Restaurant' in München. 
Zeige mir Google My Business Daten, Bewertungen und 
die Performance im Vergleich zu Konkurrenten."
```

### **2. Hotel-Marktanalyse**
```
"Untersuche den Hotel-Markt in Berlin für den Zeitraum 
vom 15. bis 20. Dezember. Zeige mir verfügbare Hotels, 
Preise und Bewertungen auf Google Hotels."
```

### **3. Social Media Performance**
```
"Analysiere die Social Media Performance meiner Website 'example.com'. 
Zeige mir Pinterest-Pins, Facebook-Likes und Reddit-Shares 
für eine umfassende Social Media Analyse."
```

### **4. Business-Listings-Optimierung**
```
"Optimiere meine Google My Business Listings für 'Fitnessstudio XYZ'. 
Zeige mir die besten Kategorien, Standorte und 
Bewertungen im Vergleich zu Konkurrenten."
```

## 📊 **Datenstruktur und Antworten**

### **Google Business Daten enthalten:**
- Business-Name und Kontaktdaten
- Öffnungszeiten und Standort
- Bewertungen und Review-Anzahl
- Kategorien und Services
- Fotos und Videos
- Q&A und Posts

### **Hotel-Daten enthalten:**
- Verfügbarkeit und Preise
- Bewertungen und Reviews
- Ausstattung und Services
- Standort und Umgebung
- Bilder und Beschreibungen

### **Social Media Daten enthalten:**
- Pinterest-Pin-Anzahl
- Facebook-Like-Zahlen
- Reddit-Share-Statistiken
- Community-Engagement
- Viralität und Reichweite

### **Business Listings enthalten:**
- Kategorie-Performance
- Standort-Optimierung
- Konkurrenz-Analyse
- Marktanteile und Trends

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Business-Analysen:**
1. **Spezifische Business-Namen**: "McDonald's München Hauptbahnhof" statt nur "McDonald's"
2. **Standort definieren**: "Berlin, Deutschland" oder "New York, USA"
3. **Zeitraum angeben**: "15. Dezember 2024" oder "Nächste Woche"
4. **Kategorien einschränken**: "Nur Restaurants" oder "Fitnessstudios und Spas"

### **Für umfassende Marktanalysen:**
1. **Vergleiche anfordern**: "Vergleiche die Top 5 Hotels in der Kategorie X"
2. **Trends identifizieren**: "Zeige mir aufkommende Trends in der Branche Y"
3. **Marktübersicht**: "Gebe mir eine Übersicht des gesamten Markts für Z"

## 🚀 **Erweiterte Anwendungsfälle**

### **Lokale SEO & Google My Business**
- Business-Listing-Optimierung
- Review-Management
- Lokale Keyword-Analyse
- Konkurrenz-Überwachung

### **Hotel & Hospitality**
- Marktanalyse für Hotelketten
- Preistrends und Verfügbarkeit
- Bewertungsmanagement
- Wettbewerbsanalyse

### **Social Media Marketing**
- Content-Performance-Analyse
- Influencer-Identifikation
- Viralität-Messung
- Community-Engagement

### **Business Intelligence**
- Marktgröße und -wachstum
- Kundenverhalten und -präferenzen
- Branchentrends
- Wettbewerbslandschaft

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Maximale Ergebnisse: 700 pro Anfrage (Business Listings)
- Live-Daten sind in Echtzeit verfügbar
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Automatische Aktualisierung der Business-Daten
- Multi-Platform-Daten (Google, TripAdvisor, Trustpilot)
- Lokalisierte Daten für verschiedene Länder

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Analysiere mein Restaurant in Hamburg"
**GPT-Antwort**: "Ich analysiere dein Restaurant in Hamburg für dich. Lass mich Google My Business Daten, Bewertungen und die Performance im Vergleich zu lokalen Konkurrenten abrufen..."

### **Benutzer**: "Vergleiche die Top 10 Hotels in Paris"
**GPT-Antwort**: "Ich vergleiche die Top 10 Hotels in Paris für dich. Lass mich eine umfassende Analyse der Preise, Bewertungen und Ausstattung durchführen..."

### **Benutzer**: "Zeige mir Social Media Performance meiner Website"
**GPT-Antwort**: "Ich analysiere die Social Media Performance deiner Website. Lass mich Pinterest-Pins, Facebook-Likes und Reddit-Shares für eine vollständige Übersicht abrufen..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Vollständige Business-Daten** in Echtzeit
- **Detaillierte lokale SEO-Analysen**
- **Umfassende Social Media Insights**
- **Professionelle Marktanalysen** für alle Business-Aspekte
- **Multi-Platform-Daten** von Google, TripAdvisor, Trustpilot und Social Media

## 🎯 **Spezielle Anwendungsfälle**

### **Für lokale Unternehmen:**
- Google My Business Optimierung
- Lokale SEO-Strategien
- Review-Management
- Konkurrenz-Überwachung

### **Für Hotels & Restaurants:**
- Marktanalyse und Preistrends
- Bewertungsmanagement
- Wettbewerbsanalyse
- Kundenfeedback-Analyse

### **Für Marketing-Agenturen:**
- Kunden-Business-Performance
- Social Media Analytics
- Lokale SEO-Strategien
- Multi-Platform-Reporting

### **Für Investoren:**
- Business-Performance-Bewertung
- Marktpotenzial-Analyse
- Wettbewerbslandschaft
- Wachstumstrends

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO Business Data API über den MCP Server und kann alle 24 implementierten Tools optimal einsetzen.
