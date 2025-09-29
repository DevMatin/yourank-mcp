# 🏢 BUSINESS DATA API - Intelligent Route Selection Guide

## 🎯 **Hauptziele dieser API**
Diese Business Data API bietet **24 verschiedene Tools** für lokale SEO, Business Intelligence, Reviews und Social Media Analytics. Verwende diese Guidelines, um die **optimale API** basierend auf der Benutzeranfrage auszuwählen.

---

## 🔥 **INTELLIGENT API SELECTION HINTS**

### 💼 **GOOGLE MY BUSINESS APIs** (Wähle diese für spezifische Unternehmensanalysen)

**`business_data_google_my_business_info_live`** ⭐ **MOST COMMON**
- **Wann verwenden**: Benutzer möchte Informationen zu einem **spezifischen Unternehmen/Brand**
- **Trigger-Wörter**: "Zeige mir [Unternehmensname]", "McDonald's Standorte", "Starbucks Öffnungszeiten", "Apotheke Kontakt"
- **Beispiel-Anfragen**: 
  - "Gib mir Informationen zu McDonald's in Deutschland"
  - "Zeige mir alle Subway-Filialen in München"
  - "Wie lauten die Öffnungszeiten von Apotheken?"

**`business_data_google_locations`** 📍 **INFO-TOOL**
- **Wann verwenden**: Benutzer fragt nach **verfügbaren Standorten/Ländern**
- **Trigger-Wörter**: "Welche Länder", "Verfügbare Standorte", "Deutsche Städte", "Unterstützte Regionen"
- **Beispiel-Anfragen**:
  - "Welche Länder werden unterstützt?"
  - "Zeige mir alle deutschen Städte"
  - "Welche Standort-Codes gibt es?"

### 🔍 **BUSINESS LISTINGS APIs** (Wähle diese für Kategorie-basierte lokale Suche)

**`business_data_business_listings_search_live`** 🎯 **OPTIMAL FÜR LOKALE SUCHE**
- **Wann verwenden**: Benutzer sucht nach **Geschäftstypen** in bestimmten Städten
- **Trigger-Wörter**: "Restaurant in", "Hotels in", "Apotheken in", "Suche nach [Kategorie]"
- **Beispiel-Anfragen**:
  - "Finde Restaurants in München"
  - "Suche nach Fitnessstudios in Hamburg"
  - "Zeige mir alle Hotels in Berlin"
  - "Gib mir Apotheken in Köln"

**`business_data_business_listings_locations`** 📍 **STANDORT-METADATA**
- **Wann verwenden**: Benutzer fragt nach **Business-spezifischen Standorten**
- **Trigger-Wörter**: "Business Standorte", "Listings verfügbar", "Verfügbare Business-Regionen"
- **Beispiel-Anfragen**:
  - "Welche Standorte gibt es für Business-Suche?"
  - "Business Listings verfügbare Länder"

### 🏨 **HOTEL APIs** (Wähle diese für Hotel-Suche und Buchungen)

**`business_data_google_hotel_searches_live`** 🏨 **HOTEL-BUCHUNGEN**
- **Wann verwenden**: Benutzer sucht nach **Hotels mit Verfügbarkeit/Preisen**
- **Trigger-Wörter**: "Hotel buchen", "Unterkunft finden", "Zimmer verfügbar", "check-in", "check-out"
- **Beispiel-Anfragen**:
  - "Finde Hotels in Berlin für nächste Woche"
  - "Hotels mit verfügbaren Zimmern vom 25.-27. August"
  - "Günstige Hotels in München für 2 Erwachsene"

**`business_data_google_hotel_info_live_advanced`** 🏨 **HOTEL-INFORMATIONEN**
- **Wann verwenden**: Benutzer möchte **detaillierte Hotel-Informationen**
- **Trigger-Wörter**: "Hotel-Details", "Hotel-Info", "Hotel-Features", "Hotel-Ausstattung"
- **Beispiel-Anfragen**:
  - "Gib mir Details zum Hotel Adlon Berlin"
  - "Zeige mir alle Features des Münchner Hofs"

### 🌟 **SOCIAL MEDIA APIs** (Wähle diese für Social Media Analytics)

**`business_data_social_media_pinterest_live`** 📌 **PINTEREST-ANALYSE**
- **Wann verwenden**: Benutzer fragt nach **Pinterest-Daten** oder **Social Shares**
- **Trigger-Wörter**: "Pinterest", "Social Shares", "Pin-Daten", "Social Media Performance"
- **Beispiel-Anfragen**:
  - "Wie performt meine Website auf Pinterest?"
  - "Zeige mir Pinterest-Daten für Google.com"
  - "Social Media Shares analysieren"

**`business_data_social_media_facebook_live`** 📘 **FACEBOOK-ANALYSE**
- **Wann verwenden**: Benutzer fragt nach **Facebook Likes/Shares**
- **Trigger-Wörter**: "Facebook Likes", "Facebook Shares", "Social Reach"
- **Beispiel-Anfragen**:
  - "Facebook Likes für meine Website"
  - "Social Media Performance auf Facebook"

**`business_data_social_media_reddit_live`** 📧 **REDDIT-ANALYSE**
- **Wann verwenden**: Benutzer fragt nach **Reddit Shares** oder **Subreddit-Daten**
- **Trigger-Wörter**: "Reddit", "Reddit Shares", "Subreddit", "Reddit Performance"
- **Beispiel-Anfragen**:
  - "Reddit Shares für meine Domain"
  - "Zeige mir Subreddit-Daten"

### 🌍 **TRIPADVISOR APIs** (Wähle diese für Reise und Tourismus)

**`business_data_tripadvisor_search_live`** ✈️ **REISE-SUCHE**
- **Wann verwenden**: Benutzer sucht nach **TripAdvisor-Inhalten** (Restaurants, Hotels, Aktivitäten)
- **Trigger-Wörter**: "TripAdvisor", "Reisebewertungen", "Tourismus", "Reiserestaurants"
- **Beispiel-Anfragen**:
  - "Finde Restaurants auf TripAdvisor in Berlin"
  - "Hotels auf TripAdvisor bewertet"
  - "Aktivitäten in München finden"

**`business_data_tripadvisor_locations`** 🌍 **TRIPADVISOR-STANDORTE**
- **Wann verwenden**: Benutzer fragt nach **verfügbaren TripAdvisor-Regionen**
- **Trigger-Wörter**: "TripAdvisor verfügbare Länder", "TripAdvisor Regionen"
- **Beispiel-Anfragen**:
  - "Welche Länder unterstützt TripAdvisor?"
  - "TripAdvisor verfügbare Städte"

### ⭐ **TRUSTPILOT APIs** (Wähle diese für Kundenbewertungen und Trust-Scores)

**`business_data_trustpilot_search_live`** ⭐ **TRUSTPILOT-BEWERTUNGEN**
- **Wann verwenden**: Benutzer sucht nach **Trustpilot-Bewertungen** oder **Business-Reviews**
- **Trigger-Wörter**: "Trustpilot", "Kundenbewertungen", "Trust-Score", "Business Reviews"
- **Beispiel-Anfragen**:
  - "Zeige mir Trustpilot-Bewertungen für PayPal"
  - "Trust-Score von Unternehmen"
  - "Kundenfeedback analysieren"

### 🔧 **CORE MANAGEMENT APIs** (Wähle diese für System-Verwaltung)

**`business_data_id_list`** 📋 **TASK-MANAGEMENT**
- **Wann verwenden**: Benutzer möchte **Task-Verlauf** oder **API-Übersicht**
- **Trigger-Wörter**: "Task-Liste", "API Übersicht", "abgeschlossene Aufgaben"
- **Beispiel-Anfragen**:
  - "Zeige mir alle abgeschlossenen Tasks"
  - "API-Auslastung der letzten Tage"

**`business_data_errors`** ⚠️ **FEHLER-MANAGEMENT**
- **Wann verwenden**: Benutzer fragt nach **API-Fehlern** oder **Problemen**
- **Trigger-Wörter**: "API Fehler", "fehlgeschlagene Requests", "Probleme"
- **Beispiel-Anfragen**:
  - "Zeige mir API-Fehler der letzten Woche"
  - "fehlgeschlagene Business Data Requests"

---

## 🎯 **SMART SELECTION LOGIC**

### **1. Frage-Analyse Schritte:**
1. **Identifaziere den Hauptzweck** der Anfrage
2. **Erkenne Keywords** aus den Trigger-Wörtern oben
3. **Wähle die passende API-Kategorie**
4. **Erkenne wenn mehrere APIs kombiniert werden sollen**

### **2. Häufige Kombinationen:**
- **"Unternehmensanalyse"** → `google_my_business_info` + `trustpilot_search` 
- **"Lokale SEO"** → `business_listings_search` + `google_locations`
- **"Social Media Analyse"** → `pinterest_live` + `facebook_live` + `reddit_live`
- **"Hotel-Recherche"** → `hotel_searches` + `tripadvisor_search`

### **3. Fallback-Logik:**
- **Vage Anfragen** → Verwende `google_my_business_info` als Standard
- **Unklare Intent** → Stelle Rückfragen oder teste mehrere APIs
- **Fehlende Parameter** → Nutze Default-Werte (Germany, de, desktop)

---

## 📊 **OUTPUT FORMATING**

Beantworte immer strukturiert mit:
1. **🎯 Erkannte Absicht**: Was möchte der Benutzer?
2. **🛠️ Gewählte API(s)**: Welche Tools werden verwendet?
3. **📋 Eingabeparameter**: Welche Daten werden benötigt?
4. **📊 Ergebnisse**: Formatierte Datenausgabe
5. **💡 Insights**: Interpretierte Erkenntnisse
6. **🚀 Empfehlungen**: Konkrete nächste Schritte

---

## ⚡ **QUICK DECISION FLOW**

```
Benutzer fragt nach [UNTERNEHMEN/brand] → google_my_business_info_live
Benutzer fragt nach [KATEGORIE] in [STADT] → business_listings_search_live  
Benutzer fragt nach Hotels/Buchungen → hotel_search/live
Benutzer fragt nach Social Media → social_media_[PLATTFORM]_live
Benutzer fragt nach Trustpilot/Reviews → trustpilot_search_live
Benutzer fragt nach TripAdvisor/Reisen → tripadvisor_search_live
Benutzer fragt nach verfügbaren Standorten → [platform]_locations
```

---

## 📍 **HÄUFIGE STANDORT-CODES**

```
2840 - Deutschland
1001493 - Berlin, Deutschland  
1009308 - München, Deutschland
1009309 - Hamburg, Deutschland
1009312 - Köln, Deutschland
187768 - TripAdvisor München
1009309 - TripAdvisor Hamburg
```

## 🌐 **SPRACH-CODES**

```
de - Deutsch
en - Englisch
es - Spanisch
fr - Französisch
it - Italienisch
```

## 🔧 **DEFAULT VALUES**

- **location_name**: "Germany"
- **location_code**: 2840
- **language_code**: "de"
- **device**: "desktop"
- **limit**: 10-50 (je nach API)

---

## ⚠️ **API FEHLERBEHANDLUNG**

### **Häufige Fehler und Lösungen:**

**"Action requires approval"** 
- → Verwende `business_data_google_my_business_info_live` als Alternative
- → Oder teste mit kleineren `depth`-Werten (5-10 statt 15-50)

**"No results found"**
- → Versuche breitere Keywords ("Restaurant" statt "Pizzeria")
- → Verwende bekannte Locations ("Berlin" statt kleine Städte)

**"Invalid location_code"**
- → Verwende `business_data_business_listings_locations` um verfügbare Codes zu erhalten
- → Standard: Deutschland = 2840, München = 1009308

### **Fallback-Strategien:**
1. **Listings API fehlgeschlagen** → Google My Business als Alternative
2. **Social Media API nicht verfügbar** → Andere Plattformen versuchen
3. **Hotel API Problem** → Tripadvisor als Backup
4. **Review API Fehler** → Trustpilot als Alternative

### **Erfolgreiche Parameter-Kombinationen:**
```json
{
  "keyword": "Restaurant" // Broader is better than specific
  "location_name": "Berlin" // Known locations work better  
  "depth": 10 // Smaller numbers are more reliable
  "language_code": "de"
}
```
