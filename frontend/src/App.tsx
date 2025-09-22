import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Modules from '@/pages/Modules';
import Schemas from '@/pages/Schemas';
import ApiTester from '@/pages/ApiTester';
import Configuration from '@/pages/Configuration';
import Logs from '@/pages/Logs';
import NotFound from '@/pages/NotFound';
import { useAuth } from '@/hooks/useAuth';

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 Minuten
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Hier könnten Sie zur Login-Seite weiterleiten
    // Für jetzt lassen wir alle durch
    return <AuthenticatedRoutes />;
  }

  return <AuthenticatedRoutes />;
}

function AuthenticatedRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/schemas" element={<Schemas />} />
        <Route path="/api-tester" element={<ApiTester />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
