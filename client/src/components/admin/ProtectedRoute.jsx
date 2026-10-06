import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../common';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono text-slate-400">Verifying administrator credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/admin/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 p-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">403 — Access Forbidden</h1>
        <p className="text-sm text-slate-400 max-w-md mt-2">
          Your account does not have administrator privileges to access the NOVA Management Portal.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return children;
}
