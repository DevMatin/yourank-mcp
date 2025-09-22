# MCP Server Admin Frontend

Ein modernes React-basiertes Admin-Frontend zur Verwaltung Ihres DataForSEO MCP-Servers.

## 🚀 Features

### 📊 Dashboard
- Übersicht aller aktiven Module
- System-Status und Performance-Metriken
- Schnellzugriff auf wichtige Funktionen

### 🔧 API-Module Verwaltung
- Aktivieren/Deaktivieren von Modulen
- Konfiguration der Module-Parameter
- Status-Monitoring und Logs
- Neue Tools zu Modulen hinzufügen

### 📝 Schema-Editor
- Bearbeitung der YAML-Schemas
- Syntax-Highlighting und Validierung
- Versionierung und Backup
- Import/Export von Schema-Dateien

### 🧪 API-Test-Interface
- Testen aller verfügbaren Endpunkte
- Parameter-Eingabe mit Auto-Complete
- Response-Visualisierung
- Error-Handling und Debugging

### ⚙️ Konfigurations-Management
- Bearbeitung der field-config.json
- Umgebungsvariablen-Verwaltung
- API-Credentials-Management
- Backup und Wiederherstellung

## 🛠️ Technologie-Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **UI Components**: Headless UI + Heroicons
- **Code Editor**: Monaco Editor (VS Code im Browser)

## 📁 Projektstruktur

```
frontend/
├── src/
│   ├── components/          # Wiederverwendbare UI-Komponenten
│   │   ├── common/         # Allgemeine Komponenten
│   │   ├── ModuleManager/  # Module-Verwaltung
│   │   ├── SchemaEditor/   # Schema-Bearbeitung
│   │   ├── ApiTester/      # API-Testing
│   │   └── ConfigManager/  # Konfiguration
│   ├── pages/              # Hauptseiten
│   ├── services/           # API-Services
│   ├── types/              # TypeScript-Definitionen
│   ├── utils/              # Hilfsfunktionen
│   ├── hooks/              # Custom React Hooks
│   └── styles/             # Globale Styles
├── public/                 # Statische Dateien
├── docs/                   # Detaillierte Dokumentation
└── examples/               # Beispiel-Implementierungen
```

## 🚀 Installation

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn
- Zugriff auf Ihren MCP-Server

### Setup
```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build
npm run build

# Build testen
npm run preview
```

## 🔌 Konfiguration

### Umgebungsvariablen
Erstellen Sie eine `.env.local` Datei:

```env
VITE_MCP_SERVER_URL=http://localhost:3000
VITE_API_TIMEOUT=30000
VITE_ENABLE_DEBUG=true
```

### MCP Server Integration
Das Frontend verbindet sich über HTTP mit Ihrem MCP-Server und nutzt die vorhandenen Endpunkte für:
- Module-Status abrufen
- Schema-Dateien bearbeiten
- Konfigurationen aktualisieren
- API-Tests durchführen

## 📚 Detaillierte Dokumentation

- [Installation & Setup](./docs/INSTALLATION.md)
- [API-Integration](./docs/API_INTEGRATION.md)
- [Komponenten-Übersicht](./docs/COMPONENTS.md)
- [Schema-Editor Anleitung](./docs/SCHEMA_EDITOR.md)
- [Deployment](./docs/DEPLOYMENT.md)

## 🎯 Nächste Schritte

1. **Grundstruktur aufsetzen** - Basis-React-App mit Routing
2. **Module-Manager implementieren** - Verwaltung der API-Module
3. **Schema-Editor entwickeln** - YAML-Bearbeitung
4. **API-Tester erstellen** - Endpunkt-Testing
5. **Konfigurations-Manager** - Einstellungen verwalten
6. **Styling & UX** - Tailwind CSS und responsive Design

## 🤝 Beitragen

Dieses Frontend ist als Open-Source-Projekt konzipiert. Beiträge sind willkommen!

## 📄 Lizenz

Apache-2.0 (wie der MCP-Server)
