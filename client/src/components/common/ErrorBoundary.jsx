import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an unhandled React rendering error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                System Interface Notice
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unexpected component rendering error occurred. The application state has been isolated to prevent session disruption.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button variant="primary" size="sm" onClick={this.handleReload} className="w-full sm:w-auto">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Reload View
              </Button>
              <Button variant="outline" size="sm" onClick={this.handleGoHome} className="w-full sm:w-auto">
                <Home className="w-3.5 h-3.5 mr-1.5" />
                Return to Homepage
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
