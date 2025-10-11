# 🧪 MCP Server Test Prompts für ChatGPT

## 📋 Übersicht
Diese Test-Prompts helfen Ihnen zu überprüfen, ob Ihr MCP-Server korrekt mit ChatGPT kommuniziert und alle Keywords Data Tools funktionieren.

---

## 🔧 **Grundlegende Verbindungstests**

### Test 1: Server-Verbindung prüfen
```
Teste die Verbindung zu meinem MCP Server. Kannst du die verfügbaren Tools auflisten?
```
**Erwartetes Ergebnis:** Liste aller 6 Keywords Data Tools

### Test 2: Einfacher Tool-Aufruf
```
Verwende das Tool keywords_data_google_trends_categories um alle verfügbaren Google Trends Kategorien abzurufen.
```
**Erwartetes Ergebnis:** Liste der Google Trends Kategorien

---

## 📊 **Keywords Data Tools Tests**

### Test 3: Google Ads Search Volume
```
Analysiere das Suchvolumen für diese Keywords: ["SEO", "Marketing", "Content Marketing"]. 
Verwende Deutschland als Standort und Deutsch als Sprache.
```
**Erwartetes Ergebnis:** Suchvolumen-Daten für die Keywords

### Test 4: Google Trends Explore
```
Zeige mir die Google Trends für das Keyword "Künstliche Intelligenz" in Deutschland für die letzten 12 Monate.
```
**Erwartetes Ergebnis:** Trend-Daten mit Graph und Metriken

### Test 5: DataForSEO Trends Explore
```
Analysiere die DataForSEO Trends für das Keyword "E-Commerce" im Web-Bereich für die letzten 30 Tage.
```
**Erwartetes Ergebnis:** DataForSEO Trend-Daten

### Test 6: DataForSEO Demografie
```
Zeige mir die demografische Aufschlüsselung für das Keyword "Online Shopping" nach Alter und Geschlecht.
```
**Erwartetes Ergebnis:** Demografie-Daten mit Alters- und Geschlechtsverteilung

### Test 7: DataForSEO Subregion
```
Analysiere die Subregion-Interessen für das Keyword "Nachhaltigkeit" in Deutschland.
```
**Erwartetes Ergebnis:** Geografische Verteilung der Keyword-Popularität

---

## 🌍 **Lokalisierungs-Tests**

### Test 8: Deutsche Keywords
```
Analysiere das Suchvolumen für deutsche Keywords: ["Suchmaschinenoptimierung", "Online Marketing", "Content Marketing"] in Deutschland.
```
**Erwartetes Ergebnis:** Suchvolumen für deutsche Keywords

### Test 9: Internationale Keywords
```
Zeige mir die Google Trends für "Artificial Intelligence" in den USA für die letzten 6 Monate.
```
**Erwartetes Ergebnis:** US-spezifische Trend-Daten

### Test 10: Mehrsprachige Analyse
```
Analysiere die Trends für das Keyword "Sustainability" in verschiedenen Ländern: Deutschland, Frankreich, Spanien.
```
**Erwartetes Ergebnis:** Ländervergleich der Trend-Daten

---

## ⏰ **Zeitraum-Tests**

### Test 11: Kurzer Zeitraum
```
Zeige mir die Google Trends für "Black Friday" in den letzten 7 Tagen.
```
**Erwartetes Ergebnis:** Aktuelle Trend-Daten

### Test 12: Langer Zeitraum
```
Analysiere die DataForSEO Trends für "Corona" über die letzten 5 Jahre.
```
**Erwartetes Ergebnis:** Langzeit-Trend-Analyse

### Test 13: Spezifische Daten
```
Zeige mir die Google Trends für "Weihnachten" vom 1. November 2024 bis 31. Dezember 2024.
```
**Erwartetes Ergebnis:** Saisonale Trend-Daten

---

## 🔍 **Erweiterte Parameter-Tests**

### Test 14: Google Trends Typen
```
Analysiere das Keyword "Tesla" in verschiedenen Google Trends Typen: Web, News, YouTube, Images.
```
**Erwartetes Ergebnis:** Vergleich verschiedener Trend-Typen

### Test 15: DataForSEO Typen
```
Zeige mir die DataForSEO Trends für "Black Friday" in Web, News und E-Commerce Bereichen.
```
**Erwartetes Ergebnis:** Vergleich verschiedener DataForSEO Bereiche

### Test 16: Item Types
```
Analysiere das Keyword "Klimawandel" und zeige mir sowohl den Trend-Graph als auch die verwandten Themen.
```
**Erwartetes Ergebnis:** Graph und Topics-Liste

---

## 🚨 **Fehlerbehandlung-Tests**

### Test 17: Ungültige Keywords
```
Analysiere das Suchvolumen für diese Keywords: ["", "a", "x".repeat(200)].
```
**Erwartetes Ergebnis:** Fehlerbehandlung für ungültige Keywords

### Test 18: Zu viele Keywords
```
Analysiere das Suchvolumen für 2000 Keywords (erstelle eine Liste mit 2000 Keywords).
```
**Erwartetes Ergebnis:** Fehlerbehandlung für zu viele Keywords

### Test 19: Ungültige Parameter
```
Zeige mir die Google Trends für "Test" mit einem ungültigen Zeitraum "invalid_range".
```
**Erwartetes Ergebnis:** Fehlerbehandlung für ungültige Parameter

### Test 20: Fehlende Parameter
```
Analysiere das Suchvolumen ohne Keywords anzugeben.
```
**Erwartetes Ergebnis:** Fehlerbehandlung für fehlende Parameter

---

## 🔄 **Workflow-Tests**

### Test 21: Komplette Keyword-Analyse
```
Führe eine komplette Keyword-Analyse für "Nachhaltige Mode" durch:
1. Suchvolumen von Google Ads
2. Google Trends Analyse
3. DataForSEO Trends
4. Demografie-Analyse
5. Subregion-Interessen
```
**Erwartetes Ergebnis:** Umfassende Keyword-Analyse

### Test 22: Konkurrenz-Analyse
```
Analysiere die Keywords "Tesla", "BMW", "Mercedes" und vergleiche:
- Suchvolumen
- Trends über Zeit
- Demografische Verteilung
```
**Erwartetes Ergebnis:** Vergleichsanalyse der Konkurrenz-Keywords

### Test 23: Saisonale Analyse
```
Analysiere saisonale Trends für diese Keywords: ["Sommerurlaub", "Winterurlaub", "Frühling", "Herbst"] über das ganze Jahr 2024.
```
**Erwartetes Ergebnis:** Saisonale Muster-Erkennung

---

## 📈 **Performance-Tests**

### Test 24: Große Keyword-Liste
```
Analysiere das Suchvolumen für 100 Keywords aus dem Bereich "Digital Marketing".
```
**Erwartetes Ergebnis:** Effiziente Verarbeitung großer Keyword-Listen

### Test 25: Parallele Anfragen
```
Analysiere gleichzeitig:
- Google Trends für "AI"
- DataForSEO Trends für "Machine Learning"  
- Demografie für "Deep Learning"
```
**Erwartetes Ergebnis:** Parallele Verarbeitung mehrerer Anfragen

---

## 🎯 **ChatGPT-spezifische Tests**

### Test 26: Natürliche Sprache
```
Ich möchte eine SEO-Analyse für mein Unternehmen durchführen. Kannst du mir helfen, die besten Keywords für "nachhaltige Mode" zu finden?
```
**Erwartetes Ergebnis:** Intelligente Tool-Auswahl und Parameter-Setzung

### Test 27: Kontextuelle Analyse
```
Basierend auf den Trend-Daten für "Künstliche Intelligenz", welche verwandten Keywords soll ich für meine Content-Strategie verwenden?
```
**Erwartetes Ergebnis:** Kontextuelle Empfehlungen basierend auf Trend-Daten

### Test 28: Mehrsprachige Anfrage
```
Analyze the search volume for these English keywords: ["SEO", "Marketing", "Content"] in Germany.
```
**Erwartetes Ergebnis:** Korrekte Lokalisierung trotz englischer Anfrage

---

## ✅ **Erfolgskriterien**

### Für jeden Test sollten Sie prüfen:

1. **Tool-Aufruf erfolgreich** ✅
   - Keine Fehlermeldungen
   - Korrekte Tool-Auswahl

2. **Parameter korrekt übergeben** ✅
   - Keywords richtig formatiert
   - Standort und Sprache korrekt
   - Zeiträume richtig interpretiert

3. **Daten zurückgegeben** ✅
   - Strukturierte Antwort
   - Relevante Metriken
   - Vollständige Informationen

4. **ChatGPT versteht die Antwort** ✅
   - Korrekte Interpretation der Daten
   - Sinnvolle Zusammenfassung
   - Handlungsempfehlungen

---

## 🚨 **Häufige Probleme und Lösungen**

### Problem: "Tool nicht gefunden"
**Lösung:** 
- Prüfen Sie die MCP-Server-Verbindung
- Überprüfen Sie die Tool-Namen im Schema

### Problem: "Authentifizierung fehlgeschlagen"
**Lösung:**
- Prüfen Sie DataForSEO Credentials
- Überprüfen Sie Basic Auth Konfiguration

### Problem: "Parameter ungültig"
**Lösung:**
- Prüfen Sie Keyword-Format (Array von Strings)
- Überprüfen Sie Datums-Format (YYYY-MM-DD)
- Prüfen Sie Enum-Werte (type, time_range)

### Problem: "Keine Daten zurückgegeben"
**Lösung:**
- Prüfen Sie Keyword-Relevanz
- Überprüfen Sie Standort und Sprache
- Prüfen Sie Zeitraum-Gültigkeit

---

## 📝 **Test-Protokoll**

Verwenden Sie diese Vorlage für Ihre Tests:

```
Test #: [Nummer]
Prompt: [Ihr Test-Prompt]
Erwartetes Ergebnis: [Was Sie erwarten]
Tatsächliches Ergebnis: [Was passiert ist]
Status: [✅ Erfolgreich / ❌ Fehlgeschlagen]
Notizen: [Zusätzliche Beobachtungen]
```

---

## 🎉 **Fazit**

Diese Test-Prompts decken alle wichtigen Aspekte Ihrer MCP-Server-Kommunikation ab:

- ✅ **Grundfunktionen** (Verbindung, Tool-Aufrufe)
- ✅ **Alle Keywords Data Tools** (6 Tools vollständig getestet)
- ✅ **Parameter-Variationen** (Standorte, Sprachen, Zeiträume)
- ✅ **Fehlerbehandlung** (ungültige Eingaben)
- ✅ **Performance** (große Datenmengen)
- ✅ **ChatGPT-Integration** (natürliche Sprache)

Führen Sie diese Tests systematisch durch, um sicherzustellen, dass Ihr MCP-Server perfekt mit ChatGPT funktioniert! 🚀
