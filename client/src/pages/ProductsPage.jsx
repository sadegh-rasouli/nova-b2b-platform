import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, SlidersHorizontal, X, AlertCircle } from 'lucide-react';
import { productService } from '../services';
import { mockProducts } from '../data/mockData';
import { useSEO } from '../utils/useSEO';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import Breadcrumbs from '../components/products/Breadcrumbs';
import { Skeleton, EmptyState, Pagination, Button, Badge } from '../components/common';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active filter state synced with URL search params
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    polymerFamily: searchParams.get('polymerFamily') || 'All',
    industry: searchParams.get('industry') || 'All',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'createdAt_desc',
    page: parseInt(searchParams.get('page'), 10) || 1,
  });

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1, limit: 12 });
  const [availableFilters, setAvailableFilters] = useState({
    polymerFamilies: ['Polyamide 66', 'Polyetheretherketone (PEEK)', 'Polypropylene Copolymer', 'Acrylonitrile Butadiene Styrene (ABS)', 'Thermoplastic Polyurethane (TPU)', 'Polylactic Acid (PLA Compound)', 'Polyethylene Terephthalate (PET)', 'High-Density Polyethylene (HDPE)', 'Linear Low-Density Polyethylene (LLDPE)'],
    industries: ['Automotive', 'Medical & Healthcare', 'Electronics', 'Packaging', 'Manufacturing', 'Consumer Products'],
  });
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // SEO Management
  useSEO({
    title: filters.category !== 'All' ? `${filters.category} Catalog` : 'Industrial Materials Catalog',
    description: 'Explore high-performance polymer granules, engineered composites, and specialized industrial compounds with verified technical data sheets.',
    keywords: 'polymer catalog, PA66-GF30, PEEK granules, polypropylene copolymer, industrial compounds',
  });

  // Sync state changes to URL query parameters
  const updateUrlParams = useCallback((newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category && newFilters.category !== 'All') params.set('category', newFilters.category);
    if (newFilters.polymerFamily && newFilters.polymerFamily !== 'All') params.set('polymerFamily', newFilters.polymerFamily);
    if (newFilters.industry && newFilters.industry !== 'All') params.set('industry', newFilters.industry);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.sort && newFilters.sort !== 'createdAt_desc') params.set('sort', newFilters.sort);
    if (newFilters.page && newFilters.page > 1) params.set('page', newFilters.page);
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value, page: 1 };
    setFilters(updated);
    updateUrlParams(updated);
  };

  const handleResetFilters = () => {
    const resetState = {
      category: 'All',
      polymerFamily: 'All',
      industry: 'All',
      search: '',
      sort: 'createdAt_desc',
      page: 1,
    };
    setFilters(resetState);
    updateUrlParams(resetState);
  };

  const handlePageChange = (newPage) => {
    const updated = { ...filters, page: newPage };
    setFilters(updated);
    updateUrlParams(updated);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Fetch data from API with resilient client-side filtering fallback
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchCatalog() {
      try {
        const response = await productService.getProducts(filters);
        if (isMounted && response?.data) {
          setProducts(response.data);
          if (response.pagination) setPagination(response.pagination);
          if (response.filters) {
            setAvailableFilters({
              polymerFamilies: response.filters.availablePolymerFamilies || availableFilters.polymerFamilies,
              industries: response.filters.availableIndustries || availableFilters.industries,
            });
          }
        }
      } catch (err) {
        // Fallback to client-side filtering over mock dataset
        if (isMounted) {
          let filtered = [...mockProducts];

          if (filters.category !== 'All') {
            filtered = filtered.filter((p) => p.category === filters.category);
          }
          if (filters.polymerFamily !== 'All') {
            filtered = filtered.filter((p) => p.polymerFamily === filters.polymerFamily);
          }
          if (filters.industry !== 'All') {
            filtered = filtered.filter((p) => p.industries?.includes(filters.industry));
          }
          if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(query) ||
                p.code.toLowerCase().includes(query) ||
                p.polymerFamily.toLowerCase().includes(query)
            );
          }

          // Sorting
          if (filters.sort === 'name_asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
          if (filters.sort === 'name_desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
          if (filters.sort === 'code_asc') filtered.sort((a, b) => a.code.localeCompare(b.code));

          setProducts(filtered);
          setPagination({
            total: filtered.length,
            page: 1,
            totalPages: Math.ceil(filtered.length / 12) || 1,
            limit: 12,
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCatalog();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  return (
    <div className="bg-industrial-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-industrial-200 py-8">
        <div className="container-custom space-y-4">
          <Breadcrumbs items={[{ label: 'Materials Catalog' }]} />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight">
                Industrial Materials Catalog
              </h1>
              <p className="text-xs sm:text-sm text-industrial-600 mt-1 max-w-2xl leading-relaxed">
                Explore standardized polymer granules, engineering composites, and specialty compounds. Filter by polymer family, test standard, or industrial application.
              </p>
            </div>

            {/* View layout switches */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-industrial-100 text-industrial-800 text-xs font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="hidden sm:flex items-center rounded-lg border border-industrial-200 bg-industrial-100/60 p-1">
                <button
                  type="button"
                  onClick={() => setLayout('grid')}
                  className={`p-1.5 rounded ${layout === 'grid' ? 'bg-white shadow-xs text-industrial-900' : 'text-industrial-500 hover:text-industrial-900'}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayout('list')}
                  className={`p-1.5 rounded ${layout === 'list' ? 'bg-white shadow-xs text-industrial-900' : 'text-industrial-500 hover:text-industrial-900'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 bg-white p-6 rounded-xl border border-industrial-200 shadow-subtle">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-100 mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-industrial-900">
                Filter Materials
              </span>
              <span className="text-xs font-mono text-industrial-500">
                {products.length} Results
              </span>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              availablePolymerFamilies={availableFilters.polymerFamilies}
              availableIndustries={availableFilters.industries}
              totalCount={pagination.total}
            />
          </aside>

          {/* Mobile Filter Drawer Modal */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-industrial-950/60 backdrop-blur-sm lg:hidden flex justify-end">
              <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 animate-slide-up">
                <div className="flex items-center justify-between border-b border-industrial-100 pb-3">
                  <span className="font-bold text-sm font-display text-industrial-900">
                    Filter Materials
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1 rounded text-industrial-400 hover:text-industrial-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  availablePolymerFamilies={availableFilters.polymerFamilies}
                  availableIndustries={availableFilters.industries}
                  totalCount={pagination.total}
                />

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full"
                >
                  Apply Filters ({products.length})
                </Button>
              </div>
            </div>
          )}

          {/* Product Results Grid */}
          <div className="lg:col-span-9 space-y-8">
            {loading ? (
              <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton.Card key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No matching material grades found"
                description="Try adjusting your polymer family, category filters, or search keyword."
                actionLabel="Clear All Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {products.map((product) => (
                  <ProductCard
                    key={product._id || product.code}
                    product={product}
                    layout={layout}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && products.length > 0 && pagination.totalPages > 1 && (
              <div className="pt-4 border-t border-industrial-200">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.total}
                  pageSize={pagination.limit}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
