import React from 'react';
import { cn } from '../../utils/cn';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-industrial-200 bg-white text-industrial-900 shadow-subtle transition-all duration-200',
        hoverEffect && 'hover:border-industrial-300 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6 border-b border-industrial-100', className)} {...props}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={cn('text-lg font-bold font-display text-industrial-950 tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={cn('text-xs text-industrial-500 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
};

Card.Body = function CardBody({ children, className = '', ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={cn('flex items-center p-6 pt-0 border-t border-industrial-100 mt-4', className)} {...props}>
      {children}
    </div>
  );
};
