# Implementierungsanleitung

## Was ist bereits implementiert

### ✅ Fertige Komponenten
- **Layout-System**: Sidebar, Header, Routing
- **Dashboard**: Übersicht mit Metriken und Modulen
- **API-Service**: Vollständige API-Integration
- **Authentifizierung**: useAuth Hook mit Mock-Login
- **Styling**: Tailwind CSS mit benutzerdefinierten Komponenten
- **TypeScript**: Alle Typen und Interfaces definiert

### ✅ Fertige Seiten
- Dashboard (`/dashboard`)
- Layout mit Navigation

## Was noch implementiert werden muss

### 🔄 Fehlende Seiten

#### 1. Modules Page (`/modules`)
```typescript
// src/pages/Modules.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '@/services/api';

const Modules: React.FC = () => {
  const { data: modules, isLoading } = useQuery('modules', api.modules.getAll);
  const queryClient = useQueryClient();
  
  const toggleModule = useMutation(
    (data: { id: string; enabled: boolean }) => 
      api.modules.toggle(data.id, data.enabled),
    {
      onSuccess: () => queryClient.invalidateQueries('modules'),
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Module Verwaltung</h1>
        <p className="mt-2 text-sm text-gray-700">
          Verwalten Sie alle verfügbaren API-Module
        </p>
      </div>

      {/* Module Liste */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">Verfügbare Module</h2>
        </div>
        <div className="card-content">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {modules?.data?.map((module) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  onToggle={toggleModule}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modules;
```

#### 2. Schemas Page (`/schemas`)
```typescript
// src/pages/Schemas.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '@/services/api';
import SchemaEditor from '@/components/SchemaEditor/SchemaEditor';

const Schemas: React.FC = () => {
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const { data: schemas, isLoading } = useQuery('schemas', api.schemas.getAll);
  const queryClient = useQueryClient();

  const updateSchema = useMutation(
    (data: { path: string; content: string }) =>
      api.schemas.updateFile(data.path, data.content),
    {
      onSuccess: () => queryClient.invalidateQueries('schemas'),
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schema Editor</h1>
        <p className="mt-2 text-sm text-gray-700">
          Bearbeiten Sie YAML- und JSON-Schemas direkt im Browser
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schema Liste */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-medium text-gray-900">Schema-Dateien</h2>
            </div>
            <div className="card-content">
              {/* Schema-Liste implementieren */}
            </div>
          </div>
        </div>

        {/* Schema Editor */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-medium text-gray-900">Schema bearbeiten</h2>
            </div>
            <div className="card-content">
              {selectedSchema ? (
                <SchemaEditor
                  schemaPath={selectedSchema}
                  onSave={updateSchema.mutate}
                />
              ) : (
                <div className="text-center text-gray-500 py-12">
                  Wählen Sie eine Schema-Datei aus
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemas;
```

#### 3. API Tester Page (`/api-tester`)
```typescript
// src/pages/ApiTester.tsx
import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { api } from '@/services/api';
import { ApiTestRequest, ApiTestResponse } from '@/types/mcp';

const ApiTester: React.FC = () => {
  const [testRequest, setTestRequest] = useState<ApiTestRequest>({
    toolId: '',
    moduleId: '',
    parameters: {},
  });

  const { data: modules } = useQuery('modules', api.modules.getAll);
  const [testResult, setTestResult] = useState<ApiTestResponse | null>(null);

  const testApi = useMutation(
    (request: ApiTestRequest) => api.test(request),
    {
      onSuccess: (data) => setTestResult(data.data),
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">API Tester</h1>
        <p className="mt-2 text-sm text-gray-700">
          Testen Sie alle verfügbaren API-Endpunkte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Form */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">API-Test konfigurieren</h2>
          </div>
          <div className="card-content">
            {/* Test-Formular implementieren */}
          </div>
        </div>

        {/* Test Results */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">Test-Ergebnisse</h2>
          </div>
          <div className="card-content">
            {/* Ergebnisse anzeigen */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
```

#### 4. Configuration Page (`/configuration`)
```typescript
// src/pages/Configuration.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '@/services/api';
import { ServerConfig } from '@/types/mcp';

const Configuration: React.FC = () => {
  const { data: config, isLoading } = useQuery('config', api.config.get);
  const queryClient = useQueryClient();

  const updateConfig = useMutation(
    (data: Partial<ServerConfig>) => api.config.update(data),
    {
      onSuccess: () => queryClient.invalidateQueries('config'),
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Konfiguration</h1>
        <p className="mt-2 text-sm text-gray-700">
          Verwalten Sie Server-Einstellungen und Konfigurationen
        </p>
      </div>

      {/* Verschiedene Konfigurationsbereiche */}
      <div className="space-y-6">
        {/* Field Configuration */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">Feld-Konfiguration</h2>
          </div>
          <div className="card-content">
            {/* Field-Config-Editor implementieren */}
          </div>
        </div>

        {/* Environment Configuration */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">Umgebungsvariablen</h2>
          </div>
          <div className="card-content">
            {/* Env-Config-Editor implementieren */}
          </div>
        </div>

        {/* API Credentials */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">API-Credentials</h2>
          </div>
          <div className="card-content">
            {/* Credentials-Editor implementieren */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
```

#### 5. Logs Page (`/logs`)
```typescript
// src/pages/Logs.tsx
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '@/services/api';
import { LogEntry, SearchParams } from '@/types/mcp';

const Logs: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    pagination: { page: 1, limit: 50 },
  });

  const { data: logs, isLoading } = useQuery(
    ['logs', searchParams],
    () => api.metrics.logs(searchParams)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Server Logs</h1>
        <p className="mt-2 text-sm text-gray-700">
          Überwachen Sie Server-Logs und Debugging-Informationen
        </p>
      </div>

      {/* Log Filter */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">Log-Filter</h2>
        </div>
        <div className="card-content">
          {/* Log-Filter implementieren */}
        </div>
      </div>

      {/* Log Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">Log-Einträge</h2>
        </div>
        <div className="card-content">
          {/* Log-Tabelle implementieren */}
        </div>
      </div>
    </div>
  );
};

export default Logs;
```

#### 6. NotFound Page
```typescript
// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-primary-600">404</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Seite nicht gefunden</h1>
        <p className="mt-2 text-gray-600">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <HomeIcon className="h-4 w-4 mr-2" />
          Zurück zum Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
```

### 🔄 Fehlende Komponenten

#### 1. SchemaEditor Komponente
```typescript
// src/components/SchemaEditor/SchemaEditor.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '@/services/api';
import { SchemaFile } from '@/types/mcp';

interface SchemaEditorProps {
  schemaPath: string;
  onSave: (data: { path: string; content: string }) => void;
}

const SchemaEditor: React.FC<SchemaEditorProps> = ({ schemaPath, onSave }) => {
  const { data: schema, isLoading } = useQuery(
    ['schema', schemaPath],
    () => api.schemas.getFile(schemaPath)
  );

  const [content, setContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (schema?.data) {
      setContent(schema.data.content);
      setIsDirty(false);
    }
  }, [schema]);

  const handleSave = () => {
    onSave({ path: schemaPath, content });
    setIsDirty(false);
  };

  if (isLoading) {
    return <div>Lade Schema...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          {schema?.data?.name || 'Unbekanntes Schema'}
        </h3>
        <button
          onClick={handleSave}
          disabled={!isDirty}
          className="btn btn-primary disabled:opacity-50"
        >
          Speichern
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setIsDirty(true);
        }}
        className="w-full h-96 font-mono text-sm border border-gray-300 rounded-md p-3"
        placeholder="Schema-Inhalt hier eingeben..."
      />
    </div>
  );
};

export default SchemaEditor;
```

#### 2. ModuleCard Komponente
```typescript
// src/components/ModuleManager/ModuleCard.tsx
import React from 'react';
import { ApiModule } from '@/types/mcp';

interface ModuleCardProps {
  module: ApiModule;
  onToggle: (data: { id: string; enabled: boolean }) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onToggle }) => {
  const handleToggle = () => {
    onToggle({ id: module.id, enabled: !module.enabled });
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${
          module.status === 'active' ? 'bg-success-500' :
          module.status === 'error' ? 'bg-error-500' : 'bg-gray-400'
        }`} />
        <div>
          <h3 className="font-medium text-gray-900">{module.name}</h3>
          <p className="text-sm text-gray-500">{module.description}</p>
          <p className="text-xs text-gray-400">
            Version {module.version} • {module.tools?.length || 0} Tools
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          module.status === 'active' ? 'bg-success-100 text-success-800' :
          module.status === 'error' ? 'bg-error-100 text-error-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {module.status === 'active' ? 'Aktiv' :
           module.status === 'error' ? 'Fehler' : 'Inaktiv'}
        </span>

        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
            module.enabled ? 'bg-primary-600' : 'bg-gray-200'
          }`}
        >
          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            module.enabled ? 'translate-x-5' : 'translate-x-0'
          }`} />
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
```

## Implementierungsreihenfolge

### Phase 1: Grundfunktionalität
1. **NotFound Page** - Einfache 404-Seite
2. **Modules Page** - Grundlegende Modul-Verwaltung
3. **ModuleCard Komponente** - Modul-Anzeige

### Phase 2: Schema-Management
4. **Schemas Page** - Schema-Übersicht
5. **SchemaEditor Komponente** - YAML/JSON-Editor

### Phase 3: API-Testing
6. **API Tester Page** - Endpunkt-Testing
7. **Test-Formulare** - Parameter-Eingabe

### Phase 4: Konfiguration
8. **Configuration Page** - Server-Einstellungen
9. **Config-Editoren** - Verschiedene Konfigurationsbereiche

### Phase 5: Monitoring
10. **Logs Page** - Log-Anzeige
11. **Log-Filter** - Erweiterte Filterung

## Nächste Schritte

1. **Seiten implementieren** - Beginnen Sie mit den einfachen Seiten
2. **Komponenten erstellen** - Bauen Sie wiederverwendbare UI-Komponenten
3. **API-Integration testen** - Testen Sie alle API-Aufrufe
4. **Styling verfeinern** - Passen Sie das Design an Ihre Bedürfnisse an
5. **Funktionalität erweitern** - Fügen Sie weitere Features hinzu

## Tipps für die Implementierung

### 1. Schrittweise vorgehen
- Implementieren Sie eine Seite nach der anderen
- Testen Sie jede Seite gründlich
- Verwenden Sie TypeScript für bessere Code-Qualität

### 2. Komponenten-Wiederverwendung
- Erstellen Sie generische Komponenten
- Verwenden Sie Props für Konfiguration
- Halten Sie Komponenten klein und fokussiert

### 3. Error Handling
- Implementieren Sie umfassende Fehlerbehandlung
- Zeigen Sie benutzerfreundliche Fehlermeldungen
- Loggen Sie Fehler für Debugging

### 4. Performance
- Verwenden Sie React Query für Caching
- Implementieren Sie Lazy Loading
- Optimieren Sie Re-Renders

### 5. Testing
- Schreiben Sie Unit-Tests für Komponenten
- Testen Sie API-Integration
- Verwenden Sie Mock-Daten für Entwicklung
