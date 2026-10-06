import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl',
  className = '',
  showClose = true,
}) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalTitleId = title ? `modal-title-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : undefined;

  return (
    <div 
      className="fixed inset-0 z-[999] overflow-y-auto bg-industrial-950/60 backdrop-blur-sm flex min-h-full items-center justify-center p-4 text-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
    >
      <div
        className={cn(
          'w-full transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-modal transition-all border border-industrial-200 animate-slide-up',
          maxWidth,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between border-b border-industrial-100 px-6 py-4">
            <div>
              {title && (
                <h3 id={modalTitleId} className="text-lg font-bold font-display text-industrial-950">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-xs text-industrial-500">
                  {subtitle}
                </p>
              )}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1.5 text-industrial-400 hover:bg-industrial-100 hover:text-industrial-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}


        {/* Modal Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
