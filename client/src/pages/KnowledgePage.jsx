import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowRight, 
  Filter, 
  Sparkles,
  User,
  ShieldCheck
} from 'lucide-react';
import { blogService } from '../services';
import { useSEO } from '../utils/useSEO';
import Breadcrumbs from '../components/products/Breadcrumbs';
import { Input, Badge, Button, Card, Skeleton, EmptyState, Pagination } from '../components/common';

const CATEGORIES = [
  'All',
  'Polymer Engineering',
  'Material Science',
  'Manufacturing',
  'Sustainability',
  'Industry Insights',
];

export default function KnowledgePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1, limit: 9 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);

  useSEO({
    title: 'Polymer Science & Engineering Knowledge Hub — NOVA Insights',
    description: 'Explore technical whitepapers, injection molding troubleshooting, polymer degradation science, and sustainable compounding insights.',
    keywords: 'polymer science, injection molding guide, engineering plastics, plastic degradation, NOVA insights, material whitepapers',
  });

  useEffect(() => {
    fetchArticles();
  }, [currentCategory, searchQuery, currentPage]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 9,
      };
      if (currentCategory !== 'All') params.category = currentCategory;
      if (searchQuery) params.search = searchQuery;

      const res = await blogService.getArticles(params);
      if (res?.success) {
        setArticles(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      // Fallback sample data in case server is offline
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Banner Disclaimer */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-2.5 px-4 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Demonstration Platform Notice:
        </span>
        {' '}Articles, whitepapers, and engineering guides are structured demonstration technical publications.
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Knowledge Hub & Insights', href: '/knowledge' }]} />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Technical Whitepapers & Research
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Polymer Science & Application <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Knowledge Hub</span>
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              In-depth technical guides, injection molding processing parameter optimizations, polymer rheology papers, and sustainable material whitepapers.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-8 flex gap-2 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles by keyword, polymer (PA66, PEEK), or topic..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
              <Button type="submit" variant="primary">
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-slate-800 scrollbar-none">
          <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 ${
                currentCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mt-6 text-xs text-slate-400">
          <div>
            Showing <span className="font-semibold text-white">{articles.length}</span> of{' '}
            <span className="font-semibold text-white">{pagination.total || articles.length}</span> published papers
            {currentCategory !== 'All' && <span> in <span className="text-cyan-400 font-semibold">{currentCategory}</span></span>}
            {searchQuery && <span> matching "<span className="text-cyan-400 font-semibold">{searchQuery}</span>"</span>}
          </div>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 bg-slate-900 border-slate-800 space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </Card>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              icon={BookOpen}
              title="No technical articles found"
              description="Try adjusting your search keywords or switching category filters."
              action={
                <Button variant="outline" onClick={() => { setSearchInput(''); handleCategorySelect('All'); }}>
                  Reset Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {articles.map((article) => (
              <article key={article._id || article.slug} className="group">
                <Card className="h-full flex flex-col bg-slate-900/90 border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 overflow-hidden">
                  {/* Article Thumbnail / Category Top */}
                  <Link to={`/knowledge/${article.slug}`} className="block relative aspect-video bg-slate-950 overflow-hidden">
                    <img
                      src={article.coverImage || '/images/hero-polymer.jpg'}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="cyan" className="shadow-md">
                        {article.category}
                      </Badge>
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          {article.readTimeMinutes || 5} min read
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <Link to={`/knowledge/${article.slug}`}>
                        <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="mt-2.5 text-sm text-slate-400 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Footer / Author & Read Link */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                          {article.author?.name ? article.author.name.charAt(0) : 'N'}
                        </div>
                        <span className="font-medium truncate max-w-[130px]">{article.author?.name || 'NOVA Research'}</span>
                      </div>

                      <Link
                        to={`/knowledge/${article.slug}`}
                        className="inline-flex items-center text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                      >
                        Read Paper
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
