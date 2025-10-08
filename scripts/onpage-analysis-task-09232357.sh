#!/bin/bash

# 🚀 OnPage-Analyse für Task ID: 09232357-1064-0216-0000-f0ca5f90e010
# Autor: DataForSEO OnPage API
# Datum: $(date)

TASK_ID="09232357-1064-0216-0000-f0ca5f90e010"
TARGET_URL="https://amir-kaffeemann.de/"

echo "🚀 Starte OnPage-Analyse für Task ID: $TASK_ID"
echo "================================================================"

# 1. CORE: Summary abrufen
echo "📋 Schritt 1: Summary abrufen..."
SUMMARY=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_core" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "summary",
    "id": "'$TASK_ID'"
  }')

echo "Summary Response:"
echo "$SUMMARY" | jq '.'

# 2. ANALYSIS: Seiten analysieren
echo "📊 Schritt 2: Seiten analysieren..."
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

# 3. ANALYSIS: Ressourcen analysieren
echo "📊 Schritt 3: Ressourcen analysieren..."
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

# 4. ANALYSIS: Links analysieren
echo "📊 Schritt 4: Links analysieren..."
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

# 5. ANALYSIS: Duplicate Content analysieren
echo "📊 Schritt 5: Duplicate Content analysieren..."
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

# 6. ANALYSIS: Keyword-Dichte analysieren
echo "📊 Schritt 6: Keyword-Dichte analysieren..."
KEYWORD_DENSITY=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_analysis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "keyword_density",
    "id": "'$TASK_ID'",
    "url": "'$TARGET_URL'",
    "limit": 100
  }')

echo "Keyword Density Analysis Response:"
echo "$KEYWORD_DENSITY" | jq '.'

# 7. CONTENT: Rohes HTML extrahieren
echo "📄 Schritt 7: Rohes HTML extrahieren..."
RAW_HTML=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "raw_html",
    "id": "'$TASK_ID'",
    "url": "'$TARGET_URL'",
    "limit": 1
  }')

echo "Raw HTML Response:"
echo "$RAW_HTML" | jq '.'

# 8. CONTENT: Screenshot erstellen
echo "📸 Schritt 8: Screenshot erstellen (1920x1080)..."
SCREENSHOT=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "page_screenshot",
    "id": "'$TASK_ID'",
    "url": "'$TARGET_URL'",
    "screenshot_width": 1920,
    "screenshot_height": 1080,
    "limit": 1
  }')

echo "Screenshot Response:"
echo "$SCREENSHOT" | jq '.'

# 9. LIGHTHOUSE: Neue Lighthouse-Analyse starten
echo "🏠 Schritt 9: Lighthouse-Analyse starten..."
LIGHTHOUSE_TASK=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_lighthouse" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "task_post",
    "url": "'$TARGET_URL'",
    "language_code": "de",
    "category": ["seo", "performance", "accessibility"]
  }')

echo "Lighthouse Task Response:"
echo "$LIGHTHOUSE_TASK" | jq '.'

# Lighthouse Task ID extrahieren
LIGHTHOUSE_TASK_ID=$(echo "$LIGHTHOUSE_TASK" | jq -r '.tasks[0].id')
echo "🏠 Lighthouse Task ID: $LIGHTHOUSE_TASK_ID"

# 10. Warten auf Lighthouse-Task
echo "⏳ Warte auf Lighthouse-Task-Abschluss..."
sleep 30

# 11. LIGHTHOUSE: Ergebnisse abrufen
echo "🏠 Schritt 10: Lighthouse-Ergebnisse abrufen..."
LIGHTHOUSE_RESULTS=$(curl -s -X POST "https://yourank-mcp.vercel.app/v3/onpage_lighthouse" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic bWFyY29zLmdvbnphbGV6QHlvdS1yYW5rLmRlOjIzNzc4YmExNjQxOTA1NDk=" \
  -d '{
    "type": "task_get",
    "id": "'$LIGHTHOUSE_TASK_ID'"
  }')

echo "Lighthouse Results Response:"
echo "$LIGHTHOUSE_RESULTS" | jq '.'

echo "================================================================"
echo "✅ OnPage-Analyse abgeschlossen!"
echo "📋 Task ID: $TASK_ID"
echo "🏠 Lighthouse Task ID: $LIGHTHOUSE_TASK_ID"
echo "================================================================"
