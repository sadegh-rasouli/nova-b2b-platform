import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft, Layers, BookOpen, Mail } from 'lucide-react';
import { Button, Card } from '../components/common';
import { useSEO } from '../utils/useSEO';

export default function NotFoundPage() {
  useSEO({
    title: '404 — Page Not Found',
    description: 'The requested page or technical material specification could not be located.',
    noindex: true,
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="inline-flex p-4 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-lg">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-5xl sm:text-6xl font-black font-mono text-cyan-400 tracking-tight">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Material Resource Not Found
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The technical specification, article, or portal page you are looking for has been moved, renamed, or is unavailable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <Link to="/products" className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-colors block">
            <Layers className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="text-xs font-bold text-white">Materials Catalog</div>
            <div className="text-[10px] text-slate-400">12+ Polymer Grades</div>
          </Link>
          <Link to="/knowledge" className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-colors block">
            <BookOpen className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="text-xs font-bold text-white">Knowledge Hub</div>
            <div className="text-[10px] text-slate-400">Whitepapers & TDS</div>
          </Link>
          <Link to="/contact" className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-colors block">
            <Mail className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="text-xs font-bold text-white">Engineering Desk</div>
            <div className="text-[10px] text-slate-400">Direct Consultation</div>
          </Link>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <Link to="/">
            <Button variant="primary" size="md">
              <Home className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
