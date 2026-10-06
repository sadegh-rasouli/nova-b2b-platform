import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Eye, 
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Card, Badge, Button, Modal, Skeleton, EmptyState } from '../../components/common';

const CATEGORIES = [
  'Material Science',
  'Polymer Processing',
  'Sustainability & Circular Economy',
  'Industrial Supply Chain',
  'Quality Assurance & Testing',
  'Industry Trends',
];

export default function AdminArticlesPage() {
  useSEO({ title: 'Whitepaper & Article Management — NOVA Admin' });

  const { success, error: toastError } = useToast();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialForm = {
    title: '',
    category: 'Material Science',
    excerpt: '',
    content: '',
    authorName: 'Dr. Evelyn Vance',
    authorRole: 'Chief Materials Engineer',
    readTimeMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    tags: 'Polyamide, Extrusion, Rheology',
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getAllBlogPosts();
      if (res?.success) {
        setArticles(res.data || []);
      }
    } catch (err) {
      toastError(err.message || 'Failed to fetch articles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData(initialForm);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (art) => {
    setEditingArticle(art);
    setFormData({
      title: art.title || '',
      category: art.category || 'Material Science',
      excerpt: art.excerpt || '',
      content: art.content || '',
      authorName: art.author?.name || 'Dr. Evelyn Vance',
      authorRole: art.author?.role || 'Chief Materials Engineer',
      readTimeMinutes: art.readTimeMinutes || 5,
      coverImage: art.coverImage || '',
      tags: Array.isArray(art.tags) ? art.tags.join(', ') : '',
      isPublished: art.isPublished !== false,
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toastError('Please provide article title and content.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        author: {
          name: formData.authorName,
          role: formData.authorRole,
        },
        readTimeMinutes: Number(formData.readTimeMinutes),
        coverImage: formData.coverImage,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        isPublished: formData.isPublished,
      };

      if (editingArticle) {
        await adminService.updateBlogPost(editingArticle._id, payload);
        success('Article updated successfully.');
      } else {
        await adminService.createBlogPost(payload);
        success('New whitepaper created successfully.');
      }

      setIsFormModalOpen(false);
      fetchArticles();
    } catch (err) {
      toastError(err.message || 'Failed to save article');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingArticle) return;
    try {
      await adminService.deleteBlogPost(deletingArticle._id);
      success('Article deleted successfully.');
      setIsDeleteModalOpen(false);
      setDeletingArticle(null);
      fetchArticles();
    } catch (err) {
      toastError(err.message || 'Failed to delete article');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Technical Knowledge & Whitepapers</h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish and manage polymer engineering papers, molding guides, and material research articles.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Write Technical Paper
        </Button>
      </div>

      {/* Articles Table */}
      <Card className="bg-slate-900 border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              icon={BookOpen}
              title="No technical papers found"
              description="Create a technical guide or whitepaper for the Knowledge Hub."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Article Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Published</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {articles.map((art) => (
                  <tr key={art._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{art.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">{art.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="cyan" className="text-[10px]">{art.category}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{art.author?.name || 'NOVA Research'}</td>
                    <td className="py-3.5 px-4 text-slate-400">{art.readTimeMinutes || 5} min</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={art.isPublished ? 'emerald' : 'slate'} className="text-[10px]">
                        {art.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/knowledge/${art.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-p-1 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View Public Paper"
                      >
                        <ExternalLink className="w-3.5 h-3.5 inline" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"
                        title="Edit Article"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => { setDeletingArticle(art); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingArticle ? 'Edit Technical Paper' : 'Write New Technical Paper'}
        size="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Injection Molding Troubleshooting: Overcoming Jetting & Warpage"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Read Time (Minutes)</label>
              <input
                type="number"
                min="1"
                value={formData.readTimeMinutes}
                onChange={(e) => setFormData({ ...formData, readTimeMinutes: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Summary / Excerpt *</label>
            <textarea
              rows={2}
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short 2-3 sentence overview..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Article Content (Markdown supported: ## Headings, - Lists, &gt; Quotes) *
            </label>
            <textarea
              rows={8}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="## Introduction\nExplain the technical challenge...\n\n### Processing Conditions\n- Melt temperature: 280°C\n- Mold temperature: 90°C"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white font-mono leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Author Name</label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="PA66, Extrusion, Rheology"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500"
            />
            <label htmlFor="isPublished" className="text-xs text-slate-300">
              Publish publicly to Knowledge Hub immediately
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="outline" type="button" onClick={() => setIsFormModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingArticle ? 'Update Paper' : 'Publish Paper'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Technical Paper"
        size="sm"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Are you sure you want to delete article <strong className="text-white">{deletingArticle?.title}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Article</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
