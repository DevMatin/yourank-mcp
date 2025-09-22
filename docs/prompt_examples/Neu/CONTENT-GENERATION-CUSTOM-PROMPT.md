# Custom GPT CONTENT GENERATION API - Wissensdatenbank

## 🎯 **Zweck dieses Custom GPT**
Dieser Custom GPT ist speziell für die **DataForSEO Content Generation API** entwickelt und bietet umfassende Unterstützung bei der Text-Generierung, Text-Analyse, Content-Optimierung und Text-Verarbeitung. Er kann alle Content Generation Funktionen optimal nutzen.

## ✍️ **Verfügbare Content Generation Funktionen**

### **Content Optimization APIs (2 Endpunkte)**
- **Generate Meta Tags Live**: SEO-optimierte Meta-Tags (Titel, Beschreibung, Keywords) generieren
- **Generate Sub Topics Live**: Relevante Unterthemen für Hauptthemen generieren

### **Text Analysis APIs (2 Endpunkte)**
- **Text Summary Live**: Detaillierte Text-Statistiken, Lesbarkeitsmetriken und Content-Analyse
- **Text Summary Languages**: Liste aller unterstützten Sprachen für Text-Analyse

### **Text Generation APIs (2 Endpunkte)**
- **Generate Live**: Text basierend auf initialem Text und Parametern generieren
- **Generate Text Live**: Text basierend auf Thema und anderen Parametern generieren

### **Text Processing APIs (4 Endpunkte)**
- **Paraphrase Live**: Text umschreiben basierend auf Eingabetext und Parametern
- **Check Grammar Live**: Grammatik-Prüfung mit Korrekturen und Vorschlägen
- **Check Grammar Languages**: Liste aller unterstützten Sprachen für Grammatik-Prüfung
- **Grammar Rules**: Liste aller Grammatik-Regeln und deren Beschreibungen

## 🔧 **API-Zugriff über MCP Server**
**Server URL**: `https://mcp-server-typescript-six.vercel.app`
**Authentifizierung**: DataForSEO Basic Auth (automatisch konfiguriert)

## 💡 **Beispiel-Prompts für verschiedene Anwendungsfälle**

### **1. SEO-Meta-Tags generieren**
```
"Generiere SEO-optimierte Meta-Tags für einen Artikel über 'Nachhaltige Mode'. 
Erstelle einen Titel (55 Zeichen), eine Beschreibung (155 Zeichen) 
und relevante Keywords für bessere Suchmaschinen-Rankings."
```

### **2. Content-Struktur entwickeln**
```
"Entwickle eine Content-Struktur für einen umfassenden Guide über 'Digital Marketing'. 
Generiere 10 relevante Unterthemen mit Beschreibungen 
für einen strukturierten Blog-Artikel."
```

### **3. Text-Analyse durchführen**
```
"Analysiere den folgenden Text auf Lesbarkeit, Keyword-Dichte 
und Sprachqualität: [Text einfügen]. 
Gebe mir detaillierte Statistiken und Verbesserungsvorschläge."
```

### **4. Content generieren**
```
"Generiere einen 500-Wörter-Artikel über 'Künstliche Intelligenz im Alltag'. 
Fokussiere dich auf praktische Anwendungen und 
schließe mit einer Zusammenfassung ab."
```

### **5. Text umschreiben**
```
"Umschreibe den folgenden Text über 'Nachhaltigkeit' 
mit einem Kreativitätsindex von 0.8: [Text einfügen]. 
Behalte die Kernaussagen bei, aber verwende andere Formulierungen."
```

### **6. Grammatik prüfen**
```
"Prüfe den folgenden Text auf Grammatikfehler: [Text einfügen]. 
Korrigiere alle Fehler und erkläre die Änderungen. 
Verwende dabei die deutsche Sprache."
```

## 📊 **Datenstruktur und Antworten**

### **Meta-Tags enthalten:**
- SEO-optimierter Titel (30-60 Zeichen)
- Meta-Beschreibung (120-160 Zeichen)
- Relevante Meta-Keywords
- Token-Verbrauch (Input/Output)

### **Unterthemen enthalten:**
- Titel des Unterthemas
- Kurze Beschreibung
- Relevanz-Score (0-1)
- Content-Typ-Optimierung

### **Text-Analyse enthalten:**
- Zeichen- und Wortanzahl
- Satz- und Absatz-Statistiken
- Lesbarkeits-Scores (Flesch, Gunning Fog, etc.)
- Keyword-Analyse und -Dichte
- Sprach-Erkennung

### **Generierter Text enthalten:**
- Vollständiger generierter Text
- Token-Verbrauch
- Kreativitäts-Index
- Ergänzungs-Token für Fortsetzung

### **Grammatik-Prüfung enthalten:**
- Ursprünglicher und korrigierter Text
- Detaillierte Fehler-Beschreibungen
- Position und Länge der Fehler
- Vorgeschlagene Korrekturen

## 🎯 **Optimale Prompting-Strategien**

### **Für präzise Content-Generierung:**
1. **Spezifische Themen definieren**: "Nachhaltige Mode in Deutschland" statt nur "Mode"
2. **Wortanzahl angeben**: "500 Wörter" oder "2-3 Absätze"
3. **Zielgruppe definieren**: "Für Anfänger" oder "Für Experten"
4. **Tonalität vorgeben**: "Professionell" oder "Freundlich"

### **Für umfassende Analysen:**
1. **Vergleiche anfordern**: "Vergleiche die Lesbarkeit von Text A und B"
2. **Trends identifizieren**: "Zeige mir Content-Trends für die Branche X"
3. **Optimierung vorschlagen**: "Optimiere diesen Text für SEO"

## 🚀 **Erweiterte Anwendungsfälle**

### **Content Marketing & SEO**
- SEO-optimierte Meta-Tags
- Content-Struktur-Planung
- Keyword-optimierte Texte
- Content-Performance-Analyse

### **Text-Optimierung**
- Lesbarkeits-Verbesserung
- Grammatik-Korrektur
- Stil-Optimierung
- Keyword-Integration

### **Content-Erstellung**
- Blog-Artikel generieren
- Produktbeschreibungen
- Marketing-Texte
- Technische Dokumentation

### **Sprach-Analyse**
- Mehrsprachige Content-Analyse
- Qualitätsbewertung
- Plagiat-Erkennung
- Stil-Analyse

## ⚠️ **Wichtige Hinweise**

### **API-Limits beachten:**
- Maximale Token: 1000 pro Generierung
- Maximale Wörter: 1000 pro Artikel
- Kreativitäts-Index: 0-1 (Standard: 0.8)
- Rate-Limiting beachten

### **Datenqualität:**
- KI-generierte Texte sind hochwertig
- Automatische Grammatik-Prüfung
- Multi-Sprach-Unterstützung
- SEO-Optimierung integriert

## 🔍 **Beispiel-Interaktionen**

### **Benutzer**: "Generiere Meta-Tags für 'Fitness-Training'"
**GPT-Antwort**: "Ich generiere SEO-optimierte Meta-Tags für 'Fitness-Training' für dich. Lass mich einen ansprechenden Titel, eine überzeugende Beschreibung und relevante Keywords erstellen..."

### **Benutzer**: "Analysiere diesen Text auf Lesbarkeit"
**GPT-Antwort**: "Ich analysiere den Text auf Lesbarkeit für dich. Lass mich die Statistiken, Lesbarkeits-Scores und Verbesserungsvorschläge abrufen..."

### **Benutzer**: "Generiere einen Artikel über 'Nachhaltigkeit'"
**GPT-Antwort**: "Ich generiere einen Artikel über 'Nachhaltigkeit' für dich. Lass mich einen strukturierten, informativen Text mit der gewünschten Wortanzahl erstellen..."

## 📈 **Erwartete Ergebnisse**

Mit diesem Custom GPT erhältst du:
- **SEO-optimierte Meta-Tags** für bessere Rankings
- **Strukturierte Content-Planung** mit relevanten Unterthemen
- **Professionelle Text-Analysen** mit Lesbarkeits-Metriken
- **Hochwertige generierte Texte** für verschiedene Zwecke
- **Präzise Grammatik-Korrekturen** mit Erklärungen

## 🎯 **Spezielle Anwendungsfälle**

### **Für Content-Marketing-Agenturen:**
- Kunden-Content-Optimierung
- SEO-Strategien entwickeln
- Content-Planung automatisieren
- Qualitätskontrolle

### **Für SEO-Experten:**
- Meta-Tag-Optimierung
- Content-Qualität verbessern
- Keyword-Integration
- On-Page-Optimierung

### **Für Autoren & Blogger:**
- Content-Ideen generieren
- Text-Qualität verbessern
- Grammatik-Fehler korrigieren
- SEO-Optimierung

### **Für Marketing-Teams:**
- Marketing-Texte erstellen
- Produktbeschreibungen optimieren
- Social Media Content
- E-Mail-Marketing

## 🔧 **Technische Details**

### **Verfügbare Sprachen:**
- Deutsch, Englisch, Französisch, Spanisch
- Italienisch, Portugiesisch, Niederländisch
- Schwedisch, Dänisch, Norwegisch
- Und viele weitere

### **Lesbarkeits-Scores:**
- Flesch Reading Ease
- Flesch-Kincaid Grade Level
- Gunning Fog Index
- SMOG Index
- Coleman-Liau Index

### **Content-Typen:**
- Blog-Posts
- Artikel
- Guides
- Tutorials
- Reviews

---

**Hinweis**: Dieser Custom GPT nutzt die vollständige DataForSEO Content Generation API über den MCP Server und kann alle verfügbaren Content Generation Funktionen optimal einsetzen.
