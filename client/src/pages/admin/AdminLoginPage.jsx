import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Input, Button, Card, Badge } from '../../components/common';

export default function AdminLoginPage() {
  useSEO({
    title: 'Admin Portal Login — NOVA B2B Platform',
    description: 'Secure authentication gateway for NOVA materials management and quotation pipeline operations.',
  });

  const { login, isAuthenticated } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl = new URLSearchParams(location.search).get('redirect') || '/admin';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password) {
      setErrorMessage('Please provide both administrative email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(formData.email, formData.password);
      success('Authentication successful. Welcome to NOVA Control Center.');
      navigate(redirectUrl, { replace: true });
    } catch (err) {
      const msg = err.message || 'Authentication failed. Please verify your credentials.';
      setErrorMessage(msg);
      toastError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@nova-materials.com',
      password: 'AdminPassword123!',
    });
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="font-extrabold text-3xl tracking-tight text-white font-display">
              NOVA<span className="text-cyan-400">.</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              OPERATIONS
            </span>
          </Link>
          <h2 className="mt-6 text-2xl font-extrabold text-white tracking-tight">
            Admin Portal Authentication
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Sign in to manage polymer catalog, review RFQs, and oversee operations.
          </p>
        </div>

        <Card className="mt-8 p-8 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@nova-materials.com"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Verifying Session...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Control Center
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Demo Platform Testing Helper</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Auto-fill Seeder Admin Credentials
            </button>
          </div>
        </Card>

        {/* Back to Live Website */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
            ← Return to NOVA Public Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
