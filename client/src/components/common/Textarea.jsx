import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  className = '',
  id,
  name,
  rows = 4,
  required = false,
  ...props
}, ref) => {
  const textareaId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-xs font-semibold uppercase tracking-wider text-industrial-700 mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-md shadow-sm">
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          rows={rows}
          required={required}
          className={cn(
            'block w-full rounded-md border border-industrial-300 bg-white px-3.5 py-2.5 text-sm text-industrial-900 placeholder-industrial-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-industrial-100 disabled:cursor-not-allowed resize-y',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500 text-red-900',
            className
          )}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
          <span>•</span> {error}
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-industrial-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
