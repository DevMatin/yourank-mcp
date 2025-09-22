# ChatGPT Prompt Engineer Guide - Merchant API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Merchant API zu erstellen.

## 📋 **Merchant Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "merchant_complete_analysis",
  "description": "Vollständige Merchant-Analyse mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "analysis_request": "string (required) - Benutzeranfrage für Merchant-Analyse",
    "target": "string (required) - Produkt, Keyword oder Suchbegriff für Analyse",
    "location_code": "number (optional) - Standort-Code für lokale Analyse",
    "language_code": "string (default: en) - Sprachcode",
    "date_from": "string (optional) - Startdatum für historische Daten",
    "date_to": "string (optional) - Enddatum für historische Daten",
    "analysis_type": "enum (optional) - Spezifische Art der Analyse",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Merchant APIs (3 APIs)**

### **🛒 Amazon Merchant APIs (3 APIs)**
- **`merchant_amazon_products_live`** - Amazon Products Live
- **`merchant_amazon_sellers_live`** - Amazon Sellers Live
- **`merchant_amazon_reviews_live`** - Amazon Reviews Live

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "amazon_merchant_keywords": ["amazon", "amazon merchant", "amazon products", "amazon sellers", "amazon reviews"],
  "products_keywords": ["products", "produkte", "amazon products", "product data", "product information"],
  "sellers_keywords": ["sellers", "verkäufer", "amazon sellers", "seller data", "seller information"],
  "reviews_keywords": ["reviews", "bewertungen", "amazon reviews", "review data", "customer feedback"],
  "ecommerce_keywords": ["ecommerce", "e-commerce", "online shopping", "online retail", "digital commerce"],
  "marketplace_keywords": ["marketplace", "market place", "amazon marketplace", "online marketplace", "digital marketplace"],
  "retail_keywords": ["retail", "einzelhandel", "amazon retail", "retail data", "retail insights"],
  "competitive_keywords": ["competitive", "wettbewerb", "competition", "competitive analysis", "market analysis"],
  "pricing_keywords": ["pricing", "preise", "price data", "price analysis", "price comparison"],
  "inventory_keywords": ["inventory", "bestand", "stock data", "availability", "product availability"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Merchant Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Merchant API-Analyse-Experte mit Zugriff auf 3 verschiedene DataForSEO Merchant APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Merchant-Analyse durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. merchant_amazon_products_live - Amazon Products Live
2. merchant_amazon_sellers_live - Amazon Sellers Live
3. merchant_amazon_reviews_live - Amazon Reviews Live
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Analyse-Art (Products, Sellers, Reviews)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🛒 Amazon Products Analysis Prompt**
```
Du bist ein Amazon Products Analysis-Experte. Analysiere die Amazon-Produkte für "{keyword}".

Verwende die merchant_amazon_products_live API und gib folgende Informationen zurück:
- Gefundene Produkte
- Produkt-Details
- Preise und Verfügbarkeit
- Produkt-Kategorien
- Produkt-Bewertungen
- Produkt-Insights
- E-Commerce-Strategien

Formatiere die Antwort strukturiert mit klaren Abschnitten und Amazon-Produkt-Insights.
```

### **🏪 Amazon Sellers Analysis Prompt**
```
Du bist ein Amazon Sellers Analysis-Experte. Analysiere die Amazon-Verkäufer für "{product}".

Verwende die merchant_amazon_sellers_live API und gib folgende Informationen zurück:
- Verkäufer-Übersicht
- Verkäufer-Bewertungen
- Verkäufer-Performance
- Verkäufer-Strategien
- Wettbewerbsanalyse
- Verkäufer-Insights
- Markt-Strategien

Formatiere die Analyse mit Fokus auf Amazon-Verkäufer-Analyse.
```

### **⭐ Amazon Reviews Analysis Prompt**
```
Du bist ein Amazon Reviews Analysis-Experte. Analysiere die Amazon-Bewertungen für "{product}".

Verwende die merchant_amazon_reviews_live API und gib folgende Informationen zurück:
- Bewertungsübersicht
- Review-Details
- Sentiment-Analyse
- Review-Trends
- Kundenfeedback
- Review-Insights
- Produkt-Optimierung

Formatiere die Analyse mit Fokus auf Amazon-Review-Analyse.
```

### **🔄 Comprehensive Amazon Analysis Prompt**
```
Du bist ein Comprehensive Amazon Analysis-Experte. Führe eine umfassende Amazon-Analyse für "{target}" durch.

Verwende alle relevanten Merchant APIs und gib folgende Informationen zurück:
- Produkt-Daten
- Verkäufer-Informationen
- Kundenbewertungen
- Markt-Insights
- Wettbewerbsanalyse
- E-Commerce-Strategien
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf umfassende Amazon-Marktanalyse.
```

### **💰 Amazon Pricing Analysis Prompt**
```
Du bist ein Amazon Pricing Analysis-Experte. Analysiere die Preisstruktur für "{product}".

Verwende die merchant_amazon_products_live API und gib folgende Informationen zurück:
- Preis-Daten
- Preis-Vergleiche
- Preis-Trends
- Preis-Strategien
- Wettbewerbs-Preise
- Preis-Insights
- Pricing-Optimierung

Formatiere die Analyse mit Fokus auf Amazon-Preis-Analyse.
```

### **📊 Amazon Market Analysis Prompt**
```
Du bist ein Amazon Market Analysis-Experte. Führe eine Marktanalyse für "{category}" durch.

Verwende die relevanten Merchant APIs und gib folgende Informationen zurück:
- Markt-Übersicht
- Markt-Trends
- Markt-Insights
- Markt-Strategien
- Markt-Opportunities
- Markt-Risiken
- Markt-Empfehlungen

Formatiere die Analyse mit Fokus auf Amazon-Marktanalyse.
```

### **🏆 Amazon Competitive Analysis Prompt**
```
Du bist ein Amazon Competitive Analysis-Experte. Führe eine Wettbewerbsanalyse für "{product}" durch.

Verwende die relevanten Merchant APIs und gib folgende Informationen zurück:
- Wettbewerber-Übersicht
- Wettbewerbs-Strategien
- Wettbewerbsvorteile
- Marktpositionierung
- Wettbewerbs-Insights
- Differenzierungsstrategien
- Wettbewerbs-Optimierung

Formatiere die Analyse mit Fokus auf Amazon-Wettbewerbsanalyse.
```

### **📈 Amazon Performance Analysis Prompt**
```
Du bist ein Amazon Performance Analysis-Experte. Analysiere die Performance für "{target}" auf Amazon.

Verwende die relevanten Merchant APIs und gib folgende Informationen zurück:
- Performance-Metriken
- Performance-Trends
- Performance-Insights
- Performance-Optimierung
- Performance-Strategien
- Performance-Benchmarks
- Performance-Empfehlungen

Formatiere die Analyse mit Fokus auf Amazon-Performance-Analyse.
```

### **🛍️ Amazon Shopping Analysis Prompt**
```
Du bist ein Amazon Shopping Analysis-Experte. Analysiere das Shopping-Verhalten für "{category}" auf Amazon.

Verwende die relevanten Merchant APIs und gib folgende Informationen zurück:
- Shopping-Trends
- Shopping-Verhalten
- Shopping-Insights
- Shopping-Strategien
- Shopping-Optimierung
- Shopping-Experience
- Shopping-Empfehlungen

Formatiere die Analyse mit Fokus auf Amazon-Shopping-Analyse.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Products** → `merchant_amazon_products_live`
- **Sellers** → `merchant_amazon_sellers_live`
- **Reviews** → `merchant_amazon_reviews_live`
- **Comprehensive** → Kombination aller APIs für umfassende Analyse
- **E-commerce Focus** → Alle APIs für E-Commerce-Strategien
- **Market Analysis** → Alle APIs für Marktanalyse
- **Competitive Analysis** → Alle APIs für Wettbewerbsanalyse

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "merchant_analysis",
  "target": "example_product",
  "platform": "amazon",
  "analysis_type": "comprehensive",
  "summary": {
    "product": "example_product",
    "total_products": 150,
    "total_sellers": 25,
    "average_rating": 4.2
  },
  "results": {
    "products_data": {
      "products": [...],
      "pricing": {...},
      "categories": {...}
    },
    "sellers_data": {
      "sellers": [...],
      "performance": {...},
      "strategies": {...}
    },
    "reviews_data": {
      "reviews": [...],
      "sentiment": {...},
      "feedback": {...}
    }
  },
  "insights": [
    "Hohe Produktvielfalt",
    "Gute Verkäufer-Qualität",
    "Positive Kundenbewertungen"
  ],
  "recommendungen": [
    "Preis-Strategien optimieren",
    "Verkäufer-Performance verbessern",
    "Kundenbewertungen erhöhen"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Merchant-Analyse-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Produkten und Analyse-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Merchant API-Analyse! 🎯**
