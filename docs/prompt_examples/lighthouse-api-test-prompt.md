# Lighthouse API Test Prompt

## Vollständiger Test-Prompt für die Lighthouse API

```
Teste die Lighthouse API von yourank-mcp.vercel.app mit folgenden Schritten:

1. **Verfügbare Sprachen abrufen**
   - Endpoint: POST /v3/onpage_lighthouse
   - Body: {"type": "languages"}
   - Erwartung: Liste der verfügbaren Lighthouse-Sprachen

2. **Verfügbare Audits abrufen**
   - Endpoint: POST /v3/onpage_lighthouse
   - Body: {"type": "audits"}
   - Erwartung: Liste der verfügbaren Lighthouse-Audits

3. **Verfügbare Versionen abrufen**
   - Endpoint: POST /v3/onpage_lighthouse
   - Body: {"type": "versions"}
   - Erwartung: Liste der verfügbaren Lighthouse-Versionen

4. **Lighthouse-Task erstellen**
   - Endpoint: POST /v3/onpage_lighthouse
   - Body: {
       "type": "task_post",
       "url": "https://example.com",
       "language_code": "en",
       "categories": ["performance", "seo", "accessibility"],
       "for_mobile": false
     }
   - Erwartung: Task-ID für die Lighthouse-Analyse

5. **Task-Status prüfen**
   - Endpoint: POST /v3/onpage_lighthouse
   - Body: {"type": "tasks_ready"}
   - Erwartung: Liste der fertigen Tasks

6. **Lighthouse-Ergebnisse abrufen**
   - Endpoint: POST /v3/onpage_lighthouse
   - Body: {
       "type": "task_get",
       "id": "[TASK_ID_FROM_STEP_4]",
       "summary_only": true,
       "max_audits": 10
     }
   - Erwartung: Lighthouse-Scores und Top-Issues

7. **Live-Lighthouse-Analyse (falls verfügbar)**
   - Endpoint: POST /v3/onpage_lighthouse
   - Body: {
       "type": "live",
       "url": "https://example.com",
       "language_code": "en",
       "categories": ["performance"],
       "for_mobile": false,
       "summary_only": true
     }
   - Erwartung: Sofortige Lighthouse-Analyse

Für jeden Schritt:
- Zeige die vollständige HTTP-Anfrage
- Zeige die vollständige Antwort
- Analysiere die Datenstruktur
- Prüfe auf Fehler oder unerwartete Werte
- Dokumentiere die Performance-Metriken (falls vorhanden)

Besonders wichtig:
- Prüfe die Authentifizierung (Basic Auth)
- Validiere die Schema-Struktur
- Teste verschiedene Parameter-Kombinationen
- Überprüfe die Blob-Storage-Integration
- Teste die Pagination (falls vorhanden)
```

## Erweiterte Test-Szenarien

### Szenario 1: Vollständige Lighthouse-Analyse
```json
{
  "type": "task_post",
  "url": "https://www.google.com",
  "language_code": "en",
  "language_name": "English",
  "for_mobile": false,
  "categories": ["performance", "accessibility", "seo", "best-practices", "pwa"],
  "max_issues": 20,
  "include_details": true,
  "summary_only": false
}
```

### Szenario 2: Mobile Lighthouse-Analyse
```json
{
  "type": "task_post",
  "url": "https://www.example.com",
  "language_code": "de",
  "language_name": "German",
  "for_mobile": true,
  "categories": ["performance", "seo"],
  "max_issues": 10,
  "summary_only": true
}
```

### Szenario 3: Spezifische Audits
```json
{
  "type": "task_post",
  "url": "https://www.test.com",
  "language_code": "en",
  "audits": ["first-contentful-paint", "largest-contentful-paint", "speed-index"],
  "categories": ["performance"],
  "summary_only": true,
  "max_audits": 5
}
```

## Erwartete Response-Struktur

### Erfolgreiche Lighthouse-Analyse
```json
{
  "status_code": 20000,
  "status_message": "Ok.",
  "task_id": "1234567890",
  "url": "https://example.com",
  "fetch_time": "2024-01-01 12:00:00",
  "lighthouse_version": "10.0.0",
  "scores": {
    "performance": 85,
    "accessibility": 92,
    "seo": 88,
    "best-practices": 78,
    "pwa": 45
  },
  "performance_metrics": {
    "first-contentful-paint": {
      "score": 0.9,
      "displayValue": "1.2 s",
      "numericValue": 1200,
      "numericUnit": "millisecond"
    }
  },
  "top_issues": [
    {
      "id": "unused-css-rules",
      "title": "Remove unused CSS",
      "score": 0.5,
      "description": "Remove dead rules from stylesheets...",
      "category": "performance",
      "displayValue": "Potential savings of 15 KiB",
      "numericValue": 15360,
      "numericUnit": "byte"
    }
  ],
  "blob_storage": {
    "storage": "vercel-blob",
    "results_url": "https://blob.vercel-storage.com/...",
    "proxy_url": "https://yourank-mcp.vercel.app/api/blob/proxy?url=...",
    "size_bytes": 45678,
    "expires_at": "2024-01-02T12:00:00.000Z"
  }
}
```

## Fehlerbehandlung testen

### Authentifizierungsfehler
```json
{
  "error": "Authentication failed",
  "status_code": 401,
  "message": "Invalid credentials"
}
```

### Parameter-Validierungsfehler
```json
{
  "error": "Parameter validation failed",
  "status_code": 400,
  "details": {
    "url": "URL is required for task_post",
    "type": "Invalid type value"
  }
}
```

### Task nicht gefunden
```json
{
  "error": "Task not found",
  "status_code": 404,
  "task_id": "invalid-task-id"
}
```

## Debug-Informationen sammeln

Bei jedem Test:
1. **Request Headers**: Authorization, Content-Type, User-Agent
2. **Response Headers**: Content-Type, Content-Length, Cache-Control
3. **Timing**: Request-Dauer, Response-Zeit
4. **Fehler-Details**: Status-Code, Fehler-Message, Stack-Trace
5. **Schema-Validierung**: Erwartete vs. tatsächliche Struktur

## Performance-Tests

- **Concurrent Requests**: Mehrere gleichzeitige Lighthouse-Analysen
- **Rate Limiting**: Teste API-Limits
- **Timeout-Handling**: Lange laufende Analysen
- **Memory Usage**: Große Response-Daten
- **Blob Storage**: Upload/Download-Performance

## Integrationstests

- **End-to-End**: Vollständiger Workflow von Task-Erstellung bis Ergebnis
- **Error Recovery**: Fehlerbehandlung und Retry-Mechanismen
- **Data Consistency**: Konsistenz zwischen verschiedenen Endpoints
- **Schema Evolution**: Kompatibilität mit verschiedenen Schema-Versionen

