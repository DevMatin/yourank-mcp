# 🔍 Erweiterter SERP Google Organic Live Endpoint

## Übersicht

Der `serp_google_organic_live` Endpoint wurde erweitert und unterstützt jetzt einen vollständigen Task-basierten Workflow mit erweiterten Parametern.

## Verfügbare Modi

### 1. Task Creation (Standard)
Erstellt eine neue SERP-Analyse-Task.

**Parameter:**
```json
{
  "keyword": "SEO Beratung München",
  "location_code": 2276,
  "language_code": "de",
  "depth": 10,
  "device": "desktop",
  "browser_language": "de",
  "browser_timezone": "Europe/Berlin"
}
```

### 2. Task Results Retrieval
Holt die Ergebnisse einer bestehenden Task ab.

**Parameter:**
```json
{
  "task_id": "10121823-1064-0093-0000-1234567890"
}
```

## Erweiterte Parameter

### Basis-Parameter
- `keyword` - Suchbegriff (erforderlich)
- `location_code` - Standort-Code (Standard: 2276 für Deutschland)
- `language_code` - Sprach-Code (Standard: "de")
- `depth` - Anzahl der Ergebnisse (Standard: 20)
- `device` - Gerätetyp ("desktop", "mobile", "tablet")
- `limit` - Maximale Anzahl der Ergebnisse (Standard: 100)

### Browser-Simulation
- `browser_language` - Browser-Sprache (Standard: "de")
- `browser_timezone` - Browser-Zeitzone (Standard: "Europe/Berlin")
- `browser_accept_language` - Accept-Language Header
- `browser_user_agent` - User-Agent String
- `browser_platform` - Plattform (Standard: "Windows")
- `browser_javascript` - JavaScript aktiviert (Standard: true)
- `browser_images` - Bilder laden (Standard: true)
- `browser_css` - CSS laden (Standard: true)

### Erweiterte Browser-Parameter
- `browser_screen_width` - Bildschirmbreite (Standard: 1920)
- `browser_screen_height` - Bildschirmhöhe (Standard: 1080)
- `browser_window_width` - Fensterbreite (Standard: 1280)
- `browser_window_height` - Fensterhöhe (Standard: 720)
- `browser_connection_type` - Verbindungstyp (Standard: "broadband")
- `browser_cookie` - Cookie-String
- `browser_http_referer` - Referer-URL

### SERP-spezifische Parameter
- `se_domain` - Suchmaschinen-Domain
- `se_type` - Suchmaschinen-Typ
- `calculate_rectangles` - Rechtecke berechnen (Standard: false)
- `people_also_ask_click_depth` - PAA-Klick-Tiefe (Standard: 0)
- `max_crawl_pages` - Maximale Crawl-Seiten (Standard: 1)

## Workflow

### Schritt 1: Task erstellen
```bash
curl -X POST https://yourank-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "serp_google_organic_live",
      "arguments": {
        "keyword": "SEO Beratung München",
        "location_code": 2276,
        "language_code": "de",
        "depth": 10
      }
    },
    "id": "task-create"
  }'
```

**Antwort:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "version": "0.1.20251006",
    "status_code": 20000,
    "status_message": "Ok.",
    "time": "0.1258 sec.",
    "cost": 0.0006,
    "tasks_count": 1,
    "tasks_error": 0,
    "tasks": [
      {
        "id": "10121823-1064-0093-0000-1234567890",
        "status_code": 20000,
        "status_message": "Ok.",
        "time": "0.1258 sec.",
        "cost": 0.0006,
        "result_count": 0,
        "path": [
          "v3",
          "serp",
          "google",
          "organic",
          "task_post"
        ],
        "data": {
          "api": "serp",
          "function": "task_post",
          "se": "google",
          "se_type": "organic"
        }
      }
    ]
  },
  "id": "task-create"
}
```

### Schritt 2: Task-Status prüfen
```bash
curl -X POST https://yourank-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "serp_google_organic_tasks_ready",
      "arguments": {
        "id": "10121823-1064-0093-0000-1234567890"
      }
    },
    "id": "task-status"
  }'
```

### Schritt 3: Ergebnisse abrufen
```bash
curl -X POST https://yourank-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "serp_google_organic_live",
      "arguments": {
        "task_id": "10121823-1064-0093-0000-1234567890"
      }
    },
    "id": "task-results"
  }'
```

## Verfügbare Endpoints

### Task-basierte Endpoints
- `serp_google_organic_live` - Erweiterter Live-Endpoint
- `serp_google_organic_task_post` - Task erstellen
- `serp_google_organic_tasks_ready` - Task-Status prüfen
- `serp_google_organic_task_get_regular` - Ergebnisse abrufen
- `serp_google_organic_task_get_advanced` - Erweiterte Ergebnisse
- `serp_google_organic_task_get_html` - HTML-Ergebnisse

### Utility Endpoints
- `serp_google_locations` - Verfügbare Standorte
- `serp_google_languages` - Verfügbare Sprachen
- `serp_tasks_ready` - Alle Tasks-Status
- `serp_errors` - Fehler-Übersicht

## Beispiel-Integration

### Python
```python
import requests
import time

# Task erstellen
response = requests.post('https://yourank-mcp.vercel.app/mcp', json={
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
        "name": "serp_google_organic_live",
        "arguments": {
            "keyword": "SEO Beratung München",
            "location_code": 2276,
            "language_code": "de",
            "depth": 10
        }
    },
    "id": "task-create"
})

task_id = response.json()['result']['tasks'][0]['id']

# Warten bis Task fertig ist
time.sleep(30)

# Ergebnisse abrufen
response = requests.post('https://yourank-mcp.vercel.app/mcp', json={
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
        "name": "serp_google_organic_live",
        "arguments": {
            "task_id": task_id
        }
    },
    "id": "task-results"
})

results = response.json()['result']
```

### JavaScript
```javascript
// Task erstellen
const createTask = async () => {
  const response = await fetch('https://yourank-mcp.vercel.app/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: "serp_google_organic_live",
        arguments: {
          keyword: "SEO Beratung München",
          location_code: 2276,
          language_code: "de",
          depth: 10
        }
      },
      id: "task-create"
    })
  });
  
  const result = await response.json();
  return result.result.tasks[0].id;
};

// Ergebnisse abrufen
const getResults = async (taskId) => {
  const response = await fetch('https://yourank-mcp.vercel.app/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: "serp_google_organic_live",
        arguments: { task_id: taskId }
      },
      id: "task-results"
    })
  });
  
  return await response.json();
};

// Vollständiger Workflow
const workflow = async () => {
  const taskId = await createTask();
  await new Promise(resolve => setTimeout(resolve, 30000)); // 30 Sekunden warten
  const results = await getResults(taskId);
  console.log(results);
};
```

## Fehlerbehandlung

### Häufige Fehler
- **404 Not Found**: SERP-API-Berechtigung erforderlich
- **400 Bad Request**: Ungültige Parameter
- **500 Internal Server Error**: Server-Fehler

### Fehler-Codes
- `20000` - Erfolgreich
- `40000` - Ungültige Parameter
- `40400` - Nicht gefunden
- `50000` - Server-Fehler

## Kosten

- **Task Creation**: 0.0006 Credits
- **Task Results**: 0 Credits
- **Status Check**: 0 Credits

## Hinweise

1. **Account-Berechtigung**: SERP-APIs erfordern spezielle Berechtigung
2. **Task-Timeout**: Tasks laufen nach 30 Minuten ab
3. **Rate Limiting**: Maximal 100 Requests pro Minute
4. **Browser-Simulation**: Erweiterte Parameter für realistische Ergebnisse

## Support

Bei Problemen oder Fragen:
- GitHub Issues: [Repository](https://github.com/dataforseo/mcp-server-typescript)
- DataForSEO Support: [Support Portal](https://dataforseo.com/support)
- Dokumentation: [API Docs](https://docs.dataforseo.com/v3/serp/)
