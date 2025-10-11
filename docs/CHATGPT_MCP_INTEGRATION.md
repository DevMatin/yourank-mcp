# 🤖 ChatGPT MCP Integration Guide

## ⚠️ Wichtiges Problem

Ihr MCP-Server verwendet **MCP SDK Version 1.4.0**, die die alte API mit `server.tool()` verwendet. ChatGPT erwartet jedoch die **neue MCP Protocol Version** mit `tools/call` und `tools/list` Methoden.

## 🔧 Lösung: Zwei Optionen

### Option 1: Stdio Transport (Empfohlen für lokale Entwicklung)

ChatGPT kann über **Stdio Transport** mit Ihrem MCP-Server kommunizieren. Dies ist die einfachste Lösung für lokale Tests.

#### Setup:

1. **MCP Server lokal starten:**
   ```bash
   npm run cli
   ```

2. **In ChatGPT konfigurieren:**
   - MCP Server Type: `stdio`
   - Command: `node`
   - Args: `["path/to/yourank-mcp/build/main/main/cli.js"]`
   - Environment: 
     ```json
     {
       "DATAFORSEO_USERNAME": "your_username",
       "DATAFORSEO_PASSWORD": "your_password"
     }
     ```

### Option 2: HTTP Transport mit Vercel (Für Production)

**Problem:** Die aktuelle HTTP-Implementierung ist nicht kompatibel mit ChatGPT's erwarteter API.

**Lösung:** Sie müssen die MCP SDK auf eine neuere Version aktualisieren, die `setRequestHandler` unterstützt, ODER einen Custom Middleware-Layer erstellen, der die alte API in die neue übersetzt.

## 🚀 Empfohlener Workflow

### Für lokale Entwicklung und Tests:

1. **Verwenden Sie Stdio Transport** für direkte ChatGPT-Integration
2. **Oder verwenden Sie Claude Desktop** mit MCP Server-Konfiguration

### Für Production Deployment:

1. **Aktualisieren Sie die MCP SDK** auf eine Version, die `setRequestHandler` unterstützt
2. **Oder erstellen Sie einen Custom API Gateway**, der die Anfragen übersetzt

## 📝 Claude Desktop Konfiguration (Alternative zu ChatGPT)

Claude Desktop hat native MCP-Support und funktioniert perfekt mit Ihrem Server:

**Konfigurationsdatei:** `%APPDATA%\Claude\claude_desktop_config.json` (Windows)

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

## 🔍 Warum funktioniert ChatGPT nicht direkt?

### ChatGPT erwartet:

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "keywords_data_google_ads_search_volume",
    "arguments": {
      "keywords": ["SEO", "Marketing"]
    }
  }
}
```

### Ihr Server unterstützt:

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "keywords_data_google_ads_search_volume",
    "arguments": {
      "keywords": ["SEO", "Marketing"]
    }
  }
}
```

**Das Problem:** Die MCP SDK Version 1.4.0 hat keine `setRequestHandler` Methode, um diese Anfragen zu verarbeiten. Die SDK registriert Tools intern, aber ChatGPT kann sie nicht über HTTP aufrufen.

## ✅ Sofort-Lösung

**Verwenden Sie Claude Desktop** anstelle von ChatGPT - es hat native MCP-Support und funktioniert perfekt mit Ihrem Server!

1. **Claude Desktop herunterladen:** https://claude.ai/download
2. **Konfiguration hinzufügen** (siehe oben)
3. **Claude Desktop neu starten**
4. **Tools sind sofort verfügbar!**

## 🔄 Langfristige Lösung für ChatGPT

Wenn Sie unbedingt ChatGPT verwenden möchten, müssen Sie:

1. **Custom API Gateway erstellen**, der die Anfragen übersetzt:
   - ChatGPT sendet `tools/call` → Gateway → Ihr MCP Server
   - Gateway übersetzt die Anfrage in das Format, das Ihr Server versteht

2. **Oder MCP SDK komplett aktualisieren** auf eine neuere Version mit `setRequestHandler` Support

## 📊 Vergleich

| Feature | Claude Desktop | ChatGPT |
|---------|----------------|---------|
| MCP Support | ✅ Native | ⚠️ Experimentell |
| Stdio Transport | ✅ | ✅ |
| HTTP Transport | ✅ | ❌ (erfordert neue SDK) |
| Setup-Aufwand | ⭐ Niedrig | ⭐⭐⭐ Hoch |
| Funktioniert jetzt | ✅ | ❌ |

## 🎯 Empfehlung

**Für sofortige Nutzung:** Verwenden Sie **Claude Desktop** mit MCP-Konfiguration.

**Für ChatGPT:** Warten Sie auf eine neuere MCP SDK Version oder erstellen Sie einen Custom Gateway.

## 🔗 Weitere Ressourcen

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Claude Desktop MCP Guide](https://docs.anthropic.com/claude/docs/mcp)
- [Ihr Test-Prompts Guide](./MCP_SERVER_TEST_PROMPTS.md)

