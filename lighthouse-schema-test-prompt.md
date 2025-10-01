# Lighthouse OpenAPI Schema Test Prompt

## Schema-Übersicht
Das Lighthouse OpenAPI Schema definiert eine API für DataForSEO OnPage Lighthouse Performance Tests mit folgenden Endpunkten:

### Verfügbare Endpunkte:
1. **GET** `/v3/on_page/lighthouse/languages` - Verfügbare Sprachen
2. **GET** `/v3/on_page/lighthouse/audits` - Verfügbare Audit-Typen
3. **GET** `/v3/on_page/lighthouse/versions` - Lighthouse Versionen
4. **POST** `/v3/on_page/lighthouse/task_post` - Task erstellen
5. **GET** `/v3/on_page/lighthouse/tasks_ready` - Abgeschlossene Tasks
6. **GET** `/v3/on_page/lighthouse/task_get/json/{id}` - Ergebnisse abrufen
7. **POST** `/v3/on_page/lighthouse/live/json` - Live Test

## Test-Prompts für verschiedene Szenarien

### 1. Basis Lighthouse Test
```
Führe einen Lighthouse Performance Test für die Webseite https://example.com durch. 
Verwende alle Standard-Kategorien (performance, accessibility, best-practices, seo, pwa) 
und aktiviere JavaScript. Die Ergebnisse sollen auf Deutsch sein.
```

### 2. Spezifischer Performance Test
```
Teste die Performance der Webseite https://shop.example.com mit Lighthouse. 
Fokussiere dich nur auf die Performance-Kategorie und verwende die neueste Lighthouse Version. 
Aktiviere JavaScript für realistische Messungen.
```

### 3. SEO und Accessibility Test
```
Analysiere https://blog.example.com mit Lighthouse für SEO und Accessibility. 
Deaktiviere JavaScript um die Core-Web-Vitals ohne JS zu messen. 
Verwende die deutsche Sprache für die Ergebnisse.
```

### 4. PWA Test
```
Teste https://app.example.com als Progressive Web App mit Lighthouse. 
Führe alle PWA-relevanten Audits durch und verwende die Standard-Konfiguration.
```

### 5. Custom Audit Test
```
Führe einen Lighthouse Test für https://news.example.com durch mit folgenden spezifischen Audits:
- first-contentful-paint
- largest-contentful-paint
- cumulative-layout-shift
- total-blocking-time
Verwende die Performance-Kategorie und aktiviere JavaScript.
```

### 6. Batch Testing
```
Erstelle Lighthouse Tasks für folgende Webseiten:
- https://example.com
- https://example.com/about
- https://example.com/contact
- https://example.com/products

Verwende für alle Tests die Performance-Kategorie und aktiviere JavaScript.
Tagge die Tasks mit "batch-test-2024".
```

### 7. Mobile vs Desktop Vergleich
```
Führe Lighthouse Tests für https://example.com durch:
1. Mobile-Ansicht (emulated_form_factor: mobile)
2. Desktop-Ansicht (emulated_form_factor: desktop)

Vergleiche die Performance-Scores und Core Web Vitals zwischen beiden Ansichten.
Verwende alle Kategorien und aktiviere JavaScript.
```

### 8. Verfügbare Optionen abrufen
```
Zeige mir alle verfügbaren:
- Lighthouse Versionen
- Unterstützten Sprachen
- Audit-Typen

für die DataForSEO Lighthouse API.
```

### 9. Task Status überwachen
```
Überwache den Status aller Lighthouse Tasks und zeige mir:
- Abgeschlossene Tasks
- Laufende Tasks
- Fehlgeschlagene Tasks

mit ihren jeweiligen IDs und Status-Codes.
```

### 10. Detaillierte Ergebnisanalyse
```
Analysiere die Lighthouse Ergebnisse für Task-ID: 07131248-1535-0216-1000-17384017ad04

Zeige mir:
- Performance Score und Core Web Vitals
- Accessibility Score und Probleme
- SEO Score und Verbesserungsvorschläge
- Best Practices Score
- PWA Score (falls verfügbar)
- Detaillierte Audit-Ergebnisse
```

## Erwartete Antworten

### Für Live Tests:
```json
{
  "status_code": 20000,
  "status_message": "Ok.",
  "time": "2024-01-15 10:30:00",
  "cost": 0.1,
  "tasks_count": 1,
  "tasks_error": 0,
  "tasks": [
    {
      "id": "07131248-1535-0216-1000-17384017ad04",
      "status_code": 20000,
      "status_message": "Ok.",
      "time": "2024-01-15 10:30:00",
      "cost": 0.1,
      "result_count": 1,
      "path": ["v3", "on_page", "lighthouse", "live", "json"],
      "data": {
        "url": "https://example.com",
        "fetch_time": "2024-01-15 10:30:00",
        "lighthouse": {
          "version": "10.4.0",
          "categories": {
            "performance": {
              "id": "performance",
              "title": "Performance",
              "score": 0.85
            },
            "accessibility": {
              "id": "accessibility", 
              "title": "Accessibility",
              "score": 0.92
            }
          }
        }
      }
    }
  ]
}
```

### Für Task Creation:
```json
{
  "status_code": 20000,
  "status_message": "Ok.",
  "time": "2024-01-15 10:30:00",
  "cost": 0.1,
  "tasks_count": 1,
  "tasks_error": 0,
  "tasks": [
    {
      "id": "07131248-1535-0216-1000-17384017ad04",
      "status_code": 20000,
      "status_message": "Ok.",
      "time": "2024-01-15 10:30:00",
      "cost": 0.1,
      "result_count": 1,
      "path": ["v3", "on_page", "lighthouse", "task_post"],
      "data": {
        "task_id": "07131248-1535-0216-1000-17384017ad04",
        "status": "in_progress"
      }
    }
  ]
}
```

## Test-Konfigurationen

### Standard-Konfiguration:
- **URL**: https://example.com
- **JavaScript**: aktiviert
- **Kategorien**: alle (performance, accessibility, best-practices, seo, pwa)
- **Sprache**: en (Standard)

### Mobile-Konfiguration:
- **emulated_form_factor**: mobile
- **JavaScript**: aktiviert
- **Kategorien**: performance, accessibility

### Desktop-Konfiguration:
- **emulated_form_factor**: desktop
- **JavaScript**: aktiviert
- **Kategorien**: alle

### SEO-fokussierte Konfiguration:
- **Kategorien**: seo, performance
- **JavaScript**: deaktiviert
- **Sprache**: de

## Fehlerbehandlung

### Häufige Fehler:
1. **400 Bad Request**: Ungültige URL oder Parameter
2. **401 Unauthorized**: Fehlende oder ungültige Authentifizierung
3. **429 Too Many Requests**: Rate Limit überschritten
4. **500 Internal Server Error**: Server-seitiger Fehler

### Fehlerbeispiel:
```json
{
  "status_code": 40000,
  "status_message": "Bad Request: Invalid URL format",
  "time": "2024-01-15 10:30:00",
  "cost": 0,
  "tasks_count": 0,
  "tasks_error": 1
}
```

## Performance-Benchmarks

### Gute Scores:
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 90
- **PWA**: > 80

### Core Web Vitals Ziele:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Test-Durchführung

1. **Vorbereitung**: API-Credentials bereitstellen
2. **Test-URLs**: Gültige URLs vorbereiten
3. **Parameter**: Test-Konfiguration definieren
4. **Ausführung**: API-Aufrufe durchführen
5. **Überwachung**: Task-Status verfolgen
6. **Analyse**: Ergebnisse interpretieren
7. **Reporting**: Zusammenfassung erstellen

## Automatisierung

### Batch-Testing Script:
```bash
#!/bin/bash
URLS=("https://example.com" "https://example.com/about" "https://example.com/contact")

for url in "${URLS[@]}"; do
  curl -X POST "https://yourank-mcp.vercel.app/v3/on_page/lighthouse/live/json" \
    -H "Content-Type: application/json" \
    -u "username:password" \
    -d "{\"url\": \"$url\", \"categories\": [\"performance\", \"accessibility\"]}"
done
```

### Monitoring Script:
```bash
#!/bin/bash
TASK_ID="07131248-1535-0216-1000-17384017ad04"

while true; do
  STATUS=$(curl -s "https://yourank-mcp.vercel.app/v3/on_page/lighthouse/task_get/json/$TASK_ID" \
    -u "username:password" | jq -r '.tasks[0].status_code')
  
  if [ "$STATUS" = "20000" ]; then
    echo "Task completed successfully"
    break
  elif [ "$STATUS" = "40000" ]; then
    echo "Task failed"
    break
  else
    echo "Task still running..."
    sleep 30
  fi
done
```

## Zusammenfassung

Dieses Schema ermöglicht umfassende Lighthouse Performance Tests mit:
- **Live-Tests** für sofortige Ergebnisse
- **Task-basierte Tests** für Batch-Verarbeitung
- **Flexible Konfiguration** für verschiedene Test-Szenarien
- **Detaillierte Ergebnisse** mit allen Lighthouse-Metriken
- **Deutsche Lokalisierung** für bessere Verständlichkeit

Die API ist ideal für:
- **SEO-Agenturen** für Kundenberichte
- **Webentwickler** für Performance-Optimierung
- **QA-Teams** für automatisiertes Testing
- **Content-Manager** für Website-Monitoring

