# Business Data Schema Test Prompts

## MCP Schema URL
```
https://mcp-server-typescript-six.vercel.app
```

## 1. Schema Integration Test Prompts

### Claude Desktop/Amp Prompts

**Basis Schema Test:**
```
Verbinde dich mit der Business Data API über das Schema:
https://mcp-server-typescript-six.vercel.app

Zeige mir alle verfügbaren Business Data Tools an.
```

**Google Business Test:**
```
Nutze die Business Data API um:
1. Alle Google Business Locations für Deutschland zu laden
2. Google My Business Info für "McDonald's" in Berlin zu suchen
3. Die Ergebnisse zu analysieren
```

**Local SEO Analyse:**
```
Verwende die Business Data API für eine Local SEO Analyse:
1. Suche nach "Restaurants" in München (location_code: 1009308)
2. Analysiere die Top 10 Ergebnisse
3. Erstelle eine Übersicht der wichtigsten Metriken
```

**Social Media Analytics:**
```
Nutze die Social Media Tools der Business Data API:
1. Analysiere Pinterest Shares für "https://example.com"
2. Prüfe Facebook Likes für dieselbe URL
3. Vergleiche die Social Media Performance
```

**Competitor Research:**
```
Führe eine Konkurrenzanalyse durch mit der Business Data API:
1. Suche nach "Hotels" in Berlin
2. Analysiere die TripAdvisor Bewertungen der Top 5 Hotels
3. Erstelle einen Vergleichsreport
```

## 2. Specific Tool Test Prompts

### Core Tools
```
Verwende business_data_id_list um alle abgeschlossenen Tasks der letzten 7 Tage anzuzeigen
```

### Google Business
```
Nutze business_data_google_my_business_info_live um detaillierte Informationen zu "Burger King" in Hamburg zu laden
```

### Business Listings
```
Führe eine business_data_business_listings_search für "Zahnarzt" in Köln durch und zeige die ersten 20 Ergebnisse
```

### Social Media
```
Analysiere mit business_data_social_media_reddit_live die Reddit-Shares für "https://reddit.com"
```

### TripAdvisor
```
Suche mit business_data_tripadvisor_search_live nach "Restaurant" in München und analysiere die Bewertungen
```

### Trustpilot
```
Verwende business_data_trustpilot_search_live um "Amazon" zu suchen und die Trust-Scores zu analysieren
```

## 3. Advanced Analysis Prompts

### Multi-Platform Analysis
```
Führe eine umfassende Business-Analyse durch:
1. Google My Business Daten für "Starbucks Berlin"
2. TripAdvisor Reviews für dasselbe Business
3. Trustpilot Bewertungen falls verfügbar
4. Social Media Mentions (Pinterest, Facebook, Reddit)
5. Erstelle einen kombinierten Report
```

### Location Intelligence
```
Verwende die Business Data API für Location Intelligence:
1. Lade alle verfügbaren Standorte für Deutschland
2. Analysiere die Business-Dichte in verschiedenen Städten
3. Identifiziere Marktpotenziale für neue Geschäfte
```

### Hotel Industry Analysis
```
Führe eine Hotel-Branchenanalyse durch:
1. Google Hotel Searches für "Hotel München"
2. TripAdvisor Hotel-Daten für dieselbe Region
3. Preisvergleiche und Bewertungsanalyse
4. Markttrends identifizieren
```

## 4. Schema Validation Prompts

### API Coverage Test
```
Teste die vollständige Business Data API:
1. Verifiziere, dass alle 24 Tools verfügbar sind
2. Teste mindestens einen Endpoint aus jeder Kategorie:
   - Core (2 Tools)
   - Google Business (7 Tools)  
   - Google Maps (5 Tools)
   - Social Media (3 Tools)
   - TripAdvisor (5 Tools)
   - Trustpilot (2 Tools)
3. Dokumentiere die Ergebnisse
```

### Error Handling Test
```
Teste das Error Handling der Business Data API:
1. Verwende business_data_errors um aktuelle Fehler anzuzeigen
2. Sende absichtlich fehlerhafte Requests
3. Analysiere die Error Response Struktur
```

## 5. Real-World Use Case Prompts

### Restaurant Chain Analysis
```
Analysiere eine Restaurant-Kette mit der Business Data API:
1. Suche alle McDonald's Standorte in Deutschland
2. Sammle Google Reviews für die Top 10 Standorte
3. Analysiere Social Media Präsenz
4. Erstelle einen Performance-Report
```

### Tourism Business Intelligence
```
Erstelle einen Tourism BI Report:
1. Hotels in Berlin (Google + TripAdvisor Daten)
2. Restaurant-Landscape Analyse
3. Social Media Tourism Trends
4. Competitive Intelligence Report
```

### Local SEO Audit
```
Führe ein vollständiges Local SEO Audit durch:
1. Google My Business Optimierung prüfen
2. Business Listings Konsistenz analysieren
3. Review-Management Strategien ableiten
4. Social Signals bewerten
```

## 6. Integration Test Commands

### MCP Client Test
```
Teste die MCP Integration:
1. Verbinde zum Schema-Endpoint
2. Liste alle verfügbaren Tools auf
3. Führe erfolgreiche API-Calls aus
4. Validiere Response-Formate
```

### Quick Schema Validation
```
Validiere das Business Data Schema:
1. Prüfe OpenAPI 3.1.0 Kompatibilität
2. Teste alle 24 definierten Endpoints
3. Verifiziere Request/Response Strukturen
4. Dokumentiere Schema-Abweichungen
```
