# ChatGPT Prompt Engineer Guide - Content Generation API Dokumentation

## 🎯 **Ziel**
Diese Dokumentation dient als **Wissensdatenbank** für ChatGPT als Prompt Engineer, um präzise und effektive Prompts für die Content Generation zu erstellen.

## 📋 **Content Generation Schema Übersicht**

### **🎯 Einheitliches Schema für KI-Systeme**
```json
{
  "name": "content_generation_complete_analysis",
  "description": "Vollständige Content Generation mit intelligenter API-Auswahl",
  "version": "1.0.0",
  "parameters": {
    "generation_request": "string (required) - Benutzeranfrage für Content Generation",
    "target": "string (required) - Topic, Text oder Keyword für Content-Erstellung",
    "content_type": "enum (optional) - Art des zu generierenden Contents",
    "language_code": "string (default: en) - Sprachcode",
    "creativity_index": "number (optional) - Kreativitätsindex (0-1)",
    "word_count": "number (optional) - Gewünschte Wortanzahl",
    "custom_settings": "object (optional)"
  }
}
```

## 🚀 **Verfügbare Content Generation APIs (12 APIs)**

### **🔧 Content Optimization APIs (2 APIs)**
- **`content_generation_generate_meta_tags_live`** - Generate Meta Tags Live
- **`content_generation_generate_sub_topics_live`** - Generate Sub Topics Live

### **📊 Text Analysis APIs (2 APIs)**
- **`content_generation_text_summary_live`** - Text Summary Live
- **`content_generation_text_summary_languages`** - Text Summary Languages

### **✍️ Text Generation APIs (2 APIs)**
- **`content_generation_generate_live`** - Generate Live
- **`content_generation_generate_text_live`** - Generate Text Live

### **🔄 Text Processing APIs (4 APIs)**
- **`content_generation_paraphrase_live`** - Paraphrase Live
- **`content_generation_check_grammar_live`** - Check Grammar Live
- **`content_generation_check_grammar_languages`** - Check Grammar Languages
- **`content_generation_grammar_rules`** - Grammar Rules

## 🎯 **Intelligente API-Auswahl-Logik**

### **🔍 Keyword-basierte Auswahl**
```javascript
"selection_logic": {
  "content_optimization_keywords": ["meta tags", "meta description", "meta title", "seo", "seo optimization", "sub topics", "subtopics", "content structure"],
  "text_analysis_keywords": ["text analysis", "text summary", "readability", "text statistics", "keyword analysis", "language detection", "text metrics"],
  "text_generation_keywords": ["text generation", "content generation", "ai writing", "text creation", "content creation", "ai content", "generate text"],
  "text_processing_keywords": ["paraphrase", "paraphrasierung", "grammar check", "grammatik prüfung", "grammar rules", "grammatik regeln", "text processing"],
  "meta_tags_keywords": ["meta tags", "meta title", "meta description", "meta keywords", "seo meta", "html meta", "search engine meta"],
  "sub_topics_keywords": ["sub topics", "subtopics", "content outline", "content structure", "topic breakdown", "content planning", "content organization"],
  "summary_keywords": ["summary", "zusammenfassung", "text summary", "content summary", "overview", "übersicht"],
  "languages_keywords": ["languages", "sprachen", "language support", "sprachunterstützung", "multilingual", "mehrsprachig"],
  "grammar_keywords": ["grammar", "grammatik", "grammar check", "grammatik prüfung", "grammar rules", "grammatik regeln"],
  "paraphrase_keywords": ["paraphrase", "paraphrasierung", "rewrite", "umschreiben", "rephrase", "neu formulieren"],
  "live_keywords": ["live", "real-time", "live data", "aktuelle daten", "live generation", "live analysis"]
}
```

## 📝 **Prompt Engineering Guidelines**

### **🎯 Struktur für Content Generation Prompts**

#### **1. Einführung und Kontext**
```
Du bist ein Content Generation-Experte mit Zugriff auf 12 verschiedene DataForSEO Content Generation APIs.
Deine Aufgabe ist es, basierend auf der Benutzeranfrage die passende API auszuwählen und eine detaillierte Content-Generation durchzuführen.
```

#### **2. API-Auswahl-Logik**
```
Verfügbare APIs:
1. content_generation_generate_meta_tags_live - Generate Meta Tags Live
2. content_generation_generate_sub_topics_live - Generate Sub Topics Live
3. content_generation_text_summary_live - Text Summary Live
4. content_generation_text_summary_languages - Text Summary Languages
5. content_generation_generate_live - Generate Live
6. content_generation_generate_text_live - Generate Text Live
7. content_generation_paraphrase_live - Paraphrase Live
8. content_generation_check_grammar_live - Check Grammar Live
9. content_generation_check_grammar_languages - Check Grammar Languages
10. content_generation_grammar_rules - Grammar Rules
```

#### **3. Auswahl-Kriterien**
```
Wähle die passende API basierend auf:
- Benutzeranfrage (Keywords, Kontext)
- Gewünschte Content-Art (Generation, Analysis, Processing, Optimization)
- Verfügbare Parameter
- Use Cases der APIs
```

## 🚀 **Beispiel-Prompts für verschiedene Szenarien**

### **🔧 SEO Meta Tags Generation Prompt**
```
Du bist ein SEO Meta Tags-Experte. Generiere SEO-optimierte Meta Tags für "{topic}".

Verwende die content_generation_generate_meta_tags_live API und gib folgende Informationen zurück:
- SEO-optimierter Meta Title
- SEO-optimierte Meta Description
- Meta Keywords
- SEO-Optimierungs-Insights
- Meta Tags-Best Practices
- Optimierungsempfehlungen
- A/B-Testing-Vorschläge

Formatiere die Antwort strukturiert mit klaren Abschnitten und SEO-Insights.
```

### **📚 Content Structure und Sub Topics Prompt**
```
Du bist ein Content Structure-Experte. Generiere Sub Topics für "{main_topic}".

Verwende die content_generation_generate_sub_topics_live API und gib folgende Informationen zurück:
- Relevante Sub Topics
- Content-Struktur
- Topic-Hierarchie
- Content-Planung
- Struktur-Optimierung
- Content-Strategien
- Organisationsempfehlungen

Formatiere die Analyse mit Fokus auf Content-Struktur und -Organisation.
```

### **📊 Text Analysis und Summary Prompt**
```
Du bist ein Text Analysis-Experte. Analysiere den Text "{text}" und erstelle eine Zusammenfassung.

Verwende die content_generation_text_summary_live API und gib folgende Informationen zurück:
- Text-Statistiken
- Lesbarkeits-Scores
- Keyword-Analyse
- Sprach-Erkennung
- Text-Zusammenfassung
- Analyse-Insights
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Text-Analyse und -Optimierung.
```

### **🌍 Text Analysis Languages Prompt**
```
Du bist ein Text Analysis Languages-Experte. Analysiere verfügbare Sprachen für Text-Analyse.

Verwende die content_generation_text_summary_languages API und gib folgende Informationen zurück:
- Unterstützte Sprachen
- Sprach-Codes
- Sprach-Features
- Lokalisierungs-Optionen
- Mehrsprachige Analyse
- Sprach-Strategien
- Internationalisierungs-Empfehlungen

Formatiere die Analyse mit Fokus auf mehrsprachige Text-Analyse.
```

### **✍️ AI Text Generation Prompt**
```
Du bist ein AI Text Generation-Experte. Generiere Text basierend auf "{initial_text}".

Verwende die content_generation_generate_live API und gib folgende Informationen zurück:
- Generierter Text
- Token-Statistiken
- Generierungs-Qualität
- Kreativitäts-Index
- Text-Optimierung
- Generierungs-Insights
- Verbesserungsvorschläge

Formatiere die Analyse mit Fokus auf AI-Text-Generierung.
```

### **📝 Topic-basierte Text Generation Prompt**
```
Du bist ein Topic-basierte Text Generation-Experte. Generiere Text zum Thema "{topic}".

Verwende die content_generation_generate_text_live API und gib folgende Informationen zurück:
- Generierter Content
- Topic-Abdeckung
- Content-Struktur
- Wortanzahl
- Content-Qualität
- Generierungs-Insights
- Content-Optimierung

Formatiere die Analyse mit Fokus auf Topic-basierte Content-Generierung.
```

### **🔄 Text Paraphrasing Prompt**
```
Du bist ein Text Paraphrasing-Experte. Paraphrasiere den Text "{text}".

Verwende die content_generation_paraphrase_live API und gib folgende Informationen zurück:
- Paraphrasierter Text
- Paraphrasierungs-Qualität
- Kreativitäts-Index
- Sprach-Optimierung
- Paraphrasierungs-Insights
- Text-Verbesserungen
- Optimierungsempfehlungen

Formatiere die Analyse mit Fokus auf Text-Paraphrasierung.
```

### **✅ Grammar Check Prompt**
```
Du bist ein Grammar Check-Experte. Überprüfe die Grammatik des Textes "{text}".

Verwende die content_generation_check_grammar_live API und gib folgende Informationen zurück:
- Grammatik-Fehler
- Korrigierter Text
- Fehler-Kategorien
- Verbesserungsvorschläge
- Grammatik-Qualität
- Korrektur-Insights
- Grammatik-Optimierung

Formatiere die Analyse mit Fokus auf Grammatik-Korrektur.
```

### **🌍 Grammar Check Languages Prompt**
```
Du bist ein Grammar Check Languages-Experte. Analysiere verfügbare Sprachen für Grammatik-Prüfung.

Verwende die content_generation_check_grammar_languages API und gib folgende Informationen zurück:
- Unterstützte Sprachen
- Sprach-Codes
- Sprach-Features
- Grammatik-Regeln
- Lokalisierungs-Optionen
- Mehrsprachige Grammatik
- Sprach-Strategien

Formatiere die Analyse mit Fokus auf mehrsprachige Grammatik-Prüfung.
```

### **📖 Grammar Rules Prompt**
```
Du bist ein Grammar Rules-Experte. Analysiere verfügbare Grammatik-Regeln.

Verwende die content_generation_grammar_rules API und gib folgende Informationen zurück:
- Grammatik-Regeln
- Regel-Kategorien
- Regel-Beschreibungen
- Beispiele
- Sprach-spezifische Regeln
- Regel-Insights
- Lern-Strategien

Formatiere die Analyse mit Fokus auf Grammatik-Regeln und -Lernen.
```

## 🎯 **Prompt Engineering Best Practices**

### **✅ Strukturierte Prompts**
1. **Klare Rolle definieren** - "Du bist ein [Experte]..."
2. **Spezifische API-Auswahl** - "Verwende die [API] für..."
3. **Detaillierte Anforderungen** - "Analysiere folgende Aspekte..."
4. **Strukturierte Ausgabe** - "Formatiere die Antwort mit..."
5. **Actionable Empfehlungen** - "Gib konkrete Verbesserungsvorschläge..."

### **✅ Kontext-sensitive Auswahl**
- **Content Optimization** → `content_generation_generate_meta_tags_live`, `content_generation_generate_sub_topics_live`
- **Text Analysis** → `content_generation_text_summary_live`, `content_generation_text_summary_languages`
- **Text Generation** → `content_generation_generate_live`, `content_generation_generate_text_live`
- **Text Processing** → `content_generation_paraphrase_live`, `content_generation_check_grammar_live`, `content_generation_check_grammar_languages`, `content_generation_grammar_rules`
- **Live Data** → `*_live`
- **Languages** → `*_languages`
- **Rules** → `*_rules`

### **✅ Ausgabe-Formatierung**
```json
{
  "analysis_type": "content_generation",
  "target": "example_topic",
  "generation_type": "meta_tags",
  "summary": {
    "topic": "example_topic",
    "generation_type": "SEO Meta Tags",
    "quality_score": 4.5,
    "seo_optimization": "high"
  },
  "results": {
    "generated_content": {
      "meta_title": "...",
      "meta_description": "...",
      "meta_keywords": [...]
    },
    "analysis_data": {
      "seo_insights": {...},
      "optimization": {...},
      "best_practices": [...]
    }
  },
  "insights": [
    "SEO-optimierte Meta Tags",
    "Hohe Suchmaschinen-Relevanz",
    "Gute Click-Through-Rate-Potential"
  ],
  "recommendations": [
    "Meta Tags regelmäßig aktualisieren",
    "A/B-Testing durchführen",
    "Keywords kontinuierlich optimieren"
  ]
}
```

## 🎉 **Fazit**

### **✅ Diese Dokumentation ermöglicht:**
1. **Präzise API-Auswahl** basierend auf Benutzeranfragen
2. **Strukturierte Prompts** für verschiedene Content Generation-Typen
3. **Kontext-sensitive** Antworten
4. **Actionable Empfehlungen** für Benutzer
5. **Einheitliche Ausgabe-Formate** für KI-Systeme

### **🚀 Nächste Schritte:**
- Verwende diese Dokumentation als Referenz für Prompt-Erstellung
- Passe Prompts an spezifische Benutzeranfragen an
- Erweitere die Keyword-Logik bei Bedarf
- Teste Prompts mit verschiedenen Topics und Generierungs-Typen

**Diese Dokumentation dient als vollständige Wissensdatenbank für ChatGPT als Prompt Engineer für Content Generation! 🎯**
