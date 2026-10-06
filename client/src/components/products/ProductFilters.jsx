import React from 'react';
import { Search, X, RotateCcw, Filter, Check } from 'lucide-react';
import { Input, Select, Button, Badge } from '../common';
import { cn } from '../../utils/cn';

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  availablePolymerFamilies = [],
  availableIndustries = [],
  totalCount = 0,
  className = '',
}) {
  const categories = [
    'All',
    'Polymer Granules',
    'Engineering Materials',
    'Industrial Compounds',
    'Custom Materials',
  ];

  const sortOptions = [
    { value: 'createdAt_desc', label: 'Newest Releases' },
    { value: 'name_asc', label: 'Product Name (A – Z)' },
    { value: 'name_desc', label: 'Product Name (Z – A)' },
    { value: 'code_asc', label: 'Grade Code (A – Z)' },
  ];

  const hasActiveFilters = 
    filters.category !== 'All' || 
    filters.polymerFamily !== 'All' || 
    filters.industry !== 'All' || 
    Boolean(filters.search);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Search by grade code, name, or polymer (e.g. PA66, PEEK)..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-industrial-400" />}
          rightIcon={
            filters.search ? (
              <button
                type="button"
                onClick={() => onFilterChange('search', '')}
                className="text-industrial-400 hover:text-industrial-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null
          }
        />
      </div>

      {/* Category Pills */}
      <div className="space-y-2.5">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-industrial-700">
          Material Category
        </label>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange('category', cat)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all text-left',
                  isSelected
                    ? 'bg-industrial-900 text-white font-semibold shadow-sm'
                    : 'bg-white border border-industrial-200 text-industrial-700 hover:bg-industrial-50'
                )}
              >
                <span>{cat === 'All' ? 'All Categories' : cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dropdown Filters: Polymer Family & Industry */}
      <div className="space-y-4 pt-2 border-t border-industrial-200">
        <Select
          label="Polymer Family"
          value={filters.polymerFamily}
          onChange={(e) => onFilterChange('polymerFamily', e.target.value)}
          options={[
            { value: 'All', label: 'All Polymer Families' },
            ...availablePolymerFamilies.map((fam) => ({ value: fam, label: fam })),
          ]}
        />

        <Select
          label="Target Industry"
          value={filters.industry}
          onChange={(e) => onFilterChange('industry', e.target.value)}
          options={[
            { value: 'All', label: 'All Target Industries' },
            ...availableIndustries.map((ind) => ({ value: ind, label: ind })),
          ]}
        />

        <Select
          label="Sort Results"
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          options={sortOptions}
        />
      </div>

      {/* Filter Reset Button */}
      {hasActiveFilters && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-full text-xs"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
