import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const Button = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  to,
  href,
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  // Variant styles
  const variants = {
    primary: 'bg-industrial-900 text-white hover:bg-industrial-800 active:bg-industrial-950 border-transparent shadow-sm',
    accent: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 border-transparent shadow-sm',
    secondary: 'bg-industrial-100 text-industrial-800 hover:bg-industrial-200 active:bg-industrial-300 border-transparent',
    outline: 'bg-white text-industrial-800 border-industrial-300 hover:bg-industrial-50 hover:border-industrial-400 active:bg-industrial-100',
    ghost: 'bg-transparent text-industrial-700 hover:bg-industrial-100 active:bg-industrial-200 border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-transparent shadow-sm',
  };

  // Size styles
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs rounded',
    sm: 'px-3 py-1.5 text-xs font-medium rounded-md',
    md: 'px-4 py-2 text-sm font-medium rounded-md',
    lg: 'px-6 py-3 text-base font-semibold rounded-lg',
  };

  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-normal transition-all duration-150 border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

  const combinedClasses = cn(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  const content = (
    <>
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
      )}
      {!isLoading && leftIcon && (
        <span className="mr-2 inline-flex items-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="ml-2 inline-flex items-center">{rightIcon}</span>
      )}
    </>
  );

  // Render as React Router Link if `to` is provided
  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} ref={ref} {...props}>
        {content}
      </Link>
    );
  }

  // Render as External Anchor if `href` is provided
  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} ref={ref} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
