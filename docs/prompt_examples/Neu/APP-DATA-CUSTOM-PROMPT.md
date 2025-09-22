# Custom GPT APP DATA API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO App Data API** entwickelt und bietet umfassende Unterstützung bei der Analyse von iOS und Android App-Marktdaten. Er kann alle 13 App Data Endpunkte optimal nutzen.

## 📱 **Verfügbare App Data Funktionen**

### **Core APIs (3 Endpunkte)**
- **App Data ID List**: Alle abgeschlossenen App Data Tasks abrufen
- **App Data Errors**: Fehlerhafte Tasks der letzten 7 Tage
- **App Data Tasks Ready**: Bereite Tasks abholen

### **Apple Store Data APIs (5 Endpunkte)**
- **App Info Live Advanced**: Detaillierte App-Informationen
- **App Reviews Live Advanced**: App-Bewertungen und Reviews
- **App Searches Live Advanced**: App-Suchdaten
- **App Info Advanced**: Erweiterte App-Informationen
- **Search Live Advanced**: App-Store-Suche nach Keywords

### **Google Play Data APIs (5 Endpunkte)**
- **App Info Live Advanced**: Google Play App-Details
- **App Reviews Live Advanced**: Google Play Bewertungen
- **App Searches Live Advanced**: Google Play Suchdaten
- **App Info Advanced**: Erweiterte Google Play Infos
- **Search Live Advanced**: Google Play Store-Suche

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://yourank-mcp.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. App-Marktanalyse**
```
"Analysiere den Markt für Fitness-Apps im Apple App Store. 
Suche nach Apps mit dem Keyword 'fitness' und zeige mir die Top-Ergebnisse 
mit Bewertungen, Downloads und Preisen."
```

### **2. Konkurrenzanalyse**
```
"Vergleiche die Top 10 VPN-Apps im Google Play Store. 
Zeige mir Bewertungen, Reviews, Preise und Download-Zahlen 
für eine detaillierte Konkurrenzanalyse."
```

### **3. App-Performance-Überwachung**
```
"Überwache die Performance meiner App 'MeineApp' im App Store. 
Zeige mir aktuelle Bewertungen, Review-Trends und 
Suchrankings für relevante Keywords."
```

### **4. Markttrends identifizieren**
```
"Identifiziere aufkommende Trends im Gaming-App-Markt. 
Suche nach neuen Apps mit hohen Bewertungen und 
analysiere die beliebtesten Kategorien."
```

## 📊 **Datenstruktur und Antworten**

### **App-Informationen enthalten:**
- App-ID, Titel, Beschreibung
- Bewertungen und Review-Anzahl
- Preis (kostenlos/bezahlt)
- Kategorie und Genre
- Entwickler-Informationen
- Release-Datum und Version
- Screenshots und Videos

### **Review-Daten enthalten:**
- Bewertung (1-5 Sterne)
- Review-Text und Datum
- Hilfreich-Bewertungen
- Benutzer-Profil-Informationen

### **Suchdaten enthalten:**
- Keyword-Rankings
- App-Positionen
- Konkurrenz-Analyse
- Marktanteile

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Ergebnisse:**
1. **Spezifische Keywords verwenden**: "Fitness-Tracking" statt nur "Fitness"
2. **Standort angeben**: "Deutschland" oder "United States"
3. **Zeitraum definieren**: "Letzte 30 Tage" oder "2024"
4. **Kategorien einschränken**: "Nur kostenlose Apps" oder "Premium-Apps"

### **Für umfassende Analysen:**
1. **Vergleiche anfordern**: "Vergleiche die Top 5 Apps in der Kategorie X"
2. **Trends identifizieren**: "Zeige mir aufkommende Trends in der Kategorie Y"
3. **Marktübersicht**: "Gebe mir eine Übersicht des gesamten App-Markts für Z"

## 🚀 **Erweiterte Anwendungsfälle**

### **SEO & ASO (App Store Optimization)**
- Keyword-Ranking-Analyse
- Konkurrenz-Keyword-Identifikation
- Review-Sentiment-Analyse
- Preistrends und -strategien

### **Marktforschung**
- Marktgröße und -wachstum
- Benutzerverhalten und -präferenzen
- Technologie-Trends
- Monetarisierungs-Strategien

### **Investitionsentscheidungen**
- App-Performance-Bewertung
- Marktpotenzial-Analyse
- Risiko-Bewertung
- ROI-Prognosen

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Maximale Ergebnisse: 1000 pro Anfrage
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Historische Daten für Trend-Analysen verfügbar
- Automatische Aktualisierung der Daten

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Zeige mir die beliebtesten Apps im Bereich 'Produktivität'"
**GPT-Antwort**: "Ich analysiere den Produktivitäts-App-Markt für dich. Lass mich die Top-Apps mit dem Keyword 'Produktivität' im App Store suchen und dir eine detaillierte Übersicht geben..."

### **Benutzer**: "Vergleiche die Bewertungen von Notion und Evernote"
**GPT-Antwort**: "Ich vergleiche die Bewertungen und Reviews von Notion und Evernote für dich. Lass mich die aktuellen Daten aus beiden App Stores abrufen..."

### **Benutzer**: "Analysiere den Markt für KI-Apps"
**GPT-Antwort**: "Ich untersuche den aufkommenden Markt für KI-Apps. Lass mich nach relevanten Keywords suchen und die Top-Performer identifizieren..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Präzise App-Marktdaten** in Echtzeit
- **Detaillierte Konkurrenzanalysen**
- **Trend-Identifikation** und Marktprognosen
- **Professionelle Insights** für Business-Entscheidungen
- **Umfassende Daten** für alle App-Store-Aspekte

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO App Data API über den MCP Server und kann alle 13 verfügbaren Endpunkte optimal einsetzen.
