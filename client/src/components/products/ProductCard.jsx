import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { Badge, Button, Card, MaterialImage } from '../common';
import { cn } from '../../utils/cn';

export default function ProductCard({ product, layout = 'grid', className = '' }) {
  if (!product) return null;

  const isList = layout === 'list';

  return (
    <Card
      hoverEffect
      className={cn(
        'overflow-hidden border-industrial-200 group flex transition-all duration-200 bg-white',
        isList ? 'flex-col sm:flex-row items-stretch' : 'flex-col justify-between',
        className
      )}
    >
      {/* Product Image Area */}
      <div 
        className={cn(
          'relative bg-slate-900 overflow-hidden flex-shrink-0',
          isList ? 'w-full sm:w-64 h-48 sm:h-auto' : 'w-full h-48'
        )}
      >
        <MaterialImage
          src={product.featuredImage}
          alt={product.name}
          code={product.code}
          category={product.category}
          className="w-full h-full"
          imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          showBadge={false}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="tech" className="bg-white/95 backdrop-blur-sm shadow-sm font-semibold">
            {product.code}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge variant="accent" className="shadow-sm">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-500">
            <span>Family:</span>
            <strong className="text-industrial-800">{product.polymerFamily}</strong>
          </div>

          <h3 className="text-base sm:text-lg font-bold font-display text-industrial-950 group-hover:text-brand-600 transition-colors">
            <Link to={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-industrial-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Specifications Matrix Preview */}
        {product.specifications?.length > 0 && (
          <div className="p-3 bg-industrial-50 rounded-lg border border-industrial-100 space-y-1.5 font-mono text-xs">
            {product.specifications.slice(0, 3).map((spec) => (
              <div key={spec.label} className="flex justify-between items-center text-[11px]">
                <span className="text-industrial-500">{spec.label}:</span>
                <span className="font-bold text-industrial-900">
                  {spec.value} {spec.unit}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Row */}
        {product.certifications?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.certifications.slice(0, 3).map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1 text-[10px] font-mono text-industrial-600 bg-industrial-100 px-2 py-0.5 rounded"
              >
                <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-industrial-100 flex items-center justify-between gap-3">
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 font-mono"
          >
            <span>Technical TDS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Button
            to={`/quote?product=${encodeURIComponent(product.name)}&code=${encodeURIComponent(product.code)}`}
            size="sm"
            variant="outline"
          >
            Request Quote
          </Button>
        </div>
      </div>
    </Card>
  );
}
