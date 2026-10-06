import React from 'react';
import { cn } from '../../utils/cn';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
  ...props
}) {
  const variants = {
    default: 'bg-industrial-100 text-industrial-800 border-industrial-200',
    tech: 'bg-industrial-100 text-industrial-700 font-mono border-industrial-300 font-medium',
    accent: 'bg-brand-50 text-brand-700 border-brand-200 font-medium',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 font-medium',
    danger: 'bg-red-50 text-red-700 border-red-200 font-medium',
    outline: 'bg-white text-industrial-700 border-industrial-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border tracking-wide uppercase transition-colors',
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
