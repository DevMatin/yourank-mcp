# 🚀 DataForSEO MCP Server TypeScript

Ein leistungsstarker **Model Context Protocol (MCP) Server** für die DataForSEO API, entwickelt in TypeScript. Dieser Server fungiert als intelligenter "Übersetzer" zwischen AI-Assistenten (wie ChatGPT, Claude) und den verschiedenen SEO- und Marketing-Datenquellen von DataForSEO.

[![Version](https://img.shields.io/badge/version-2.7.12-blue.svg)](https://github.com/dataforseo/mcp-server-typescript)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D20.0.0-brightgreen.svg)](package.json)

## 📋 Was ist dieser MCP-Server?

Der **DataForSEO MCP Server** ist ein spezialisierter Server, der es AI-Assistenten ermöglicht, direkt auf über **12 verschiedene SEO- und Marketing-APIs** von DataForSEO zuzugreifen. Er übersetzt natürliche Sprache in präzise API-Aufrufe und strukturierte Daten zurück in verständliche Antworten.

### 🎯 Hauptzweck
- **SEO-Analysen**: Backlinks, Keywords, Rankings, On-Page SEO
- **Content-Optimierung**: Content-Analyse und KI-gestützte Inhaltserstellung  
- **Wettbewerbsanalyse**: SERP-Analysen, Domain-Vergleiche, Marktbeobachtung
- **E-Commerce**: Produktdaten, Merchant-Analysen, Shopping-Optimierung
- **App-Analysen**: App Store Performance, Downloads, Bewertungen
- **Social Media**: Social Media Monitoring und Analyse

## 🏗️ Architektur & Funktionsweise

### Kernkomponenten

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   AI-Assistent  │◄──►│   MCP Server     │◄──►│  DataForSEO API │
│ (ChatGPT/Claude) │    │  (TypeScript)    │    │   (12 Module)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Transport-Optionen

Der Server unterstützt **3 verschiedene Transport-Methoden**:

1. **📡 Stdio Transport** (Lokale Entwicklung)
   - Direkte Kommunikation über Standard-Ein-/Ausgabe
   - Ideal für lokale Tests und Claude Desktop

2. **🌐 Streamable HTTP Transport** (Production)
   - Moderne HTTP-basierte Kommunikation über **JSON-RPC 2.0**
   - Unterstützt GET/POST/DELETE Requests
   - Protokoll-Version: 2025-03-26
   - Endpoints: `/http` und `/mcp`

3. **📡 HTTP + SSE Transport** (Legacy Support)
   - Server-Sent Events für Echtzeit-Kommunikation
   - **JSON-RPC 2.0** über HTTP-POST zu `/messages`
   - Rückwärtskompatibilität für ältere Clients
   - Protokoll-Version: 2024-11-05

### Modulare Architektur

```
src/core/modules/
├── 📊 keywords-data/     # Keyword-Daten und Suchvolumen
├── 🔗 backlinks/         # Backlink-Analyse und Linkbuilding
├── 📄 onpage/            # On-Page SEO und Content-Analyse
├── 🔎 serp/              # Suchergebnisse und Rankings
├── 🏢 business-data-api/ # Geschäftsdaten und Unternehmen
├── 🛒 merchant/          # E-Commerce und Produktdaten
├── 📱 app-data/          # App Store Analytics
├── 🌐 domain-analytics/  # Domain- und Website-Analysen
├── ✍️ content-generation/ # KI-gestützte Inhaltserstellung
├── 📊 content-analysis/  # Content-Qualität und Optimierung
├── 🤖 ai-optimization/   # Automatisierte SEO-Optimierung
└── 🏪 google-business/   # Google My Business Daten
```

## 🚀 Schnellstart

### Voraussetzungen

- **Node.js** ≥ 20.0.0
- **DataForSEO Account** mit API-Zugangsdaten
- **AI-Assistent** (ChatGPT, Claude Desktop, etc.)

### Installation

```bash
# Repository klonen
git clone https://github.com/dataforseo/mcp-server-typescript.git
cd mcp-server-typescript

# Abhängigkeiten installieren
npm install

# Projekt kompilieren
npm run build
```

### Konfiguration

#### 1. Umgebungsvariablen setzen

```bash
# DataForSEO API-Zugangsdaten
export DATAFORSEO_USERNAME="your_username"
export DATAFORSEO_PASSWORD="your_password"

# Module aktivieren (optional, alle Module sind standardmäßig aktiviert)
export ENABLED_MODULES="keywords-data,backlinks,serp,onpage"

# Prompts aktivieren (optional)
export ENABLED_PROMPTS="serp_analysis,backlink_analysis"
```

#### 2. Claude Desktop Konfiguration

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "dataforseo": {
      "command": "node",
      "args": ["C:\\path\\to\\yourank-mcp\\build\\main\\main\\cli.js"],
      "env": {
        "DATAFORSEO_USERNAME": "your_username",
        "DATAFORSEO_PASSWORD": "your_password"
      }
    }
  }
}
```

### Server starten

```bash
# CLI-Modus (für Claude Desktop)
npm run cli

# HTTP-Server (für Web-Integration)
npm run sse

# Development-Modus mit Watch
npm run dev
```

## 💡 Praktische Beispiele

### Beispiel 1: Backlinks analysieren

**Ihr Prompt:**
```
"Analysiere die Backlinks von example.com und zeige mir die wichtigsten Referenzdomains"
```

**Was passiert:**
- Der Server verwendet die Backlinks API
- Sammelt alle Backlink-Daten automatisch
- Erstellt eine strukturierte Analyse mit Top-Referenzdomains

### Beispiel 2: Keywords recherchieren

**Ihr Prompt:**
```
"Finde Keywords für mein Restaurant in Berlin mit hohem Suchvolumen und niedriger Konkurrenz"
```

**Was passiert:**
- Der Server verwendet die Keywords Data API
- Sucht nach relevanten Keywords für Restaurants in Berlin
- Zeigt Suchvolumen, Konkurrenz und SEO-Schwierigkeit

### Beispiel 3: SERP-Analyse

**Ihr Prompt:**
```
"Analysiere die Top-10 Suchergebnisse für 'SEO Beratung München' und zeige mir die wichtigsten Konkurrenten"
```

**Was passiert:**
- Der Server verwendet die SERP API
- Sammelt alle Top-10 Ergebnisse
- Erstellt eine Wettbewerbsanalyse mit Domain-Übersicht

## 🔧 Verfügbare Tools & APIs

### Keywords Data API 🔍
- **Google Ads Search Volume**: Suchvolumen für Keywords
- **Google Trends**: Trend-Analysen und saisonale Muster
- **DataForSEO Trends**: Erweiterte Trend-Daten mit Demografie

### Backlinks API 🔗
- **Backlink-Analyse**: Vollständige Backlink-Übersicht
- **Referenzdomains**: Top-Linkquellen identifizieren
- **Wettbewerbsvergleich**: Backlink-Profile vergleichen
- **Spam-Score**: Linkqualität bewerten

### SERP API 🔎
- **Suchergebnisse**: Live SERP-Daten für alle Suchmaschinen
- **Ranking-Positionen**: Keyword-Rankings überwachen
- **Featured Snippets**: Snippet-Optimierung analysieren
- **Wettbewerbsanalyse**: SERP-Landschaft verstehen

### On-Page API 📄
- **Content-Analyse**: Text-Qualität und SEO-Optimierung
- **Technische SEO**: Meta-Tags, Struktur, Performance
- **Keyword-Dichte**: Optimale Keyword-Verteilung
- **Content-Gaps**: Verbesserungspotentiale identifizieren

### Business Data API 🏢
- **Unternehmensdaten**: Geschäftsinformationen sammeln
- **Wettbewerbsanalyse**: Konkurrenten identifizieren
- **Marktübersicht**: Branchen-Landschaft verstehen

### Content Generation API ✍️
- **KI-Content**: Automatische Inhaltserstellung
- **SEO-Texte**: Optimierte Artikel und Beschreibungen
- **Meta-Descriptions**: SEO-optimierte Meta-Texte

### Domain Analytics API 🌐
- **Technologie-Stack**: Verwendete Technologien identifizieren
- **Performance-Analyse**: Website-Geschwindigkeit bewerten
- **SSL & Security**: Sicherheitsstatus prüfen

### App Data API 📱
- **App Store Analytics**: Downloads, Bewertungen, Rankings
- **Performance-Metriken**: App-Performance analysieren
- **Wettbewerbsanalyse**: App-Markt verstehen

### Merchant API 🛒
- **Produktdaten**: E-Commerce-Produktinformationen
- **Preisvergleich**: Wettbewerbspreise analysieren
- **Produktoptimierung**: SEO für Produktseiten

### AI Optimization API 🤖
- **Automatisierte SEO**: KI-gestützte Optimierung
- **Content-Scoring**: Automatische Content-Bewertung
- **Performance-Prediction**: SEO-Performance vorhersagen

## 🔌 Kommunikation über HTTP/JSON-RPC

### JSON-RPC 2.0 Protokoll

Der MCP-Server kommuniziert über das **JSON-RPC 2.0 Protokoll** über HTTP. Dies ermöglicht eine standardisierte, zuverlässige Kommunikation zwischen AI-Assistenten und dem Server.

#### Request-Format

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "keywords_data_google_ads_search_volume",
    "arguments": {
      "keywords": ["SEO", "Marketing"],
      "location_code": 2276,
      "language_code": "de"
    }
  },
  "id": "unique-request-id"
}
```

#### Response-Format

```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\"tasks\":[{\"result\":[{\"keyword\":\"SEO\",\"search_volume\":12000}]}]}"
      }
    ]
  },
  "id": "unique-request-id"
}
```

#### Verfügbare Methoden

- **`tools/list`**: Liste aller verfügbaren Tools abrufen
- **`tools/call`**: Spezifisches Tool ausführen
- **`prompts/list`**: Liste aller verfügbaren Prompts abrufen
- **`prompts/get`**: Spezifischen Prompt abrufen

#### HTTP-Endpoints

**Streamable HTTP Transport:**
- `POST /http` - Hauptendpoint für JSON-RPC Requests
- `POST /mcp` - Alternative Endpoint für JSON-RPC Requests

**HTTP + SSE Transport:**
- `GET /sse` - SSE-Verbindung etablieren
- `POST /messages?sessionId=<id>` - JSON-RPC Requests über SSE

#### Authentifizierung

```bash
# Basic Authentication Header
Authorization: Basic <base64(username:password)>

# Oder Umgebungsvariablen
DATAFORSEO_USERNAME=your_username
DATAFORSEO_PASSWORD=your_password
```

#### Fehlerbehandlung

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32001,
    "message": "Authentication required. Provide DataForSEO credentials."
  },
  "id": "unique-request-id"
}
```

## 🔌 Integration mit AI-Assistenten

### Claude Desktop (Empfohlen) ✅

**Vorteile:**
- Native MCP-Unterstützung
- Einfache Konfiguration
- Sofort einsatzbereit
- Alle Tools verfügbar

**Setup:**
1. Claude Desktop herunterladen
2. Konfigurationsdatei erstellen (siehe oben)
3. Claude Desktop neu starten
4. Tools sind sofort verfügbar!

### ChatGPT (Experimentell) ⚠️

**Aktueller Status:**
- MCP-Support ist experimentell
- Erfordert spezielle Konfiguration
- Nicht alle Features verfügbar

**Workaround:**
- Verwenden Sie Claude Desktop für vollständige Funktionalität
- Oder warten Sie auf verbesserte ChatGPT MCP-Unterstützung

### Custom Integration 🔧

Der Server kann auch in eigene Anwendungen integriert werden:

```typescript
import { initMcpServer } from './src/main/init-mcp-server.js';

// Server initialisieren
const server = initMcpServer('username', 'password');

// Mit Transport verbinden
await server.connect(transport);
```

## 📊 Performance & Skalierung

### Optimierungen
- **Modulare Architektur**: Nur benötigte Module laden
- **Intelligentes Caching**: API-Antworten zwischenspeichern
- **Batch-Processing**: Mehrere Anfragen zusammenfassen
- **Rate Limiting**: API-Limits respektieren

### Monitoring
- **Logging**: Detaillierte Logs für Debugging
- **Error Handling**: Robuste Fehlerbehandlung
- **Health Checks**: Server-Status überwachen

## 🛠️ Entwicklung & Erweiterung

### Projektstruktur

```
yourank-mcp/
├── 📁 src/
│   ├── 📁 core/                    # Kernfunktionalitäten
│   │   ├── 📁 client/             # DataForSEO API-Client
│   │   ├── 📁 config/              # Konfiguration & Schemas
│   │   ├── 📁 modules/             # Alle API-Module
│   │   └── 📁 utils/               # Hilfsfunktionen
│   ├── 📁 main/                    # Hauptanwendung
│   └── 📁 worker/                  # Worker-Prozesse
├── 📁 docs/                        # Dokumentation
├── 📁 schemas/                      # OpenAPI-Schemas
├── 📁 config/                      # Konfigurationsdateien
└── 📁 examples/                    # Beispiel-Implementierungen
```

### Neue Module hinzufügen

1. **Modul-Verzeichnis erstellen:**
```bash
mkdir src/core/modules/neues-modul
```

2. **Modul-Klasse implementieren:**
```typescript
export class NeuesModul extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    return {
      'neues_tool': {
        description: 'Beschreibung des Tools',
        params: z.object({
          parameter: z.string()
        }),
        handler: async (params) => {
          // Tool-Logik implementieren
        }
      }
    };
  }
}
```

3. **Modul registrieren:**
```typescript
// In modules.config.ts
export const AvailableModules = {
  'neues-modul': NeuesModul
};
```

### Tests schreiben

```bash
# Tests ausführen
npm test

# Coverage-Report
npm run test:coverage
```

## 🔒 Sicherheit & Best Practices

### API-Sicherheit
- **Basic Authentication**: Sichere API-Zugangsdaten
- **Rate Limiting**: Schutz vor Missbrauch
- **Input Validation**: Zod-Schemas für alle Eingaben
- **Error Handling**: Sichere Fehlerbehandlung

### Deployment-Sicherheit
- **Environment Variables**: Sensible Daten nicht im Code
- **HTTPS**: Verschlüsselte Kommunikation
- **CORS**: Kontrollierte Cross-Origin-Requests
- **Logging**: Keine sensiblen Daten in Logs

## 📚 Dokumentation & Ressourcen

### Vollständige Dokumentation
- **[Einstiegsanleitung](docs/Erklärung/01-EINSTIEG-ANLEITUNG.md)**: Schritt-für-Schritt Anleitung
- **[API-Übersicht](docs/Erklärung/00-UEBERSICHT-ALLE-APIS.md)**: Alle verfügbaren APIs
- **[Schema-Aufbau](docs/Erklärung/02-SCHEMA-AUFBAU.md)**: Datenstrukturen verstehen
- **[Beispiel-Prompts](docs/Erklärung/03-BEISPIEL-PROMPTS.md)**: Praktische Anwendungen
- **[API-Referenz](docs/Erklärung/04-API-REFERENZ-DETAILS.md)**: Technische Details
- **[FAQ](docs/Erklärung/05-FAQ-HAEUFIGE-FRAGEN.md)**: Häufige Fragen
- **[Übungen](docs/Erklärung/06-PRAKTISCHE-UEBUNGEN.md)**: Praktische Übungen

### Test-Prompts
- **[MCP Server Test Prompts](docs/MCP_SERVER_TEST_PROMPTS.md)**: Umfassende Test-Suite
- **[ChatGPT Integration](docs/CHATGPT_MCP_INTEGRATION.md)**: ChatGPT-spezifische Anleitung

### Schemas & Konfiguration
- **[OpenAPI Schemas](schemas/)**: Vollständige API-Schemas
- **[Konfiguration](config/)**: Alle Konfigurationsdateien

## 🤝 Beitragen & Support

### Beitragen
1. Fork des Repositories erstellen
2. Feature-Branch erstellen (`git checkout -b feature/neues-feature`)
3. Änderungen committen (`git commit -am 'Neues Feature hinzufügen'`)
4. Branch pushen (`git push origin feature/neues-feature`)
5. Pull Request erstellen

### Support
- **GitHub Issues**: Bug-Reports und Feature-Requests
- **Dokumentation**: Vollständige Anleitungen in `docs/`
- **Beispiele**: Praktische Implementierungen in `examples/`

### Community
- **Discord**: Community-Support und Diskussionen
- **GitHub Discussions**: Technische Fragen und Ideen
- **Wiki**: Community-erstellte Dokumentation

## 📄 Lizenz

Dieses Projekt ist unter der **Apache-2.0 Lizenz** lizenziert. Siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- **DataForSEO** für die umfassende API-Plattform
- **Anthropic** für das Model Context Protocol
- **OpenAI** für die MCP-SDK
- **Community** für Feedback und Beiträge

## 🔗 Links

- **[DataForSEO API](https://dataforseo.com/)**: Offizielle API-Dokumentation
- **[Model Context Protocol](https://modelcontextprotocol.io/)**: MCP-Spezifikation
- **[Claude Desktop](https://claude.ai/download)**: Claude Desktop Download
- **[GitHub Repository](https://github.com/dataforseo/mcp-server-typescript)**: Source Code

---

**🚀 Bereit für SEO-Analysen der nächsten Generation? Starten Sie jetzt mit dem DataForSEO MCP Server!**
