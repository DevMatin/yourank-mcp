// MCP Server Grundtypen
export interface McpServerInfo {
  name: string;
  version: string;
  capabilities: Record<string, any>;
}

// API Module Typen
export interface ApiModule {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'error';
  enabled: boolean;
  tools: Tool[];
  config: ModuleConfig;
  lastUpdated: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  inputSchema: ToolSchema;
  outputSchema: ToolSchema;
  category: string;
  tags: string[];
}

export interface ToolSchema {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean';
  properties?: Record<string, SchemaProperty>;
  required?: string[];
  items?: ToolSchema;
  format?: string;
  enum?: any[];
}

export interface SchemaProperty {
  type: string;
  description?: string;
  default?: any;
  format?: string;
  enum?: any[];
  items?: ToolSchema;
  properties?: Record<string, SchemaProperty>;
}

export interface ModuleConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  customHeaders?: Record<string, string>;
}

// Schema Editor Typen
export interface SchemaFile {
  id: string;
  name: string;
  path: string;
  content: string;
  type: 'yaml' | 'json' | 'ts';
  lastModified: string;
  size: number;
  version: string;
}

export interface SchemaValidationResult {
  isValid: boolean;
  errors: SchemaError[];
  warnings: SchemaWarning[];
}

export interface SchemaError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface SchemaWarning {
  line: number;
  column: number;
  message: string;
  suggestion?: string;
}

// API Tester Typen
export interface ApiTestRequest {
  toolId: string;
  moduleId: string;
  parameters: Record<string, any>;
  headers?: Record<string, string>;
}

export interface ApiTestResponse {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
  responseTime: number;
  timestamp: string;
  headers?: Record<string, string>;
}

// Konfiguration Typen
export interface ServerConfig {
  fieldConfig: FieldConfig;
  environment: EnvironmentConfig;
  modules: ModuleConfig[];
  apiCredentials: ApiCredentials;
}

export interface FieldConfig {
  enabledFields: string[];
  disabledFields: string[];
  customMappings: Record<string, string>;
  fieldPriorities: Record<string, number>;
}

export interface EnvironmentConfig {
  nodeEnv: string;
  port: number;
  host: string;
  logLevel: string;
  enableCors: boolean;
  rateLimit: RateLimitConfig;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message: string;
}

export interface ApiCredentials {
  dataforseo: {
    username: string;
    password: string;
  };
  google?: {
    apiKey: string;
    searchEngineId?: string;
  };
  bing?: {
    apiKey: string;
  };
  [key: string]: any;
}

// Dashboard Typen
export interface SystemMetrics {
  uptime: number;
  memoryUsage: number;
  cpuUsage: number;
  activeConnections: number;
  totalRequests: number;
  errorRate: number;
}

export interface ModuleMetrics {
  moduleId: string;
  requestCount: number;
  errorCount: number;
  averageResponseTime: number;
  lastRequest: string;
  status: 'healthy' | 'warning' | 'error';
}

// Navigation Typen
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  children?: NavigationItem[];
  badge?: string;
  disabled?: boolean;
}

// Form Typen
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'password';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: ValidationRule[];
  defaultValue?: any;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

// Error Typen
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

// Response Typen
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
}

// Pagination Typen
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter Typen
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  name: string;
  label: string;
  options: FilterOption[];
  multiple?: boolean;
  defaultValue?: string | string[];
}

// Search Typen
export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  pagination?: PaginationParams;
}

// Log Typen
export interface LogEntry {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  module?: string;
  tool?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

// User Typen
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
}

// Settings Typen
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'de' | 'en';
  timezone: string;
  notifications: NotificationSettings;
  display: DisplaySettings;
}

export interface NotificationSettings {
  email: boolean;
  browser: boolean;
  slack?: boolean;
  webhook?: string;
}

export interface DisplaySettings {
  compactMode: boolean;
  showAdvanced: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}
