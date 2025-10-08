# MCP Server TypeScript

Ein moderner MCP (Model Context Protocol) Server für DataForSEO APIs, entwickelt in TypeScript.

## 📁 Projektstruktur

```
mcp-server-typescript/
├── 📁 src/                          # Quellcode
│   ├── 📁 core/                     # Kernfunktionalitäten
│   │   ├── 📁 client/              # DataForSEO API-Client
│   │   ├── 📁 config/              # Konfiguration & Tool-Definitionen
│   │   ├── 📁 modules/             # Alle API-Module (MCP-Tools)
│   │   │   ├── 📁 serp/               # SERP APIs (alle Suchmaschinen)
│   │   │   ├── 📁 keywords-data/   # Keyword-Daten APIs
│   │   │   ├── 📁 onpage/          # On-Page SEO APIs
│   │   │   ├── 📁 domain-analytics/ # Domain-Analyse APIs
│   │   │   ├── 📁 content-analysis/ # Content-Analyse APIs
│   │   │   ├── 📁 content-generation/ # Content-Generierung APIs
│   │   │   ├── 📁 business-data-api/ # Business-Daten APIs
│   │   │   ├── 📁 merchant/        # Merchant/E-Commerce APIs
│   │   │   ├── 📁 google-shopping/ # Google Shopping APIs
│   │   │   ├── 📁 dataforseo-labs/ # DataForSEO Labs APIs
│   │   │   ├── 📁 backlinks/       # Backlink-Analyse APIs
│   │   │   ├── 📁 app-data/        # App-Store-Daten APIs
│   │   │   ├── 📁 social-media-api/ # Social Media APIs
│   │   │   ├── 📁 tripadvisor-api/ # TripAdvisor APIs
│   │   │   ├── 📁 trustpilot-api/  # Trustpilot APIs
│   │   │   └── 📁 ai-optimization/ # KI-Optimierung APIs
│   │   └── 📁 utils/               # Hilfsfunktionen
│   ├── 📁 main/                    # Hauptanwendung & HTTP-Server
│   └── 📁 worker/                  # Worker-Prozesse
├── 📁 api/                          # YAML-Schemas & API-Definitionen
│   ├── 📁 schemas/                 # TypeScript-Schemas
│   ├── 📁 serp/                    # SERP API Schemas
│   ├── 📁 keywords_data/           # Keyword-Daten Schemas
│   ├── 📁 on_page/                 # On-Page API Schemas
│   ├── 📁 domain_analytics/        # Domain-Analytics Schemas
│   ├── 📁 content_analysis/        # Content-Analysis Schemas
│   ├── 📁 content_generation/      # Content-Generation Schemas
│   ├── 📁 business_data/           # Business-Data Schemas
│   ├── 📁 merchant/                # Merchant API Schemas
│   ├── 📁 backlinks/               # Backlinks API Schemas
│   ├── 📁 app_data/                # App-Data API Schemas
│   └── 📁 labs/                    # DataForSEO Labs Schemas
├── 📁 custom-gpt/                   # Custom GPT Integration
│   ├── 📁 general/                 # Allgemeine API-Integration
│   ├── 📁 serp/                    # SERP API GPT-Integration
│   ├── 📁 keywords-data/           # Keyword-Daten GPT-Integration
│   ├── 📁 onpage/                  # On-Page GPT-Integration
│   ├── 📁 domain-analytics/        # Domain-Analytics GPT-Integration
│   ├── 📁 content-analysis/        # Content-Analysis GPT-Integration
│   ├── 📁 content-generation/      # Content-Generation GPT-Integration
│   ├── 📁 business-data/           # Business-Data GPT-Integration
│   ├── 📁 merchant/                # Merchant GPT-Integration
│   └── 📁 backlinks/               # Backlinks GPT-Integration
├── 📁 docs/                         # API-Dokumentation
│   ├── 📁 gpt_database/            # GPT-Prompt-Engineering
│   ├── 📁 prompt_examples/         # Beispiel-Prompts
│   ├── 📁 schema/                  # OpenAPI-Schemas
│   ├── 01_SERP_API.md              # SERP API Dokumentation
│   ├── 02_Keyword_Data_API.md      # Keyword Data API Dokumentation
│   ├── 03_On_Page_API.md           # On-Page API Dokumentation
│   ├── 04_Domain_Analytics_API.md  # Domain Analytics API Dokumentation
│   ├── 05_Content_Analysis_API.md  # Content Analysis API Dokumentation
│   ├── 06_Content_Generation_API.md # Content Generation API Dokumentation
│   ├── 07_Business_Data_API.md     # Business Data API Dokumentation
│   ├── 08_Merchant_API.md          # Merchant API Dokumentation
│   └── 09_Google_Shopping_API.md   # Google Shopping API Dokumentation
├── 📁 examples/                     # Code-Beispiele & Tests
│   ├── 📁 api-integration/         # API-Integrationsbeispiele
│   ├── 📁 keyword-research/        # Keyword-Recherche Beispiele
│   ├── 📁 serp-analysis/           # SERP-Analyse Beispiele
│   └── 📁 content-optimization/    # Content-Optimierung Beispiele
├── 📁 tests/                        # Test-Dateien & Ergebnisse
├── 📁 scripts/                      # Build- & Deployment-Scripts
├── 📁 config/                       # Konfigurationsdateien
│   ├── tsconfig.json               # TypeScript-Konfiguration
│   ├── field-config.example.json   # Feld-Konfiguration
│   └── wrangler.jsonc              # Cloudflare Workers Konfiguration
├── 📁 build/                        # Kompilierte Dateien (wird generiert)
├── 📄 package.json                  # Projekt-Konfiguration
├── 📄 vercel.json                   # Vercel-Deployment-Konfiguration
└── 📄 Dockerfile                    # Docker-Container-Konfiguration
```

## 🚀 Schnellstart

### Voraussetzungen

- Node.js 18+ 
- npm oder yarn

### Installation

```bash
# Repository klonen
git clone <repository-url>
cd mcp-server-typescript

# Abhängigkeiten installieren
npm install

# Projekt kompilieren
npm run build

# MCP-Server starten
npm start

# Oder HTTP-Server starten
npm run start:http
```

### Konfiguration

1. Erstelle eine `.env` Datei im Root-Verzeichnis:
```env
DATAFORSEO_USERNAME=your_username
DATAFORSEO_PASSWORD=your_password
ENABLED_MODULES=SERP,KEYWORDS_DATA,ONPAGE,DATAFORSEO_LABS,BACKLINKS,BUSINESS_DATA,DOMAIN_ANALYTICS
DATAFORSEO_FULL_RESPONSE=false
```

2. Oder verwende die Konfigurationsdatei `config/field-config.example.json`

## 📚 MCP-Server Module

### SERP APIs (Suchmaschinen-Ergebnisse)
- **Google SERP**: Organische & AI-Mode Suchergebnisse
- **Bing SERP**: Bing-Suchergebnisse
- **YouTube SERP**: YouTube-Suchergebnisse
- **Allgemeine SERP**: Multi-Platform SERP-Daten

### Core SEO APIs
- **Keywords Data**: Keyword-Volumen, Trends, Wettbewerb
- **On-Page**: SEO-Analysen, Lighthouse, Content-Parsing
- **Domain Analytics**: Technologie-Erkennung, WHOIS-Daten

### Content APIs
- **Content Analysis**: Sentiment-Analyse, Phrase-Trends
- **Content Generation**: KI-gestützte Content-Erstellung
- **AI Optimization**: KI-basierte SEO-Optimierung

### Business & Commerce APIs
- **Business Data**: Google Business, Unternehmensdaten
- **Merchant**: Amazon-Produkte, Verkäufer-Daten
- **Google Shopping**: Shopping-SERP, bezahlte Anzeigen

### Advanced APIs
- **DataForSEO Labs**: Experimentelle Features & Tools
- **Backlinks**: Backlink-Analyse, Anker-Texte
- **App Data**: App Store-Daten & Analytics

## 🧪 Tests

```bash
# Alle Tests ausführen
npm test

# Spezifische Tests
node tests/test-mcp-server.js
node tests/test-tool.js

# Debug-Tests
node debug/debug-content-analysis-only.js
```

## 📖 Dokumentation

### API-Dokumentation
Detaillierte API-Dokumentation findest du im `docs/` Verzeichnis:

- [SERP API](docs/01_SERP_API.md)
- [Keyword Data API](docs/02_Keyword_Data_API.md)
- [On-Page API](docs/03_On_Page_API.md)
- [Domain Analytics API](docs/04_Domain_Analytics_API.md)
- [Content Analysis API](docs/05_Content_Analysis_API.md)
- [Content Generation API](docs/06_Content_Generation_API.md)
- [Business Data API](docs/07_Business_Data_API.md)
- [Merchant API](docs/08_Merchant_API.md)
- [Google Shopping API](docs/09_Google_Shopping_API.md)

### Custom GPT Integration
- [API-Integration Anleitung](custom-gpt/general/API-INTEGRATION-ANLEITUNG.md)
- [GPT-Prompt-Engineering](docs/gpt_database/)
- [Beispiel-Prompts](docs/prompt_examples/)

## 🔧 Entwicklung

### Build-Prozess

```bash
# TypeScript kompilieren
npm run build

# Development-Modus
npm run dev

# Worker kompilieren
npm run build:worker

# JavaScript-Dateien reparieren
node fix-js-files.js
```

### Code-Struktur

- **Modulare MCP-Architektur**: Jede API ist in einem separaten MCP-Modul organisiert
- **TypeScript**: Vollständige Typisierung für bessere Entwicklererfahrung
- **MCP-Protokoll**: Standardkonforme Implementierung des Model Context Protocol
- **YAML-Schemas**: Strukturierte API-Definitionen für alle Module

### MCP-Server Features

- **Tool-basierte Architektur**: Jede API-Funktion ist als MCP-Tool implementiert
- **Dynamische Modul-Ladung**: Module werden zur Laufzeit geladen
- **Konfigurierbare Felder**: Flexible Feld-Auswahl für alle API-Aufrufe
- **HTTP & MCP-Modi**: Unterstützt sowohl HTTP-Server als auch MCP-Protokoll

## 🚀 Deployment

### Vercel
```bash
# Vercel-Deployment
vercel --prod
```

### Docker
```bash
# Docker-Container bauen
docker build -t mcp-server-typescript .

# Container starten
docker run -p 3000:3000 mcp-server-typescript
```

### Cloudflare Workers
```bash
# Worker deployen
wrangler deploy
```

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE](LICENSE) für Details.

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add some amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📞 Support

Bei Fragen oder Problemen:
- Erstelle ein Issue im GitHub Repository
- Konsultiere die Dokumentation im `docs/` Verzeichnis
- Überprüfe die Beispiele im `examples/` Verzeichnis
- Schaue in die Custom GPT Integration Dokumentation

## 🔗 Nützliche Links

- [DataForSEO API Dokumentation](https://dataforseo.com/apis)
- [MCP (Model Context Protocol) Spezifikation](https://modelcontextprotocol.io/)
- [TypeScript Dokumentation](https://www.typescriptlang.org/)