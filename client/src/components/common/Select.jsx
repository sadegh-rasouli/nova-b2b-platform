import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  className = '',
  id,
  name,
  placeholder = 'Select an option',
  required = false,
  children,
  ...props
}, ref) => {
  const selectId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-xs font-semibold uppercase tracking-wider text-industrial-700 mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-md shadow-sm">
        <select
          ref={ref}
          id={selectId}
          name={name}
          required={required}
          className={cn(
            'block w-full appearance-none rounded-md border border-industrial-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-industrial-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-industrial-100 disabled:cursor-not-allowed',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500 text-red-900',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.length > 0
            ? options.map((opt) => {
                const isObj = typeof opt === 'object';
                const value = isObj ? opt.value : opt;
                const label = isObj ? opt.label : opt;
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })
            : children}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-industrial-400">
          <ChevronDown className="h-4 w-4" />
        </div>
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

Select.displayName = 'Select';

export default Select;
