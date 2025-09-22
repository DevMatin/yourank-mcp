# API Integration Guide

## Übersicht

Das Frontend kommuniziert über HTTP mit Ihrem DataForSEO MCP Server. Alle API-Aufrufe werden über den zentralen `ApiService` abgewickelt, der automatisch Authentifizierung, Fehlerbehandlung und Caching verwaltet.

## API-Endpunkte

### Basis-URL
```
http://localhost:3000/api
```

### Verfügbare Endpunkte

#### Server Information
```typescript
GET /api/server/info
// Gibt Informationen über den MCP Server zurück
```

#### Module Management
```typescript
GET /api/modules
// Alle verfügbaren Module abrufen

GET /api/modules/:id
// Spezifisches Modul abrufen

PUT /api/modules/:id
// Modul aktualisieren

PUT /api/modules/:id/toggle
// Modul aktivieren/deaktivieren

GET /api/modules/:id/tools
// Tools eines Moduls abrufen

POST /api/modules/search
// Module durchsuchen
```

#### Schema Management
```typescript
GET /api/schemas
// Alle Schema-Dateien auflisten

GET /api/schemas/file?path=:path
// Spezifische Schema-Datei abrufen

PUT /api/schemas/file
// Schema-Datei aktualisieren

POST /api/schemas/validate
// Schema validieren

POST /api/schemas
// Neue Schema-Datei erstellen

DELETE /api/schemas/file?path=:path
// Schema-Datei löschen
```

#### API Testing
```typescript
POST /api/test
// API-Endpunkt testen
```

#### Configuration
```typescript
GET /api/config
// Server-Konfiguration abrufen

PUT /api/config
// Server-Konfiguration aktualisieren

GET /api/config/fields
// Feld-Konfiguration abrufen

PUT /api/config/fields
// Feld-Konfiguration aktualisieren
```

#### Monitoring & Metrics
```typescript
GET /api/metrics/system
// System-Metriken abrufen

GET /api/metrics/modules
// Modul-Metriken abrufen

GET /api/logs
// Server-Logs abrufen
```

#### File Operations
```typescript
POST /api/files/upload
// Datei hochladen

GET /api/files/download?path=:path
// Datei herunterladen
```

## Verwendung im Frontend

### 1. API Service importieren
```typescript
import { api } from '@/services/api';
```

### 2. Module abrufen
```typescript
import { useQuery } from 'react-query';

const { data: modules, isLoading, error } = useQuery(
  'modules',
  api.modules.getAll
);
```

### 3. Modul aktualisieren
```typescript
import { useMutation, useQueryClient } from 'react-query';

const queryClient = useQueryClient();
const updateModule = useMutation(
  (data: { id: string; enabled: boolean }) => 
    api.modules.toggle(data.id, data.enabled),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('modules');
      toast.success('Modul erfolgreich aktualisiert');
    },
    onError: (error) => {
      toast.error('Fehler beim Aktualisieren des Moduls');
    },
  }
);

// Verwendung
updateModule.mutate({ id: 'module-1', enabled: false });
```

### 4. Schema bearbeiten
```typescript
const updateSchema = useMutation(
  (data: { path: string; content: string }) =>
    api.schemas.updateFile(data.path, data.content),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('schemas');
      toast.success('Schema erfolgreich aktualisiert');
    },
  }
);
```

## Authentifizierung

### Token-basierte Authentifizierung
```typescript
// Token setzen
apiService.setAuthToken('your-jwt-token');

// Token entfernen
apiService.removeAuthToken();
```

### Automatische Token-Verwaltung
Der `ApiService` speichert den Token automatisch im `localStorage` und fügt ihn bei jedem Request hinzu.

## Fehlerbehandlung

### Automatische Fehlerbehandlung
```typescript
// Der ApiService behandelt Fehler automatisch
try {
  const result = await api.modules.getAll();
} catch (error) {
  // Fehler wird bereits im ApiService behandelt
  console.error('Fehler beim Laden der Module:', error);
}
```

### HTTP Status Codes
- **200**: Erfolgreich
- **401**: Unauthorized (Token ungültig)
- **403**: Forbidden (Keine Berechtigung)
- **404**: Not Found
- **500**: Internal Server Error

### Fehler-Response Format
```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}
```

## Caching & Performance

### React Query Integration
Das Frontend nutzt React Query für intelligentes Caching:

```typescript
const { data, isLoading } = useQuery(
  'modules',
  api.modules.getAll,
  {
    staleTime: 5 * 60 * 1000, // 5 Minuten
    refetchInterval: 30 * 1000, // Alle 30 Sekunden
    refetchOnWindowFocus: false,
  }
);
```

### Cache-Invalidierung
```typescript
const queryClient = useQueryClient();

// Spezifischen Query invalidieren
queryClient.invalidateQueries('modules');

// Alle Queries invalidieren
queryClient.invalidateQueries();

// Query manuell aktualisieren
queryClient.setQueryData('modules', newData);
```

## Request/Response Interceptors

### Request Interceptor
```typescript
this.client.interceptors.request.use(
  (config) => {
    // Token hinzufügen
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Logging (nur im Debug-Modus)
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log('API Request:', config);
    }
    
    return config;
  }
);
```

### Response Interceptor
```typescript
this.client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Automatische Fehlerbehandlung
    this.handleApiError(error);
    return Promise.reject(error);
  }
);
```

## Rate Limiting

### Konfiguration
```typescript
// In der .env.local
VITE_API_TIMEOUT=30000
VITE_RATE_LIMIT=100
VITE_RATE_LIMIT_WINDOW=60000
```

### Implementierung
```typescript
class RateLimiter {
  private requests: number[] = [];
  private limit: number;
  private window: number;

  constructor(limit: number, window: number) {
    this.limit = limit;
    this.window = window;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.window);
    
    if (this.requests.length >= this.limit) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}
```

## WebSocket Support (Optional)

### Real-time Updates
```typescript
class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect() {
    this.ws = new WebSocket('ws://localhost:3000/ws');
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
    
    this.ws.onclose = () => {
      this.handleReconnect();
    };
  }

  private handleMessage(data: any) {
    switch (data.type) {
      case 'module_status_changed':
        queryClient.invalidateQueries('modules');
        break;
      case 'schema_updated':
        queryClient.invalidateQueries('schemas');
        break;
    }
  }
}
```

## Testing

### Mock API für Tests
```typescript
// __mocks__/api.ts
export const mockApi = {
  modules: {
    getAll: jest.fn().mockResolvedValue({
      success: true,
      data: [
        {
          id: 'test-module',
          name: 'Test Module',
          status: 'active',
        },
      ],
    }),
  },
};

// Test verwenden
jest.mock('@/services/api', () => ({
  api: mockApi,
}));
```

### API Response Testing
```typescript
test('should handle API errors gracefully', async () => {
  mockApi.modules.getAll.mockRejectedValueOnce(
    new Error('Network Error')
  );

  render(<Modules />);
  
  await waitFor(() => {
    expect(screen.getByText('Fehler beim Laden der Module')).toBeInTheDocument();
  });
});
```

## Debugging

### Debug-Modus aktivieren
```bash
VITE_ENABLE_DEBUG=true npm run dev
```

### Network Tab
Überprüfen Sie im Browser-Entwicklertools den Network Tab für alle API-Aufrufe.

### Console Logs
```typescript
if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
  console.log('API Request:', config);
  console.log('API Response:', response);
}
```

## Best Practices

### 1. Error Boundaries verwenden
```typescript
class ApiErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('API Error:', error, errorInfo);
    // Fehler an Monitoring-Service senden
  }
}
```

### 2. Retry-Logik implementieren
```typescript
const { data } = useQuery(
  'modules',
  api.modules.getAll,
  {
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  }
);
```

### 3. Optimistic Updates
```typescript
const updateModule = useMutation(
  (data) => api.modules.update(data.id, data),
  {
    onMutate: async (newData) => {
      // Optimistisch UI aktualisieren
      await queryClient.cancelQueries('modules');
      const previousData = queryClient.getQueryData('modules');
      queryClient.setQueryData('modules', (old) => [...old, newData]);
      return { previousData };
    },
    onError: (err, newData, context) => {
      // Bei Fehler zurücksetzen
      queryClient.setQueryData('modules', context.previousData);
    },
  }
);
```

## Nächste Schritte

1. **API-Endpunkte implementieren** - Erstellen Sie die fehlenden Endpunkte in Ihrem MCP Server
2. **Authentifizierung einrichten** - Implementieren Sie JWT oder Session-basierte Auth
3. **WebSocket-Support** - Fügen Sie Real-time Updates hinzu
4. **Monitoring** - Integrieren Sie Logging und Metriken
5. **Tests** - Schreiben Sie umfassende API-Tests
