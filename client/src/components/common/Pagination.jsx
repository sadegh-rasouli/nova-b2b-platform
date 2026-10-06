import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  pageSize,
  className = '',
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4 py-4', className)}>
      {totalItems !== undefined && pageSize && (
        <div className="text-xs text-industrial-500 font-mono">
          Showing <span className="font-semibold text-industrial-800">{(currentPage - 1) * pageSize + 1}</span> to{' '}
          <span className="font-semibold text-industrial-800">{Math.min(currentPage * pageSize, totalItems)}</span> of{' '}
          <span className="font-semibold text-industrial-800">{totalItems}</span> results
        </div>
      )}

      <nav className="flex items-center gap-1" aria-label="Pagination Navigation">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center justify-center p-2 rounded-md border border-industrial-300 bg-white text-industrial-600 hover:bg-industrial-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-xs font-mono text-industrial-400">
                  ...
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={cn(
                  'h-8 min-w-[32px] px-2 text-xs font-medium rounded-md transition-colors font-mono',
                  isActive
                    ? 'bg-industrial-900 text-white font-semibold'
                    : 'bg-white border border-industrial-300 text-industrial-700 hover:bg-industrial-50'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center justify-center p-2 rounded-md border border-industrial-300 bg-white text-industrial-600 hover:bg-industrial-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
