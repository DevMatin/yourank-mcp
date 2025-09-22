import React from 'react';
import { useQuery } from 'react-query';
import { 
  CubeIcon, 
  DocumentTextIcon, 
  CommandLineIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { api } from '@/services/api';
import { SystemMetrics, ModuleMetrics } from '@/types/mcp';

const Dashboard: React.FC = () => {
  // API-Aufrufe
  const { data: serverInfo, isLoading: serverInfoLoading } = useQuery(
    'serverInfo',
    api.serverInfo,
    { refetchInterval: 30000 } // Alle 30 Sekunden aktualisieren
  );

  const { data: modules, isLoading: modulesLoading } = useQuery(
    'modules',
    api.modules.getAll,
    { refetchInterval: 30000 }
  );

  const { data: systemMetrics, isLoading: metricsLoading } = useQuery(
    'systemMetrics',
    api.metrics.system,
    { refetchInterval: 10000 } // Alle 10 Sekunden aktualisieren
  );

  const { data: moduleMetrics, isLoading: moduleMetricsLoading } = useQuery(
    'moduleMetrics',
    api.metrics.modules,
    { refetchInterval: 30000 }
  );

  // Berechnete Werte
  const activeModules = modules?.data?.filter(m => m.status === 'active')?.length || 0;
  const totalModules = modules?.data?.length || 0;
  const errorModules = modules?.data?.filter(m => m.status === 'error')?.length || 0;

  const stats = [
    {
      name: 'Aktive Module',
      value: activeModules,
      total: totalModules,
      icon: CubeIcon,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      name: 'Schema-Dateien',
      value: 0, // Wird später implementiert
      total: 0,
      icon: DocumentTextIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'API-Tools',
      value: modules?.data?.reduce((acc, m) => acc + (m.tools?.length || 0), 0) || 0,
      icon: CommandLineIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Fehler',
      value: errorModules,
      icon: ExclamationTriangleIcon,
      color: 'text-error-600',
      bgColor: 'bg-error-50',
    },
  ];

  if (serverInfoLoading || modulesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Übersicht über Ihren DataForSEO MCP Server
        </p>
      </div>

      {/* Server Status */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">Server Status</h2>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                    {stat.total > 0 && (
                      <span className="text-sm font-normal text-gray-500"> / {stat.total}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Metrics */}
      {systemMetrics?.data && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">System Metriken</h2>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Uptime</span>
                </div>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {Math.floor((systemMetrics.data.uptime || 0) / 3600)}h {Math.floor(((systemMetrics.data.uptime || 0) % 3600) / 60)}m
                </p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 text-gray-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">Aktive Verbindungen</span>
                </div>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {systemMetrics.data.activeConnections || 0}
                </p>
              </div>

              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 text-gray-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">Fehlerrate</span>
                </div>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {((systemMetrics.data.errorRate || 0) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Overview */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">Module Übersicht</h2>
        </div>
        <div className="card-content">
          {modulesLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {modules?.data?.map((module) => (
                <div key={module.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      module.status === 'active' ? 'bg-success-500' :
                      module.status === 'error' ? 'bg-error-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{module.name}</p>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {module.tools?.length || 0} Tools
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      module.status === 'active' ? 'bg-success-100 text-success-800' :
                      module.status === 'error' ? 'bg-error-100 text-error-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {module.status === 'active' ? 'Aktiv' :
                       module.status === 'error' ? 'Fehler' : 'Inaktiv'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">Schnellzugriff</h2>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <CubeIcon className="h-6 w-6 text-primary-600 mr-3" />
              <span className="font-medium text-gray-900">Module verwalten</span>
            </button>
            
            <button className="flex items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <DocumentTextIcon className="h-6 w-6 text-primary-600 mr-3" />
              <span className="font-medium text-gray-900">Schemas bearbeiten</span>
            </button>
            
            <button className="flex items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <CommandLineIcon className="h-6 w-6 text-primary-600 mr-3" />
              <span className="font-medium text-gray-900">API testen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
