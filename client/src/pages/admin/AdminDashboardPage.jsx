import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  FileText, 
  Mail, 
  BookOpen, 
  Briefcase, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Card, Badge, Button, Skeleton } from '../../components/common';

export default function AdminDashboardPage() {
  useSEO({
    title: 'Executive Dashboard — NOVA Control Center',
  });

  const { error: toastError } = useToast();
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getDashboardStats();
      if (res?.success) {
        setStatsData(res.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      toastError(err.message || 'Failed to load executive statistics.');
    } finally {
      setIsLoading(false);
    }
  };

  const summary = statsData?.summary || {
    totalProducts: 12,
    activeProducts: 12,
    totalQuotes: 0,
    newQuotes: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalArticles: 6,
    totalProjects: 5,
    totalUsers: 1,
  };

  const metricCards = [
    {
      title: 'Material Products',
      value: summary.totalProducts,
      sub: `${summary.activeProducts} active grades`,
      icon: Layers,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      href: '/admin/products',
    },
    {
      title: 'Quotation RFQs',
      value: summary.totalQuotes,
      sub: `${summary.newQuotes} new pending`,
      icon: FileText,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      href: '/admin/rfqs',
    },
    {
      title: 'Contact Messages',
      value: summary.totalMessages,
      sub: `${summary.unreadMessages} unread inquiries`,
      icon: Mail,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
      href: '/admin/contacts',
    },
    {
      title: 'Technical Whitepapers',
      value: summary.totalArticles,
      sub: 'Published papers',
      icon: BookOpen,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      href: '/admin/articles',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Operations Dashboard</h1>
            <Badge variant="cyan">Live Metrics</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time material catalog, quotation pipeline, and customer inquiry overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchStats} disabled={isLoading}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Link to="/products" target="_blank">
            <Button variant="primary" size="sm">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Public Catalog
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link key={idx} to={card.href} className="block group">
              <Card className="p-5 bg-slate-900 border-slate-800 hover:border-cyan-500/40 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{card.title}</span>
                  <div className={`p-2 rounded-lg border ${card.bg} ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  {isLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <div className="text-2xl lg:text-3xl font-black text-white font-mono">{card.value}</div>
                  )}
                  <div className="text-[11px] text-slate-400 mt-1">{card.sub}</div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent RFQs & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent RFQs Table (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Recent Quotation Requests (RFQs)</h2>
            </div>
            <Link to="/admin/rfqs" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              View all RFQs <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            {isLoading ? (
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : !statsData?.recentQuotes || statsData.recentQuotes.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No recent quotation requests recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">RFQ Ref</th>
                      <th className="py-3 px-4">Client / Company</th>
                      <th className="py-3 px-4">Material Grade</th>
                      <th className="py-3 px-4">Volume</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {statsData.recentQuotes.map((q) => (
                      <tr key={q._id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                          <Link to="/admin/rfqs">{q.quoteNumber}</Link>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{q.companyName}</div>
                          <div className="text-[11px] text-slate-400">{q.fullName}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-mono">{q.productName}</td>
                        <td className="py-3 px-4 text-slate-300">{q.quantity} {q.unit}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              q.status === 'new'
                                ? 'cyan'
                                : q.status === 'quoted'
                                ? 'emerald'
                                : 'slate'
                            }
                            className="capitalize text-[10px]"
                          >
                            {q.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Recent Inquiries Feed (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <h2 className="text-base font-bold text-white">Recent Customer Messages</h2>
            </div>
            <Link to="/admin/contacts" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <Card className="bg-slate-900 border-slate-800 divide-y divide-slate-800/60">
            {isLoading ? (
              <div className="p-6 space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : !statsData?.recentMessages || statsData.recentMessages.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No recent customer messages recorded.
              </div>
            ) : (
              statsData.recentMessages.map((msg) => (
                <div key={msg._id} className="p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{msg.name}</span>
                    <Badge variant={msg.isRead ? 'slate' : 'cyan'} className="text-[10px]">
                      {msg.isRead ? 'Read' : 'New Unread'}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-1 truncate">{msg.subject}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{msg.company || msg.email}</span>
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
