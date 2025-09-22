# 🏗️ Schema-Aufbau verstehen - Einfach erklärt!

## 🤔 Was ist ein Schema?

Ein **Schema** ist wie ein **"Bauplan"** oder eine **"Anleitung"**, die dem MCP-Server erklärt:
- Welche Daten er sammeln kann
- Wie diese Daten strukturiert sind
- Was Sie damit machen können

**💡 Einfacher Vergleich**: Ein Schema ist wie eine Speisekarte in einem Restaurant - sie zeigt Ihnen, was verfügbar ist und wie es beschrieben wird.

## 🏛️ Wie ist das Schema aufgebaut?

### **1. Hauptkategorien (API-Module)**
```
📁 API-Module
├── 📱 App Data
├── 🔗 Backlinks  
├── 🏢 Business Data
├── 📊 Content Analysis
├── ✍️ Content Generation
├── 🌐 Domain Analytics
├── 🔍 Keywords Data
├── 🛒 Merchant
├── 📄 On-Page
├── 🔎 SERP
└── 🤖 AI Optimization
```

### **2. Unterkategorien (Tools)**
Jedes API-Modul hat verschiedene **"Tools"** - das sind die spezifischen Funktionen:

**Beispiel Backlinks API:**
```
🔗 Backlinks API
├── 📊 backlinks_analysis (Backlink-Analyse)
├── 🎯 backlinks_anchors (Anker-Text Analyse)
├── 📈 backlinks_bulk (Massenanalyse)
├── 🔍 backlinks_competitors (Wettbewerbsanalyse)
└── 📋 backlinks_summary (Zusammenfassung)
```

### **3. Datenfelder (Fields)**
Jedes Tool hat spezifische **Datenfelder**, die es sammeln kann:

**Beispiel Backlinks-Analyse:**
```
📊 backlinks_analysis
├── target (Ziel-Website)
├── limit (Anzahl der Ergebnisse)
├── offset (Startposition)
├── filters (Filteroptionen)
└── order_by (Sortierung)
```

## 🎯 Wie funktioniert das in der Praxis?

### **Schritt 1: Sie geben einen Wunsch ein**
```
"Ich möchte die Backlinks von example.com analysieren"
```

### **Schritt 2: Der Server wählt das passende Tool**
- **API-Modul**: Backlinks API
- **Tool**: backlinks_analysis
- **Benötigte Felder**: target (example.com)

### **Schritt 3: Der Server sammelt die Daten**
- Ruft die Backlinks API auf
- Sammelt alle verfügbaren Daten
- Strukturiert sie nach dem Schema

### **Schritt 4: Sie erhalten strukturierte Ergebnisse**
```
📊 Backlinks-Analyse für example.com
├── 🔗 Anzahl der Backlinks: 1,247
├── ⭐ Durchschnittliche Domain Authority: 45
├── 🎯 Top Backlink-Quellen: 10
└── 📈 Qualitätsbewertung: Gut
```

## 🔍 Wie lesen Sie ein Schema?

### **Schema-Beispiel (vereinfacht):**
```yaml
# Backlinks Analysis Tool
backlinks_analysis:
  description: "Analysiert Backlinks einer Website"
  inputSchema:
    target:
      type: "string"
      description: "Website-URL (z.B. example.com)"
      required: true
    limit:
      type: "number"
      description: "Maximale Anzahl Ergebnisse"
      default: 100
    filters:
      type: "object"
      description: "Filteroptionen für die Ergebnisse"
```

### **Was bedeutet das?**
- **`target`**: Sie MÜSS eine Website-URL angeben
- **`limit`**: Optional - wie viele Ergebnisse Sie wollen
- **`filters`**: Optional - können Sie weglassen

## 🛠️ Praktische Anwendung

### **Einfache Anfrage:**
```
"Analysiere die Backlinks von meiner Website"
```
**Server verwendet**: `target` (Ihre Website) + Standardwerte für andere Felder

### **Detaillierte Anfrage:**
```
"Analysiere die Backlinks von meiner Website, zeige mir die Top 50 und filtere nach hoher Qualität"
```
**Server verwendet**: 
- `target` (Ihre Website)
- `limit` (50)
- `filters` (Qualitätsfilter)

## 🎨 Schema-Visualisierung

### **Hierarchie verstehen:**
```
📁 MCP-Server
└── 📁 API-Module
    └── 📁 Backlinks API
        └── 🛠️ Tools
            └── 📊 backlinks_analysis
                └── 📋 Datenfelder
                    ├── target (erforderlich)
                    ├── limit (optional)
                    └── filters (optional)
```

## 🔑 Wichtige Schema-Begriffe

### **Erforderliche Felder:**
- **`required: true`** = Sie MÜSS das angeben
- **Beispiel**: Website-URL bei Backlink-Analyse

### **Optionale Felder:**
- **`required: false`** = Sie können das weglassen
- **Beispiel**: Anzahl der Ergebnisse (Standard: 100)

### **Standardwerte:**
- **`default: 100`** = Wenn Sie nichts angeben, wird 100 verwendet
- **Beispiel**: Limit bei Backlink-Analysen

## 💡 Tipps für den Umgang mit Schemas

### ✅ **Das sollten Sie wissen:**
- **Erforderliche Felder** sind wichtig - geben Sie diese immer an
- **Optionale Felder** können Sie weglassen
- **Standardwerte** sind bereits sinnvoll eingestellt

### ❌ **Das müssen Sie NICHT verstehen:**
- Technische Details der API-Aufrufe
- JSON-Struktur der Daten
- HTTP-Statuscodes
- Authentifizierungsmethoden

## 🎯 Nächste Schritte

1. **Verstehen Sie die Grundstruktur** (API → Tools → Felder)
2. **Schauen Sie sich praktische Beispiele an** (siehe "BEISPIEL-PROMPTS.md")
3. **Experimentieren Sie mit einfachen Anfragen**
4. **Lassen Sie sich von den Ergebnissen überraschen**

---

**💡 Wichtig**: Das Schema ist wie eine Landkarte - es zeigt Ihnen, was möglich ist, aber Sie müssen nicht alle Details verstehen. Der MCP-Server navigiert für Sie!
