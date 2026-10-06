import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button, Badge } from '../components/common';

export default function PlaceholderPage({ title, phase, description }) {
  return (
    <div className="container-custom py-24 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-xl w-full text-center p-8 sm:p-10 rounded-2xl bg-white border border-industrial-200 shadow-card space-y-6">
        <div className="inline-flex p-4 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100">
          <Construction className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-center gap-2">
            <Badge variant="tech">SCHEDULED FOR {phase || 'PHASE 5'}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-industrial-950">
            {title || 'Page Under Development'}
          </h1>
          <p className="text-xs sm:text-sm text-industrial-500 leading-relaxed max-w-md mx-auto">
            {description || 'This module has been architectural planned and will be fully implemented in the upcoming phase.'}
          </p>
        </div>

        <div className="pt-4 border-t border-industrial-100 flex flex-wrap justify-center gap-3">
          <Button
            to="/"
            variant="outline"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Homepage
          </Button>

          <Button
            to="/quote"
            variant="accent"
            size="sm"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Request Quotation
          </Button>
        </div>
      </div>
    </div>
  );
}
