# Konfiguration

Dieses Verzeichnis enthält alle Konfigurationsdateien für das MCP Server TypeScript Projekt.

## 📁 Dateien

### TypeScript-Konfiguration
- `tsconfig.json` - Hauptkonfiguration für TypeScript-Kompilierung
- `tsconfig.worker.json` - Spezielle Konfiguration für Worker-Prozesse

### Cloudflare Worker
- `wrangler.jsonc` - Konfiguration für Cloudflare Worker Deployment

### Beispiele
- `field-config.example.json` - Beispiel für Feld-Konfiguration (wenn vorhanden)

## 🔧 Verwendung

### TypeScript-Konfiguration

Die TypeScript-Konfigurationen sind bereits im `package.json` referenziert:

```json
{
  "scripts": {
    "build": "tsc -p config/tsconfig.json",
    "build:worker": "tsc -p config/tsconfig.worker.json"
  }
}
```

### Feld-Konfiguration

Für die Feld-Konfiguration siehe die Hauptdokumentation im `docs/` Verzeichnis.

## 📝 Anpassung

1. **TypeScript-Konfiguration anpassen**:
   - Bearbeite `tsconfig.json` für allgemeine Einstellungen
   - Bearbeite `tsconfig.worker.json` für Worker-spezifische Einstellungen

2. **Worker-Konfiguration anpassen**:
   - Bearbeite `wrangler.jsonc` für Cloudflare Worker Einstellungen

3. **Feld-Konfiguration erstellen**:
   - Kopiere `field-config.example.json` zu `field-config.json`
   - Passe die Felder nach deinen Bedürfnissen an 