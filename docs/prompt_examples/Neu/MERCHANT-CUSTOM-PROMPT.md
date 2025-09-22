# Custom GPT MERCHANT API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO Merchant API** entwickelt und bietet umfassende Unterstützung bei der E-Commerce-Analyse, Produktdaten-Erhebung, Verkäufer-Analyse und Marktplatz-Intelligence. Er kann alle verfügbaren Merchant-Funktionen optimal nutzen.

## 🛒 **Verfügbare Merchant Funktionen**

### **Amazon Products APIs**
- **Amazon Product Search**: Suche nach Amazon-Produkten
- **Amazon Product Details**: Detaillierte Produktinformationen
- **Amazon Product Reviews**: Produktbewertungen und Reviews
- **Amazon Product Pricing**: Preisdaten und -vergleiche
- **Amazon Product Availability**: Verfügbarkeitsinformationen

### **Amazon Sellers APIs**
- **Amazon Seller Search**: Suche nach Amazon-Verkäufern
- **Amazon Seller Details**: Detaillierte Verkäuferinformationen
- **Amazon Seller Performance**: Verkäufer-Performance-Metriken
- **Amazon Seller Reviews**: Verkäuferbewertungen

### **E-Commerce Analytics APIs**
- **Product Market Analysis**: Marktanalyse für Produkte
- **Competitive Pricing Analysis**: Wettbewerbs-Preisanalyse
- **Sales Performance Tracking**: Verkaufs-Performance-Überwachung
- **Market Trend Analysis**: Markttrend-Analyse

### **Cross-Platform Merchant APIs**
- **Multi-Marketplace Analysis**: Analyse über mehrere Marktplätze
- **Product Comparison**: Produktvergleiche zwischen Plattformen
- **Price Monitoring**: Preisüberwachung
- **Inventory Tracking**: Bestandsverfolgung

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://yourank-mcp.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. Produkt-Marktanalyse**
```
"Analysiere den Markt für 'Smart Home Produkte' auf Amazon. 
Zeige mir die Top-Produkte, Preise, Bewertungen und 
Marktanteile der führenden Verkäufer."
```

### **2. Verkäufer-Performance-Analyse**
```
"Analysiere die Performance des Verkäufers 'TechStore' auf Amazon. 
Zeige mir Verkaufszahlen, Bewertungen, 
Produktportfolio und Marktposition."
```

### **3. Wettbewerbs-Preisanalyse**
```
"Führe eine Wettbewerbs-Preisanalyse für 'Gaming Laptops' durch. 
Vergleiche Preise zwischen verschiedenen Verkäufern und 
identifiziere Preisstrategien."
```

### **4. Produkt-Review-Analyse**
```
"Analysiere die Bewertungen für 'iPhone 15' auf Amazon. 
Zeige mir die durchschnittliche Bewertung, 
Review-Trends und Kundenfeedback."
```

### **5. Markttrend-Identifikation**
```
"Identifiziere aufkommende Trends im 'Fitness-Equipment' Markt. 
Analysiere Verkaufszahlen, Preisentwicklungen und 
neue Produktkategorien."
```

### **6. Cross-Platform-Vergleich**
```
"Vergleiche die Preise für 'Sony WH-1000XM5' zwischen 
verschiedenen Marktplätzen. Zeige mir die besten Angebote 
und Verkäufer-Performance."
```

## 📊 **Datenstruktur und Antworten**

### **Produkt-Daten enthalten:**
- Produktname und -beschreibung
- Preis und Verfügbarkeit
- Bewertungen und Review-Anzahl
- Verkäufer-Informationen
- Produktkategorien und -merkmale
- Bilder und Videos

### **Verkäufer-Daten enthalten:**
- Verkäufer-Name und -Details
- Verkaufs-Performance-Metriken
- Bewertungen und Feedback
- Produktportfolio
- Marktposition und -anteile

### **Markt-Analyse-Daten enthalten:**
- Marktgröße und -wachstum
- Wettbewerbslandschaft
- Preistrends und -strategien
- Verkaufs-Performance
- Marktanteile

### **Review-Daten enthalten:**
- Bewertungen (1-5 Sterne)
- Review-Texte und -Daten
- Kunden-Feedback
- Review-Trends
- Sentiment-Analyse

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Produkt-Analysen:**
1. **Spezifische Produkte definieren**: "Sony WH-1000XM5" statt nur "Kopfhörer"
2. **Marktplatz angeben**: "Amazon Deutschland" oder "Amazon US"
3. **Kategorien einschränken**: "Nur Gaming Laptops" oder "Premium Smartphones"
4. **Zeitraum definieren**: "Letzte 30 Tage" oder "2024"

### **Für umfassende Marktanalysen:**
1. **Vergleiche anfordern**: "Vergleiche die Top 10 Produkte in der Kategorie X"
2. **Trends identifizieren**: "Zeige mir Markttrends für die Branche Y"
3. **Marktübersicht**: "Gebe mir eine Übersicht des gesamten Markts für Z"

## 🚀 **Erweiterte Anwendungsfälle**

### **E-Commerce & Online-Handel**
- Produkt-Marktanalyse
- Wettbewerbs-Preisanalyse
- Verkäufer-Performance-Tracking
- Markttrend-Identifikation

### **Retail & Einzelhandel**
- Marktpositionierung
- Preisstrategien
- Wettbewerbsanalyse
- Marktanteile

### **Investitionsentscheidungen**
- Marktpotenzial-Analyse
- Wettbewerbslandschaft
- Wachstumstrends
- ROI-Prognosen

### **Marketing & Vertrieb**
- Zielgruppen-Analyse
- Produkt-Positionierung
- Preis-Optimierung
- Kampagnen-Strategien

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Live-Daten sind in Echtzeit verfügbar
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen
- Verfügbarkeit kann je nach Marktplatz variieren

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Multi-Platform-Daten verfügbar
- Regelmäßige Updates der Produktdaten
- Lokalisierte Daten für verschiedene Märkte

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Analysiere den Markt für 'Fitness-Tracker'"
**GPT-Antwort**: "Ich analysiere den Markt für 'Fitness-Tracker' für dich. Lass mich die Top-Produkte, Preise, Bewertungen und Marktanteile der führenden Verkäufer abrufen..."

### **Benutzer**: "Vergleiche Verkäufer-Performance auf Amazon"
**GPT-Antwort**: "Ich vergleiche die Verkäufer-Performance auf Amazon für dich. Lass mich eine umfassende Analyse der Verkaufszahlen, Bewertungen und Marktpositionen durchführen..."

### **Benutzer**: "Zeige mir Preistrends für 'Gaming Hardware'"
**GPT-Antwort**: "Ich analysiere die Preistrends für 'Gaming Hardware' für dich. Lass mich die Preisentwicklungen, Marktstrategien und neue Produktkategorien identifizieren..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Vollständige E-Commerce-Daten** in Echtzeit
- **Detaillierte Produkt-Analysen**
- **Verkäufer-Performance-Insights**
- **Markt-Trends** und Wettbewerbsanalysen
- **Multi-Platform-Daten** für umfassende Marktübersichten

## 🎯 **Spezielle Anwendungsfälle**

### **Für E-Commerce-Unternehmen:**
- Produkt-Marktanalyse
- Wettbewerbs-Preisanalyse
- Verkäufer-Performance-Tracking
- Markttrend-Identifikation

### **Für Einzelhändler:**
- Marktpositionierung
- Preisstrategien
- Wettbewerbsanalyse
- Marktanteile

### **Für Investoren:**
- Marktpotenzial-Analyse
- Wettbewerbslandschaft
- Wachstumstrends
- ROI-Prognosen

### **Für Marketing-Agenturen:**
- Kunden-Marktanalyse
- Produkt-Positionierung
- Preis-Optimierung
- Kampagnen-Strategien

## 🔧 **Technische Details**

### **Verfügbare Marktplätze:**
- Amazon (verschiedene Länder)
- Weitere E-Commerce-Plattformen
- Cross-Platform-Analysen
- Lokalisierte Märkte

### **Daten-Kategorien:**
- Produktdaten
- Verkäufer-Daten
- Markt-Analyse
- Review-Daten
- Preis-Daten

### **Daten-Export:**
- JSON-Format
- CSV-kompatible Daten
- Strukturierte Analysen
- Automatisierte Berichte

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO Merchant API über den MCP Server und kann alle verfügbaren Merchant-Funktionen optimal einsetzen.
