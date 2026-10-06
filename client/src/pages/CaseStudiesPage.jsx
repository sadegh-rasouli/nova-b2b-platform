import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Filter, 
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { projectService } from '../services';
import { useSEO } from '../utils/useSEO';
import Breadcrumbs from '../components/products/Breadcrumbs';
import { Badge, Button, Card, Skeleton, EmptyState } from '../components/common';

const INDUSTRIES = [
  'All',
  'Automotive & E-Mobility',
  'Electrical & Electronics',
  'Industrial & Fluid Handling',
  'Renewable Energy',
  'Consumer & Appliances',
];

export default function CaseStudiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentIndustry = searchParams.get('industry') || 'All';

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSEO({
    title: 'Industrial Case Studies & Engineering Solutions — NOVA',
    description: 'Explore demonstration engineering case studies showcasing polymer metal-replacement, cycle time reduction, and thermal performance optimization.',
    keywords: 'polymer case studies, metal replacement plastic, automotive lightweighting, PA66 case study, engineering thermoplastics',
  });

  useEffect(() => {
    fetchProjects();
  }, [currentIndustry]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (currentIndustry !== 'All') params.industry = currentIndustry;

      const res = await projectService.getProjects(params);
      if (res?.success) {
        setProjects(res.data || []);
      }
    } catch (err) {
      console.error('Error fetching case studies:', err);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndustryFilter = (industry) => {
    const params = new URLSearchParams(searchParams);
    if (industry === 'All') {
      params.delete('industry');
    } else {
      params.set('industry', industry);
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Banner Disclaimer */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-2.5 px-4 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Demonstration Platform Notice:
        </span>
        {' '}Case studies represent realistic engineering demonstration applications and composite performance benchmarks.
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Industrial Case Studies', href: '/case-studies' }]} />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-4">
              <Target className="w-3.5 h-3.5" />
              Applied Polymer Engineering
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Engineering Case Studies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Material Solutions</span>
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Discover how NOVA engineered thermoplastic compounds solve high-stress industrial challenges: from automotive metal replacement to high-voltage dielectric isolation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Industry Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-slate-800 scrollbar-none">
          <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Industry:
          </span>
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => handleIndustryFilter(ind)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 ${
                currentIndustry === ind
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="mt-6 text-xs text-slate-400">
          Showing <span className="font-semibold text-white">{projects.length}</span> industrial case studies
          {currentIndustry !== 'All' && <span> in <span className="text-cyan-400 font-semibold">{currentIndustry}</span></span>}
        </div>

        {/* Case Studies Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 bg-slate-900 border-slate-800 space-y-4">
                <Skeleton className="h-52 w-full rounded-xl" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              icon={Building2}
              title="No case studies found"
              description="No demonstration case studies match the selected industry filter."
              action={
                <Button variant="outline" onClick={() => handleIndustryFilter('All')}>
                  Show All Industries
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {projects.map((proj) => (
              <Card
                key={proj._id || proj.slug}
                className="group h-full flex flex-col bg-slate-900/90 border-slate-800 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-300 overflow-hidden"
              >
                {/* Image & Header Badges */}
                <Link to={`/case-studies/${proj.slug}`} className="block relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <Badge variant="cyan" className="shadow-md">
                      {proj.industry}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded bg-slate-950/90 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/30">
                      {proj.materialUsed}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-2">
                      Client Profile: <span className="text-slate-200">{proj.clientType}</span>
                    </div>

                    <Link to={`/case-studies/${proj.slug}`}>
                      <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                        {proj.title}
                      </h2>
                    </Link>

                    <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      <strong className="text-slate-300 font-semibold">Challenge: </strong>
                      {proj.challenge}
                    </p>

                    {/* Quantifiable Metrics Highlight Box */}
                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                        {proj.metrics.slice(0, 2).map((m, idx) => (
                          <div key={idx}>
                            <div className="text-xs font-black text-cyan-400 font-mono">{m.value}</div>
                            <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Read More Link */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Case Study Spec</span>
                    <Link
                      to={`/case-studies/${proj.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    >
                      View Deep Dive
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Compounding Consultation Banner */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Have a Similar Engineering Challenge?</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Our application development team can formulate custom reinforced polymers tailored to your mold flow requirements.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/quote">
              <Button variant="primary">
                Submit RFQ Specification
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
