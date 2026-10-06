import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  ListOrdered,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { blogService } from '../services';
import { useSEO } from '../utils/useSEO';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/products/Breadcrumbs';
import { Badge, Button, Card, Skeleton } from '../components/common';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const { success } = useToast();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchArticleData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const fetchArticleData = async () => {
    setIsLoading(true);
    try {
      const res = await blogService.getArticleBySlug(slug);
      if (res?.success && res.data) {
        setArticle(res.data);
        setRelated(res.related || []);
      }
    } catch (err) {
      console.error('Error fetching article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useSEO({
    title: article?.seoTitle || (article ? `${article.title} — NOVA Technical Insights` : 'Technical Whitepaper — NOVA'),
    description: article?.seoDescription || article?.excerpt || 'Polymer engineering research paper and technical guide by NOVA Material Science.',
    keywords: article?.tags?.join(', ') || 'polymer engineering, technical whitepaper, injection molding, NOVA materials',
    ogImage: article?.coverImage,
    schema: article
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: article.coverImage,
          datePublished: article.publishedAt,
          author: {
            '@type': 'Person',
            name: article.author?.name || 'NOVA Engineering Team',
          },
          publisher: {
            '@type': 'Organization',
            name: 'NOVA B2B Platform',
          },
        }
      : null,
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      success('Article link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Parse markdown content safely into structured blocks and extract TOC headings
  const parseContent = (rawContent = '') => {
    const lines = rawContent.split('\n');
    const toc = [];
    const blocks = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        blocks.push({
          type: 'p',
          content: currentParagraph.join(' '),
        });
        currentParagraph = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        flushParagraph();
        const headingText = trimmed.replace(/^###\s+/, '');
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        toc.push({ level: 3, title: headingText, id });
        blocks.push({ type: 'h3', content: headingText, id });
      } else if (trimmed.startsWith('## ')) {
        flushParagraph();
        const headingText = trimmed.replace(/^##\s+/, '');
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        toc.push({ level: 2, title: headingText, id });
        blocks.push({ type: 'h2', content: headingText, id });
      } else if (trimmed.startsWith('# ')) {
        flushParagraph();
        const headingText = trimmed.replace(/^#\s+/, '');
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        toc.push({ level: 1, title: headingText, id });
        blocks.push({ type: 'h1', content: headingText, id });
      } else if (trimmed.startsWith('> ')) {
        flushParagraph();
        blocks.push({
          type: 'blockquote',
          content: trimmed.replace(/^>\s+/, ''),
        });
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        flushParagraph();
        blocks.push({
          type: 'bullet',
          content: trimmed.replace(/^[-*]\s+/, ''),
        });
      } else if (trimmed === '') {
        flushParagraph();
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph();
    return { toc, blocks };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-80 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 py-20 px-4 text-center">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <p className="text-slate-400 mt-2">The requested technical paper does not exist or has been archived.</p>
        <Link to="/knowledge" className="mt-6 inline-block">
          <Button variant="primary">Return to Knowledge Hub</Button>
        </Link>
      </div>
    );
  }

  const { toc, blocks } = parseContent(article.content);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      {/* Top Notice */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-2.5 px-4 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Demonstration Platform Notice:
        </span>
        {' '}This technical whitepaper is demonstration engineering documentation.
      </div>

      {/* Header Container */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Knowledge Hub', href: '/knowledge' },
              { label: article.category, href: `/knowledge?category=${encodeURIComponent(article.category)}` },
              { label: article.title, href: `/knowledge/${article.slug}` },
            ]}
          />

          <div className="mt-8">
            <Badge variant="cyan" className="mb-4">
              {article.category}
            </Badge>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author & Meta Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={article.author?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'}
                  alt={article.author?.name || 'Author'}
                  className="w-11 h-11 rounded-full object-cover border border-cyan-500/30"
                />
                <div>
                  <div className="text-sm font-bold text-white">{article.author?.name || 'Dr. Evelyn Vance'}</div>
                  <div className="text-xs text-slate-400">{article.author?.role || 'Lead Materials Research Engineer'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {article.readTimeMinutes || 5} min read
                </span>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
                  {copied ? 'Copied' : 'Share'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: TOC Sidebar + Article Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents (Sticky on Desktop) */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              {toc.length > 0 && (
                <Card className="p-5 bg-slate-900/90 border-slate-800 shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                    <ListOrdered className="w-4 h-4 text-cyan-400" />
                    Table of Contents
                  </div>
                  <nav className="space-y-1.5">
                    {toc.map((heading, i) => (
                      <a
                        key={i}
                        href={`#${heading.id}`}
                        className={`block text-xs py-1 transition-colors ${
                          heading.level === 3 ? 'pl-3 text-slate-400' : 'text-slate-300 font-medium'
                        } hover:text-cyan-400`}
                      >
                        {heading.title}
                      </a>
                    ))}
                  </nav>
                </Card>
              )}

              {/* Quick RFQ CTA Card */}
              <Card className="p-5 bg-gradient-to-br from-slate-950 to-slate-900 border-cyan-500/20 text-center">
                <BookOpen className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Support</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Have questions about formulation or resin selection for your tooling?
                </p>
                <Link to="/quote" className="block mt-4">
                  <Button variant="primary" size="sm" className="w-full text-xs">
                    Submit RFQ Inquiry
                  </Button>
                </Link>
              </Card>
            </div>
          </aside>

          {/* Article Main Body */}
          <main className="lg:col-span-9 order-1 lg:order-2">
            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 mb-8 bg-slate-950 shadow-2xl">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Structured Content Blocks (Safe render, no unsafe HTML injection) */}
            <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed">
              {blocks.map((block, idx) => {
                switch (block.type) {
                  case 'h1':
                    return (
                      <h2
                        key={idx}
                        id={block.id}
                        className="text-2xl font-extrabold text-white mt-10 mb-4 pt-6 border-t border-slate-800 scroll-mt-24"
                      >
                        {block.content}
                      </h2>
                    );
                  case 'h2':
                    return (
                      <h3
                        key={idx}
                        id={block.id}
                        className="text-xl font-bold text-cyan-300 mt-8 mb-3 scroll-mt-24"
                      >
                        {block.content}
                      </h3>
                    );
                  case 'h3':
                    return (
                      <h4
                        key={idx}
                        id={block.id}
                        className="text-lg font-semibold text-white mt-6 mb-2 scroll-mt-24"
                      >
                        {block.content}
                      </h4>
                    );
                  case 'blockquote':
                    return (
                      <blockquote
                        key={idx}
                        className="my-6 pl-4 border-l-2 border-cyan-500 bg-cyan-500/5 py-3 pr-4 rounded-r-lg text-sm text-cyan-200 italic"
                      >
                        {block.content}
                      </blockquote>
                    );
                  case 'bullet':
                    return (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-300 pl-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{block.content}</span>
                      </div>
                    );
                  case 'p':
                  default:
                    return (
                      <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {block.content}
                      </p>
                    );
                }
              })}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-bold text-slate-400 mr-2">Tags:</span>
                {article.tags.map((tag, idx) => (
                  <Link key={idx} to={`/knowledge?search=${encodeURIComponent(tag)}`}>
                    <Badge variant="slate" className="hover:border-cyan-500/40 cursor-pointer">
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="cyan" className="mb-2">Further Reading</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Related Technical Whitepapers</h3>
              </div>
              <Link to="/knowledge" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                View all papers
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.slug} to={`/knowledge/${rel.slug}`}>
                  <Card className="h-full p-5 bg-slate-900 border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <Badge variant="slate" className="text-[11px] mb-2">{rel.category}</Badge>
                      <h4 className="text-sm font-bold text-white line-clamp-2 hover:text-cyan-400 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{rel.readTimeMinutes || 5} min read</span>
                      <span className="text-cyan-400 font-medium">Read Paper →</span>
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
