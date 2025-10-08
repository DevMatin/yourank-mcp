# Lighthouse Workflow - Task-basiert statt Live

## Problem
Live-Requests (`type: "live"`) empfangen 552KB Daten von DataForSEO, was das MCP-Protokoll überschreitet.

## Lösung: 2-Schritt-Workflow

### Schritt 1: Task erstellen
```json
{
  "type": "task_post",
  "url": "https://example.com",
  "category": ["performance", "seo", "accessibility"]
}
```

**Response**: `task_id` (z.B. "12345678-1234-1234-1234-123456789012")

### Schritt 2: Ergebnisse mit Summary abrufen
```json
{
  "type": "summary",
  "id": "12345678-1234-1234-1234-123456789012"
}
```

**Response**: Kompakte Summary mit Scores + Top Issues (< 50KB)

## Vorteile
- Summary-Endpoint liefert nur kompakte Daten
- Vollständige Daten optional über Blob Storage
- MCP-Limit wird nicht überschritten
- Bessere Performance durch Caching
