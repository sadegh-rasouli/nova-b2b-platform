import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Building2, 
  Mail, 
  Phone, 
  Calendar,
  AlertCircle,
  Edit,
  Download
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Card, Badge, Button, Modal, Skeleton, EmptyState } from '../../components/common';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'cyan' },
  { value: 'reviewing', label: 'Reviewing', color: 'amber' },
  { value: 'contacted', label: 'Contacted', color: 'blue' },
  { value: 'quoted', label: 'Quoted', color: 'emerald' },
  { value: 'closed', label: 'Closed', color: 'slate' },
  { value: 'archived', label: 'Archived', color: 'slate' },
];

export default function AdminQuotesPage() {
  useSEO({ title: 'Quotation Pipeline Management — NOVA Admin' });

  const { success, error: toastError } = useToast();
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Modals
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const [deletingQuote, setDeletingQuote] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, [statusFilter, search]);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await adminService.getAllQuotes(params);
      if (res?.success) {
        setQuotes(res.data || []);
      }
    } catch (err) {
      toastError(err.message || 'Failed to fetch quotation requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (quoteId, newStatus) => {
    try {
      await adminService.updateQuoteStatus(quoteId, { status: newStatus });
      success(`Quote status updated to "${newStatus}".`);
      fetchQuotes();
      if (selectedQuote && selectedQuote._id === quoteId) {
        setSelectedQuote((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      toastError(err.message || 'Failed to update quote status');
    }
  };

  const handleOpenDetail = (quote) => {
    setSelectedQuote(quote);
    setAdminNotesInput(quote.adminNotes || '');
    setIsDetailModalOpen(true);
  };

  const handleSaveAdminNotes = async () => {
    if (!selectedQuote) return;
    setIsUpdatingStatus(true);
    try {
      await adminService.updateQuoteStatus(selectedQuote._id, { adminNotes: adminNotesInput });
      success('Admin notes saved successfully.');
      fetchQuotes();
      setSelectedQuote((prev) => ({ ...prev, adminNotes: adminNotesInput }));
    } catch (err) {
      toastError(err.message || 'Failed to update notes');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingQuote) return;
    try {
      await adminService.deleteQuote(deletingQuote._id);
      success(`RFQ ${deletingQuote.quoteNumber} deleted.`);
      setIsDeleteModalOpen(false);
      setDeletingQuote(null);
      fetchQuotes();
    } catch (err) {
      toastError(err.message || 'Failed to delete RFQ');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Quotation Requests (RFQ)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise procurement inquiry pipeline, customer volume requirements, and pricing workflows.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <Card className="p-4 bg-slate-900 border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by RFQ number (e.g. RFQ-2026-...), company, email, or product..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* RFQ Table */}
      <Card className="bg-slate-900 border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              icon={FileText}
              title="No quotation requests found"
              description="There are currently no RFQs matching the selected criteria."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">RFQ Number</th>
                  <th className="py-3.5 px-4">Company / Buyer</th>
                  <th className="py-3.5 px-4">Material Grade</th>
                  <th className="py-3.5 px-4">Quantity</th>
                  <th className="py-3.5 px-4">Incoterms</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Pipeline Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {quotes.map((q) => (
                  <tr key={q._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                      <button onClick={() => handleOpenDetail(q)} className="hover:underline">
                        {q.quoteNumber}
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{q.companyName}</div>
                      <div className="text-[11px] text-slate-400">{q.fullName} • {q.corporateEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-200">{q.productName}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-semibold">{q.quantity} {q.unit}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">{q.incoterms}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q._id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] font-semibold text-slate-200 focus:outline-none focus:border-cyan-500 capitalize"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenDetail(q)}
                        className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"
                        title="View Full RFQ Details"
                      >
                        <Eye className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => { setDeletingQuote(q); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete RFQ"
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

      {/* RFQ Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Quotation Specification: ${selectedQuote?.quoteNumber || ''}`}
        size="lg"
      >
        {selectedQuote && (
          <div className="space-y-6 text-xs text-slate-300 max-h-[75vh] overflow-y-auto pr-1">
            {/* Header info */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Tracking Reference</span>
                <div className="text-base font-black text-cyan-400 font-mono">{selectedQuote.quoteNumber}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Submitted on {new Date(selectedQuote.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <Badge variant={selectedQuote.status === 'new' ? 'cyan' : 'emerald'} className="capitalize">
                  {selectedQuote.status}
                </Badge>
              </div>
            </div>

            {/* Buyer & Company Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Buyer Organization
                </div>
                <div><span className="text-slate-500">Company:</span> <strong className="text-white">{selectedQuote.companyName}</strong></div>
                <div><span className="text-slate-500">Contact Person:</span> {selectedQuote.fullName}</div>
                <div><span className="text-slate-500">Country / Region:</span> {selectedQuote.country}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Direct Contact
                </div>
                <div><span className="text-slate-500">Email:</span> <a href={`mailto:${selectedQuote.corporateEmail}`} className="text-cyan-400 hover:underline">{selectedQuote.corporateEmail}</a></div>
                <div><span className="text-slate-500">Phone:</span> {selectedQuote.phone}</div>
              </div>
            </div>

            {/* Material Requirement */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Material & Logistics Requirements
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block text-[10px]">Material Grade</span>
                  <span className="font-bold text-white font-mono">{selectedQuote.productName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Volume Required</span>
                  <span className="font-bold text-white">{selectedQuote.quantity} {selectedQuote.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Packaging</span>
                  <span className="text-slate-200">{selectedQuote.packaging}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Incoterms</span>
                  <span className="text-slate-200">{selectedQuote.incoterms}</span>
                </div>
              </div>

              {selectedQuote.message && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <span className="text-slate-500 block text-[10px] mb-1">Customer Technical Notes / Requirements:</span>
                  <p className="text-slate-200 italic bg-slate-900 p-2.5 rounded border border-slate-800">
                    "{selectedQuote.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-[11px] font-bold text-white block">
                Internal Engineering & Commercial Notes (Private)
              </label>
              <textarea
                rows={3}
                value={adminNotesInput}
                onChange={(e) => setAdminNotesInput(e.target.value)}
                placeholder="Add internal notes on pricing formula, freight quotes, or sales representative assigned..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
              />
              <div className="flex justify-end">
                <Button variant="primary" size="sm" onClick={handleSaveAdminNotes} disabled={isUpdatingStatus}>
                  {isUpdatingStatus ? 'Saving Notes...' : 'Save Internal Notes'}
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Close Viewer
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Quotation Request"
        size="sm"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Are you sure you want to delete quotation request <strong className="text-white font-mono">{deletingQuote?.quoteNumber}</strong> from <strong className="text-white">{deletingQuote?.companyName}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete RFQ</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
