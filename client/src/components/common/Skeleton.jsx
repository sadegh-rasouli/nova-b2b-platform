import React from 'react';
import { cn } from '../../utils/cn';

export default function Skeleton({
  className = '',
  ...props
}) {
  return (
    <div
      className={cn('animate-pulse rounded bg-industrial-200/80', className)}
      {...props}
    />
  );
}

Skeleton.Text = function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
};

Skeleton.Card = function SkeletonCard({ className = '' }) {
  return (
    <div className={cn('p-6 rounded-lg border border-industrial-200 bg-white space-y-4 shadow-subtle', className)}>
      <Skeleton className="h-44 w-full rounded-md" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton.Text lines={2} />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-20 rounded" />
        <Skeleton className="h-8 w-24 rounded" />
      </div>
    </div>
  );
};

Skeleton.TableRow = function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr className="border-b border-industrial-100 animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
};
