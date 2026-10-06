import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Breadcrumbs({ items = [], className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn('flex items-center text-xs font-mono text-industrial-500 py-3', className)}
    >
      <ol className="inline-flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
        <li className="inline-flex items-center">
          <Link 
            to="/" 
            className="text-industrial-500 hover:text-industrial-900 inline-flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only sm:inline">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label || index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-industrial-400 mx-1 flex-shrink-0" />
              {isLast || !item.to ? (
                <span 
                  className="font-semibold text-industrial-900 line-clamp-1 max-w-[200px] sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.to} 
                  className="text-industrial-500 hover:text-industrial-900 transition-colors line-clamp-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
