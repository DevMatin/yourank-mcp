# Installation & Setup Guide

## Voraussetzungen

### Systemanforderungen
- **Node.js**: Version 18.0.0 oder höher
- **npm**: Version 8.0.0 oder höher (wird mit Node.js installiert)
- **Git**: Für das Klonen des Repositories
- **MCP Server**: Laufender DataForSEO MCP Server

### Überprüfung der Installation
```bash
# Node.js Version prüfen
node --version

# npm Version prüfen
npm --version

# Git Version prüfen
git --version
```

## Schritt-für-Schritt Installation

### 1. Repository klonen
```bash
# In das gewünschte Verzeichnis wechseln
cd /path/to/your/project

# Repository klonen (falls vorhanden)
git clone <repository-url>
cd mcp-server-typescript/frontend
```

### 2. Abhängigkeiten installieren
```bash
# Alle Abhängigkeiten installieren
npm install

# Oder mit Yarn (falls bevorzugt)
yarn install
```

### 3. Umgebungsvariablen konfigurieren
```bash
# .env.local Datei erstellen
cp .env.example .env.local

# Datei bearbeiten
nano .env.local
```

**Beispiel .env.local:**
```env
# MCP Server URL
VITE_MCP_SERVER_URL=http://localhost:3000

# API Timeout (in Millisekunden)
VITE_API_TIMEOUT=30000

# Debug-Modus aktivieren
VITE_ENABLE_DEBUG=true

# Entwicklungsumgebung
NODE_ENV=development
```

### 4. Entwicklungsserver starten
```bash
# Entwicklungsserver starten
npm run dev

# Oder mit Yarn
yarn dev
```

Der Server startet standardmäßig auf `http://localhost:3001`

### 5. Browser öffnen
Öffnen Sie Ihren Browser und navigieren Sie zu:
```
http://localhost:3001
```

## Konfiguration

### MCP Server Verbindung
Stellen Sie sicher, dass Ihr MCP Server läuft und auf dem konfigurierten Port erreichbar ist.

**Standard-Konfiguration:**
- **Port**: 3000
- **Protokoll**: HTTP
- **Host**: localhost

### Proxy-Einstellungen
Das Frontend ist so konfiguriert, dass alle API-Aufrufe an `/api/*` automatisch an Ihren MCP Server weitergeleitet werden.

**Vite Proxy-Konfiguration:**
```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

## Build & Deployment

### Produktions-Build erstellen
```bash
# TypeScript kompilieren und Build erstellen
npm run build

# Build testen
npm run preview
```

### Build-Verzeichnis
Nach dem Build befinden sich alle Dateien im `dist/` Verzeichnis.

### Deployment
```bash
# Statische Dateien auf Webserver kopieren
cp -r dist/* /path/to/webserver/

# Oder mit rsync
rsync -av dist/ user@server:/path/to/webserver/
```

## Fehlerbehebung

### Häufige Probleme

#### 1. Port bereits belegt
```bash
# Port 3001 ist bereits belegt
Error: listen EADDRINUSE: address already in use :::3001
```

**Lösung:**
```bash
# Anderen Port verwenden
npm run dev -- --port 3002

# Oder Port in vite.config.ts ändern
```

#### 2. MCP Server nicht erreichbar
```bash
# API-Fehler beim Laden der Module
Failed to fetch modules: Network Error
```

**Lösung:**
- MCP Server läuft? `curl http://localhost:3000/health`
- Firewall-Einstellungen prüfen
- Port 3000 ist freigegeben

#### 3. TypeScript-Kompilierungsfehler
```bash
# TypeScript-Fehler beim Build
Type error: Property 'x' does not exist on type 'y'
```

**Lösung:**
```bash
# TypeScript-Typen prüfen
npm run type-check

# Linter-Fehler beheben
npm run lint:fix
```

#### 4. Abhängigkeiten-Probleme
```bash
# Module nicht gefunden
Cannot find module 'react'
```

**Lösung:**
```bash
# node_modules löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
```

## Entwicklung

### Verfügbare Scripts
```bash
# Entwicklung
npm run dev          # Entwicklungsserver starten
npm run build        # Produktions-Build erstellen
npm run preview      # Build testen

# Code-Qualität
npm run lint         # ESLint ausführen
npm run lint:fix     # ESLint-Fehler automatisch beheben
npm run type-check   # TypeScript-Typen prüfen

# Abhängigkeiten
npm run update       # Abhängigkeiten aktualisieren
```

### Hot Reload
Das Frontend unterstützt Hot Reload - Änderungen werden automatisch im Browser aktualisiert.

### Debug-Modus
```bash
# Debug-Logs aktivieren
VITE_ENABLE_DEBUG=true npm run dev
```

## Nächste Schritte

Nach der erfolgreichen Installation können Sie:

1. **Dashboard erkunden** - Übersicht über alle Module und Metriken
2. **Module verwalten** - Module aktivieren/deaktivieren und konfigurieren
3. **Schemas bearbeiten** - YAML-Schemas direkt im Browser bearbeiten
4. **API testen** - Endpunkte und Tools testen
5. **Konfiguration anpassen** - Server-Einstellungen verwalten

## Support

Bei Problemen oder Fragen:

1. **Logs prüfen** - Browser-Entwicklertools und Terminal-Ausgabe
2. **Dokumentation** - Weitere Guides in `/docs/`
3. **Issues** - GitHub Issues für Bug-Reports
4. **Community** - Diskussionsforum für Hilfe

## Updates

### Frontend aktualisieren
```bash
# Änderungen abrufen
git pull origin main

# Abhängigkeiten aktualisieren
npm install

# Neustart
npm run dev
```

### Abhängigkeiten aktualisieren
```bash
# Alle Abhängigkeiten auf neueste Version
npm update

# Spezifische Pakete
npm update react react-dom
```
