# Custom GPT SERP API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO SERP API** entwickelt und bietet umfassende Unterstützung bei der SERP-Analyse, Suchmaschinen-Ranking-Überwachung, Konkurrenz-Analyse und SEO-Performance-Tracking. Er kann alle verfügbaren SERP-Funktionen optimal nutzen.

## 🔍 **Verfügbare SERP Funktionen**

### **SERP Core APIs**
- **SERP ID List**: Alle abgeschlossenen SERP Tasks mit Metadaten
- **SERP Errors**: SERP API Tasks mit Fehlern
- **SERP Tasks Ready**: Bereite SERP Tasks abholen

### **Google SERP APIs**
- **Google Search Live**: Live Google-Suchergebnisse
- **Google Search Task Post**: Asynchrone Google-Suchaufgaben
- **Google Search Task Get**: Google-Suchergebnisse abrufen
- **Google Search Tasks Ready**: Fertige Google-Suchaufgaben

### **Bing SERP APIs**
- **Bing Search Live**: Live Bing-Suchergebnisse
- **Bing Search Task Post**: Asynchrone Bing-Suchaufgaben
- **Bing Search Task Get**: Bing-Suchergebnisse abrufen
- **Bing Search Tasks Ready**: Fertige Bing-Suchaufgaben

### **YouTube SERP APIs**
- **YouTube Search Live**: Live YouTube-Suchergebnisse
- **YouTube Search Task Post**: Asynchrone YouTube-Suchaufgaben
- **YouTube Search Task Get**: YouTube-Suchergebnisse abrufen
- **YouTube Search Tasks Ready**: Fertige YouTube-Suchaufgaben

### **Allgemeine SERP APIs**
- **SERP General Search**: Allgemeine SERP-Suche
- **SERP Analysis**: SERP-Daten-Analyse
- **SERP Comparison**: SERP-Vergleiche
- **SERP Trends**: SERP-Trends über Zeit

### **Erweiterte SERP APIs**
- **Featured Snippets Analysis**: Featured Snippets-Analyse
- **Local Pack Analysis**: Lokale Suchergebnisse-Analyse
- **Shopping Results Analysis**: Shopping-Ergebnisse-Analyse
- **News Results Analysis**: News-Ergebnisse-Analyse

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://yourank-mcp.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. Google-Ranking-Überwachung**
```
"Überwache die Google-Rankings für 'meinewebsite.com' 
bei den Keywords 'SEO Tools' und 'Digital Marketing'. 
Zeige mir aktuelle Positionen und Ranking-Entwicklungen."
```

---

## 🎯 **ULTIMATIVER ALLE-ENDPUNKTE SERP-PROMPT**

### **VOLLSTÄNDIGE MULTI-PLATFORM SERP-ANALYSE**

```
Führe eine umfassende SERP-Analyse durch, indem du ALLE verfügbaren SERP-Endpunkte systematisch abrufst:

PARAMETER:
• Keyword: [DEIN_KEYWORD]
• Eigene Domain: [DEINE_DOMAIN] 
• Konkurrenz: [KONKURRENZ_DOMAINS]
• Location: Deutschland (2276)
• Sprache: Deutsch (de)

NUTZE FOLGENDE ENDPUNKTE:

🔍 GOOGLE CORE:
✓ serp_organic_live_advanced (Top 100 organische Ergebnisse)
✓ serp_google_ai_mode_live_advanced (AI-Antworten & Summaries)
✓ serp_google_autocomplete_live_advanced (Autocomplete-Vorschläge)

🎯 GOOGLE SPECIALIZED:
✓ serp_google_images_live_advanced (Bilder-Suche)
✓ serp_google_news_live_advanced (News-Ergebnisse)
✓ serp_google_events_live_advanced (Events)
✓ serp_google_jobs_live_advanced (Job-Anzeigen)

📍 LOCAL & MAPS:
✓ serp_google_maps_live_advanced (Google Maps)
✓ serp_google_local_finder_live_advanced (Local Details)

💰 ADS INTELLIGENCE:
✓ serp_google_ads_advertisers_live_advanced (Werbetreibende)
✓ serp_google_ads_search_live_advanced (Aktuelle Anzeigen)

🌐 ALTERNATIVE SUCHMASCHINEN:
✓ serp_bing_organic_live_advanced (Bing)
✓ serp_yahoo_organic_live_advanced (Yahoo)
✓ serp_youtube_organic_live_advanced (YouTube)

🎨 SPECIAL TOOLS:
✓ serp_screenshot (Visuelle SERP-Aufnahme)
✓ serp_ai_summary (AI-SERP-Analyse)

AUSGABE-FORMAT:
📊 Executive Dashboard mit Ranking-Matrix
🔥 SERP-Features Heatmap (Featured Snippets, PAA, Local Pack, etc.)
💡 Content-Gap-Analyse & Konkurrenz-Intelligence
⚡ Sofort-Optimierungen (Quick Wins)
🚀 Strategischer 90-Tage-Aktionsplan
📈 Multi-Platform Performance-Vergleich

ZIEL: Vollständige 360°-Marktanalyse für Multi-Platform-Dominanz
```

### **2. Konkurrenz-SERP-Analyse**
```
"Analysiere die SERP für 'Fitness-Apps' auf Google. 
Identifiziere die Top 10 Ranking-Websites, 
ihre Content-Strategien und Ranking-Faktoren."
```

### **3. YouTube-Suchanalyse**
```
"Analysiere YouTube-Suchergebnisse für 'Kochrezepte'. 
Zeige mir die Top-Videos, deren Performance-Metriken 
und Ranking-Faktoren."
```

### **4. Bing vs. Google Vergleich**
```
"Vergleiche die SERP-Ergebnisse für 'Nachhaltige Mode' 
zwischen Google und Bing. Identifiziere Unterschiede 
in den Ranking-Faktoren und -Strategien."
```

### **5. Featured Snippets-Analyse**
```
"Analysiere Featured Snippets für 'Wie funktioniert KI?' 
auf Google. Identifiziere die Websites, die 
Featured Snippets gewonnen haben."
```

### **6. Lokale SERP-Analyse**
```
"Analysiere lokale Suchergebnisse für 'Restaurants München'. 
Zeige mir die Google My Business Einträge, 
Bewertungen und lokale Ranking-Faktoren."
```

## 📊 **Datenstruktur und Antworten**

### **SERP-Daten enthalten:**
- Suchergebnisse und Rankings
- Website-URLs und Titel
- Meta-Beschreibungen
- Ranking-Positionen
- SERP-Features (Featured Snippets, Local Pack, etc.)

### **Ranking-Daten enthalten:**
- Aktuelle Ranking-Positionen
- Ranking-Entwicklungen über Zeit
- Keyword-Performance
- Click-through-Rates
- Impression-Daten

### **Konkurrenz-Daten enthalten:**
- Top-Ranking-Websites
- Content-Strategien
- Backlink-Profile
- Domain-Authority
- Ranking-Faktoren

### **SERP-Feature-Daten enthalten:**
- Featured Snippets
- Local Pack Einträge
- Shopping-Ergebnisse
- News-Ergebnisse
- Video-Ergebnisse

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise SERP-Analysen:**
1. **Spezifische Keywords verwenden**: "SEO Tools für Anfänger" statt nur "SEO Tools"
2. **Suchmaschine definieren**: "Google" oder "Bing" oder "YouTube"
3. **Standort angeben**: "Deutschland" oder "United States"
4. **Zeitraum definieren**: "Aktuell" oder "Letzte 30 Tage"

### **Für umfassende Analysen:**
1. **Vergleiche anfordern**: "Vergleiche SERP-Ergebnisse zwischen X und Y"
2. **Trends identifizieren**: "Zeige mir Ranking-Trends für die Keywords Z"
3. **Konkurrenz-Analyse**: "Analysiere die Top 10 Konkurrenten für Keyword A"

## 🚀 **Erweiterte Anwendungsfälle**

### **SEO & Ranking-Optimierung**
- Keyword-Ranking-Überwachung
- SERP-Feature-Optimierung
- Konkurrenz-Analyse
- Ranking-Faktor-Identifikation

### **Content Marketing**
- Content-Strategie-Entwicklung
- SERP-Analyse für Content-Planung
- Featured Snippets-Optimierung
- Content-Performance-Tracking

### **Lokale SEO**
- Lokale SERP-Analyse
- Google My Business Optimierung
- Lokale Ranking-Faktoren
- Lokale Konkurrenz-Analyse

### **Video Marketing**
- YouTube-SERPs-Analyse
- Video-Performance-Tracking
- Video-SEO-Optimierung
- Video-Ranking-Faktoren

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Live-Daten sind in Echtzeit verfügbar
- Task-basierte APIs für große Datenmengen
- Rate-Limiting beachten
- Kosten pro API-Aufruf berücksichtigen

### **Datenqualität:**
- Live-Daten sind aktuell und zuverlässig
- Multi-Platform-SERP-Daten
- Regelmäßige Updates der SERP-Daten
- Lokalisierte Daten für verschiedene Märkte

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Überwache meine Google-Rankings"
**GPT-Antwort**: "Ich überwache deine Google-Rankings für dich. Lass mich die aktuellen Positionen für deine Ziel-Keywords abrufen und Ranking-Entwicklungen analysieren..."

### **Benutzer**: "Analysiere die SERP für 'Digital Marketing'"
**GPT-Antwort**: "Ich analysiere die SERP für 'Digital Marketing' für dich. Lass mich die Top-Ranking-Websites, ihre Content-Strategien und Ranking-Faktoren identifizieren..."

### **Benutzer**: "Vergleiche Google und Bing SERPs"
**GPT-Antwort**: "Ich vergleiche die SERP-Ergebnisse zwischen Google und Bing für dich. Lass mich die Unterschiede in den Ranking-Faktoren und -Strategien analysieren..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **Vollständige SERP-Analysen** in Echtzeit
- **Detaillierte Ranking-Insights**
- **Konkurrenz-Analysen** für bessere Strategien
- **SERP-Feature-Optimierungen** für höhere Sichtbarkeit
- **Multi-Platform-Daten** von Google, Bing und YouTube

## 🎯 **Spezielle Anwendungsfälle**

### **Für SEO-Agenturen:**
- Kunden-Ranking-Überwachung
- SERP-Analysen für Kunden
- Konkurrenz-Analysen
- SEO-Reporting

### **Für Website-Betreiber:**
- Eigene Ranking-Überwachung
- Konkurrenz im Auge behalten
- SERP-Feature-Optimierung
- Content-Strategie-Entwicklung

### **Für Content-Marketer:**
- Content-Planung basierend auf SERPs
- Featured Snippets-Optimierung
- Content-Performance-Tracking
- SERP-Feature-Strategien

### **Für lokale Unternehmen:**
- Lokale SERP-Analyse
- Google My Business Optimierung
- Lokale Konkurrenz-Analyse
- Lokale Ranking-Strategien

## 🔧 **Technische Details**

### **Verfügbare Suchmaschinen:**
- Google (verschiedene Länder)
- Bing
- YouTube
- Weitere Suchmaschinen

### **SERP-Features:**
- Featured Snippets
- Local Pack
- Shopping Results
- News Results
- Video Results
- Knowledge Graph

### **Daten-Export:**
- JSON-Format
- CSV-kompatible Daten
- Strukturierte Analysen
- Automatisierte Berichte

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO SERP API über den MCP Server und kann alle verfügbaren SERP-Funktionen optimal einsetzen.
