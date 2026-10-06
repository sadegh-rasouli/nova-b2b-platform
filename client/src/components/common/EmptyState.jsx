import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button from './Button';
import { cn } from '../../utils/cn';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'There are no records matching your current filter criteria.',
  actionLabel,
  onAction,
  actionTo,
  className = '',
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-lg border border-dashed border-industrial-300 bg-white/50',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-industrial-100 text-industrial-500 mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold font-display text-industrial-950">
        {title}
      </h3>
      <p className="mt-1.5 text-xs text-industrial-500 max-w-sm leading-relaxed">
        {description}
      </p>
      {(actionLabel && (onAction || actionTo)) && (
        <div className="mt-6">
          <Button
            size="sm"
            variant="outline"
            onClick={onAction}
            to={actionTo}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
