import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { 
  ApiResponse, 
  ApiModule, 
  Tool, 
  SchemaFile, 
  ServerConfig,
  SystemMetrics,
  ModuleMetrics,
  LogEntry,
  PaginatedResponse,
  SearchParams
} from '@/types/mcp';

// API Service Klasse
class ApiService {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_MCP_SERVER_URL || 'http://localhost:3000';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request Interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Hier können Sie Auth-Token hinzufügen
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  // Fehlerbehandlung
  private handleApiError(error: AxiosError) {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      
      // Spezielle Fehlerbehandlung basierend auf Status Code
      switch (error.response.status) {
        case 401:
          // Unauthorized - zur Login-Seite weiterleiten
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden - Berechtigungsfehler
          console.error('Keine Berechtigung für diese Aktion');
          break;
        case 404:
          // Not Found
          console.error('Ressource nicht gefunden');
          break;
        case 500:
          // Internal Server Error
          console.error('Server-Fehler aufgetreten');
          break;
        default:
          console.error('Unbekannter API-Fehler');
      }
    } else if (error.request) {
      console.error('Keine Antwort vom Server erhalten');
    } else {
      console.error('Fehler bei der Anfrage:', error.message);
    }
  }

  // Generische API-Aufrufe
  private async get<T>(endpoint: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Server Information
  async getServerInfo(): Promise<ApiResponse<any>> {
    return this.get('/api/server/info');
  }

  // Module Management
  async getModules(): Promise<ApiResponse<ApiModule[]>> {
    return this.get('/api/modules');
  }

  async getModule(id: string): Promise<ApiResponse<ApiModule>> {
    return this.get(`/api/modules/${id}`);
  }

  async updateModule(id: string, data: Partial<ApiModule>): Promise<ApiResponse<ApiModule>> {
    return this.put(`/api/modules/${id}`, data);
  }

  async toggleModule(id: string, enabled: boolean): Promise<ApiResponse<ApiModule>> {
    return this.put(`/api/modules/${id}/toggle`, { enabled });
  }

  async getModuleTools(moduleId: string): Promise<ApiResponse<Tool[]>> {
    return this.get(`/api/modules/${moduleId}/tools`);
  }

  // Schema Management
  async getSchemaFiles(): Promise<ApiResponse<SchemaFile[]>> {
    return this.get('/api/schemas');
  }

  async getSchemaFile(path: string): Promise<ApiResponse<SchemaFile>> {
    return this.get(`/api/schemas/file`, { path });
  }

  async updateSchemaFile(path: string, content: string): Promise<ApiResponse<SchemaFile>> {
    return this.put(`/api/schemas/file`, { path, content });
  }

  async validateSchema(content: string, type: 'yaml' | 'json'): Promise<ApiResponse<any>> {
    return this.post('/api/schemas/validate', { content, type });
  }

  async createSchemaFile(data: Partial<SchemaFile>): Promise<ApiResponse<SchemaFile>> {
    return this.post('/api/schemas', data);
  }

  async deleteSchemaFile(path: string): Promise<ApiResponse<void>> {
    return this.delete(`/api/schemas/file?path=${encodeURIComponent(path)}`);
  }

  // API Testing
  async testApiEndpoint(request: any): Promise<ApiResponse<any>> {
    return this.post('/api/test', request);
  }

  // Configuration Management
  async getServerConfig(): Promise<ApiResponse<ServerConfig>> {
    return this.get('/api/config');
  }

  async updateServerConfig(config: Partial<ServerConfig>): Promise<ApiResponse<ServerConfig>> {
    return this.put('/api/config', config);
  }

  async getFieldConfig(): Promise<ApiResponse<any>> {
    return this.get('/api/config/fields');
  }

  async updateFieldConfig(config: any): Promise<ApiResponse<any>> {
    return this.put('/api/config/fields', config);
  }

  // Monitoring & Metrics
  async getSystemMetrics(): Promise<ApiResponse<SystemMetrics>> {
    return this.get('/api/metrics/system');
  }

  async getModuleMetrics(): Promise<ApiResponse<ModuleMetrics[]>> {
    return this.get('/api/metrics/modules');
  }

  async getLogs(params?: SearchParams): Promise<ApiResponse<PaginatedResponse<LogEntry>>> {
    return this.get('/api/logs', params);
  }

  // Search & Filter
  async searchModules(query: string, filters?: any): Promise<ApiResponse<ApiModule[]>> {
    return this.post('/api/modules/search', { query, filters });
  }

  async searchTools(query: string, moduleId?: string): Promise<ApiResponse<Tool[]>> {
    return this.post('/api/tools/search', { query, moduleId });
  }

  // File Operations
  async uploadFile(file: File, path: string): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    try {
      const response = await this.client.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async downloadFile(path: string): Promise<Blob> {
    try {
      const response = await this.client.get(`/api/files/download?path=${encodeURIComponent(path)}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/api/health');
      return true;
    } catch {
      return false;
    }
  }

  // Utility Methods
  getBaseURL(): string {
    return this.baseURL;
  }

  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    localStorage.removeItem('authToken');
    delete this.client.defaults.headers.common.Authorization;
  }
}

// Singleton-Instanz exportieren
export const apiService = new ApiService();

// Hilfsfunktionen für häufige Operationen
export const api = {
  // Module
  modules: {
    getAll: () => apiService.getModules(),
    getById: (id: string) => apiService.getModule(id),
    update: (id: string, data: Partial<ApiModule>) => apiService.updateModule(id, data),
    toggle: (id: string, enabled: boolean) => apiService.toggleModule(id, enabled),
    getTools: (moduleId: string) => apiService.getModuleTools(moduleId),
    search: (query: string, filters?: any) => apiService.searchModules(query, filters),
  },

  // Schemas
  schemas: {
    getAll: () => apiService.getSchemaFiles(),
    getFile: (path: string) => apiService.getSchemaFile(path),
    updateFile: (path: string, content: string) => apiService.updateSchemaFile(path, content),
    validate: (content: string, type: 'yaml' | 'json') => apiService.validateSchema(content, type),
    create: (data: Partial<SchemaFile>) => apiService.createSchemaFile(data),
    delete: (path: string) => apiService.deleteSchemaFile(path),
  },

  // Konfiguration
  config: {
    get: () => apiService.getServerConfig(),
    update: (config: Partial<ServerConfig>) => apiService.updateServerConfig(config),
    fields: {
      get: () => apiService.getFieldConfig(),
      update: (config: any) => apiService.updateFieldConfig(config),
    },
  },

  // Monitoring
  metrics: {
    system: () => apiService.getSystemMetrics(),
    modules: () => apiService.getModuleMetrics(),
    logs: (params?: SearchParams) => apiService.getLogs(params),
  },

  // Testing
  test: (request: any) => apiService.testApiEndpoint(request),

  // Files
  files: {
    upload: (file: File, path: string) => apiService.uploadFile(file, path),
    download: (path: string) => apiService.downloadFile(path),
  },

  // Utility
  health: () => apiService.healthCheck(),
  serverInfo: () => apiService.getServerInfo(),
};

export default apiService;
