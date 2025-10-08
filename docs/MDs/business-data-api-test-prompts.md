# 🚀 Business Data API Test-Prompts

## ✅ **Funktionierende API: Google My Business**

### **1. Google My Business Info Live**
```
Finde Informationen über "Pizza Hut München" in München, Deutschland mit der Google My Business Live API.
```

### **2. Google My Business mit verschiedenen Standorten**
```
Analysiere das Google My Business Profil für "McDonald's" in Berlin, Deutschland.
```

### **3. Google My Business mit englischen Standorten**
```
Suche nach "Starbucks" in New York, USA mit der Google My Business API.
```

### **4. Google My Business mit Koordinaten**
```
Finde Google My Business Informationen für "Burger King" mit den Koordinaten 48.1351,11.5820.
```

### **5. Google My Business Task Post**
```
Erstelle einen Task für Google My Business Info für "KFC" in Hamburg, Deutschland.
```

### **6. Google My Business Updates**
```
Hole Updates für das Google My Business Profil von "Subway" in Köln, Deutschland.
```

## 🔧 **Zu testende APIs (noch nicht implementiert)**

### **Google Hotels**
```
Suche nach Hotels in München, Deutschland mit der Google Hotels API.
```

### **Google Reviews**
```
Hole Google Reviews für "Pizza Hut" in München, Deutschland.
```

### **Trustpilot**
```
Suche nach "Amazon" auf Trustpilot und hole die Bewertungen.
```

### **Tripadvisor**
```
Finde Restaurants in Paris, Frankreich auf Tripadvisor.
```

### **Business Listings**
```
Suche nach Restaurants in München mit der Business Listings API.
```

### **Social Media**
```
Analysiere Pinterest Shares für https://www.amazon.com
```

### **General Business Data**
```
Hole die ID-Liste aller Business Data Tasks.
```

## 📝 **Test-Parameter**

### **Location Codes für Tests:**
- **München:** `location_code: 2276`
- **Berlin:** `location_code: 187147`
- **Hamburg:** `location_code: 187147`
- **New York:** `location_code: 2840`
- **Paris:** `location_code: 187147`

### **Language Codes:**
- **Deutsch:** `language_code: "de"`
- **Englisch:** `language_code: "en"`
- **Französisch:** `language_code: "fr"`

### **Beispiel-Keywords:**
- **Restaurants:** "Pizza Hut", "McDonald's", "Burger King", "KFC", "Subway"
- **Hotels:** "Hotel München", "Marriott", "Hilton"
- **Unternehmen:** "Amazon", "Google", "Microsoft"

## 🎯 **Erwartete Ergebnisse**

### **Google My Business Info Live sollte zurückgeben:**
- Business-Name und Adresse
- Telefonnummer
- Öffnungszeiten
- Bewertungen und Rating
- Website
- Fotos
- Kategorien

### **Fehlerbehandlung:**
- `40400 Not Found` - Endpoint nicht gefunden
- `40501 Invalid Field` - Falscher Parameter
- `20000 Ok` - Erfolgreiche Antwort

## 🔍 **Debug-Informationen**

### **Vercel Logs prüfen:**
- `🔧 Business Data Google My Business Request`
- `🔧 Converted location_name`
- `🔧 makeDataForSEORequest called with`

### **Response-Format:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "version": "0.1.20250922",
    "status_code": 20000,
    "status_message": "Ok.",
    "time": "0.0311 sec.",
    "cost": 0.0054,
    "tasks_count": 1,
    "tasks_error": 0,
    "tasks": [...]
  }
}
```