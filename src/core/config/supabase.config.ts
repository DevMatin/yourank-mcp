import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
}

class SupabaseManager {
  private static instance: SupabaseManager;
  private client: SupabaseClient | null = null;
  private serviceClient: SupabaseClient | null = null;

  private constructor() {}

  static getInstance(): SupabaseManager {
    if (!SupabaseManager.instance) {
      SupabaseManager.instance = new SupabaseManager();
    }
    return SupabaseManager.instance;
  }

  initialize(): void {
    const config: SupabaseConfig = {
      url: process.env.SUPABASE_URL || '',
      anonKey: process.env.SUPABASE_ANON_KEY || '',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    };

    if (!config.url || !config.anonKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables');
    }

    // Client for general operations
    this.client = createClient(config.url, config.anonKey);

    // Service role client for admin operations (optional)
    if (config.serviceRoleKey) {
      this.serviceClient = createClient(config.url, config.serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    }
  }

  getClient(): SupabaseClient {
    if (!this.client) {
      this.initialize();
    }
    return this.client!;
  }

  getServiceClient(): SupabaseClient {
    if (!this.serviceClient) {
      throw new Error('Service role client not available. Set SUPABASE_SERVICE_ROLE_KEY environment variable.');
    }
    return this.serviceClient;
  }

  async testConnection(): Promise<boolean> {
    try {
      const client = this.getClient();
      const { data, error } = await client.from('api_jobs').select('count').limit(1);
      return !error;
    } catch (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
  }
}

export const supabaseManager = SupabaseManager.getInstance();
export { SupabaseClient };
