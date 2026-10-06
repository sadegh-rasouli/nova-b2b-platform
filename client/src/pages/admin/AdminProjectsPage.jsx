import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Eye, 
  AlertCircle,
  TrendingUp,
  Layers
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Card, Badge, Button, Modal, Skeleton, EmptyState } from '../../components/common';

const INDUSTRIES = [
  'Automotive & E-Mobility',
  'Electrical & Electronics',
  'Industrial & Fluid Handling',
  'Renewable Energy',
  'Consumer & Appliances',
];

export default function AdminProjectsPage() {
  useSEO({ title: 'Case Studies Management — NOVA Admin' });

  const { success, error: toastError } = useToast();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialForm = {
    title: '',
    industry: 'Automotive & E-Mobility',
    clientType: 'Tier 1 Automotive Supplier',
    materialUsed: 'Novamide® PA66-GF30',
    challenge: '',
    solution: '',
    results: 'Mass reduced by 35%, Thermal resistance verified up to 210°C, Zero tooling warpage',
    metric1Label: 'Weight Reduction',
    metric1Value: '-35%',
    metric2Label: 'Cycle Time',
    metric2Value: '-18%',
    coverImage: 'https://images.unsplash.com/photo-1558441719-aa34455441cb?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getAllProjects();
      if (res?.success) {
        setProjects(res.data || []);
      }
    } catch (err) {
      toastError(err.message || 'Failed to fetch case studies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title || '',
      industry: proj.industry || 'Automotive & E-Mobility',
      clientType: proj.clientType || '',
      materialUsed: proj.materialUsed || '',
      challenge: proj.challenge || '',
      solution: proj.solution || '',
      results: Array.isArray(proj.results) ? proj.results.join(', ') : '',
      metric1Label: proj.metrics?.[0]?.label || 'Metric 1',
      metric1Value: proj.metrics?.[0]?.value || '-30%',
      metric2Label: proj.metrics?.[1]?.label || 'Metric 2',
      metric2Value: proj.metrics?.[1]?.value || '+25%',
      coverImage: proj.coverImage || '',
      isFeatured: proj.isFeatured || false,
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.challenge.trim() || !formData.solution.trim()) {
      toastError('Please fill in required fields (Title, Challenge, Solution).');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        industry: formData.industry,
        clientType: formData.clientType,
        materialUsed: formData.materialUsed,
        challenge: formData.challenge,
        solution: formData.solution,
        results: formData.results.split(',').map((r) => r.trim()).filter(Boolean),
        metrics: [
          { label: formData.metric1Label, value: formData.metric1Value },
          { label: formData.metric2Label, value: formData.metric2Value },
        ],
        coverImage: formData.coverImage,
        isFeatured: formData.isFeatured,
      };

      if (editingProject) {
        await adminService.updateProject(editingProject._id, payload);
        success('Case study updated successfully.');
      } else {
        await adminService.createProject(payload);
        success('New case study created successfully.');
      }

      setIsFormModalOpen(false);
      fetchProjects();
    } catch (err) {
      toastError(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    try {
      await adminService.deleteProject(deletingProject._id);
      success('Case study deleted successfully.');
      setIsDeleteModalOpen(false);
      setDeletingProject(null);
      fetchProjects();
    } catch (err) {
      toastError(err.message || 'Failed to delete case study');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Industrial Case Studies & Solutions</h1>
          <p className="text-xs text-slate-400 mt-1">
            Showcase applied polymer engineering, metal replacement solutions, and quantifiable benchmark results.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Case Study
        </Button>
      </div>

      {/* Projects Table */}
      <Card className="bg-slate-900 border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              icon={Briefcase}
              title="No case studies found"
              description="Create a demonstration case study showcasing polymer application results."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Case Study</th>
                  <th className="py-3.5 px-4">Industry Vertical</th>
                  <th className="py-3.5 px-4">Client Profile</th>
                  <th className="py-3.5 px-4">Material Grade</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{proj.title}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{proj.challenge}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="cyan" className="text-[10px]">{proj.industry}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{proj.clientType}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300">{proj.materialUsed}</td>
                    <td className="py-3.5 px-4">
                      {proj.isFeatured ? (
                        <Badge variant="emerald" className="text-[10px]">Featured</Badge>
                      ) : (
                        <Badge variant="slate" className="text-[10px]">Standard</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/case-studies/${proj.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-p-1 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View Public Case Study"
                      >
                        <ExternalLink className="w-3.5 h-3.5 inline" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"
                        title="Edit Case Study"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => { setDeletingProject(proj); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete Case Study"
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
        title={editingProject ? 'Edit Engineering Case Study' : 'Create Engineering Case Study'}
        size="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Weight Optimization in EV Battery Enclosures"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Industry Vertical</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Compounded Polymer Grade *</label>
              <input
                type="text"
                required
                value={formData.materialUsed}
                onChange={(e) => setFormData({ ...formData, materialUsed: e.target.value })}
                placeholder="e.g. Novamide® PA66-GF30"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client Profile Description</label>
            <input
              type="text"
              value={formData.clientType}
              onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
              placeholder="e.g. Tier 1 Automotive Powertrain Supplier"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">The Industrial Challenge (Problem) *</label>
            <textarea
              rows={3}
              required
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              placeholder="Describe operating temperatures, mechanical loads, metal replacement goals..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">NOVA Technical Solution & Formulation *</label>
            <textarea
              rows={3}
              required
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="Describe polymer base resin, glass fiber sizing, flame retardants, flow modifiers..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
              Quantifiable Impact Metrics
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400">Metric 1 Label</label>
                <input
                  type="text"
                  value={formData.metric1Label}
                  onChange={(e) => setFormData({ ...formData, metric1Label: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">Metric 1 Value</label>
                <input
                  type="text"
                  value={formData.metric1Value}
                  onChange={(e) => setFormData({ ...formData, metric1Value: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-cyan-400 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">Metric 2 Label</label>
                <input
                  type="text"
                  value={formData.metric2Label}
                  onChange={(e) => setFormData({ ...formData, metric2Label: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">Metric 2 Value</label>
                <input
                  type="text"
                  value={formData.metric2Value}
                  onChange={(e) => setFormData({ ...formData, metric2Value: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-cyan-400 font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500"
            />
            <label htmlFor="isFeatured" className="text-xs text-slate-300">
              Highlight as Featured Case Study on Homepage Spotlight
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="outline" type="button" onClick={() => setIsFormModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingProject ? 'Update Case Study' : 'Create Case Study'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Case Study"
        size="sm"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Are you sure you want to delete case study <strong className="text-white">{deletingProject?.title}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Case Study</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
