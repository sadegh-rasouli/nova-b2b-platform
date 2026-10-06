import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Keep critical above-the-fold Homepage in main bundle
import HomePage from './pages/HomePage';

// Lazy Loaded Public Pages
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const RequestQuotePage = lazy(() => import('./pages/RequestQuotePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy Loaded Admin Pages & Layout
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminQuotesPage = lazy(() => import('./pages/admin/AdminQuotesPage'));
const AdminMessagesPage = lazy(() => import('./pages/admin/AdminMessagesPage'));
const AdminArticlesPage = lazy(() => import('./pages/admin/AdminArticlesPage'));
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));

// Accessible, smooth loading fallback
function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-slate-400">
      <div className="w-8 h-8 border-3 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-3" />
      <span className="text-xs font-mono tracking-wider text-slate-500">Loading module...</span>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* Public Pages with Main Navbar + Footer Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Product Catalog */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />

          {/* RFQ & Contact */}
          <Route path="quote" element={<RequestQuotePage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* About Corporate Page */}
          <Route path="about" element={<AboutPage />} />

          {/* Knowledge Hub / Insights (Supporting both /knowledge and /insights) */}
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="knowledge/:slug" element={<ArticleDetailPage />} />
          <Route path="insights" element={<KnowledgePage />} />
          <Route path="insights/:slug" element={<ArticleDetailPage />} />

          {/* Case Studies / Industrial Projects (Supporting both /case-studies and /projects) */}
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="projects" element={<CaseStudiesPage />} />
          <Route path="projects/:slug" element={<CaseStudyDetailPage />} />
        </Route>

        {/* Admin Authentication Gateway */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Control Center */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="rfqs" element={<AdminQuotesPage />} />
          <Route path="quotes" element={<Navigate to="/admin/rfqs" replace />} />
          <Route path="contacts" element={<AdminMessagesPage />} />
          <Route path="messages" element={<Navigate to="/admin/contacts" replace />} />
          <Route path="articles" element={<AdminArticlesPage />} />
          <Route path="insights" element={<Navigate to="/admin/articles" replace />} />
          <Route path="case-studies" element={<AdminProjectsPage />} />
          <Route path="projects" element={<Navigate to="/admin/case-studies" replace />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}



