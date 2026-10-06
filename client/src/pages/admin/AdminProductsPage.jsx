import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Eye, 
  AlertCircle,
  CheckCircle2,
  Filter,
  X
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Card, Badge, Button, Input, Select, Textarea, Modal, Skeleton, EmptyState } from '../../components/common';

const CATEGORIES = [
  'All',
  'Polymer Granules',
  'Engineering Materials',
  'Industrial Compounds',
  'Custom Materials',
];

export default function AdminProductsPage() {
  useSEO({ title: 'Product Catalog Management — NOVA Admin' });

  const { success, error: toastError } = useToast();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const initialForm = {
    name: '',
    code: '',
    category: 'Engineering Materials',
    polymerFamily: 'Polyamide 66',
    description: '',
    features: '',
    applications: '',
    industries: '',
    processingMethods: 'Injection Molding, Extrusion',
    specifications: {
      density: '1.36 g/cm³',
      tensileStrength: '175 MPa',
      flexuralModulus: '8500 MPa',
      heatDeflectionTemp: '250°C',
      flammabilityRating: 'HB',
    },
    certifications: 'ISO 9001, RoHS, REACH',
    coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    status: 'active',
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search.trim()) params.search = search.trim();

      const res = await adminService.getAllProducts(params);
      if (res?.success) {
        setProducts(res.data || []);
      }
    } catch (err) {
      toastError(err.message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      code: prod.code || '',
      category: prod.category || 'Engineering Materials',
      polymerFamily: prod.polymerFamily || '',
      description: prod.description || '',
      features: Array.isArray(prod.features) ? prod.features.join(', ') : '',
      applications: Array.isArray(prod.applications) ? prod.applications.join(', ') : '',
      industries: Array.isArray(prod.industries) ? prod.industries.join(', ') : '',
      processingMethods: Array.isArray(prod.processingMethods) ? prod.processingMethods.join(', ') : '',
      specifications: {
        density: prod.specifications?.density || '',
        tensileStrength: prod.specifications?.tensileStrength || '',
        flexuralModulus: prod.specifications?.flexuralModulus || '',
        heatDeflectionTemp: prod.specifications?.heatDeflectionTemp || '',
        flammabilityRating: prod.specifications?.flammabilityRating || '',
      },
      certifications: Array.isArray(prod.certifications) ? prod.certifications.join(', ') : '',
      coverImage: prod.coverImage || '',
      status: prod.status || 'active',
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      toastError('Please provide product name and grade code');
      return;
    }

    setIsSubmitting(true);
    try {
      const specsArray = [
        { label: 'Density', value: formData.specifications.density || '1.36 g/cm³', testStandard: 'ISO 1183' },
        { label: 'Tensile Strength', value: formData.specifications.tensileStrength || '175 MPa', testStandard: 'ISO 527' },
        { label: 'Flexural Modulus', value: formData.specifications.flexuralModulus || '8500 MPa', testStandard: 'ISO 178' },
        { label: 'Heat Deflection Temp (HDT)', value: formData.specifications.heatDeflectionTemp || '250°C', testStandard: 'ISO 75' },
        { label: 'Flammability Rating', value: formData.specifications.flammabilityRating || 'HB', testStandard: 'UL94' },
      ];

      const payload = {
        name: formData.name,
        code: formData.code.toUpperCase(),
        category: formData.category,
        polymerFamily: formData.polymerFamily,
        shortDescription: formData.description || 'High performance engineering material grade.',
        fullDescription: formData.description || 'Complete technical polymer compounding formulation with advanced physical and thermal resilience.',
        specifications: specsArray,
        featuredImage: formData.coverImage || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        images: [formData.coverImage || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
        applications: formData.applications.split(',').map((s) => s.trim()).filter(Boolean),
        industries: formData.industries.split(',').map((s) => s.trim()).filter(Boolean),
        processingMethods: formData.processingMethods.split(',').map((s) => s.trim()).filter(Boolean),
        certifications: formData.certifications.split(',').map((s) => s.trim()).filter(Boolean),
        status: formData.status,
      };


      if (editingProduct) {
        await adminService.updateProduct(editingProduct._id, payload);
        success('Material grade updated successfully.');
      } else {
        await adminService.createProduct(payload);
        success('New material grade created successfully.');
      }

      setIsFormModalOpen(false);
      fetchProducts();
    } catch (err) {
      toastError(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    setIsSubmitting(true);
    try {
      await adminService.deleteProduct(deletingProduct._id);
      success(`Material grade "${deletingProduct.name}" deleted.`);
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);
      fetchProducts();
    } catch (err) {
      toastError(err.message || 'Failed to delete product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Material Product Catalog</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage thermoplastic formulations, TDS physical properties, and technical specifications.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Material Grade
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 bg-slate-900 border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by grade name, code (e.g. PA66-GF30), or polymer family..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Product Table */}
      <Card className="bg-slate-900 border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              icon={Layers}
              title="No material grades found"
              description="Try adjusting your search criteria or add a new material grade."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Grade / Material</th>
                  <th className="py-3.5 px-4">Grade Code</th>
                  <th className="py-3.5 px-4">Polymer Family</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Density</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{prod.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{prod.description}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400 font-semibold">{prod.code}</td>
                    <td className="py-3.5 px-4 text-slate-300">{prod.polymerFamily}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="slate" className="text-[10px]">{prod.category}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{prod.specifications?.density || '—'}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={prod.status === 'active' ? 'emerald' : 'slate'} className="text-[10px] capitalize">
                        {prod.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/products/${prod.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-p-1 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View Public TDS"
                      >
                        <ExternalLink className="w-3.5 h-3.5 inline" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"
                        title="Edit Grade"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => { setDeletingProduct(prod); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete Grade"
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
        title={editingProduct ? `Edit Material Grade: ${editingProduct.code}` : 'Create New Material Grade'}
        size="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Commercial Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Novamide® PA66-GF30"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Internal Grade Code *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. NV-PA66-30GF"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Polymer Family</label>
              <input
                type="text"
                value={formData.polymerFamily}
                onChange={(e) => setFormData({ ...formData, polymerFamily: e.target.value })}
                placeholder="e.g. Polyamide 66"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Technical Summary / Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
              TDS Physical & Thermal Specifications
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400">Density</label>
                <input
                  type="text"
                  value={formData.specifications.density}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, density: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">Tensile Strength</label>
                <input
                  type="text"
                  value={formData.specifications.tensileStrength}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, tensileStrength: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">Flexural Modulus</label>
                <input
                  type="text"
                  value={formData.specifications.flexuralModulus}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, flexuralModulus: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">HDT (Heat Deflection)</label>
                <input
                  type="text"
                  value={formData.specifications.heatDeflectionTemp}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, heatDeflectionTemp: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">Flammability (UL94)</label>
                <input
                  type="text"
                  value={formData.specifications.flammabilityRating}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, flammabilityRating: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Industries (Comma-separated)</label>
            <input
              type="text"
              value={formData.industries}
              onChange={(e) => setFormData({ ...formData, industries: e.target.value })}
              placeholder="Automotive, Electrical & Electronics, Industrial"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="outline" type="button" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving Grade...' : editingProduct ? 'Update Grade' : 'Create Grade'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Material Grade Deletion"
        size="sm"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Are you sure you want to permanently delete <strong className="text-white font-mono">{deletingProduct?.name}</strong> ({deletingProduct?.code})?
          </p>
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px]">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            This action cannot be undone. Public TDS and quotation links referencing this code will be affected.
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Delete Material Grade'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
