import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes conditionally without conflicts.
 * Combines clsx for conditional objects/arrays and twMerge to resolve conflicting Tailwind utilities.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
