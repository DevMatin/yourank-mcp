#!/bin/bash

# 🚀 Vollständige OnPage-Analyse für https://amir-kaffeemann.de/
# Autor: DataForSEO OnPage API
# Datum: $(date)

echo "🚀 Starte vollständige OnPage-Analyse für https://amir-kaffeemann.de/"
echo "================================================================"

# 1. CORE: Task erstellen
echo "📋 Schritt 1: Core-Task erstellen..."
CORE_RESPONSE=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_core" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "task_post",
    "target": "https://amir-kaffeemann.de/",
    "language_code": "de",
    "location_name": "Germany",
    "device": "desktop",
    "max_crawl_pages": 1
  }')

echo "Core-Task Response:"
echo "$CORE_RESPONSE" | jq '.'

# Task ID extrahieren
TASK_ID=$(echo "$CORE_RESPONSE" | jq -r '.tasks[0].id')
echo "📋 Task ID: $TASK_ID"

# 2. Warten bis Task fertig ist
echo "⏳ Warte auf Task-Abschluss..."
sleep 30

# 3. CORE: Tasks Ready prüfen
echo "📋 Schritt 2: Tasks Ready prüfen..."
TASKS_READY=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_core" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "tasks_ready"
  }')

echo "Tasks Ready Response:"
echo "$TASKS_READY" | jq '.'

# 4. CORE: Summary abrufen
echo "📋 Schritt 3: Summary abrufen..."
SUMMARY=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_core" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "summary",
    "id": "'$TASK_ID'"
  }')

echo "Summary Response:"
echo "$SUMMARY" | jq '.'

# 5. ANALYSIS: Seiten analysieren
echo "📊 Schritt 4: Seiten analysieren..."
PAGES=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_analysis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "pages",
    "id": "'$TASK_ID'",
    "limit": 100
  }')

echo "Pages Analysis Response:"
echo "$PAGES" | jq '.'

# 6. ANALYSIS: Ressourcen analysieren
echo "📊 Schritt 5: Ressourcen analysieren..."
RESOURCES=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_analysis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "resources",
    "id": "'$TASK_ID'",
    "limit": 100
  }')

echo "Resources Analysis Response:"
echo "$RESOURCES" | jq '.'

# 7. ANALYSIS: Links analysieren
echo "📊 Schritt 6: Links analysieren..."
LINKS=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_analysis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "links",
    "id": "'$TASK_ID'",
    "limit": 100
  }')

echo "Links Analysis Response:"
echo "$LINKS" | jq '.'

# 8. ANALYSIS: Duplicate Content analysieren
echo "📊 Schritt 7: Duplicate Content analysieren..."
DUPLICATE_CONTENT=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_analysis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "duplicate_content",
    "id": "'$TASK_ID'",
    "limit": 100
  }')

echo "Duplicate Content Analysis Response:"
echo "$DUPLICATE_CONTENT" | jq '.'

# 9. ANALYSIS: Keyword-Dichte analysieren
echo "📊 Schritt 8: Keyword-Dichte analysieren..."
KEYWORD_DENSITY=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_analysis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "keyword_density",
    "id": "'$TASK_ID'",
    "url": "https://amir-kaffeemann.de/",
    "limit": 100
  }')

echo "Keyword Density Analysis Response:"
echo "$KEYWORD_DENSITY" | jq '.'

# 10. CONTENT: Rohes HTML extrahieren
echo "📄 Schritt 9: Rohes HTML extrahieren..."
RAW_HTML=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "raw_html",
    "id": "'$TASK_ID'",
    "url": "https://amir-kaffeemann.de/",
    "limit": 1
  }')

echo "Raw HTML Response:"
echo "$RAW_HTML" | jq '.'

# 11. CONTENT: Screenshot erstellen
echo "📸 Schritt 10: Screenshot erstellen (1920x1080)..."
SCREENSHOT=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "page_screenshot",
    "id": "'$TASK_ID'",
    "url": "https://amir-kaffeemann.de/",
    "screenshot_width": 1920,
    "screenshot_height": 1080,
    "limit": 1
  }')

echo "Screenshot Response:"
echo "$SCREENSHOT" | jq '.'

# 12. LIGHTHOUSE: Neue Lighthouse-Analyse starten
echo "🏠 Schritt 11: Lighthouse-Analyse starten..."
LIGHTHOUSE_TASK=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_lighthouse" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "task_post",
    "url": "https://amir-kaffeemann.de/",
    "language_code": "de",
    "category": ["seo", "performance", "accessibility"]
  }')

echo "Lighthouse Task Response:"
echo "$LIGHTHOUSE_TASK" | jq '.'

# Lighthouse Task ID extrahieren
LIGHTHOUSE_TASK_ID=$(echo "$LIGHTHOUSE_TASK" | jq -r '.tasks[0].id')
echo "🏠 Lighthouse Task ID: $LIGHTHOUSE_TASK_ID"

# 13. Warten auf Lighthouse-Task
echo "⏳ Warte auf Lighthouse-Task-Abschluss..."
sleep 30

# 14. LIGHTHOUSE: Ergebnisse abrufen
echo "🏠 Schritt 12: Lighthouse-Ergebnisse abrufen..."
LIGHTHOUSE_RESULTS=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_lighthouse" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "task_get",
    "id": "'$LIGHTHOUSE_TASK_ID'"
  }')

echo "Lighthouse Results Response:"
echo "$LIGHTHOUSE_RESULTS" | jq '.'

# 15. MANAGEMENT: Fehler abrufen
echo "🔧 Schritt 13: Fehler abrufen..."
ERRORS=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_management" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "errors",
    "date_from": "2024-01-01",
    "date_to": "2024-12-31",
    "limit": 100
  }')

echo "Errors Response:"
echo "$ERRORS" | jq '.'

# 16. MANAGEMENT: Redirect Chains abrufen
echo "🔧 Schritt 14: Redirect Chains abrufen..."
REDIRECT_CHAINS=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_management" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "redirect_chains",
    "id": "'$TASK_ID'",
    "limit": 100
  }')

echo "Redirect Chains Response:"
echo "$REDIRECT_CHAINS" | jq '.'

# 17. MANAGEMENT: Nicht indexierbare Seiten abrufen
echo "🔧 Schritt 15: Nicht indexierbare Seiten abrufen..."
NON_INDEXABLE=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_management" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "non_indexable",
    "id": "'$TASK_ID'",
    "limit": 100
  }')

echo "Non-Indexable Pages Response:"
echo "$NON_INDEXABLE" | jq '.'

# 18. MANAGEMENT: Microdata abrufen
echo "🔧 Schritt 16: Microdata abrufen..."
MICRODATA=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_management" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "microdata",
    "id": "'$TASK_ID'",
    "limit": 100
  }')

echo "Microdata Response:"
echo "$MICRODATA" | jq '.'

echo "================================================================"
echo "✅ Vollständige OnPage-Analyse abgeschlossen!"
echo "📋 Core Task ID: $TASK_ID"
echo "🏠 Lighthouse Task ID: $LIGHTHOUSE_TASK_ID"
echo "================================================================"
