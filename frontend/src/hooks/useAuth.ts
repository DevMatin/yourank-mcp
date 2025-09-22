import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  token: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
  });

  useEffect(() => {
    // Prüfen ob ein Token im localStorage existiert
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Token validieren (hier könnten Sie einen API-Call machen)
      validateToken(token);
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      // Hier würden Sie normalerweise den Token validieren
      // Für jetzt simulieren wir eine erfolgreiche Validierung
      
      // Simulierte Verzögerung
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        token,
      });
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('authToken');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
      });
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Hier würden Sie normalerweise einen Login-API-Call machen
      // Für jetzt simulieren wir einen erfolgreichen Login
      
      // Simulierte Verzögerung
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: '1',
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: 'admin',
      };
      
      localStorage.setItem('authToken', mockToken);
      
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        token: mockToken,
      });
      
      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });
  };

  const updateUser = (userData: any) => {
    setAuthState(prev => ({
      ...prev,
      user: { ...prev.user, ...userData },
    }));
  };

  return {
    ...authState,
    login,
    logout,
    updateUser,
  };
}
