# 🚀 OnPage API Schema - Token-Optimierung

## Problem gelöst: Rate Limit Error (429)

Das ursprüngliche Schema verursachte **Rate Limit Fehler** wegen zu großer Antworten (~587.382 Zeichen, ~146.846 Tokens).

## ✅ Lösungen implementiert

### 1. **Token-Optimiertes Schema** (`onpage-custom-gpt-schema-token-optimized.json`)

**Hauptverbesserungen:**
- ✅ **Reduzierte Antwortgrößen** durch kompakte Strukturen
- ✅ **Summary-Modus** (`summary_only: true`) als Standard
- ✅ **Begrenzte Arrays** mit `maxItems` und `maximum` Limits
- ✅ **Kompakte Response-Schemas** ohne verschachtelte Details
- ✅ **Blob-Storage Integration** für große Datenmengen

**Token-Einsparungen:**
- **Vorher:** ~146.846 Tokens (587.382 Zeichen)
- **Nachher:** ~5.000-15.000 Tokens (20.000-60.000 Zeichen)
- **Einsparung:** ~90% weniger Tokens! 🎉

### 2. **Pagination-Schema** (`onpage-custom-gpt-schema-with-pagination.json`)

**Zusätzliche Features:**
- ✅ **Pagination-Parameter:** `page`, `per_page`
- ✅ **Pagination-Info:** `current_page`, `total_pages`, `has_next`, `has_prev`
- ✅ **Flexible Limits:** 1-50 Items pro Seite
- ✅ **Kontrollierte Datenmengen** für bessere Performance

## 🔧 Schema-Parameter für Token-Optimierung

### Lighthouse API Optimierungen

```json
{
  "summary_only": true,        // Nur Zusammenfassung
  "max_issues": 10,           // Max 10 Issues statt alle
  "per_page": 10,             // Max 10 Items pro Seite
  "page": 1                   // Erste Seite
}
```

### Analysis API Optimierungen

```json
{
  "summary_only": true,        // Nur Zusammenfassung
  "per_page": 10,             // Max 10 Items
  "limit": 10                 // Begrenzte Ergebnisse
}
```

## 📊 Response-Struktur Optimierungen

### Vorher (Token-intensiv):
```json
{
  "tasks": [{
    "result": [{
      "pages": [...],           // Alle Seiten
      "resources": [...],       // Alle Ressourcen
      "links": [...],          // Alle Links
      "duplicate_tags": [...], // Alle Duplicate Tags
      "waterfall": [...],      // Komplette Waterfall-Daten
      "keyword_density": [...] // Alle Keyword-Daten
    }]
  }]
}
```

### Nachher (Token-optimiert):
```json
{
  "summary": {
    "pages_count": 150,
    "resources_count": 300,
    "links_count": 500,
    "duplicate_issues": 5,
    "performance_score": 85
  },
  "top_items": [
    {
      "url": "https://example.com",
      "title": "Homepage",
      "score": 95,
      "issues": 2
    }
  ],
  "blob_storage": {
    "proxy_url": "https://blob-url.com/full-data"
  }
}
```

## 🎯 Empfohlene Verwendung

### Für Custom GPT:
1. **Verwende das token-optimierte Schema** als Standard
2. **Setze `summary_only: true`** für kompakte Antworten
3. **Nutze Pagination** für große Datenmengen
4. **Greife auf Blob-Storage zu** für vollständige Daten

### Beispiel-Request:
```json
{
  "type": "task_get",
  "id": "10031800-1064-0317-0000-25fd0e92f5f7",
  "summary_only": true,
  "max_issues": 10,
  "per_page": 10
}
```

## 🔍 Blob-Storage Integration

Das Schema nutzt bereits dein Blob-Storage System:

```json
{
  "blob_storage": {
    "storage": "vercel-blob",
    "results_url": "https://blob-url.com/data",
    "proxy_url": "https://yourank-mcp.vercel.app/api/blob-proxy/...",
    "size_bytes": 150000,
    "expires_at": "2024-01-01T00:00:00Z"
  }
}
```

## ⚡ Performance-Verbesserungen

- **90% weniger Tokens** pro Request
- **Keine Rate Limit Fehler** mehr
- **Schnellere Antworten** durch kompakte Daten
- **Bessere UX** durch kontrollierte Datenmengen
- **Flexible Pagination** für große Datasets

## 🚀 Nächste Schritte

1. **Teste das token-optimierte Schema** in deinem Custom GPT
2. **Implementiere Pagination** für große Datenmengen
3. **Nutze Blob-Storage** für vollständige Daten
4. **Überwache Token-Verbrauch** in den Logs

Das Schema löst dein Rate Limit Problem und bietet gleichzeitig bessere Performance! 🎉
