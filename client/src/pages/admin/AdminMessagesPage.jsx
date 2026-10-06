import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  MailOpen, 
  Building2, 
  Phone, 
  Clock, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Card, Badge, Button, Modal, Skeleton, EmptyState } from '../../components/common';

const INQUIRY_TYPES = [
  'All',
  'General Inquiry',
  'Technical Support & TDS',
  'Sample Request',
  'Supply Chain & Logistics',
  'Compliance & Certification',
  'Partnership & Distribution',
];

export default function AdminMessagesPage() {
  useSEO({ title: 'Contact Messages & Support Inquiries — NOVA Admin' });

  const { success, error: toastError } = useToast();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('All');
  const [readFilter, setReadFilter] = useState('All');

  // Modals
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [typeFilter, readFilter]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (typeFilter !== 'All') params.inquiryType = typeFilter;
      if (readFilter !== 'All') params.isRead = readFilter === 'read';

      const res = await adminService.getAllMessages(params);
      if (res?.success) {
        setMessages(res.data || []);
      }
    } catch (err) {
      toastError(err.message || 'Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (msgId) => {
    try {
      const res = await adminService.toggleMessageRead(msgId);
      if (res?.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === msgId ? { ...m, isRead: !m.isRead } : m))
        );
        success('Message status updated.');
      }
    } catch (err) {
      toastError(err.message || 'Failed to update message');
    }
  };

  const handleOpenDetail = (msg) => {
    setSelectedMessage(msg);
    setIsDetailModalOpen(true);
    if (!msg.isRead) {
      handleToggleRead(msg._id);
    }
  };

  const handleDelete = async () => {
    if (!deletingMessage) return;
    try {
      await adminService.deleteMessage(deletingMessage._id);
      success('Inquiry deleted successfully.');
      setIsDeleteModalOpen(false);
      setDeletingMessage(null);
      fetchMessages();
    } catch (err) {
      toastError(err.message || 'Failed to delete message');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Customer Support & Technical Inquiries</h1>
          <p className="text-xs text-slate-400 mt-1">
            Incoming inquiries, sample test batch requests, TDS documentation downloads, and customer tickets.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-slate-900 border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0">Inquiry Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0">Status:</span>
          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Inquiries</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>
      </Card>

      {/* Messages Table */}
      <Card className="bg-slate-900 border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              icon={Mail}
              title="No customer messages found"
              description="No incoming inquiries match the current filter selection."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Sender / Organization</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-slate-800/40 transition-colors ${!msg.isRead ? 'bg-cyan-950/10' : ''}`}>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleRead(msg._id)}
                        className="inline-flex items-center gap-1 text-[11px]"
                        title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        {msg.isRead ? (
                          <Badge variant="slate" className="text-[10px]">Read</Badge>
                        ) : (
                          <Badge variant="cyan" className="text-[10px] animate-pulse">New Unread</Badge>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{msg.name}</div>
                      <div className="text-[11px] text-slate-400">{msg.company ? `${msg.company} • ` : ''}{msg.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-mono">
                        {msg.inquiryType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-200 truncate max-w-xs">
                      {msg.subject}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenDetail(msg)}
                        className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"
                        title="Read Message"
                      >
                        <Eye className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => { setDeletingMessage(msg); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete Message"
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

      {/* Message Reader Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Inquiry from ${selectedMessage?.name || 'Customer'}`}
        size="md"
      >
        {selectedMessage && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{selectedMessage.subject}</span>
                <Badge variant="cyan">{selectedMessage.inquiryType}</Badge>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div><span className="text-slate-500">From:</span> {selectedMessage.name} &lt;{selectedMessage.email}&gt;</div>
                {selectedMessage.company && <div><span className="text-slate-500">Company:</span> {selectedMessage.company}</div>}
                {selectedMessage.phone && <div><span className="text-slate-500">Phone:</span> {selectedMessage.phone}</div>}
                <div><span className="text-slate-500">Received:</span> {new Date(selectedMessage.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Message Body</span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <a
                href={`mailto:${selectedMessage.email}?subject=RE: ${encodeURIComponent(selectedMessage.subject)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Customer Message"
        size="sm"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Are you sure you want to delete inquiry from <strong className="text-white">{deletingMessage?.name}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Inquiry</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
