import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  FileText,
  Check,
  Share2,
  ExternalLink,
  Target
} from 'lucide-react';
import { projectService } from '../services';
import { useSEO } from '../utils/useSEO';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/products/Breadcrumbs';
import { Badge, Button, Card, Skeleton } from '../components/common';

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const { success } = useToast();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchProjectData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const fetchProjectData = async () => {
    setIsLoading(true);
    try {
      const res = await projectService.getProjectBySlug(slug);
      if (res?.success && res.data) {
        setProject(res.data);
        setRelated(res.related || []);
      }
    } catch (err) {
      console.error('Error fetching project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useSEO({
    title: project ? `${project.title} — Industrial Engineering Case Study | NOVA` : 'Engineering Case Study — NOVA',
    description: project?.challenge || 'Detailed engineering case study demonstrating high-performance polymer compounding solutions.',
    keywords: `${project?.industry || 'polymer'}, ${project?.materialUsed || 'plastics'}, metal replacement, NOVA case studies`,
    ogImage: project?.coverImage,
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      success('Case study link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-80 w-full rounded-xl" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 py-20 px-4 text-center">
        <h1 className="text-2xl font-bold">Case Study Not Found</h1>
        <p className="text-slate-400 mt-2">The requested engineering case study does not exist or has been updated.</p>
        <Link to="/case-studies" className="mt-6 inline-block">
          <Button variant="primary">Return to Case Studies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      {/* Top Banner Notice */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-2.5 px-4 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Demonstration Platform Notice:
        </span>
        {' '}This case study showcases simulated industrial applications and composite benchmarking data.
      </div>

      {/* Header Container */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 pt-8 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Case Studies', href: '/case-studies' },
              { label: project.industry, href: `/case-studies?industry=${encodeURIComponent(project.industry)}` },
              { label: project.title, href: `/case-studies/${project.slug}` },
            ]}
          />

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="cyan">{project.industry}</Badge>
              <Badge variant="slate">{project.clientType}</Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            {/* Quick Spec & Material Bar */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Compounded Polymer Grade</div>
                  <div className="text-sm font-bold text-white font-mono">{project.materialUsed}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
                  {copied ? 'Copied' : 'Share'}
                </button>
                <Link to={`/quote?product=${encodeURIComponent(project.materialUsed)}`}>
                  <Button variant="primary" size="sm">
                    Request Quote for this Grade
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Cover Image */}
        <div className="aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-12">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quantifiable Impact Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-4 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Verified Performance Benchmarks
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((m, idx) => (
                <Card key={idx} className="p-5 bg-slate-900 border-slate-800 text-center shadow-lg">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">{m.value}</div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">{m.label}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 3-Part Technical Deep Dive */}
        <div className="space-y-10">
          {/* 1. The Challenge */}
          <Card className="p-8 bg-slate-900/80 border-slate-800">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              01. The Engineering Challenge
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Operational Constraints & Failure Vectors
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </Card>

          {/* 2. The Solution */}
          <Card className="p-8 bg-slate-900/80 border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              02. NOVA Technical Solution & Compounding
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Formulation Architecture & Process Optimization
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </Card>

          {/* 3. Results & Measured Outcomes */}
          {project.results && project.results.length > 0 && (
            <Card className="p-8 bg-slate-900/80 border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                03. Certified Technical Outcomes
              </div>
              <h3 className="text-xl font-bold text-white mb-6">
                Measurable Production & Quality Improvements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((r, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Action / Procurement Section */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Ready to Test {project.materialUsed} in Your Tooling?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Order a 25kg trial test batch or download the full ISO Technical Data Sheet (TDS).
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to={`/quote?product=${encodeURIComponent(project.materialUsed)}`}>
              <Button variant="primary">
                Request RFQ Quote
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline">
                Browse All Grades
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Case Studies */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="cyan" className="mb-2">More Solutions</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Related Case Studies in {project.industry}</h3>
              </div>
              <Link to="/case-studies" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                All case studies
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.slug} to={`/case-studies/${rel.slug}`}>
                  <Card className="h-full p-5 bg-slate-900 border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <Badge variant="slate" className="text-[11px] mb-2">{rel.materialUsed}</Badge>
                      <h4 className="text-sm font-bold text-white line-clamp-2 hover:text-cyan-400 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {rel.challenge}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{rel.industry}</span>
                      <span className="text-cyan-400 font-medium">Read Case Study →</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
